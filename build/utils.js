'use strict'
const path = require('path')
const fs = require('fs');
const config = require('./config')
const packageConfig = require('../package.json')

/**
 * 返回绝对路径
 * @param _path
 * @return {string}
 */
exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
};

/**
 * 出现异常时，会在界面右上角以公告的方式提示
 * @return {Function}
 */
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
};

/**
 * 返回指定目录下的所有文件路径，包括子文件
 * @param params
 */
exports.displayFile = (params) => {
    //转换为绝对路径
    let param = path.resolve(params);
    fs.stat(param, function (err, stats) {
        //如果是目录的话，遍历目录下的文件信息
        if (stats.isDirectory()) {
            fs.readdir(param, function (err, file) {
                file.forEach((e) => {
                    //遍历之后递归调用查看文件函数
                    //遍历目录得到的文件名称是不含路径的，需要将前面的绝对路径拼接
                    let absolutePath = path.resolve(path.join(param, e));
                    exports.displayFile(absolutePath)
                })
            })
        } else {
            //如果不是目录，打印文件信息
            console.log(param)
        }
    })
}

