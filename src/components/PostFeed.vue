<template lang="html">
    <div class="post-feed">
        <div v-if="posts">
            <div v-if="posts">
                <b-pagination
                        @click.native="getPage"
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        prev-text="Prev"
                        next-text="Next"
                        align="center"
                        style="margin-top: 15px"
                ></b-pagination>
            </div>
            <div class="block-post" v-for="post in posts">
                <b-card
                        :title="post.username"
                        tag="article"
                        style="width: 100%; margin-top: 10px"
                        class="mb-2"
                >
                    <b-card-text>
                        {{post.post_preview}}
                    </b-card-text>
                    <b-button href="#" variant="dark" @click="readPost(post)">Read</b-button>
                </b-card>
            </div>
            <div v-if="posts">
                <b-pagination
                        @click.native="getPage"
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        prev-text="Prev"
                        next-text="Next"
                        align="center"
                ></b-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {apiFactory} from "../apis/apiFactory";

    const postsApi = apiFactory.get('posts');

    export default {
        data: function () {
            return {
                currentPage: 1,
                perPage: 10,
                pages: 1,
                posts: [],
            }
        },
        methods: {
            readPost: function (post) {
                this.$router.push({name: 'post_page', query: {post: post}})
            },
            getPage: function () {
                postsApi.getPostsPage(10, this.currentPage).then(res => {
                    this.posts = res.data.posts;
                    this.pages = res.data.pages;
                })
            }
        },
        mounted() {
            postsApi.getPostsPage(10, this.currentPage).then(res => {
                this.posts = res.data.posts;
                this.pages = res.data.pages;
            })
        },
        computed: {
            rows: function () {
                return this.pages * this.perPage;
            }
        }
    }
</script>

<style scoped>
    .post-feed {
        margin: 0 auto;
        width: 50%;
    }

    .block-post {
        width: 100%;
        margin: 0 auto;
    }

    .card-body {
        width: 100%;
    }
</style>