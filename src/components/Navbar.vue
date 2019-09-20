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
                    b-nav-item
                        router-link(class="sign-up-link" to="/introvert/registration")
                            b-button Sign up
                    b-nav-item
                        b-button Log in




                    b-nav-item-dropdown(right v-if="user")
                        template(v-slot:button-content)
                            b-img(blank rounded="circle" width="48px" height="48px" blank-color="black")
                        b-dropdown-item Sign out

</template>

<script>
    export default {
        data: function () {
            return {
                user: null
            }
        }
    }
</script>


<style scoped>
    .sign-up-link{
        text-decoration: none;
        color: inherit;
    }
</style>