const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const WORK_DIR = path.resolve(__dirname);
const OUTPUT_DIR = path.resolve(WORK_DIR, 'build');

module.exports = {
  entry: path.resolve(WORK_DIR, 'src', 'index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(WORK_DIR, 'index.html')
    })
  ],
  resolve: {
    extensions: ['.ts', 'js']
  },
  output: {
    filename: 'cm.js',
    path: OUTPUT_DIR
  },
  devServer: {
    contentBase: path.resolve(WORK_DIR, 'build'),
    compress: true,
    port: 9000
  }
}