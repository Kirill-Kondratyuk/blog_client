<template>
    <div id="app">
        <div id="main">
            <router-view :key="$route.path"></router-view>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app',
    }
</script>

<style>
    input {
        border-radius: 0;
    }
    #main {
        height: 100%;
    }

    #app {
        height: 100%;
    }

    html {
        height: 100%;
    }
</style>
