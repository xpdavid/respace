const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (webpackConfig, config) => {
  console.log(config.template)
  const template = config.template || path.join(__dirname, 'template.html')

  webpackConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      'NODE_ENV': process.env.NODE_ENV,
      __DEV__: config.isDevelopment
    })
  ]

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template,
      hash: false,
      filename: 'index.html',
      inject: 'body'
    })
  )

  if (config.isDevelopment) {
    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    )
  } else {
    webpackConfig.plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      })
    )
  }
}
