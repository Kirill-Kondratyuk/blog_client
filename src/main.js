import Vue from 'vue';
import Vuelidate from "vuelidate/src";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import App from './App.vue'
import router from "./router";
import store from "./store/store";
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Vuelidate);

import {apiFactory} from "./apis/apiFactory";

const auth = apiFactory.get('auth');

const access_token = localStorage.getItem('access_token');

if(access_token !== "undefined" && access_token){
  // eslint-disable-next-line no-console
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  auth.getUserIdentity().then(res => {
    store.commit('ENTREE', res.data.username);
  }).catch(err => {
    // eslint-disable-next-line no-console
    console.log(err);
    store.commit('EXIT');
  })
} else{
  store.commit('EXIT');
}


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
