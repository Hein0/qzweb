<template>
    <div>
        <div class="inputtxt1 inputtxt">
            <span>输入原密码</span><input type="password" placeholder="输入原密码" v-model="primary">
        </div>
        <div class="inputtxt">
            <span>输入新密码</span><input type="password" placeholder="请设置密码" v-model="newpass">
        </div>
        <div class="bor"></div>
        <div class="inputtxt">
            <span>确认新密码</span><input type="password" placeholder="请再次输入" v-model="newpassagign">
        </div>
        <div class="top">密码必须至少6位以上字母或者数字</div>
        <button id="btn" @click="login()">确认</button>
    </div>
</template>
<style scoped>
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
.bor {
  margin: 0 0.3733rem;
  border-top: 1px solid #f8f8f8;
}
.inputtxt1 {
  margin: 0.4267rem 0;
}
.top {
  padding-top: 0.4267rem;
  font-size: 0.32rem;
  margin-left: 0.3733rem;
  color: #a0a0a0;
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
  font-size: 0.4533rem;
}
button {
  font-size: 0.4533rem;
}
</style>
<script>
import { Toast } from "mint-ui";
import utils from "../../common/js/utils";
import Api from "../../common/api/api.js";
export default {
  data() {
    return {
      primary: "",
      newpass: "",
      newpassagign: ""
    };
  },
  mounted() {
    utils.setTitle("重置登录密码");
  },
  props: ["telPhone"],
  methods: {
    login() {
      if (this.newpass != this.newpassagign) {
        Toast({
          message: "两次密码输入不一致",
          position: "bottom",
          duration: 2000
        });
      } else if (this.newpass == "" || this.newpassagign == "") {
        Toast({
          message: "请输入密码",
          position: "bottom",
          duration: 2000
        });
      } else if (this.newpass.length < 6) {
        Toast({
          message: "请输入6位以上的密码",
          position: "bottom",
          duration: 2000
        });
      } else {
        let params = {
          telphone: JSON.parse(localStorage.getItem("personInfo")).telphone,
          password: this.primary,
          newPassWord: this.newpassagign,
           user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
            token: JSON.parse(localStorage.getItem("personInfo")).token
        };
        Api.updatePassWord(params).then(res => {
          if (res.status == "0") {
            Toast({
              message: "修改成功",
              position: "bottom",
              duration: 2000
            });
            window.closeWebView("");
            
            // let data = {
            //   panelShow: false,
            //   userInfo1: false,
            //   password: this.newpassagign
            // };
            // this.$emit("ievent", data);
            // this.primary = "";
            // this.newpass = "";
            // this.newpassagign = "";
          } else {
            Toast({
              message: res.message,
              position: "bottom",
              duration: 2000
            });
          }
        });
      }
    }
  }
};
</script>


