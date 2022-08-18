//新版配置代码
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/dev', { //遇见/api1前缀的请求，就会触发改代理配置
            target: 'http://localhost:5000', //请求转发给谁
            changeOrigin: true, //控制服务器收到的请求头中Host字段的值
            pathRewrite: {'^/dev': ''}
        })
    )
}

