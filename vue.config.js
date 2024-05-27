const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BACKEND_URL,
        changeOrigin: true,
        secure: false // Disable certificate verification for self-signed certificates
      }
    }
  },
  transpileDependencies: true
});
