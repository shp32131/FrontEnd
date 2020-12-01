<template>
  <div id="app">
    <router-link to="/login">go login</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
// import Login from "./components/login.vue";
export default {
  name: "App",
  // components: { Login },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
