<template lang="pug">
    #Navbar
        b-navbar(
            toggleable="lg"
            type="light"
            variant="light"
            class="shadow"
        )
            b-navbar-brand(href="#") INTROVERT
            b-navbar-toggle(target="nav-collapse")
            b-collapse(id="nav-collapse" is-nav)
                b-navbar-nav(class="ml-auto")
                    b-nav-item(v-if="!$store.state.authorized")
                        router-link(class="sign-up-link" to="/registration")
                            b-button Sign up
                    b-nav-item(v-if="!$store.state.authorized")
                        b-button Log in
                    b-nav-item-dropdown(right)
                        template(v-slot:button-content)
                            em  {{$store.getters.USERNAME}}
                        b-dropdown-item(@click="logout" href="#") Sign out


                    b-nav-item-dropdown(right v-if="user")
                        template(v-slot:button-content)
                            b-img(blank rounded="circle" width="48px" height="48px" blank-color="black")


</template>

<script>
    import {apiFactory} from "../apis/apiFactory";

    let auth = apiFactory.get('auth');

    export default {
        data: function () {
            return {
                user: null
            }
        },
        methods: {
            logout: function () {
                auth.logoutAccess().then(() => {
                    this.$store.commit('EXIT');
                    this.$router.push('/');
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err)
                })
            }
        }
    }
</script>


<style scoped>
    .sign-up-link {
        text-decoration: none;
        color: inherit;
    }
</style>