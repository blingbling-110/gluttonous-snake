const commonCfg = require('./webpack.common')
const {merge} = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(commonCfg, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env']
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
})