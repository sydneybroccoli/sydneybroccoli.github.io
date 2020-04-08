const path = require('path');
const extract = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: './src/index.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
    { test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'] } } },
    { test:/\.(sa|sc|c)ss$/,
      use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader',
            options: { implementation: require('sass') }
          } ]
    },
    { test: /\.(png|jpe?g|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: "images"
    } } ] } ] },
  plugins: [
    new ErrorOverlayPlugin(),
    new HTMLWebpackPlugin({
      title: 'Sydney Barovsky Portfolio',
      template: './src/index.html', //source
    }),
    new extract({
      filename: 'bundle.css',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
};
