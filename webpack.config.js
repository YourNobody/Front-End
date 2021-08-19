const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizePlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const IS_DEV_MODE = (process.env.NODE_ENV = 'development')
const MODE = process.env.NODE_ENV

function filename(ext) {
  if (IS_DEV_MODE) return `[name]${ext}`
  return `[name].[hash]${ext}`
}

const config = {
  mode: MODE,

  entry: ['@babel/polyfill', './src/index.tsx'],

  output: {
    filename: filename('.js'),
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.json', '.ts', '.jsx', '.tsx'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    hot: true,
    open: true,
    clientLogLevel: 'silent',
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/public/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { modules: true }},
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(png|jpg|svg|gif|jpeg)$/,
        use: ['file-loader'],
      },
    ],
  },
}

if (!IS_DEV_MODE) {
  config.optimization = {
    ...config.optimization,
    minimize: true,
    minimizer: [
      new CssMinimizePlugin(),
      new UglifyJsPlugin()
    ]
  }
}

module.exports = config
