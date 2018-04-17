var webpack = require('webpack');

var path = require('path');

module.exports = {

    entry: "./index.js",
output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/assets/",
    filename: "bundle.js"
},


module :{
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }, {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
    },{
        test: /\.css$/,
        loader: 'style-loader!css-loader'
}

]
},

    devServer: {
        contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")],
        historyApiFallback: true,
        port: 9000
    }

}



