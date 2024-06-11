const { merge } = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin")
const baseConfig = require("./webpack.base")

const prodConfig = {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name][contenthash:8].css"
    }),

    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry:
            "https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/react/18.2.0/umd/react.production.min.js",
          global: "React"
        },
        {
          module: "react-dom",
          entry:
            "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/react-dom/18.2.0/umd/react-dom.production.min.js",
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
          name: "vendors",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  }
}

module.exports = merge(baseConfig, prodConfig)
