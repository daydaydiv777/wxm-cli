const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const webpack = require('webpack');
const chalk = require('chalk')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const DashboardPlugin = require("webpack-dashboard/plugin");

const baseWebpackConfig = require('./webpack.base.conf');
const config  = require('./config');
const utils = require('./utils')

const env = require('./config').build.env

const webpackConfig = merge(baseWebpackConfig, {
    mode: env.NODE_ENV,
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        library: '[name]_[hash]',
        filename: utils.assetsPath('js/[name].[hash].js'), // path.resolve(__dirname, 'js/[name].[chunkhash].js')
        chunkFilename: utils.assetsPath('js/[name].[hash].js')
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'public/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
    ]
});

// 公共类库优化，打包到指定的文件夹。避免重复打包
// 判断是公共类库文件是否存在，如果没有则生成一份
if (fs.existsSync(path.resolve(__dirname, '../dll/vendor-manifest.json'))) {
    webpackConfig.plugins.push(new webpack.DllReferencePlugin({
        context: __dirname,
        // manifest就是我们第一步中打包出来的json文件
        manifest: require('../dll/vendor-manifest.json'),
    }))
} else {
    webpackConfig.plugins.push(new webpack.DllPlugin({
        // DllPlugin的name属性需要和library保持一致
        name: '[name]_[hash]',
        path: path.join(__dirname, '../dll', '[name]-manifest.json'),
        // context需要和webpack.config.js保持一致
        context: __dirname,
    }))
}

module.exports = webpackConfig
