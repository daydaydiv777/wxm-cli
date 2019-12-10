const path = require('path');
const webpack = require('webpack');
const config = require('./config');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        main: ['./src/main.js'],
        vendor: [
            'lodash'
        ]
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    module: {
        // rules: [
        //         //     {
        //         //         test: /\.js$/,
        //         //         exclude: /node_modules/,
        //         //         use: {
        //         //             // 开启缓存将转译结果缓存至文件系统
        //         //             loader: 'babel-loader?cacheDirectory=true',
        //         //             options: {
        //         //                 presets: ['@babel/preset-env']
        //         //             }
        //         //         }
        //         //     }
        //         // ]
    },
};
