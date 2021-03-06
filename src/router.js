import Vue from 'vue';
import VueRouter from 'vue-router';

import store from "./store/store";
import Registration from "./components/Registration";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
    if(!store.state.authorized){
        next();
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
  if(!store.state.authorized){
      next('/');
  }
  else{
      next()
  }
};


let routers = [
    {path: '/', name: 'home', component: Home},
    {path: '/registration', name:'registration', component: Registration, beforeEnter: ifNotAuthenticated},
    {path: '/new_post', name:'new_post', component: NewPost, beforeEnter: ifAuthenticated},
    {path: '/post_page/:id', name:'post_page', component: PostPage},
];


export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routers
});