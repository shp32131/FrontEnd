<template>
  <el-upload
    :http-request="uploadHandler" 
    :show-file-list="false"
    action=""
  >
    <el-button type="primary">上传</el-button>
  </el-upload>
  <el-progress percentage="percent" status="active"></el-progress>
</template>

<script>
export default {
  data() {
    return {
      percent: 0
    }
  },
  methods: {
    uploadHandler(params) {
      console.log('uploadHandler')
    }
  },
}
</script>

