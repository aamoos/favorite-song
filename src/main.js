import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"                 //tailwind css
import routers from './routers'      //router

const app = createApp(App)
app.use(routers)
app.mount('#app')
