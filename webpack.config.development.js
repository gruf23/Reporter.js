const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: '#inline-source-map',
  entry: './src/reporter.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'reporter.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      files: 'src/'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname),
    publicPath: '/dist',
    compress: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 9000
  }
};
