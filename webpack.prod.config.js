const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
/* New instance of the plugin */
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  /* Set Skeleton HTML as template */
  template: './src/index.html',
  /* Name of HTML that the plugin will generate. dist/index.html */
  filename: 'index.html',
  /* Add any JavaScript into the bottom of the page, just before closing body tag. */
  inject: 'body'
});

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    })
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },
};
