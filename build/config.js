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
        notifyOnErrors: true
    },
    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
    }
};
