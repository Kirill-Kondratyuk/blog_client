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
                        input(id="post-title-textarea"
                            type="text" v-model="title"
                            placeholder="Write your title here..."
                            autocomplete="off"
                        )
            b-container(id="body")
                b-row
                    b-col(cols="1")
                        label(for="post-body-textarea") Body
                b-form-textarea(id="post-body-text-area"
                    rows="8" placeholder="Write your post here..."
                    v-model="body")
            b-container#tools
                b-row
                    b-col(cols="1")
                b-row
                    font-awesome-icon(icon="bold")
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
                        font-awesome-icon(icon="link")
            b-button#save(variant="outline-secondary" @click="savePost") Save

</template>


<script>
    import Navbar from "./Navbar";
    import {apiFactory} from "../apis/apiFactory";

    const apiPosts = apiFactory.get('posts');
    const auth = apiFactory.get('auth');

    export default {
        components: {Navbar},
        data: function () {
            return {
                title: "",
                body: "",
                message: ""
            }
        },
        methods: {
            savePost: function () {
                apiPosts.createPost({
                    title: this.title,
                    body: this.body
                }).catch((err) => {
                    if(err.response.status === 401) {
                        auth.refreshToken().then(() => {
                            apiPosts.createPost({
                                title: this.title,
                                body: this.body
                            })
                        })
                    }
                })
            },
        }
    }
</script>


<style scoped>
    #NewPost {
        color: #333333;
    }

    #redactor {
        margin-top: 20px;

    }

    #body {
        margin-top: 15px;
        width: 60%;
    }

    #body textarea {
        font-size: 20px;
    }

    #title {
        width: 60%;
        font-family: 'Merriweather', serif;
    }

    svg {
        margin-left: 10px;
        color: #444444;
    }

    svg:hover {
        cursor: pointer;
        color: black;
    }

    svg:nth-child(1) {
        margin-left: 0;
    }

    #tools {
        position: fixed;
        top: 40%;
        width: 8%;
    }

    #post-title-textarea {
        width: 100%;
        border: none;
        border-bottom: 2px solid #333333;
        outline: none;
        padding: 0.375rem 0.75rem;
    }

    label {
        font-family: 'Merriweather', serif;
        font-size: 20px;
    }

    #save {
        position: fixed;
        top: 10%;
        left: 95%;
    }
</style>