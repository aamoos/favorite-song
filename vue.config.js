const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
   devServer: {
    port : 3000,
    proxy : process.env.VUE_APP_BACKEND_URL
  },
  transpileDependencies: true
})
