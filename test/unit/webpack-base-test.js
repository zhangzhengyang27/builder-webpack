const assert = require("assert")
const { it, describe } = require("mocha")

describe("webpack.base.js test case", () => {
  const baseConfig = require("../../lib/webpack.base.js")
  console.log(baseConfig)

  it("entry", () => {
    assert.equal(
      baseConfig.entry.index,
      "/Users/zhangzhengyang/Desktop/geektime-webpack-course-master/builder-webpack/test/smoke/template/src/index/index.js"
    )
    assert.equal(
      baseConfig.entry.search,
      "/Users/zhangzhengyang/Desktop/geektime-webpack-course-master/builder-webpack/test/smoke/template/src/search/index.js"
    )
  })
})
