const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
   devServer: {
    port : process.env.VUE_APP_PORT,
    proxy : process.env.VUE_APP_BACKEND_URL,
    allowedHosts: "all"
  },
  transpileDependencies: true,
  outputDir: '/home/ubuntu/app/frontend'  // 빌드 결과물 저장 경로
})
