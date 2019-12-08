'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,
    devServer: {
        clientLogLevel: 'warning',
        // 404重定向
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, '../public/index.html') },
            ],
        },
        // 注意，必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR。
        // 如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加
        hot: true,
        // 指定服务器提供的静态内容
        contentBase: false,
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        // 是否自动打开浏览器
        open: config.dev.autoOpenBrowser,
        // 有错误是否浮窗展示
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        stats: 'errors-only',
        // 监听文件变化
        // watchOptions: {
        //     poll: config.dev.poll,
        // },
        disableHostCheck: true,
    },
    // optimization: {
    //     noEmitOnErrors: true,
    //     namedModules: true,
    // },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                VERSION: new Date().getTime()
            }
        }),
        // 热更新
        new webpack.HotModuleReplacementPlugin(), // HMR shows correct
        // copy custom static assets
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            inject: true
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
    ]
});


module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }))
            resolve(devWebpackConfig)
        }
    })

});
