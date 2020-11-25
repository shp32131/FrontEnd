<template>
  <div class="page">
    <el-button type="primary" size="small" @click="login">登录</el-button>
    <div class="part-login">
     <el-dialog
      
     ></el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      loginDialogVisible: false,
    }
  },
  mothods: {
    login() {
      this.loginDialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  background-color: #FFF;
}
</style>