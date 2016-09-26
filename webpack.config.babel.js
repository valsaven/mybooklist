/**
 * Created by val on 9/24/16.
 */

'use strict';

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const autoprefixer = require('autoprefixer');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


let config = {};

config.entry = {
  app: './client/app/app.js',
  vendor: [
    'angular',
    'lodash'
  ]
};

config.output = {
  path: path.join(__dirname, '/.tmp/'),
  publicPath: '/',
  filename: '[name].bundle.js',
  chunkFilename: '[name].bundle.js'
};

config.devtool = 'source-map';

config.babel = {
  shouldPrintComment(commentContents) {
    return /@ngInject/.test(commentContents)
  }
};

config.module = {
  preLoaders: [],
  loaders: [{
    test: /\.js$/,
    loader: 'babel',
    include: [
      path.resolve(__dirname, 'client/'),
      path.resolve(__dirname, 'node_modules/lodash-es/')
    ]
  },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)([\?]?.*)$/,
      loader: 'file'
    },
    {
      test: /\.html$/,
      loader: 'raw'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
    }
  ]
};

config.module.postLoaders = [{
  test: /\.js$/,
  loader: 'ng-annotate?single_quotes'
}];

config.postcss = [
  autoprefixer({
    browsers: ['last 2 version']
  })
];

config.plugins = [
  new ExtractTextPlugin('[name].[hash].css')
];

config.plugins.push(new CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  })
);

let htmlConfig = {
  template: 'client/_index.html',
  filename: '../client/index.html',
  alwaysWriteToDisk: true
};

config.plugins.push(
  new HtmlWebpackPlugin(htmlConfig),
  new HtmlWebpackHarddiskPlugin()
);

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"dev"'
    }
  })
);

config.devServer = {
  contentBase: './client/',
  stats: {
    modules: false,
    cached: false,
    colors: true,
    chunk: false
  }
};

config.node = {
  global: 'window',
  process: true,
  crypto: 'empty',
  clearImmediate: false,
  setImmediate: false
};

module.exports = config;