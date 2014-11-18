var extend = require('extend');
var webpack = require('webpack');
var host = process.env.USER_IP || 'localhost';
var port = process.env.PORT || 8090;

if (process.argv[2] === 'build') {
    process.env.NODE_ENV = process.env.NODE_ENV || 'production';
}
var webpackCfg = require('./webpack.config.js');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.initConfig({
        clean: {
            build: ['build']
        },
        bower: {
            install: {
                options: {
                    targetDir: './web_modules',
                    verbose: false,
                    layout: 'byComponent',
                    cleanTargetDir: false,
                    cleanBowerDir: true,
                    bowerOptions: {
                        production: false
                    }
                }
            }
        },
        webpack: {
            build: webpackCfg
        },
        'webpack-dev-server': {
            hmr: {
                host: host,
                port: port,
                hot: true,
                keepalive: true,
                contentBase: './app',       // root directory relative to cwd()
                publicPath: '/couch',       // the virtual directory in which to expose the bundles
                stats: {
                    colors: true,
                    hash: false,
                    timings: false,
                    assets: true,
                    chunks: true,
                    chunkModules: true,
                    modules: false,
                    children: true
                },
                webpack: webpackCfg
            }
        }
    });
    grunt.registerTask('install', ['bower:install']);
    grunt.registerTask('build', ['clean:build', 'webpack:build']);
    grunt.registerTask('start', ['webpack-dev-server:hmr']);
    grunt.registerTask('default', ['install']);
};
