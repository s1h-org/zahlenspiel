const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    target: "node",
    entry: {
        app: ["./index.ts"]
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        path: path.resolve(__dirname, "./app"),
        filename: "index.js"
    },
    externals: [nodeExternals({
            whitelist: ['zahlenspiel-shared-entities']
        }
    )],
    node: {
        global: false,
        __filename: false,
        __dirname: false,
    }
};