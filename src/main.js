import Vue from 'vue';
import axios from 'axios';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

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

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
