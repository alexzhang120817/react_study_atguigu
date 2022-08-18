//引入React核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom/client'
//引入App组件
import App from "./App"

//渲染App到页面
// ReactDOM.render(<App/>, document.getElementById('root') )
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // 去掉严格模式，否则会渲染两次
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
)
