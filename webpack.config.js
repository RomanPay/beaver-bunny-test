const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { execSync } = require('child_process');

module.exports = (env, argv) => {
  execSync('node ./src/readFiles.js');
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'PixiTempalte',
        template: 'src/index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
            { from: 'src/assets', to: 'assets' }
          ]
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      ]
    },
    devServer: {
      static: './dist',
      hot: true,
      open: true,
      watchFiles: ['src/**'],
    }
  }
};
