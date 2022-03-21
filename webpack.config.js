const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizePlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const IS_DEV_MODE = (process.env.NODE_ENV = 'development');
const IS_PROD = !IS_DEV_MODE;
const MODE = process.env.NODE_ENV;

function filename(ext) {
  if (IS_DEV_MODE) return `[name]${ext}`;
  return `[name].[hash]${ext}`;
}

function filenameCssModules() {
  if (IS_DEV_MODE) return '[name]_[local]_[hash:base64:5]';
  return '[name]_[hash:base64:5]';
}

function optimization() {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (IS_PROD) {
    config.minimizer = [
      new TerserWebpackPlugin()
    ];
  }

  return config;
}

function cssLoaders(extra, options) {
  const loaders = [
    MiniCssExtractPlugin.loader
  ];

  loaders.push({
    loader: 'css-loader',
    options: {
      ...options
    },
  });

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
}

const config = {
  mode: MODE,

  entry: ['@babel/polyfill', './src/index.tsx'],

  output: {
    filename: filename('.js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: './',
        configFile: './tsconfig.json',
        extensions: ['.js', '.ts', '.tsx'],
      }),
    ],
    alias: {
      'react-dom$': 'react-dom/profiling',
      'react-dom/server': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
    extensions: ['.js', '.json', '.ts', '.jsx', '.tsx']
  },

  devtool: 'inline-source-map',

  target: IS_DEV_MODE ? 'web' : 'browserslist',

  optimization: optimization(),

  devServer: {
    port: 3000,
    historyApiFallback: true,
    watchContentBase: true,
    hot: true,
    open: true,
    clientLogLevel: 'silent',
    proxy: {
      context: ['/'],
      '/': {
        target: 'http://localhost:7000',
        bypass: function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf('text/html') !== -1) {
            console.log('Skipping proxy for browser request');
            return '/index.html';
          }
        },
      },
      logLevel: 'debug'
    }
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/public/index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {from: path.resolve(__dirname, 'src/assets'), to: 'assets'},
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('.css'),
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(null, {
          importLoaders: 1,
          modules: {
            localIdentName: filenameCssModules(),
          }
        }),
        include: /\.module\.css$/
      },
      {
        test: /\.s(c|a)ss$/,
        use: cssLoaders('sass-loader', {
          modules: {
            localIdentName: filenameCssModules(),
          },
          sourceMap: IS_DEV_MODE ? true : false,
          importLoaders: 1,
        }),
        include: /\.module\.s(a|c)ss$/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        exclude: /\.module\.(css|s(a|c)ss)$/
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
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    ],
  },
};

if (!IS_DEV_MODE) {
  config.optimization = {
    ...config.optimization,
    minimize: true,
    minimizer: [
      new CssMinimizePlugin(),
      new UglifyJsPlugin()
    ]
  };
}

module.exports = config;
