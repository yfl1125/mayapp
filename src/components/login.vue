<template>
  <div class="login">
    <div class="bn">
      <div class="top">头像</div>
      <div class="bottom">
        <el-form label="活动名称" ref="form" :model="login" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="login.username"></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="login.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginbtn">登录</el-button>
            <el-button>取消</el-button>
          </el-form-item></el-form
        >
      </div>
    </div>
  </div>
</template>

<script>
// import { loginpost } from "@/http/user";
export default {
  data() {
    return {
      login: {
        username: "admin",
        password: "123456",
      },
    };
  },
  methods: {
    loginbtn() {
      // 12312312
      this.$store.dispatch("denglu", this.login);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #00b1f1;
  //   width: 100vh;
  height: 100vh;
  display: flex;
  .bn {
    width: 400px;
    height: 304px;
    background-color: #fff;
    margin: auto;
    position: relative;
    .top {
      width: 90px;
      height: 90px;
      border: 1px solid #ccc;
      border-radius: 50%;
      position: absolute;
      top: -45px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      line-height: 90px;
    }
    .bottom {
      width: 100%;
      //   background-color: skyblue;
      margin-top: 70px;
      .el-form {
        width: 89%;
      }
    }
  }
}
</style>