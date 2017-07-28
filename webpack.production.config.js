var path = require('path')
var webpack = require('webpack')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

var assetsPath = path.join(__dirname, '/assets')

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(
                JSON.parse(process.env.BUILD_DEV || 'false')
            ),
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.UglifyJsPlugin({
            drop_console: true,
            minimize: true,
            output: {
                comments: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' /* chunkName= */,
            filename: 'vendor.bundle.js' /* filename= */
        })
    ],
    module: {
        rules: [
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [{ loader: 'awesome-typescript-loader' }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }]
            }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            'phaser-ce': phaser,
            pixi: pixi,
            p2: p2,
            assets: assetsPath
        },
        extensions: ['.ts', '.tsx', '.js']
    }
}
