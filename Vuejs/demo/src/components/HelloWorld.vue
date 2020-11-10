<template>
  <div class="page">
    <div class="report-info-wrapper">
      <div class="title">举报信息：<span :class="textColor">新线索</span></div>

      <div class="reporter">
        <div class="img">
          <img src="" alt="头像">
          <!-- <el-avatar size="large" src=""></el-avatar> -->
        </div>
        <div class="user">
          <div>举报人:<span :userName="userName">张三(匿名)</span></div>
          <div>联系电话:<span >13088888888</span></div>
          <div>举报时间:<span>2019-11-09 16:12:23</span></div>
        </div>
      </div>

      <div class="report-content">
        <div class="report-content-item">线索类型：<span>{{"clueType"}}</span></div>
        <div class="report-content-item">线索地点：<span>{{"clue addr"}}</span></div>
        <div class="report-content-item" style="display:flex">
          <div>线索详情：</div>
          <div style="display:flex">
            <p>{{clueDetail}}</p>
          </div>
        </div>
        <div class="clue-img" style="display:flex">
          <div>线索图片</div>
          <div style="display: flex">
          <img src="" alt="">
          <img src="" alt="">
          <img src="" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="check-info">
      <div>码表</div>
      <div class="btns">
        <el-button type="text">返回</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      textColor: "blue-font",
      clueDetail: `线索详情线索详情线索详情线索详情线线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情线索详情索详情`
    }
  },
  computed: {

  },
  created() {

  },
  methods: {

  }
}
</script>
<style>
.page {
  background: #FFF;
  display: flex;
  flex-flow: column nowrap;
}

.report-info-wrapper {
  height: 500px;
  padding: 24px;
  border: 1px solid red;
}
.blue-font { color: blue; }
.red-font { color: red; }

.reporter {
  margin-top: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid red;
}
img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.user {
  margin-left: 24px;
}

.report-content {
  padding-left: 104px;
}



/* check-info */
.check-info {
  width: 100%;
  height: 300px;
  border: 1px solid black;
}
</style>