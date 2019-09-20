<template lang="pug">
    #Registration(class="bg-light")
        b-card(class="shadow-sm")
            h4(class="card-header") Registration
            b-form(@submit.stop.prevent)
                b-form-group(
                    label="Email"
                    label-for="email-input"
                    :valid-feedback="emailValidFeedback"
                    :invalid-feedback="emailInvalidFeedback"
                )
                    b-form-input(
                        type="email"
                        id="email-input"
                        v-model="form.email.value"
                        trim
                        @blur="checkEmailExistence"

                    )
                b-form-group(
                    label="Username"
                    label-for="username-input"
                    :valid-feedback="usernameValidFeedback"
                    :invalid-feedback="usernameInvalidFeedback"
                    :state="usernameState"
                )
                    b-form-input(
                        type="text"
                        id="username-input"
                        v-model="form.username"
                        trim
                        :state="usernameState"
                    )
                b-form-group(
                    label="Password"
                    label-for="password-input"
                )
                    b-form-input(
                        class=""
                        type="password"
                        id="password-input"
                        v-model="form.password"
                        trim
                    )
                b-form-group(
                    label="Repeat password"
                    label-for="repeat-password-input"
                )
                    b-form-input(
                        type="password"
                        id="repeat-password-input"
                        v-model="form.repeat_password"
                        trim
                    )

                div.text-xl-center
                    b-button(
                        type="submit"
                        variant="outline-dark"
                    ) Submit
                    b-button(
                        type="reset"
                        variant="outline-dark"
                    ) Reset



</template>


<script>
    import axios from 'axios'

    export default {
        data: function () {
            return {
                form: {
                  'email': {
                      value: '',
                      exists: 'unchecked'
                  },
                  'username': '',
                  'password': '',
                  'repeat_password': '',
                },
                message: '',
            }
        },
        computed: {
            usernameState: function(){
                if(this.form.username !== '' && this.form.username.length < 3){
                    return false;
                } else if (this.form.username.length > 2){
                    return true;
                } else {
                    return null
                }
            },
            usernameValidFeedback: function(){
                if(this.form.username.length === 0){
                    return '';
                } else {
                    return this.usernameInvalidFeedback;
                }
            },
            usernameInvalidFeedback: function(){
                if(this.form.username.length < 3){
                    return 'Your name must consist of 3 symbols at least'
                } else {
                    return '';
                }
            },
            emailInvalidFeedback: function() {
                if(this.form.email.exists === "false"){
                    return "This email doesn't exist. Please enter existing email";
                } else {
                    return '';
                }
            },
            emailValidFeedback: function () {
                if(this.form.email.exists === "true"){
                    return '';
                } else {
                    return this.emailInvalidFeedback;
                }
            },
        },
        methods: {
            checkEmailExistence: function () {
                if(this.form.email.value){
                    axios.post('http://127.0.0.1:5000/api/registration/email_existense', {
                        value: this.form.email.value
                    })
                        .then(response => this.form.email.exists = response.data.exists)
                        // eslint-disable-next-line no-console
                        .catch(error => console.log(error))
                }
            }
        },
    }

</script>



<style scoped lang="scss">
    @import '~bootstrap/scss/bootstrap.scss';
    @import '~bootstrap-vue/src/index.scss';

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