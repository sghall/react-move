// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import withWidth from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import logo from 'docs/src/css/logo-react-move.png';
import FullWidthSection from '../components/FullWidthSection';

class HomePage extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  homePageHero = () => {
    const styles = {
      root: {
        overflow: 'hidden',
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: 575,
      },
      label: {
        color: lightBaseTheme.palette.primary1Color,
      },
      h1: {
        fontWeight: typography.fontWeightLight,
      },
      h2: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
      taglineWhenLarge: {
        marginTop: 32,
      },
      h1WhenLarge: {
        fontSize: 56,
      },
      h2WhenLarge: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
      },
    };

    styles.h2 = Object.assign({}, styles.h1, styles.h2);

    return (
      <FullWidthSection style={styles.root}>
        <img style={{ marginLeft: '10%' }} width="80%" src={logo} alt="react-move" />
      </FullWidthSection>
    );
  }

  homeContribute() {
    const styles = {
      root: {
        textAlign: 'center',
      },
      h3: {
        margin: 0,
        padding: 0,
        fontWeight: typography.fontWeightLight,
        fontSize: 22,
      },
      button: {
        marginTop: 32,
      },
    };

    return (
      <FullWidthSection useContent style={styles.root}>
        <RaisedButton
          label="GitHub"
          primary
          href="https://github.com/react-tools/react-move"
          style={styles.button}
        />
        <RaisedButton
          label="Examples"
          onTouchTap={this.handleTouchTapDemo}
          style={styles.button}
        />
      </FullWidthSection>
    );
  }

  handleTouchTapDemo = () => {
    this.context.router.push('/documentation/node-group');
  };

  render() {
    const style = {
      paddingTop: spacing.desktopKeylineIncrement,
    };

    return (
      <div style={style}>
        {this.homePageHero()}
        {this.homeContribute()}
      </div>
    );
  }
}

export default withWidth()(HomePage);
