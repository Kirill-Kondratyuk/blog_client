import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


import App from './App.vue'
import router from "./router";
import store from "./store/store";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

import {setStoreState} from "./apis/apiAuth";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBold, faItalic, faCut, faArrowLeft, faArrowRight, faPaste, faCode, faLink} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBold, faItalic, faCut, faArrowLeft, faArrowRight, faPaste, faCode, faLink);

Vue.component('font-awesome-icon', FontAwesomeIcon);

setStoreState();

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
