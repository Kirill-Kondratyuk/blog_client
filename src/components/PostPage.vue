<template>
    <div>
        <Navbar/>
        <div class="BlockPost" v-if="post">
            <b-card
                    :title="post.username"
                    tag="article"
                    style="width: 100%; margin-top: 10px"
                    class="mb-2"
            >
                <b-card-text>
                    {{post.timestamp}}
                </b-card-text>
                <b-card-text>
                    {{post.body}}
                </b-card-text>
            </b-card>
            <b-container v-if="$store.state.authorized">
                <b-row class="mt-2">
                    <b-col>
                        <label for="textarea-large">Write comment</label>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="12">
                        <b-form-textarea
                                id="textarea-large"
                                size="lg"
                                placeholder="type here..."
                                v-model="comment"
                        ></b-form-textarea>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button style="margin-top: 5px; float: right" variant="dark" @click="sendComment">Send</b-button>
                    </b-col>
                </b-row>

            </b-container>
            <b-card title="Comments" v-if="post.comments.length > 0" style="margin-top: 10px">
                <b-card v-for="comment in post.comments" :title="comment.author" style="margin-top: 10px">
                    <b-card-text>{{comment.body}}</b-card-text>
                </b-card>
            </b-card>
        </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar";
    import {apiFactory} from "../apis/apiFactory";

    const postsApi = apiFactory.get('posts');
    const authApi = apiFactory.get('auth');

    export default {
        components: {Navbar},
        data: function () {
            return {
                post: null,
                comment: '',
            }
        },
        mounted() {
            postsApi.getPost({id: this.$route.params.id}).then(res => {
                this.post = res.data;
            })
        },
        methods: {
            sendComment() {
                postsApi.createComment({
                    body: this.comment,
                    post_id: this.$route.params.id
                }).then(res => {
                    this.post.comments.unshift(res.data)
                }).catch((err) => {
                    if (err.response.status === 401) {
                        authApi.refreshToken().catch().then((res) => {
                            localStorage.setItem('access_token', res.data.access_token);
                            postsApi.createComment({
                                body: this.comment,
                                post_id: this.$route.params.id
                            }).then(res => {
                                this.post.comments.unshift(res.data)
                            })
                        })
                    }
                })
            },
            savePost: function () {
                apiPosts.createPost({
                    title: this.title,
                    body: this.body
                }).catch((err) => {
                    if (err.response.status === 401) {
                        auth.refreshToken().catch().then((res) => {
                            localStorage.setItem('access_token', res.data.access_token);
                            apiPosts.createPost({
                                title: this.title,
                                body: this.body
                            }).then(router.push({name: 'home'}))
                        })
                    }
                })
            },
        }
    }
</script>


<style scoped>
    .BlockPost {
        width: 50%;
        margin: 0 auto;
    }
</style>