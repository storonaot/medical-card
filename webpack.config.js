const webpack = require('webpack')
const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  context: path.join(__dirname, 'frontend'),
  entry: {
    modules: './javascripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, './public/bundles/'),
    publicPath: '/',
    filename: '[name].bundle.js'
    // chunkFilename: '[id].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        exclude: [
          path.resolve(__dirname, 'public'),
          path.resolve(__dirname, 'node_modules')
        ],
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'node_modules/css-wipe'),
        ],
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // {
      //   test: /\.css$/,
      //   exclude: [
      //     path.resolve(__dirname, 'node_modules/css-wipe'),
      //   ],
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //         modules: true,
      //         localIdentName: '[name]__[local]___[hash:base64:5]'
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.sss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              name: '[path][name].[ext]?[hash:base64]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './frontend/components')
    ],
    extensions: ['.js', '.css', '.jsx', '.sss']
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      _: 'lodash',
      PropTypes: 'prop-types'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new StyleLintPlugin({
      configFile: './.stylelintrc',
      syntax: 'sugarss'
    })
  ],
  devServer: {
    host: 'localhost',
    proxy: {
      '*': 'http://127.0.0.1:3000'
    },
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    hot: true
  }
}


// const webpack = require('webpack')
// const path = require('path')
// const StyleLintPlugin = require('stylelint-webpack-plugin')
//
// module.exports = {
//   context: path.join(__dirname, 'frontend'),
//   entry: { modules: './javascripts/index.js' },
//   output: {
//     path: path.resolve(__dirname, 'public/bundles/'),
//     publicPath: '/',
//     filename: '[name].bundle.js',
//     chunkFilename: '[id].bundle.js'
//   },
//   watch: true,
//   module: {
//     rules: [
//       {
//         test: /\.jsx$|\.js$/,
//         exclude: [
//           path.resolve(__dirname, 'public'),
//           path.resolve(__dirname, 'node_modules')
//         ],
//         use: ['babel-loader', 'eslint-loader']
//       },
//       {
//         test: /\.css$/,
//         include: [path.resolve(__dirname, 'node_modules/css-wipe')],
//         use: ['style-loader', 'css-loader']
//       },
//       {
//         test: /\.sss/,
//         use: [
//           'style-loader',
//           {
//             loader: 'css-loader',
//             options: {
//               importLoaders: 1,
//               modules: true,
//               localIdentName: '[name]__[local]___[hash:base64:5]'
//             }
//           },
//           {
//             loader: 'postcss-loader',
//             options: {
//               config: {
//                 path: './postcss.config.js'
//               }
//             }
//           }
//         ]
//       },
//       {
//         test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 102400,
//               name: '[path][name].[ext]?[hash:base64]'
//             }
//           }
//         ]
//       }
//     ]
//   },
//   resolve: {
//     modules: [
//       path.resolve(__dirname, 'node_modules'),
//       path.resolve(__dirname, './frontend/components')
//     ],
//     extensions: ['.js', '.css', '.jsx', '.sss']
//   },
//   plugins: [
//     // new webpack.HotModuleReplacementPlugin(),
//     new webpack.ProvidePlugin({
//       React: 'react',
//       _: 'lodash',
//       PropTypes: 'prop-types'
//     }),
//     new webpack.NoEmitOnErrorsPlugin(),
//     new StyleLintPlugin({
//       configFile: './.stylelintrc',
//       syntax: 'sugarss'
//     })
//   ]
//   // devServer: {
//   //   host: 'localhost',
//   //   proxy: {
//   //     '*': 'http://127.0.0.1:3000'
//   //   },
//   //   port: 8080,
//   //   contentBase: path.join(__dirname, 'public'),
//   //   historyApiFallback: true,
//   //   hot: true
//   // }
// }
