//创建"外壳"组件App
//不是解构赋值,而是多种暴露的形式
import React, { Component } from "react"
import Hello from "./components/Hello"
import Welcome from "./components/Welcome"

//创建并暴露App组件
export default class App extends Component {
    render () {
        return (
            <div>
                <Hello />
                <Welcome />
            </div>
        )
    }
}
