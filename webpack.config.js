var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var host = process.env.USER_IP || 'localhost';
var port = process.env.PORT || 8090;
var envProduction = process.env.NODE_ENV === 'production';
var webpackCfg = {
    context: path.join(__dirname, 'app'),
    entry: { index: './index.js' },
    output: {
        publicPath: '/couch/',                  // where bundles are served (not path, just prefix for request)
        path: path.join(__dirname, 'build'),    // output directory for production build (absolute)
        filename: '[name].js',
        chunkFilename: envProduction ?
            '[name].[chunkhash].js' :
            '[name].js',
        namedChunkFilename: envProduction ?
            '[name].[chunkhash].js' :
            '[name].js'
    },
    resolve: { modulesDirectories: ['web_modules', 'node_modules'] },
    resolveLoader: { modulesDirectories: ['node_modules'] },
    module: {
        loaders: [
            { test: /\.(less|css)$/,
                loader: envProduction ?
                    'style!css?minimize!autoprefixer!less' :
                    'style!css!autoprefixer!less'
                //loader: ExtractTextPlugin.extract('style', 'css?minimize!autoprefixer!less') },
            },
            { test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]' },
            { test: /\.png$/, loader: 'url?name=assets/img/[name].[ext]&mimetype=image/png' },
            { test: /\.gif$/, loader: 'url?name=assets/img/[name].[ext]&mimetype=image/gif' },
            { test: /\.(jpg|jpeg)$/, loader: 'url?name=assets/img/[name].[ext]&mimetype=image/jpeg' },
            { test: /\.(eot|woff|ttf|svg)/, loader: 'file?name=assets/fonts/[name].[ext]' },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ DEBUG: !envProduction})
    ]
};

if (envProduction) {
    webpackCfg.plugins = [
        new ngAnnotatePlugin({add: true, single_quotes: true, stats: true}),
        new webpack.optimize.UglifyJsPlugin()
    ].concat(webpackCfg.plugins);
} else {
    webpackCfg.plugins = [
        new webpack.HotModuleReplacementPlugin()
    ].concat(webpackCfg.plugins);
    webpackCfg.entry.index = [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/dev-server'
    ].concat(webpackCfg.entry.index);
}

module.exports = webpackCfg;
