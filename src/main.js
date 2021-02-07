import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import axios from 'axios';
import vuetify from '@/plugins/vuetify';
import "@/VeeValidate.js";
import VueMoment from 'vue-moment';
import router from './router'

/* css는 아래 순서로 나타남 */
import "@/styles/basic.css";

Vue.use(VueMoment);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
