const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
   devServer: {
    port : 8080,
    proxy : process.env.VUE_APP_BACKEND_URL
  },
  transpileDependencies: true
})
