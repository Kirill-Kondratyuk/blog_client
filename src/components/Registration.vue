<template lang="pug">
    #Registration(class="bg-light")
        b-card(class="shadow-sm")
            h4(class="card-header") Registration
            b-form(@submit.stop.prevent)
                b-form-group(
                    label="Email"
                    label-for="email-input"
                    :invalid-feedback="emailInvalidFeedback"
                    :state="form.email.exists"
                )
                    b-form-input(
                        type="email"
                        id="email-input"
                        v-model="form.email.value"
                        trim
                        :state="form.email.exists"
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
                        type="submit"
                        variant="outline-dark"
                        @click="submitRegistration"
                    ) Submit
                    b-button(
                        type="reset"
                        variant="outline-dark"
                    ) Reset



</template>


<script>
    import axios from "axios"

    let regular_username = /^[a-z]+\d*$/i;


    export default {
        data: function () {
            return {
                form: {
                  email: {
                      value: "",
                      exists: null
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
                }
            }
        },
        computed: {


            usernameState: function(){
                if(this.form.username.value.length === 0){
                    return null
                } else if(!this.registration_status.username.allowed){
                    return false;
                }else{
                    return this.form.username.value.match(regular_username) && this.form.username.value.length > 2
                }
            },

            usernameInvalidFeedback: function(){
                let unique_feedback = "There is an existing user with such username.";
                let common_feedback = "The user name must begin with a Latin letter, " +
                    "do not contain Cyrillic letters, special characters, " +
                    "and its length must be no more than 30 characters.";
                let feedback = '';
                if(!this.registration_status.username.allowed){
                    feedback = unique_feedback;
                }
                if(!this.form.username.value.match(regular_username) || this.form.username.value.length < 3){
                    return feedback +'\n'+ common_feedback
                }else {
                    return feedback;
                }
            },

            emailInvalidFeedback: function() {
                if(this.form.email.exists === "false"){
                    return "This email doesn't exist. Please enter existing email";
                } else {
                    return "";
                }
            },

            passwordState: function(){
                if(this.form.password.length === 0){
                    return null
                } else {
                    return this.form.password.length > 7
                }
            },

            passwordInvalidFeedback: function(){
                return this.form.password.length > 7 ? "" : "Password must be 8 characters long."
            },

            repeatPasswordState: function () {
                if(this.form.repeat_password.length === 0){
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
            submitRegistration: function () {
                axios.post("http://127.0.0.1:5000/api/registration/account", {
                    username: this.form.username.value,
                    email: this.form.email.value,
                    password: this.form.password
                })
                    .then(response => {this.registration_status = response.data})
                    .then()
                    // eslint-disable-next-line no-console
                    .catch(error => console.log(error))
            }
        },
    }

</script>



<style scoped lang="scss">
    @import "~bootstrap/scss/bootstrap.scss";
    @import "~bootstrap-vue/src/index.scss";

    input{

    }
    .card-header{
        padding: 0.75rem 0;
        font-family: Arial,serif;
        background-color: white;
        border-bottom: none;
        border-radius: unset;
    }
    .bg-light{
        width: 100%;
        height: 100%;
    }
    .card{
        width: 30%;
        margin: 0 auto;
    }
    button{
        border-width: 2px;
        outline-color: black;
    }
    button:nth-child(1){
        margin-right: 1%;
    }
    button:nth-child(2){
        margin-left: 1%;
    }
    .bg-light{
        padding-top: 70px;
    }
</style>