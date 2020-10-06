const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const baseEnvPath = path.join(__dirname) + `/.env`;
    const testEnvPath = baseEnvPath + `.${env.ENVIRONMENT}`;
    const envPath = fs.existsSync(testEnvPath) ? testEnvPath : baseEnvPath;

    const envConfig = dotenv.config({ path: envPath }).parsed;
    
    const envKeys = Object.keys(envConfig).reduce((acc, next) => {
        acc[`process.env.${next}`] = JSON.stringify(envConfig[next]);
        return acc;
    }, {});

    return {
        mode: 'development',
        target: 'web',
        entry: {
            index: './src/index.js' ,
            app: './src/App.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        resolve: {
            alias: {
                app: path.resolve(__dirname, 'src/app'),
                features: path.resolve(__dirname, 'src/features'),
                assets: path.resolve(__dirname, 'src/assets'),
                pages: path.resolve(__dirname, 'src/pages'),
            }
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new MiniCssExtractPlugin({
                filename: 'css/style.css',
                chunkFilename: 'css.style.chunk.css'
            }),
        ],
        module: {
            rules: [
                //js
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                //scss|sass
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        },
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    includePaths: ['src/assets']
                                }
                            }
                        }
                    ]
                },
                //images
                {
                    test: /\.(jpg|png|svg)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: './images'
                    }
                },
                //fonts
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: './fonts'
                    } 
                }
            ]
        }
    }
};