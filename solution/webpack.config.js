
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './release/js')
  },
  mode: 'production',
  watch: true,
  watchOptions: {
    ignored: ['node_modules']
  }
  
};