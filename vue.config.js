const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'https://favoritesong.onrender.com', // Your backend URL
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: true,
})