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
                        b-form-textarea(id="post-title-textarea" size="sm" placeholder="Write post title...")
            b-container(id="body")
                b-row
                    b-col(cols="1")
                        label(for="post-body-textarea") Body
                b-form-textarea(id="post-body-text-area" rows="8" placeholder="Write your post here")
</template>


<script>
    import Navbar from "./Navbar";
    export default {
        components: {Navbar},
        data: function () {
            return {

            }
        }
    }
</script>


<style scoped>
    #redactor{
        margin-top: 20px;
    }
    #body{
        margin-top: 15px;
    }
</style>