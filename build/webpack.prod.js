const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')
const path = require('path')
const PATHS = {
    src: path.join(__dirname, '../src')
}

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: ['...', new CssMinimizerPlugin({
            parallel: 4
        })]
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, importLoaders: 2, modules: false },
                    },
                    {
                        loader: 'postcss-loader', options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env'
                                    ]
                                ]
                            }
                        }
                    },
                    { loader: 'less-loader', options: { sourceMap: true } },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash:8].css',
            chunkFilename: '[id].css',
        }),
        // new PurgeCSSPlugin({
        //     paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        // }),
    ]
})