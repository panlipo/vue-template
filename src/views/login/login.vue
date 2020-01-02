<template>
  <div class="login">
    <div class="loginbox">
      <p>后台管理系统</p>
      <el-form :model="form" :rules="rules" ref="form" class="myform">
        <el-form-item label prop="account">
          <el-input v-model="form.account" placeholder="请输入账号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  name: "login",
  data() {
    return {
      form: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {
    document.querySelector("body").className = "loginbody";
    if (this.username === "") {
      this.$refs.username.focus();
    } else if (this.password === "") {
      this.$refs.password.focus();
    }
  },
  beforeDestroy() {
    document.body.removeAttribute("class", "loginbody");
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate(val => {
        if (val) {
          console.log(val);
          // this.$http
          //   .administratorscheck({
          //     adminPhone: this.form.account,
          //     password: this.form.password
          //   })
          //   .then(res => {
          //     console.log(res);
          //     if (res.status === 200) {
          Cookies.set("name", this.form.account, { expires: 7 });
          Cookies.set("id", 1, { expires: 7 });
          this.$router.replace("/");
          // } else {
          //   this.$message.error("请确认账号密码是否正确");
          // }
          // });
        } else {
          console.log("error!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
body.loginbody {
  background: url("../../../public/loginbg.jpg") no-repeat;
  background-size: 100% 100%;
}
.login {
  p {
    margin: 0;
  }
  .loginbox {
    position: fixed;
    left: 18%;
    top: 50%;
    transform: translate(0, -50%);
    width: 320px;
    height: 400px;
    padding: 50px;
    padding-bottom: 10px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid white;
    border-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .myform {
      width: 100%;
      .btn {
        width: 100%;
        background: linear-gradient(
          83deg,
          rgba(145, 194, 255, 1),
          rgba(33, 120, 253, 1)
        );
        border-radius: 20px;
        color: white;
        height: 40px;
        font-size: 18px;
        line-height: 40px;
        padding: 0;
        margin-top: 20px;
      }
    }
  }
}
</style>
