import Vue from 'vue';
import VueRouter from 'vue-router';

import store from "./store/store";
import Registration from "./components/Registration";
import Home from "./components/Home";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
    if(!store.state.authorized){
        next();
        return
    }
    next('/')
};



let routers = [
    {path: '/', name: 'home', component: Home},
    {path: '/registration', name:'registration', component: Registration, beforeEnter: ifNotAuthenticated}
];


export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routers
});