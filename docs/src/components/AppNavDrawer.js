// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { spacing, typography, zIndex } from 'material-ui/styles';
import palette from '../utils/palette';

const SelectableList = makeSelectable(List);

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: palette.primary1Color,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16,
  },
};

class AppNavDrawer extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  handleRequestChangeLink = (event, value) => {
    window.location = value;
  };

  handleTouchTapHeader = () => {
    this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  };

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onChangeList,
      open,
      style,
    } = this.props;

    return (
      <Drawer
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        containerStyle={{ zIndex: zIndex.drawer - 100 }}
      >
        <div style={styles.logo} onClick={this.handleTouchTapHeader}>
          React-Move
        </div>
        <SelectableList
          value={location.pathname}
          onChange={onChangeList}
        >
          <ListItem
            primaryText="Documentation"
            primaryTogglesNestedList
            nestedItems={[
              <ListItem
                primaryText="Animate"
                value="/documentation/animate"
                href="#/documentation/animate"
              />,
              <ListItem
                primaryText="NodeGroup"
                value="/documentation/node-group"
                href="#/documentation/node-group"
              />,
            ]}
          />
          <ListItem
            primaryText="Examples"
            primaryTogglesNestedList
            nestedItems={[
              <ListItem
                primaryText="Simple"
                value="/examples/simple"
                href="#/examples/simple"
              />,
              <ListItem
                primaryText="Pie Charts"
                value="/examples/pie-charts"
                href="#/examples/pie-charts"
              />,
            ]}
          />
        </SelectableList>
        <Divider />
        <SelectableList
          value=""
          onChange={this.handleRequestChangeLink}
        >
          <Subheader>Resources</Subheader>
          <ListItem primaryText="GitHub" value="https://github.com/react-tools/react-move" />
          <ListItem primaryText="React" value="http://facebook.github.io/react" />
        </SelectableList>
      </Drawer>
    );
  }
}

export default AppNavDrawer;
