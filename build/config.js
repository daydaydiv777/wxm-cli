const path = require('path');

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},

        host: 'localhost',
        port: 9003,
        errorOverlay: false,
        autoOpenBrowser: false,
        poll: false,

        devtool: 'cheap-module-eval-source-map',
        notifyOnErrors: true,
        env: {
            NODE_ENV: 'development',
            VERSION: new Date().getTime()
        }
    },
    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        productionSourceMap: true,
        devtool: '#source-map',
        env: {
            NODE_ENV: 'production',
            VERSION: new Date().getTime()
        }
    }
};
