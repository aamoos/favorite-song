const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
   devServer: {
    port : 8080,
    // proxy : process.env.VUE_APP_BACKEND_URL
    proxy: {
      '/api': { 
        target: process.env.VUE_APP_BACKEND_URL,
        changeOrigin: true,
      },
      '/auth': {
        target: process.env.VUE_APP_BACKEND_URL,
        changeOrigin: true,
      }
    }
  },
  transpileDependencies: true
})
