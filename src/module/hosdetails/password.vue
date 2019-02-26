<template>
  <div class="page-index">
    <div class="top">密码必须至少6位以上字母或者数字;</div>
    <div class="inputtxt">
      <span>输入密码</span><input type="password" placeholder="请设置密码" v-model="password">
    </div>
    <div class="inputtxt">
      <span>确认密码</span><input type="password" placeholder="确认密码" v-model="password1">
    </div>
    <button id="btn" @click="login()">确认</button>
  </div>
</template>
<script>
  import "./css/password.css";
  import utils from "../../common/js/utils";
  import {
    Toast
  } from "mint-ui";
  import Api from "../../common/api/api.js";
  export default {
    data() {
      return {
        password: "",
        password1: ""
      };
    },
    created() {
      utils.setTitle("设置登录密码")

    },
    methods: {
      login() {
        if (this.password != this.password1) {
          Toast({
            message: "两次输入不一致",
            position: "bottom",
            duration: 2000
          });
        } else if (this.password == "" || this.password1 == "") {
          Toast({
            message: "请输入密码",
            position: "bottom",
            duration: 2000
          });
        } else if (this.password.length < 6) {
          Toast({
            message: "请输入6位以上的密码",
            position: "bottom",
            duration: 2000
          });
        } else {
          let params = {
            telphone: JSON.parse(localStorage.getItem("personInfo")).telphone,
            password: this.password1,
            user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
            token: JSON.parse(localStorage.getItem("personInfo")).token
          };
          Api.setpassword(params).then(res => {
            if (res.status == "0") {
              Toast({
                message: res.message,
                position: "bottom",
                duration: 2000
              });
              localStorage.setItem("password","1")
              window.closeWebView("");
              
              // let data = {
              //   // panelShow: false,
              //   // userInfo1: false,
              //   password: this.password
              // };
              // this.$emit("ievent", data);
              // this.password = "";
              // this.password1 = "";
            } else {
              Toast({
                message: res.message,
                position: "bottom",
                duration: 1000
              });
            }
          });
        }
      }
    }
  };
</script>

<style scoped>
  .top {
    font-size: 0.32rem;
    color: #a0a0a0;
    height: 1.28rem;
    line-height: 1.28rem;
    padding-left: 0.3733rem;
  }
  input {
    border: 0;
    font-size: 0.3733rem;
  }
  .inputtxt {
    height: 1.28rem;
    background-color: #fff;
    width: 100%;
    line-height: 1.28rem;
  }
  .inputtxt span {
    color: #282828;
    font-size: 0.3733rem;
    margin-left: 0.3733rem;
    margin-right: 0.6667rem;
  }
  #btn {
    display: block;
    width: 80%;
    margin: 0 auto;
    background-color: #ff65b1;
    border-radius: 0.6rem;
    height: 1.1733rem;
    color: #fff;
    margin-top: 1.0667rem;
    border: 0;
  }
  button {
    font-size: 0.4533rem;
  }
</style>

