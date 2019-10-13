<template lang="pug">
    #Registration(class="bg-light")
        b-card(class="shadow-sm")
            h4(class="card-header") Registration
            b-form(@submit.stop.prevent)
                b-form-group(
                    label="Email"
                    label-for="email-input"
                    :invalid-feedback="emailInvalidFeedback"
                    :state="emailState"
                )
                    b-form-input(
                        autocomplete="on"
                        type="email"
                        id="email-input"
                        v-model="form.email.value"
                        trim
                        :state="emailState"
                    )
                b-form-group(
                    label="Username"
                    label-for="username-input"
                    :invalid-feedback="usernameInvalidFeedback"
                    :state="usernameState"
                )
                    b-form-input(
                        type="text"
                        id="username-input"
                        v-model="form.username.value"
                        trim
                        :state="usernameState"
                        autocomplete="off"
                    )

                b-form-group(
                    label="Password"
                    label-for="password-input"
                    :invalid-feedback="passwordInvalidFeedback"
                    :state="passwordState"
                )
                    b-form-input(
                        class=""
                        type="password"
                        id="password-input"
                        v-model="form.password"
                        trim
                        :state="passwordState"
                    )
                b-form-group(
                    label="Repeat password"
                    label-for="repeat-password-input"
                    :invalid-feedback="repeatPasswordInvalidFeedback"
                    :state="repeatPasswordState"
                )
                    b-form-input(
                        type="password"
                        id="repeat-password-input"
                        v-model="form.repeat_password"
                        trim
                        :state="repeatPasswordState"
                    )

                div.text-xl-center
                    b-button(
                        squared
                        type="submit"
                        variant="outline-dark"
                        @click="submitRegistration"
                        :disabled="submitDisabled"
                    ) Submit
                    b-button(
                        squared
                        type="reset"
                        variant="outline-dark"
                    ) Reset
</template>


<script>
    import {apiFactory} from "../apis/apiFactory";
    import router from "../router";

    const auth = apiFactory.get('auth');

    let regular_username = /^[a-z]+\d*$/i;


    export default {
        data: function () {
            return {
                form: {
                    email: {
                        value: "",
                        exists: null,
                        unique: null,
                    },
                    username: {
                        value: "",
                        unique: null
                    },
                    password: "",
                    repeat_password: "",
                },
                message: "",
                registration_status: {
                    username: {
                        allowed: true
                    },
                    email: {
                        exists: true,
                        allowed: true,
                    }
                },
                submitDisabled: false
            }
        },
        computed: {
            emailState: function () {
                if(this.form.email.exists === false || this.form.email.unique === false){
                    return false
                }
                else {return null}
            },
            usernameState: function () {
                if (this.form.username.value.length === 0) {
                    return null
                } else if (this.form.username.unique === false) {
                    return false;
                } else {
                    return this.form.username.value.match(regular_username) && this.form.username.value.length > 2
                }
            },

            usernameInvalidFeedback: function () {
                let feedback = '';
                if (this.form.username.unique === false) {
                    feedback += "There is an existing user with such username.";
                }
                if (!this.form.username.value.match(regular_username) || this.form.username.value.length < 3) {
                    feedback += "The user name must begin with a Latin letter, " +
                    "do not contain Cyrillic letters, special characters, " +
                    "and its length must be no more than 30 characters.";
                }
                return feedback;
            },

            emailInvalidFeedback: function () {
                let feedback = "";
                if (this.form.email.exists === false) {
                    feedback += "This email doesn't exist. Please enter existing email";
                }
                if (this.form.email.unique === false) {
                    feedback += "User with such email already exists";
                }
                return feedback;
            },

            passwordState: function () {
                if (this.form.password.length === 0) {
                    return null
                } else {
                    return this.form.password.length > 7
                }
            },

            passwordInvalidFeedback: function () {
                return this.form.password.length > 7 ? "" : "Password must be 8 characters long."
            },

            repeatPasswordState: function () {
                if (this.form.repeat_password.length === 0) {
                    return null
                } else {
                    return this.form.repeat_password === this.form.password
                }
            },

            repeatPasswordInvalidFeedback: function () {
                return this.form.password === this.form.repeat_password ? "" : "Passwords don't match"
            },
        },
        methods: {
            /**
             *  @property res.data.access_token
             *  @property errors.UsernameExistsError
             *  @property errors.EmailDoesNotExistError
             *  @property errors.UserWithSuchEmailExists
             *  @property res.data.refresh_token
             */
            submitRegistration: function () {
                this.submitDisabled = true;
                auth.createUser({
                    email: this.form.email.value,
                    username: this.form.username.value,
                    password: this.form.password
                })
                    .then(() => {
                        auth.loginUser({
                            email: this.form.email.value,
                            password: this.form.password
                        }).then(res => {
                            localStorage.setItem('access_token', res.data.access_token);
                            localStorage.setItem('refresh_token', res.data.refresh_token);
                            this.$store.commit('ENTREE', this.form.username.value);
                        });
                        router.push({name: "home"});
                    }).catch(err => {
                        console.log(err.response.data);
                    let errors = err.response.data.errors;
                    if (errors.UsernameExistsError) {
                        this.form.username.unique = !errors.UsernameExistsError;
                    } else {
                        this.form.username.unique = true
                    }
                    if (errors.EmailDoesNotExistError) {
                        this.form.email.exists = !errors.EmailDoesNotExistError;
                        this.form.email.unique = true;
                    }
                    if (errors.UserWithSuchEmailExists) {
                        this.form.email.unique = !errors.UserWithSuchEmailExists;
                        this.form.email.exists = true;
                    }
                    this.submitDisabled = false;
                });
            }
        },
    }

</script>


<style scoped lang="scss">
    @import "~bootstrap/scss/bootstrap.scss";
    @import "~bootstrap-vue/src/index.scss";

    input {

    }

    .card-header {
        padding: 0.75rem 0;
        font-family: Arial, serif;
        background-color: white;
        border-bottom: none;
        border-radius: unset;
    }

    .bg-light {
        width: 100%;
        height: 100%;
    }

    .card {
        width: 30%;
        margin: 0 auto;
    }

    button {
        border-width: 2px;
        outline-color: black;
    }

    button:nth-child(1) {
        margin-right: 1%;
    }

    button:nth-child(2) {
        margin-left: 1%;
    }

    .bg-light {
        padding-top: 70px;
    }
</style>