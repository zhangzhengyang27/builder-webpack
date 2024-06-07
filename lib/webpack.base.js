const path = require("path")
const autoprefixer = require("autoprefixer")

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const glob = require("glob")

const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")

const projectRoot = process.cwd()

// 动态的设置多页面入口和输出
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  // 获取所有的入口文件,entryFiles 就是文件目录地址数组
  const entryFiles = glob.sync(path.join(projectRoot, "./src/*/index.js"))

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index]
    console.log("index", index)
    console.log("entryFile", entryFile)

    const match = entryFile.match(/src\/(.*)\/index\.js/)
    // 获取页面名称 index 或者 search
    const pageName = match && match[1]

    entry[pageName] = entryFile
    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        inlineSource: ".css$",
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        // 指定生成的页面需要引入的 chunk,这里的 vendors 就是抽离出来的 react 和 react-dom
        chunks: ["vendors", "commons", pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "[name]_[chunkhash:8].js"
  },
  stats: "errors-only",
  module: {
    // 有些浏览器直接支持了es6，加入babel-loader 则会编译为通用的js版本
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader" // babel-loader 会使用.babelrc配置
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer()]
              }
            }
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75, // 一个 rem 就是 75 px,适用于 750 px 的设计稿
              remPrecision: 8 // px 转换成 rem 的精度
            }
          }
        ]
      },
      {
        test: /.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer()]
              }
            }
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75, // 一个 rem 就是 75 px,适用于 750 px 的设计稿
              remPrecision: 8 // px 转换成 rem 的精度
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240 // 小于10k文件用 md5
            }
          }
        ]
      }
    ],
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name][contenthash:8].css"
      }),
      new CleanWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      function errorPlugin() {
        this.hooks.done.tap("done", (stats) => {
          if (
            stats.compilation.errors &&
            stats.compilation.errors.length &&
            process.argv.indexOf("--watch") === -1
          ) {
            process.exit(1)
          }
        })
      }
    ].concat(htmlWebpackPlugins)
  }
}
