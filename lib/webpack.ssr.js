const cssnano = require("cssnano")
const merge = require("webpack-merge")
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const baseConfig = require("./webpack.base")

const prodConfig = {
  mode: "production",
  output: {
    globalObject: "this",
    publicPath: "/" // 手动设置 publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: "ignore-loader"
      },
      {
        test: /\.less$/,
        use: "ignore-loader"
      }
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry: "https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/react/18.2.0/umd/react.production.min.js",
          global: "React"
        },
        {
          module: "react-dom",
          entry: "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/react-dom/18.2.0/umd/react-dom.production.min.js",
          global: "ReactDOM"
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  }
}

module.exports = merge(baseConfig, prodConfig)
