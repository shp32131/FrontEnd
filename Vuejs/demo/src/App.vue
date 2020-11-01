<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <el-button type="primary">element-ui 按钮</el-button>
    <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">2</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">3</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">4</div></el-col>
    </el-row>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
