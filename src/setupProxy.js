const proxy = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        proxy(
            '/zsj/api',
            {
                /* 
                    如果这里是/xiaobu/api
                    当你的axios请求路径是/xiaobu/api/goods/swiper
                    会自动转换成http://localhost:8888/xiaobu/api/goods/swiper
                    再把/xiaobu/api改成空
                    最后的结果就是http://localhost:8888/goods/swiper
                */ 
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/zsj/api': ''
                }
            }              
        )
    )
}