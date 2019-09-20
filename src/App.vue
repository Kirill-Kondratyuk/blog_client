<template>
  <div id="app">
    <div id="main">
      <router-view/>
    </div>
  </div>
</template>

<script>


export default {
  name: 'app',
}
</script>

<style>
  #main{
    height: 100%;
  }
  #app{
    height: 100%;
  }
  html{
    height: 100%;
  }
</style>
