const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const webpackNodeExternals = require("webpack-node-externals");

const config = {
  // Informs webpack that we're building a bundle for nodeJS,
  // instead of browser
  target: "node",

  // Tell webpack the root file of our server application
  entry: "./src/index.js",

  // Tell the webpack where to put the output file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },

  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
