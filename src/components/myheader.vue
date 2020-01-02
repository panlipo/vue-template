<template>
  <div class="myheader">
    <div class="header_left">
      <!-- <i class="el-icon-s-operation" style="transform: rotateZ(0deg);"></i> -->
      <div @click="change" class="imgbox">
        <img
          src="../assets/menu.png"
          alt
          :style="{'transform': isCollapse? 'rotate(180deg) ': 'rotate(0)',}"
        />
      </div>
      <p>后台管理系统</p>
    </div>
    <div class="header_right">
      <div class="setting">
        <img src="../assets/logo.png" alt />
        <p>{{user}}</p>
        <i class="el-icon-arrow-down"></i>
      </div>
      <div class="headbox">
        <p @click="gochange()">
          <i class="el-icon-s-tools"></i>修改密码
        </p>
        <p @click="exit()">
          <i class="el-icon-switch-button"></i>退出登录
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "myheader",
  data() {
    return {
      isCollapse: false,
      user: "admin"
    };
  },
  watch: {},
  methods: {
    change() {
      this.isCollapse = !this.isCollapse;
      this.$emit("changeCollapse", this.isCollapse);
    },
    gochange() {
      this.$router.push("/changepass");
    },
    exit() {
      Cookies.remove("name");
      Cookies.remove("id");
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.myheader {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
  box-sizing: border-box;
  box-shadow: 0 0 10px #cccccc;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header_left {
    .imgbox {
      width: 50px;
      height: 50px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20px;
        height: 20px;
        transition: all 0.2s;
      }
    }
    .imgbox:hover {
      background: rgba(112, 112, 112, 0.1);
    }
  }
  .header_right {
    width: 120px;
    position: relative;
    .setting {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
      }
      i {
        transition: all 0.2s;
      }
    }
    .headbox {
      position: absolute;
      top: 100px;
      box-shadow: 0 5px 5px #cccccc;
      overflow: hidden;
      height: 0;
      opacity: 0;
      transition: all 0.3s;
      z-index: 999;
      // padding: 5px 0;
      p {
        color: black;
        background: white;
        transition: all 0.3s;
        margin: 0;
        width: 140px;
        height: 30px;
        line-height: 30px;
        display: block;
        padding: 5px 10px;
        text-align: center;
        // align-items: center;
        i {
          margin-right: 10px;
        }
      }
      p:hover {
        color: white;
        background: #545c64;
      }
    }
  }
  .header_right:hover .headbox {
    opacity: 1;
    height: auto;
    top: 52px;
    padding: 10px 0;
  }
  .header_right:hover .setting i {
    transform: rotate(180deg);
  }
}
</style>
