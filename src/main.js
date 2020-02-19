import Vue from 'vue';
import axios from 'axios';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App';
import router from './router';
import store from './store/store';

Vue.prototype.$axios = axios;
const token = localStorage.getItem('token');
if (token) {
  // eslint-disable-next-line
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer ' . token;
}

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
