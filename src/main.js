import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"                 //tailwind css
import router from './routers'      //router
import store from './store/store' //store
import { instance } from './axios'
import jwtDecode from "vue-jwt-decode";

const app = createApp(App)
app.use(router)
app.use(store)
app.provide('$axios', instance);
app.provide('router', router);
app.provide('store', store);
app.provide('jwtDecode', jwtDecode);
app.mount('#app')
