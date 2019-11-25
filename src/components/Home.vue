<template lang="html">
    <div id="app">
        <Navbar/>
        <PostFeed/>
    </div>
</template>

<script>
    import Navbar from "./Navbar";
    import PostFeed from "./PostFeed";

    import {apiFactory} from "../apis/apiFactory";

    const postsApi = apiFactory.get('posts');

    export default {
        components: {PostFeed, Navbar},
        data: function () {
          return {
              posts: [],
              pages: 0,
          }
        },
        mounted() {
        //     postsApi.getPostsPage(10, 1).then(res => {
        //         this.posts = res.data.posts;
        //         this.pages = res.data.pages;
        //         console.log(res.data);
        //     })
        }
    }
</script>


<style>

</style>