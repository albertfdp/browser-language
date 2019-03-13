const HtmlWebpackPlugin = require('html-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  entry: {
    app: ['./src/index.js']
  },

  output: {
    path: distDir,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [srcDir],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: [srcDir],
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[hash:base64:5]',
              modules: true,
              importLoaders: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },

  optimization: {
    runtimeChunk: true,

    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },

    minimizer: [
      // new TerserPlugin({
      //   cache: true,
      //   terserOptions: {
      //     compress: true
      //   },
      //   parallel: true,
      //   sourceMap: true
      // }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  stats: {
    assets: false,
    chunks: false
  },

  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].[chunkhash].css'
    }),

    new HtmlWebpackPlugin({
      title: 'Browser Language',
      template: './config/index.html'
    }),

    new CopyWebpackPlugin([{ from: './config/_redirects', to: './' }])
  ].filter(p => p)
};
