import Vue from 'vue'
import App from './App.vue'

import BoostrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(BoostrapVue);
Vue.use(VueAxios,axios);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
