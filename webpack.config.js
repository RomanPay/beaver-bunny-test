const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { execSync } = require('child_process');
const fs = require('fs');

module.exports = (env, argv) => {
  execSync('node ./src/readFiles.js');
  
  const isProduction = argv.mode === 'production';
  const publicPath = isProduction ? './' : '/';

  console.warn(isProduction, publicPath);   

  // Создайте папку 'docs', если она не существует
  fs.mkdirSync(path.resolve(__dirname, 'docs'), { recursive: true });

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'bundle.js',
      publicPath: publicPath,
      // chunkFilename: '[name].[contenthash].js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'PixiTemplate',
        template: 'src/index.html',
        publicPath: publicPath
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
                publicPath: (url) => {
                  return publicPath + url;
                },
                outputPath: (url) => {
                  return url;
                },
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/fonts',
                publicPath: publicPath + 'assets/fonts',
              },
            },
          ],
        },
      ]
    },
    devServer: {
      static: path.join(__dirname, 'docs'),
      open: true,
      watchFiles: ['src/**'],
    }
  };
};
