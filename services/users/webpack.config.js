const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');



const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    target: "node",
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        alias: {
            "@config": path.join(__dirname,"src/config"),
            "@database/*": path.join(__dirname,"src/database"),
            "@domain/*": path.join(__dirname,"src/domain"),
            "@logs/*": path.join(__dirname,"src/logs")
        }
    },
    externals: [ 'pg', 'sqlite3', 'tedious', 'pg-hstore'],
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new Dotenv(),
    ],
    devServer: {
        contentBase: './dist'
    },
    optimization: {

    },
    stats: {
        warnings: false
    }
}

module.exports = config;