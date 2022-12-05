

const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')


const getStyleLoaders = (pre) => {
  return [
    'vue-style-loader',
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

module.exports = {
  entry: './src/index.js',
  output: {
    path: undefined,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    assetModuleFilename: 'asset/[hash:4][ext][query]'
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
                maxSize: 1.24E4
              }
            }
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource'
          },
          {
            test: /\.(jsx?)$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              plugins: [
                // "@babel/plugin-transform-runtime" // presets中包含了
              ]
            }
          },
        ] // oneOf end 
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cacheDirectory: path.resolve(__dirname, 'node_module/.cache/vue-loader')
        }
      }
    ]
  }, // module end 
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_module',
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new VueLoaderPlugin()
  ], // plugins end
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
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


