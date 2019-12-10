const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rm = require('rimraf')
const DashboardPlugin = require("webpack-dashboard/plugin");
const Dashboard = require('webpack-dashboard');
const dashboard = new Dashboard();

module.exports = {
    mode: 'production',
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    // devServer: {
    //     port: 6000,
    //     quiet: true,
    // },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
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
        new DashboardPlugin(dashboard.setData)
    ]
}
