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
  /* Specifies the entry file where the bundler starts the bundling process. */
  entry: './src/index.js',
  /* Specifies the location where the bundled Javascript code is to be saved. */
  output: {
    /* path.resolve('dist') = current working directory/dist */
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    /* Loaders are transformations that are applied on a file in our app. */
    rules: [
      /* babel-loader goes through and transpiles every file that ends with a .js or .jsx extension excluding the files inside the node_modules folder.  */
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: { historyApiFallback: true },
  plugins: [
    HtmlWebpackPluginConfig,
    /* Create global constants with DefinePlugin */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    })
  ]
};
