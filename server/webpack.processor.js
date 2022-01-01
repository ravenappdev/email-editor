const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./main/requestProcessor.js",

  target: "node",

  externals: [nodeExternals()],

  output: {
    path: path.resolve("server-build"),
    filename: "processor.js",
    library: "processor",
    libraryTarget: "umd",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
};
