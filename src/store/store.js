import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
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
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
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