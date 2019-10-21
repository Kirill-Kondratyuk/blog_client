<template lang="pug">
    #NewPost
        Navbar
        #redactor
            b-container(id="title")
                b-row
                    b-col(cols="1")
                        label(for="post-title-textarea") Title
                b-row
                    b-col
                        input(id="post-title-textarea" type="text" placeholder="Write your title here...")
            b-container(id="body")
                b-row
                    b-col(cols="1")
                        label(for="post-body-textarea") Body
                b-form-textarea(id="post-body-text-area" rows="8" placeholder="Write your post here...")
            b-container#tools
                b-row
                    b-col(cols="1")
                        font-awesome-icon(icon="bold" @click="bold")
                b-row
                    b-col(cols="1")
                        font-awesome-icon(icon="italic")
                b-row
                    b-col(cols="1")
                        font-awesome-icon(icon="cut")
                b-row
                    b-col(cols="1")
                        font-awesome-icon(icon="paste")
                b-row
                    b-col(cols="1")
                        font-awesome-icon(icon="arrow-left")
                b-row
                    b-col(cols="1")
                        font-awesome-icon(icon="arrow-right")
                b-row
                    b-col(cols="1")
                        font-awesome-icon(icon="code")
                b-row
                    b-col(cols="1")
                        font-awesome-icon(icon="link" @click="link")

</template>


<script>
    import Navbar from "./Navbar";
    export default {
        components: {Navbar},
        data: function () {
            return {

            }
        },
        methods: {
            bold: function (){
                document.execCommand("bold", false);
            },
            link: function () {
                let url = prompt("Enter the url");
                document.execCommand("createLink", false, url);
            }
        }
    }
</script>


<style scoped>
    #NewPost{
        color: #333333;
    }
    #redactor{
        margin-top: 20px;

    }
    #body{
        margin-top: 15px;
        width: 60%;
    }
    #body textarea{
        font-size: 20px;
    }
    #title{
        width: 60%;
        font-family: 'Merriweather',serif;
    }
    svg{
        margin-left: 10px;
        color: #444444;
    }
    svg:hover{
        cursor: pointer;
        color: black;
    }
    svg:nth-child(1){
        margin-left: 0;
    }
    #tools{
        position: fixed;
        top: 40%;
        width: 8%;
    }
    #post-title-textarea{
        width: 100%;
        border: none;
        border-bottom: 2px solid #333333;
        outline: none;
        padding: 0.375rem 0.75rem;
    }
    label{
        font-family: 'Merriweather', serif;
        font-size: 20px;
    }
</style>