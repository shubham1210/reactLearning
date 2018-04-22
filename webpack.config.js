var webpack = require('webpack');

var path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {

    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/assets/",
        filename: "bundle.js"
    },


    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.less$/,
            loaders: ["style-loader", "css-loader", "less-loader"]
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },  {
            test: /\.(gif|png|jpe?g|svg)$/i,
            loaders: [
              'file-loader',
              {
                loader: 'image-webpack-loader',
                query: {
                    mozjpeg: {
                      progressive: true,
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    optipng: {
                      optimizationLevel: 4,
                    },
                    pngquant: {
                      quality: '75-90',
                      speed: 3,
                    },
                  }
              }
            ]
          },{
            test: /\.svg$/,
            loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
          }, {
            test: /\.woff$/,
            loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]'
          }, {
            test: /\.woff2$/,
            loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]'
          }, {
            test: /\.[ot]tf$/,
            loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
          }, {
            test: /\.eot$/,
            loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'
          }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'
          }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
          }

        ]
    }
    ,
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.Tether': 'tether',
        }),
        new CopyWebpackPlugin([{
         from: './containers/img/**/*',
         to: './'
        }])
    ],

    devServer: {
        contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")],
        historyApiFallback: true,
        port: 9000
    }

}



