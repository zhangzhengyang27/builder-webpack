const path = require("path")

const merge = require("webpack-merge")
const webpack = require("webpack")
const baseConfig = require("./webpack.base")

const devConfig = {
  mode: "production",
  plugins: [new webpack.HotModuleReplacementPlugin()],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    stats: "errors-only",
    hot: true
  },

  devtool: "cheap-source-map"
}

module.exports = merge(baseConfig, devConfig)
