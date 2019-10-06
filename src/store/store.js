import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authorized: false,
        user: {
            username: null
        }
    },
    mutations: {
        ENTREE(state, username) {
            state.authorized = true;
            state.user.username = username;
        },
        EXIT(state) {
            state.authorized = false;
            state.user.username = null;
        }
    },
    getters: {
        USERNAME: state => {
            return state.user.username
        }
    },
    actions: {}
})