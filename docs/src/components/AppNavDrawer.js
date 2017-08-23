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
        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          Resonance
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
              <ListItem
                primaryText="TickGroup"
                value="/documentation/tick-group"
                href="#/documentation/tick-group"
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
          <ListItem
            primaryText="Redux Examples"
            primaryTogglesNestedList
            nestedItems={[
              <ListItem
                primaryText="Alphabet"
                value="/redux-examples/alphabet"
                href="#/redux-examples/alphabet"
              />,
              <ListItem
                primaryText="States Bar Chart"
                value="/redux-examples/states-by-age"
                href="#/redux-examples/states-by-age"
              />,
              <ListItem
                primaryText="States Circle Pack"
                value="/redux-examples/packed-by-age"
                href="#/redux-examples/packed-by-age"
              />,
              <ListItem
                primaryText="Stacked Area Chart"
                value="/redux-examples/stacked-area"
                href="#/redux-examples/stacked-area"
              />,
              <ListItem
                primaryText="Alluvial Chart"
                value="/redux-examples/alluvial-chart"
                href="#/redux-examples/alluvial-chart"
              />,
              <ListItem
                primaryText="Webpack Sunburst"
                value="/redux-examples/webpack-sunburst"
                href="#/redux-examples/webpack-sunburst"
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
          <ListItem primaryText="GitHub" value="https://github.com/sghall/resonance" />
          <ListItem primaryText="React" value="http://facebook.github.io/react" />
        </SelectableList>
      </Drawer>
    );
  }
}

export default AppNavDrawer;
