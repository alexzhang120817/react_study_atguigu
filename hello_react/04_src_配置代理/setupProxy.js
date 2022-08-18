// //低版本配置代码
// const proxy = require('http-proxy-middleware')
// module.exports = function (app) {
//     app.use(
//         proxy('/api1', {
//             target: 'http://localhost:5000',
//             changeOrigin: true,
//             pathRewrite: {'^/api': ''}
//         })
//     )
// }

//新版配置代码
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api1', { //遇见/api1前缀的请求，就会触发改代理配置
            target: 'http://localhost:5000', //请求转发给谁
            changeOrigin: true, //控制服务器收到的请求头中Host字段的值
            pathRewrite: {'^/api1': ''}
        })
    )
    app.use(
        createProxyMiddleware('/api2', {
            target: 'http://localhost:5001',
            changeOrigin: false,
            pathRewrite: {'^/api2': ''}
        })
    )
}

