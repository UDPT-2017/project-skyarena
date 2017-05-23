var webpack = require("webpack");
const dotenv = require('dotenv');
dotenv.load();

var config = {
    entry: __dirname + "/src/index.jsx",
    output: {
        path: __dirname + "/public/js/",
        filename: "music.js",
        publicPath: "/public/"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015"]
                }
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.SPOTIFY_BASE_URL': JSON.stringify(process.env.SPOTIFY_BASE_URL)
        })
    ]
};

module.exports = config;