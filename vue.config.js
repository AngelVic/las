const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://120.55.53.66:8978',
    // {
    //   '/api': {
    //     target: ,
    //     changeOrigin: true,
    //     ws: true,
    //     secure: false
    //   },
    // }
  }
})
