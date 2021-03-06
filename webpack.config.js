const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { env } = require("process");

module.exports = {
    mode: 'development', //production
    devtool: 'cheap-module-source-map',
    entry: {
        app: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: "index.html"
        }),
    ],
    devServer: {
        contentBase: 'public',
        hot: true,
        // port: 80,
        disableHostCheck: true,
        // host:'0.0.0.0'
        proxy: {
            '/3DTiles': {
                target: 'http://localhost:6999',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/tile': '/'
                // }
            },
            '/geoserver':{
                target:'http://localhost:8080',
                changeOrigin:true
            }
        }
    },
    //代码分割
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
}