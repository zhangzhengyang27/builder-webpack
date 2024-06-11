const path = require("path")
const { describe } = require("mocha")

// 改变当前工作目录到 smoke/template
process.chdir(path.join(__dirname, "smoke/template"))

describe("builder-webpack test case", () => {
  require("./unit/webpack-base-test")
})
