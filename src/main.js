import Vue from 'vue';
import axios from 'axios';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App';
import router from './router';
import store from './store/store';

Vue.prototype.$axios = axios;
/* eslint-disable */
Vue.prototype.$axios.interceptors.request.use(
  config => {
    if (store.getters.isLoggedIn) config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    return config;
  }
);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueSweetalert2);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
