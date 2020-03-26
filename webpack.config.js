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
    entry: './src/async-throttle.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'async-throttle.dev.js'
    }
};

const prodConfig = {
    ...sharedConfig,
    mode: 'production',
    optimization: {
      minimize: true
    },
    entry: './src/async-throttle.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'async-throttle.js'
    }
};

module.exports = [devConfig, prodConfig];
