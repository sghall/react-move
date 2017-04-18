const webpack = require('webpack')
module.exports = {
  entry: './lib/index.js',
  output: {
    filename: './react-move.js',
    libraryTarget: 'umd',
    library: 'ReactMove'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
