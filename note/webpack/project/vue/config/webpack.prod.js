

const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')


const getStyleLoaders = (pre) => {
  return [
    MiniCssExtractPlugin.loader,
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
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:6].js',
    chunkFilename: 'js/[name].[contenthash:6].chunk.js',
    assetModuleFilename: 'asset/[hash:4][ext][query]',
    clean: true
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
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
      chunkFilename: 'css/[name].[contenthash:6].chunk.css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          toType: 'dir',
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/index.html']
          },
          info: {
            minimized: true
          }
        }
      ]
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ], // plugins end
  optimization: {
    // minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ]
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vue: {
          name: 'vue',
          priority: 1,
          test: /[\\/]node_modules[\\/]vue/,
          minSize: 10,
          minChunks: 1,
          reuseExistingChunk: true
        },
        // router: {
        //   name: 'router',
        //   priority: 1,
        //   test: /[\\/]node_modules[\\/]vue-router/,
        //   minSize: 10,
        //   minChunks: 1,
        //   reuseExistingChunk: true
        // },
        common: {
          name: 'common',
          priority: 0,
          minSize: 10,
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: entry => `runtime~${entry.name}`
    },
  },

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
  mode: 'production',
  devtool: 'source-map'
}


