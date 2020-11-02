const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const miniCssExtractPlugin = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
});

module.exports = function(env) {

    var mode = 'development';
    if (env) {
        if(env.NODE_ENV === 'prod') {
            mode = 'production';
        }
    }

    console.log('Webpack mode: ' + mode);

    return {
        entry: {
            main: './assets/react/index.tsx'
        },
        target: 'web',
        watch: true,
        devtool: 'source-map',
        mode: mode,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            transpileOnly:  true,
                        }
                    }],
                    exclude: /node_modules/
                },
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: true,
                                hmr: process.env.NODE_ENV === 'development'
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                url: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                },
            ],
        },
        watchOptions: {
            ignored: [/node_modules/],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'public/dist'),
        },
        plugins: [
            new webpack.ProgressPlugin(),
            miniCssExtractPlugin
        ]
    }
};