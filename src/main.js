import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import router from './routers'
import store from './store/store'
import { instance } from './axios'
import jwtDecode from "vue-jwt-decode";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { showErrorAlert, showSuccessAlert, showInfoAlert } from './utils/swal';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueSweetalert2);

app.provide('$axios', instance);
app.provide('router', router);
app.provide('jwtDecode', jwtDecode);
app.provide('showErrorAlert', showErrorAlert);
app.provide('showSuccessAlert', showSuccessAlert);
app.provide('showInfoAlert', showInfoAlert);

app.mount('#app')
