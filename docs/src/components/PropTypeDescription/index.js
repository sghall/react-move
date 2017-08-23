// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import recast from 'recast';
import { parse } from 'react-docgen';
import { parse as parseDoctrine } from 'doctrine';
import MarkdownElement from '../MarkdownElement';

require('./prop-type-description.css');

function getDeprecatedInfo(type) {
  const deprecatedPropType = 'deprecated(PropTypes.';

  const indexStart = type.raw.indexOf(deprecatedPropType);

  if (indexStart !== -1) {
    return {
      propTypes: type.raw.substring(indexStart + deprecatedPropType.length, type.raw.indexOf(',')),
      explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value,
    };
  }

  return false;
}

function generatePropType(type) {
  let values = '';

  switch (type.name) {
    case 'func':
      return 'function';
    case 'enum':
    case 'union':
      values = type.value.map((v) => v.value || v.name).join('<br>&nbsp;');
      return `${type.name}:<br>&nbsp;${values}<br>`;
    default:
      return type.type || type.name;
  }
}

function genDescription(required, description, type) {
  let deprecated = '';

  if (type.name === 'custom') {
    const deprecatedInfo = getDeprecatedInfo(type);

    if (deprecatedInfo) {
      deprecated = `*Deprecated*. ${deprecatedInfo.explanation}<br><br>`;
    }
  }

  const parsed = parseDoctrine(description);
  const jsDocText = parsed.description.replace(/\n\n/g, '<br>').replace(/\n/g, ' ');

  if (parsed.tags.some((tag) => tag.title === 'ignore')) return null;

  let signature = '';

  if (type.name === 'func' && parsed.tags.length > 0) {
    parsed.tags.map((tag) => {
      const res = { ...tag };

      if (res.description) {
        res.description.replace(/\n/g, ' ');
      }

      return res;
    });

    let parsedArgs = [];
    let parsedReturns;

    if (parsed.tags[parsed.tags.length - 1].title === 'returns') {
      parsedArgs = parsed.tags.slice(0, parsed.tags.length - 1);
      parsedReturns = parsed.tags[parsed.tags.length - 1];
    } else {
      parsedArgs = parsed.tags;
      parsedReturns = { type: { name: 'void' } };
    }

    signature += '<br><br>**Signature:**<br>`function(';
    signature += parsedArgs.map((tag) => `${tag.name}: ${tag.type.name}`).join(', ');
    signature += `) => ${parsedReturns.type.name}<br>`;
    signature += parsedArgs.map((tag) => `*${tag.name}:* ${tag.description}`).join('<br>');

    if (parsedReturns.description) {
      signature += `<br> *returns* (${parsedReturns.type.name}): ${parsedReturns.description}`;
    }
  }

  return `${deprecated} ${jsDocText}${signature}`;
}

const styles = {
  footnote: {
    fontSize: '90%',
    paddingLeft: '15px',
  },
};

class PropTypeDescription extends Component {
  static propTypes = {
    code: PropTypes.string,
    header: PropTypes.string.isRequired,
  };

  static defaultProps = {
    header: '### Component Props',
  };

  render() {
    const {
      code,
      header,
    } = this.props;

    let requiredProps = 0;

    let text = `${header}`;
    text += '\n| Name | Type | Default | Description |';
    text += '\n|:-----|:-----|:-----|:-----|\n';

    const info = parse(code);

    Object.keys(info.props).forEach((key) => {
      let name = key;

      const prop = info.props[name];
      prop.type = prop.type || prop.flowType;

      const desc = genDescription(prop.required, prop.description, prop.type) || '';

      let defaultValue = '';

      if (prop.defaultValue) {
        defaultValue = prop.defaultValue.value.replace(/\n/g, '');
      }

      if (prop.required) {
        name = `<span style="color: #31a148">${name} *</span>`;
        requiredProps += 1;
      }

      if (prop.type.name === 'custom') {
        if (getDeprecatedInfo(prop.type)) {
          name = `~~${name}~~`;
        }
      }

      text += `| ${name} | ${generatePropType(prop.type)} | ${defaultValue} | ${desc} |\n`;
    });

    let requiredPropFootnote = '';

    if (requiredProps === 1) {
      requiredPropFootnote = '* required property';
    } else if (requiredProps > 1) {
      requiredPropFootnote = '* required properties';
    }

    return (
      <div style={{ marginBottom: 15 }} className="propTypeDescription">
        <MarkdownElement text={text} />
        <div style={styles.footnote}>
          {requiredPropFootnote}
        </div>
      </div>
    );
  }
}

export default PropTypeDescription;
