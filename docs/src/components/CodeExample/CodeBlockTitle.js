// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import CodeIcon from 'material-ui/svg-icons/action/code';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

const CodeBlockTitle = (props) => (
  <Toolbar style={{ backgroundColor: '#616161' }}>
    <ToolbarGroup>
      <ToolbarTitle style={{ color: 'white' }} text={props.title || 'Example'} />
    </ToolbarGroup>
    <ToolbarGroup>
      <IconButton touch tooltip={props.tooltip}>
        <CodeIcon color="white" />
      </IconButton>
    </ToolbarGroup>
  </Toolbar>
);

CodeBlockTitle.propTypes = {
  title: PropTypes.string,
  tooltip: PropTypes.string,
};

export default CodeBlockTitle;
