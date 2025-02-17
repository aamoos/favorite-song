const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // No need for proxy or devServer in production (Vercel handles the routing)
})