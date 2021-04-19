const path = require('path')

module.exports = {
    devServer: {
        // 静态资源文件夹
        // assetsSubDirectory: 'static',
        // 发布路径
        // assetsPublicPath: '/',
        // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
        // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
        proxy: {
          '/api': { // 匹配所有以 '/api'开头的请求路径
            target: 'http://localhost:4000', // 代理目标的基础路径
            // secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true, // 支持跨域
            // '^/api': '/api'   // 这种接口配置出来     http://XX.XX.XX.XX:8083/api/login
            // '^/api': '/' 这种接口配置出来     http://XX.XX.XX.XX:8083/login
            pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
              '^/api': ''
            }
          }
        },
    },
}