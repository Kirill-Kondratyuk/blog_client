<template>
    <div>
        <Navbar/>
        <div class="BlockPost">
            <b-card
                        :title="post.username"
                        tag="article"
                        style="width: 100%; margin-top: 10px"
                        class="mb-2"
                >
                    <b-card-text>
                        {{post.body}}
                    </b-card-text>
                </b-card>
        </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar";
    export default {
        components:{Navbar},
        data: function () {
            return {
                post: null
            }
        },
        mounted() {
            this.post = this.$route.query.post;
        }
    }
</script>


<style scoped>
    .BlockPost{
        width: 50%;
    }
</style>