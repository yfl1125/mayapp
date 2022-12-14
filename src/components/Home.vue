<template>
  <div class="home">
    <el-container class="box">
      <el-header>电商后台管理系统<el-button>退出</el-button></el-header>
      <el-container>
        <el-aside :style="{ width: flag ? '64px' : '200px' }">
          <p
            :style="{
              backgroundColor: 'pink',
              textAlign: 'center',
              height: '40px',
              // width: flag ? '64px' : '200px',
            }"
            @click="flag = !flag"
          >
            |||
          </p>
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="flag"
            :collapse-transition="false"
            unique-opened
            router
          >
            <el-submenu
              :index="item.id + ''"
              v-for="item in Leftmenu"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group v-for="it in item.children" :key="it.id">
                <el-menu-item :index="'/' + it.path">{{
                  it.authName
                }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getmenu } from "@/http/user";
export default {
  data() {
    return {
      Leftmenu: [],
      flag: false,
    };
  },
  methods: {
    async getLeftmenu() {
      let { data: res } = await getmenu();

      this.Leftmenu = res.data;
      // console.log(this.Leftmenu);
    },
    handleOpen() {
      // console.log(this.$route.path);
    },
    handleClose(key, keypath) {
      // console.log(key, keypath);
    },
  },
  created() {
    this.getLeftmenu();
  },
};
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #373d41;
  color: #fff;
  line-height: 60px;
  padding-left: 30px;
  font-size: 26px;
  .el-button {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100vh;
}
.el-menu {
  height: 95%;
}
</style>