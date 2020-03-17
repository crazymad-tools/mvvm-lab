const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);

// compiler.run((err, stats) => {

// })
compiler.watch({}, (err, stats) => {
  console.log(err);
});
