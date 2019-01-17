// @flow weak
/* eslint no-console: "off" */
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.config')

const serverOptions = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    modules: false,
    chunkModules: false,
    colors: true,
  },
}

const PORT = process.env.RESONANCE_PORT || 3000

new WebpackDevServer(
  webpack(webpackConfig),
  serverOptions,
).listen(PORT, '0.0.0.0', err => {
  if (err) {
    return console.log(err)
  }

  return console.info(`Webpack dev server listening at http://0.0.0.0:${PORT}/`)
})
