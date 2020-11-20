const path = require('path');
module.exports = {
	entry: './src/app.ts',
	output: {
		filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    // typescript support with ts-loader
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js']
    }
};
