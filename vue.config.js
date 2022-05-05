const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://120.55.53.66:8978',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        onProxyReq: function (proxyReq) {
          proxyReq.removeHeader('origin')
        }
      },
    },
  }
})
