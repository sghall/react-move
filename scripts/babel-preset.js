// @flow weak
/* eslint eqeqeq: "off" */

const BABEL_ENV = process.env.BABEL_ENV;
const building = BABEL_ENV != undefined && BABEL_ENV !== 'cjs' && BABEL_ENV !== 'coverage';

module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: building ? false : 'commonjs',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['transform-react-remove-prop-types', {
      removeImport: true,
      ignoreFilenames: ['node_modules'],
    }],
    '@babel/plugin-proposal-class-properties',
  ],
});

