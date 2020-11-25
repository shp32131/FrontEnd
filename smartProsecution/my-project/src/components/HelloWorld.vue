<template>
  <div class="page">
    <el-button type="primary" size="small" @click="login">登录</el-button>
    <div class="part-login" :style="dialogPosition" v-show="dialogVisible">
      <div class="dialog">
        <div class="header">
          <div class="public left" style="border-right: 1px solid #d9d9d9">
            <div class="text" :style="leftStyle" @click="selectLeft">
              账户密码登录
              <div class="flag-border" v-show="leftLogin"></div>
            </div>
          </div>
          <div class="public right">
            <div class="text" :style="rightStyle" @click="selectRight">
              手机快捷登录
              <div class="flag-border" v-show="rightLogin"></div>
            </div>
          </div>
        </div>
        <div class="item" v-if="accountLogin">
          <div class="value">
            <div class="label">用户名</div>
            <el-input v-model="name" prefix-icon="el-icon-user" placeholder="用户名为您的真实姓名"></el-input>
          </div>
        </div>
        <div class="item" v-if="phoneLogin">
          <div class="value">
            <div class="label">手机号</div>
            <el-input v-model="phoneNumber" prefix-icon="el-icon-mobile-phone" placeholder="请输入手机号码"></el-input>
          </div>
        </div>
        <div class="item" style="margin-bottom: 32px" v-if="accountLogin">
          <div class="value">
            <div class="label">密码</div>
            <el-input v-model="name" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
          </div>
        </div>
        <div class="item" style="margin-bottom: 32px" v-if="phoneLogin">
          <div class="value" style="width: 220px">
            <div class="label">验证码</div>
            <el-input v-model="name" prefix-icon="el-icon-lock" placeholder="请输入验证码"></el-input>
            <div class="verify-code" :style="countStyle" @click="getVerificationCode">{{ codeText }}</div>
          </div>
        </div>
        <div class="item" style="margin-bottom: 16px">
          <div class="value">
            <el-button type="primary">登录</el-button>
          </div>
        </div>
        <div class="item">
          <div class="value">
            <el-button plain>注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      dialogPosition: {},
      dialogVisible: false,
      leftLogin: true,
      rightLogin: false,
      leftStyle: { color: "#4b8ffa", "font-weight": "600" },
      rightStyle: null,
      accountLogin: true,
      phoneLogin: false,
      codeText: "获取验证码",
      countDown: 60,
      countStyle: null,

      name: "",
    };
  },
  watch: {
    countDown(val) {
      if ("获取验证码" == val) {
        this.codeText = val;
      } else {
        this.codeText = val + "s";
      }
    },
  },
  created() {
    let left = window.innerWidth / 2 - 305;
    let top = window.innerHeight / 2 - 212;
    this.dialogPosition = { position: "absolute", left: left + "px", top: top + "px" };
  },
  methods: {
    login() {
      this.dialogVisible = !this.dialogVisible;
    },
    selectLeft() {
      this.accountLogin = true;
      this.phoneLogin = false;
      this.leftLogin = true;
      this.rightLogin = false;
      this.leftStyle = { color: "#4b8ffa", "font-weight": "600" };
      this.rightStyle = { color: "#666", "font-weight": "normal" };
    },
    selectRight() {
      this.accountLogin = false;
      this.phoneLogin = true;
      this.rightLogin = true;
      this.leftLogin = false;
      this.rightStyle = { color: "#4b8ffa", "font-weight": "600" };
      this.leftStyle = { color: "#666", "font-weight": "normal" };
    },
    getVerificationCode() {
      let that = this;
      this.countDown = 60;
      // let oldTime = new Date().valueOf()
      this.countStyle = { color: "#4b8ffa", border: "1px solid #4b8ffa", cursor: "none" };
      let timer = setInterval(() => {
        if (that.countDown > 0) {
          that.countDown = that.countDown - 1;
        } else {
          clearInterval(timer);
          that.countStyle = null;
          // that.codeText = "获取验证码"
          that.countDown = "获取验证码";
          return;
        }
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  background-color: #fff;
  .part-login {
    width: 610px;
    height: 424px;
    border: 1px solid #d9d9d9;
    .dialog {
      .header {
        width: 382px;
        height: 22px;
        margin: 48px auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .public {
          width: 50%;
          .text {
            width: 100px;
            font-size: 16px;
            line-height: 22px;
            color: #666;
            letter-spacing: 1px;
            white-space: nowrap;
            cursor: pointer;
            position: relative;
          }
          .flag-border {
            width: 32px;
            height: 2px;
            position: absolute;
            top: 30px;
            left: 33px;
            background-color: #4b8ffa;
          }
        }
        .left {
          text-align: left;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .right {
          text-align: right;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
      .item {
        height: 44px;
        margin-bottom: 24px;
        padding-left: 166px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .value {
          width: 340px;
          height: 44px;
          display: flex;
          align-items: center;
          position: relative;
          .label {
            width: 42px;
            font-size: 14px;
            text-align: right;
            color: #666;
            height: 44px;
            line-height: 44px;
            position: absolute;
            left: -62px;
            top: 0;
          }
          .verify-code {
            width: 112px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            text-align: center;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            cursor: pointer;
            position: absolute;
            top: 0;
            right: -120px;
          }
          .verify-code:hover {
            color: #4b8ffa;
            border: 1px solid #4b8ffa;
          }
        }
      }
    }
  }
}
/deep/.el-button {
  width: 100%;
  font-size: 16px;
  color: #666;
}
/deep/.el-button--primary {
  color: #fff;
}
</style>
