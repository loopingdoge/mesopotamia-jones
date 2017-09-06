const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const PUBLIC_PATH = 'https://loopingdoge.github.io/mesopotamia-jones/'

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
    entry: {
        main: './src/index.tsx',
        vendor: ['react', 'mobx', 'aphrodite']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Mesopotamia Jones',
            template: 'src/index.ejs',
            favicon: path.resolve('assets/images/favicon.png')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new SWPrecacheWebpackPlugin({
            cacheId: 'mesopotamia-jones',
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            minify: true,
            navigateFallback: PUBLIC_PATH,
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
        }),
        new WebpackPwaManifest({
            name: 'Mesopotamia Jones',
            short_name: 'MJ',
            description: 'Learn to code with games!',
            background_color: '#ffffff',
            orientation: 'landscape',
            display: 'standalone',
            icons: [
                {
                    src: path.resolve('assets/images/favicon.png'),
                    sizes: [96, 128, 192, 256, 384, 512]
                }
            ]
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'phaser-ce': phaser,
            pixi: pixi,
            p2: p2
        },
        extensions: ['.ts', '.tsx', '.js', 'png', 'json']
    },
    module: {
        rules: [
            {
                test: /pixi\.js/,
                use: ['expose-loader?PIXI']
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: /p2\.js/,
                use: ['expose-loader?p2']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: ['awesome-typescript-loader']
            }
        ]
    }
}
