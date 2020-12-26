const HtmlWebpackPlugin = require("html-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const path = require("path");

const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  mode: "development",

  devtool: "cheap-eval-source-map",

  entry: {
    app: ["./src/index.js"],
  },

  output: {
    filename: "[name].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [srcDir],
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        include: [srcDir],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              localIdentName: "[path][name]--[local]--[hash:base64:5]",
              modules: true,
              importLoaders: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Browser language",
      template: "./config/index.html",
    }),

    new HotModuleReplacementPlugin(),
  ],
};
