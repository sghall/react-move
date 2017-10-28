// @flow weak
/* eslint eqeqeq: "off" */

const BABEL_ENV = process.env.BABEL_ENV;
const building = BABEL_ENV != undefined && BABEL_ENV !== 'cjs';

const plugins = [];

if (BABEL_ENV === 'umd') {
  plugins.push('external-helpers');
}

module.exports = {
  presets: [
    ['es2015', {
      loose: true,
      modules: building ? false : 'commonjs',
    }],
    'stage-1',
    'react',
  ],
  plugins,
};
