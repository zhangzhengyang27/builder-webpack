import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import logo from "./images/logo.jpeg"
import "./search.less"

import "lib-flexible/flexible.js"

import common from "../../common/index.js"

console.log(common())

const Search = () => {
  const [Text, setText] = useState(null)

  // 动态引入
  const loadComponent = () => {
    import("./text.js").then((Text) => {
      console.log("动态引入")
      setText("动态引入")
    })
  }

  useEffect(() => {
    loadComponent()
  }, [])

  return (
    <div className="search-text">
      {Text ? "动态引入" : null}
      搜索文字的内容
      <img className="search-img" src={logo} onClick={loadComponent} />
    </div>
  )
}

ReactDOM.render(<Search />, document.getElementById("root"))
