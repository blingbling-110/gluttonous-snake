const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[contenthash:8].js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico"
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    },
                    "ts-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '*']
    },
    optimization: {
        minimizer: [
            // 对于webpack@5，可以使用`...`语法来扩展已有最小化插件(例如：`terser-webpack-plugin`)
            `...`,
            new CssMinimizerPlugin()
        ]
    }
}