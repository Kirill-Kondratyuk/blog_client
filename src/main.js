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


const access_token = localStorage.getItem('access_token');

if(access_token){
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  store.commit('entree');
}


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
