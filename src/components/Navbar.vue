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
                            b-button(squared) Sign up
                    b-nav-item(v-if="!$store.state.authorized")
                        b-button(v-b-modal.login squared) Log in
                    b-nav-item-dropdown(right v-if="$store.state.authorized")
                        template(v-slot:button-content)
                            em  {{$store.getters.USERNAME}}
                        b-dropdown-item(@click="logout" href="#") Sign out


        b-modal(
            hide-footer
            id="login"
            title="Log in"
        )
            b-form(@submit.stop.prevent)
                b-form-group(
                    label="Email"
                    label-for="email-input"
                )
                    b-form-input(
                        type="email"
                        id="email-input"
                        v-model="user.email"
                        trim
                    )

                b-form-group(
                    label="Password"
                    label-for="password-input"
                )
                    b-form-input(
                        class=""
                        type="password"
                        id="password-input"
                        v-model="user.password"
                        trim
                    )

                div.text-xl-center
                    b-button(
                        squared
                        class="submit"
                        type="submit"
                        variant="outline-dark"
                        @click="login"
                    ) Submit
                    b-button(
                        squared
                        class="reset"
                        type="reset"
                        variant="outline-dark"
                        @click="resetForm"
                    ) Reset


</template>

<script>
    import {apiFactory} from "../apis/apiFactory";

    let auth = apiFactory.get('auth');

    export default {
        data: function () {
            return {
                user: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            logout: function () {
                auth.logoutAccess().then(() => {
                    localStorage.removeItem("access_token");
                    auth.logoutRefresh().then(() => {
                        localStorage.removeItem("refresh_token");
                        this.$store.commit("EXIT");
                    });
                    //TODO resolve dupicate-error
                })
            },
            resetForm: function () {
                this.user.email = "";
                this.user.password = "";
            },

            login: function () {
                auth.loginUser({
                    email: this.user.email,
                    password: this.user.password,
                })
                    .then(res => {
                        localStorage.setItem("access_token", res.data.access_token);
                        localStorage.setItem("refresh_token", res.data.refresh_token);
                        this.$store.commit("ENTREE", res.data.username);
                        this.$bvModal.hide("login");
                    })
                    .catch(err => {
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
    button.submit{
        margin-right: 1%;
    }

    button.reset {
        margin-left: 1%;
    }
    form{
        width: 80%;
        margin: 0 auto;
    }
</style>