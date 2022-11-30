
const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const getStyleLoaders = (pre) => {
  return [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugin: ['postcss-preset-env']
        }
      }
    },
    pre
  ].filter(Boolean)
}

console.log(24, process.env.NODE_ENV)

module.exports = {
  entry: './src/index.js',
  output: {
    path: undefined,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    assetModuleFilename: 'js/[hash:4][ext][query].js'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: getStyleLoaders()
          },
          {
            test: /\.less$/,
            use: getStyleLoaders('less-loader')
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders('sass-loader')
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders('stylus-loader')
          },
          {
            test: /\.(jpe?g|png|gif)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024
              }
            }
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource'
          },
          {
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              plugins: ['react-refresh/babel']
            }
          }
        ]
      }
    ]
  }, // module end 
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_module',
      // include: path.resolve(__dirname, '../src'),
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../assets'),
          to: path.resolve(__dirname, '../dist'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            ignore: []
          },
          info: {
            minimized: true
          }
        }
      ]
    })
  ], // plugins end 
  devServer: {
    open: false,
    host: 'localhost',
    port: '9999',
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  mode: 'development',
  devtool: 'cheap-module-source-map'
}









