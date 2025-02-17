const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        //target: 'https://favoritesong.onrender.com', // Your backend URL
        target: process.env.VUE_APP_BACKEND_URL, // Your backend URL
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: true,
})