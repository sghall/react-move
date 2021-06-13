// @flow weak

const path = require('path')

module.exports = {
  context: path.resolve(__dirname),
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: 'commonjs',
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ['transform-react-remove-prop-types', { mode: 'remove' }],
            ],
          },
        },
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    fallback: { os: require.resolve('os-browserify/browser') },
    alias: {
      docs: path.resolve(__dirname, '../docs'),
      'react-move': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [],
}
