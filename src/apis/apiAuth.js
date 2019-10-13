import {apiFactory} from "./apiFactory";

const auth = apiFactory.get("auth");

function userLogout() {
    auth.logoutAccess().then(() => {
        auth.logoutRefresh().then(() => {
            this.$store.commit("EXIT");
            this.email = "";
            this.password = "";
        })
    }).catch(() => {
        auth.refreshToken().then((res) => {
            localStorage.setItem("access_token", res.data.access_token);
            auth.logoutAccess().then(() => {
                auth.logoutRefresh().then(() => {
                    this.$store.commit("EXIT");
                    this.user.email = "";
                    this.user.password = "";
                })
            })
        })
    })
}


import store from "../store/store";

function setStoreState() {
    const access_token = localStorage.getItem('access_token');
    if (access_token !== "undefined" && access_token && !store.state.authorized) {
        auth.getUserIdentity().then(res => {
            store.commit('ENTREE', res.data.username);
        }).catch(err => {
            if (err.response.status === 401) {
                auth.refreshToken().then(res => {
                    localStorage.setItem('access_token', res.data.access_token);
                    auth.getUserIdentity().then(res => {
                        store.commit('ENTREE', res.data.username);
                    })
                }).catch(() => {
                    store.commit('EXIT');
                })
            }
        })
    }
}

export {userLogout, setStoreState};

