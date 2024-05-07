const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production'; 

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
    entry: path.join(srcPath, 'index.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true),
              },
              {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles(),
              },
 	    {
                test: /\.[tj]sx?$/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        host: '127.0.0.1', // хост нашего сервера
        port: 9000, // порт, по которому к нему можно обращаться
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
           template: path.resolve(srcPath, 'index.html'), // путь до нашего шаблона
         }),
         isProd && new MiniCssExtractPlugin({
            // Для того чтобы файл со стилями не кэшировался в браузере добавим filename
            filename: '[name]-[hash].css',
          }),
         !isProd && new ReactRefreshWebpackPlugin(),
         new TsCheckerPlugin ()
    ],
    resolve: {
                extensions: ['.tsx', '.jsx', '.js', '.ts'],
                alias: {
                    components: path.join(srcPath, 'components'),
                    config: path.join(srcPath, 'config'),
                    styles: path.join(srcPath, 'styles'),
                    utils: path.join(srcPath, 'utils'),
                    models: path.join(srcPath, 'models'),
                }
            },
}