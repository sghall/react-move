// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import MarkdownElement from 'docs/src/components/MarkdownElement';
import PropTypeDescription from 'docs/src/components/PropTypeDescription';

const TickGroupDocs = (props) => {
  const { route: { docContext, srcContext } } = props;

  return (
    <div>
      <MarkdownElement text={docContext('./TickGroup/README0.md')} />
      <PropTypeDescription code={srcContext('./TickGroup/TickGroup')} />
    </div>
  );
};

TickGroupDocs.propTypes = {
  route: PropTypes.object.isRequired,
};

export default TickGroupDocs;
