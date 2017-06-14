var webpack = require("webpack");
const dotenv = require("dotenv");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
dotenv.load();

var config = {
  entry: {
    video: __dirname + "/src/index.jsx",
    message: __dirname + "/src/index2.jsx",
    friend: __dirname + "/src/index3.jsx"
  },
  output: {
    path: __dirname + "/public/js/",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "babel-preset-stage-0"]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "css-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};

module.exports = config;
