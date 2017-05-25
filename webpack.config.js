var webpack = require("webpack");
const dotenv = require('dotenv');
dotenv.load();

var config = {
    entry: {
        music: __dirname +"/src/index.jsx",
        message: __dirname +"/src/index2.jsx"
    },
    output: {
        path: __dirname + "/public/js/",
        filename: "[name].js"
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
            'process.env.SPOTIFY_BASE_URL': JSON.stringify(process.env.SPOTIFY_BASE_URL),
            'process.env.URL': JSON.stringify(process.env.URL)
        })
    ]
};

module.exports = config;