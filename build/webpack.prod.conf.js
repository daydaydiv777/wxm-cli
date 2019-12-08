const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.conf');
const config  = require('./config');
const utils = require('./utils')


const webpackConfig = merge(baseWebpackConfig, {
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'), // path.resolve(__dirname, 'js/[name].[chunkhash].js')
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },

    plugins: [
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
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://m.z-trip.cn`],
            },
            onErrors: utils.createNotifierCallback()
        })
    ]
});


module.exports = webpackConfig;
