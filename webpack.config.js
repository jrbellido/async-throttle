const path = require('path');

const sharedConfig = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    plugins: []
}

const devConfig = {
    ...sharedConfig,
    mode: 'development',
    entry: './src/async-throttle.js',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'async-throttle.dev.js'
    }
    //…
};

const prodConfig = {
    ...sharedConfig,
    entry: './src/async-throttle.js',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'async-throttle.js'
    }
};

module.exports = [devConfig, prodConfig];
