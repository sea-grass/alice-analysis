const path = require("path");
const webpack = require("webpack");

// fix for webpack for undefined Promise when using style/css loader
require("es6-promise").polyfill();

module.exports = {
  entry: "./src/app.js",
  output: {
    path: "./bin",
    filename: "app.bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },
    {
      test: /\.json$/,
      loader: "json-loader" 
    },
    {
      test: /\.css$/,
      loader: "style!css" 
    }]
  },
  plugins: [
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    output: {
      comments: false,
    },
    }),
    */
  ],
  resolve: {
    alias: {
      // to easily require one of three's font files
      helvetiker_regular_font: path.join(__dirname, "/node_modules/three/examples/fonts/helvetiker_regular.typeface.json")
    }
  }
};
