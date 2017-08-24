// @flow weak

const webpack = require('webpack');
const pkg = require('../package.json');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_MOVE_VERSION: JSON.stringify(pkg.version),
      },
    }),
  ],
};
