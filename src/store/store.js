import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authorized: false
    },
    mutations: {
        entree(state) {
            state.authorized = true
        },
        exit(state) {
            state.authorized = false
        }
    },
    actions: {}
})