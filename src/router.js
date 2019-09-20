import Vue from 'vue';
import VueRouter from 'vue-router';


import Registration from "./components/Registration";
import Home from "./components/Home";

Vue.use(VueRouter);

let routers = [
    {path: '/introvert', name: 'home', component: Home},
    {path: '/introvert/registration', name:'registration', component: Registration}
];


export default new VueRouter({
    mode: 'history',
    routes: routers
});