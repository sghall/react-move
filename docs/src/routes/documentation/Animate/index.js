// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from 'docs/src/components/CodeExample';
import MarkdownElement from 'docs/src/components/MarkdownElement';
import PropTypeDescription from 'docs/src/components/PropTypeDescription';
import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';

const NodeGroupDocs = (props) => {
  const { route: { docContext, srcContext } } = props;

  return (
    <div>
      <CodeExample
        code={docContext('./Animate/Example1')}
        title="Example: Custom Tween Using Flubber"
      >
        <Example3 />
      </CodeExample>
      <MarkdownElement text={docContext('./Animate/README0.md')} />
      <PropTypeDescription code={srcContext('./Animate/Animate')} />
      <CodeExample
        code={docContext('./Animate/Example1')}
        title="Example: Custom Tween Using Flubber"
      >
        <Example1 />
      </CodeExample>
      <CodeExample
        code={docContext('./Animate/Example2')}
        title="Example: HTML"
      >
        <Example2 />
      </CodeExample>
      <MarkdownElement text={docContext('./Animate/README1.md')} />
    </div>
  );
};

NodeGroupDocs.propTypes = {
  route: PropTypes.object.isRequired,
};

export default NodeGroupDocs;
