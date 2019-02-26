<template>
  <div class="login">
    <div class="content">
      <div class="bc">
      </div>
      <div class="center">
        <div class="loginenter" @click="choiceenter">
          <span :class="choicecolor?'ff':''" data-id="1">验证码登录</span><i>|</i>
          <span :class="choicecolor?'':'ff'" data-id="2" class="passwordenter">密码登录</span></div>
        <div class="zhmi" v-if="this.choicecolor==true">
          <div class="zh">
            <p class="phoneTitle">手机号码</p>
            <div class="phoneNum">
              <div class="phoneNumItem">
                <span class="color">+86</span>
                <i></i>
                <input type="tel" maxlength="11" v-on:input="closeInp($event,'isShow1')" placeholder="请输入手机号码" v-model.trim="phone" style=" width: 6rem;" class="loginColor" />
              </div>
              <i class="close" v-show="isShow1" v-on:click="closeFun"></i>
            </div>
          </div>
          <div class="zh">
            <p class="phoneTitle">短信验证码</p>
            <div class="codeCent">
              <p class="code">
                <input type="tel" placeholder="请输入您收到的验证码" maxlength="4" v-model.trim="code" class="loginColor" style="color:#a0a0a0;width:80%" />
              </p>
              <input type="button" value="获取验证码" class="yzm" @click="getCode()">
            </div>
          </div>
        </div>
        <div class="zhmi" v-else>
          <div class="zh">
            <p class="phoneTitle">手机号码</p>
            <div class="phoneNum">
              <div class="phoneNumItem">
                <span class="color">+86</span>
                <i></i>
                <input type="tel" maxlength="11" v-on:input="closeInp($event,'isShow2')" placeholder="请输入手机号码" v-model.trim="phone" style=" width: 6rem;" class="loginColor" />
              </div>
              <i class="close" v-show="isShow2" v-on:click="closeFun"></i>
            </div>
          </div>
          <div class="zh">
            <p class="phoneTitle">登录密码</p>
            <div class="codeNum">
              <p class="codeFlxe">
                <input type="password" placeholder="请输入密码"  v-on:input="closeInp($event,'isShow3')" maxlength="" v-model.trim="code" class="loginColor" style="color:#a0a0a0;width:80%" />
              </p>
              <i class="close" v-show="isShow3" v-on:click="closeFun2"></i>
            </div>
          </div>
        </div>
        <button class="btn" @click="login2()" v-if="this.choicecolor==false">登录</button>
        <button class="btn" @click="login()" v-if="this.choicecolor==true">登录 / 注册</button>
      </div>
    </div>
    <p class="xy">登录/注册代表您已同意<span @click="agreement()">《仟姿用户使用协议》</span><router-link to="./privacyPolicy" style="color: #ff65b1;"
		>《隐私政策》</router-link></p>
    <MessageBoxs v-show="isAgre" @onchild="onChild"></MessageBoxs>
  </div>
</template>
<style scoped>
  .xy > span {
    color: #ff65b1;
  }
  .loginenter {
    color: #a0a0a0;
  }
  .loginenter i {
    color: #ff65b1;
    padding: 0 0.4533rem;
  }
  .ff {
    color: #ff65b1;
  }
  .loginenter span:first-child {
    font-size: 0.7rem;
  }
  .passwordenter {
    font-size: 0.7rem;
  }
</style>

<script>
  import "../css/dairyDetail.css";
  import setSessionKey from "../../../common/js/setSessionKey.js";
  import Api from "../../../common/api/api.js";
  export default {
    data() {
      return {
        phone: "",
        code: "",
        setSessionKey,
        isAgre: false,
        choicecolor: true,
        isShow1: false,
        isShow2: false,
        isShow3: false,
        deviceId: ''
      };
    },
    components: {
      MessageBoxs: require("../components/agreement.vue"),
    },
    mounted() {
      CM.setTitle("");
      window.addEventListener("resize", function() {
        if (navigator.userAgent.indexOf("Android") != -1) {
          $("input").on("click", function() {
            var target = this;
            setTimeout(function() {
              target.scrollIntoView(true);
            }, 100);
          });
        }
      });
    },
    created () {
      this.getDeviceInfo()
    },
    methods: {

      /*
      * @date 6/12
      * @des 获取设备id
      * */
      getDeviceInfo () {
        try {
          try {
            window.webkit.messageHandlers.getDeviceInfo.postMessage("");
          } catch (e){
            android.getDeviceInfo("");
          }
        }catch(e) {

        }

      },

      // @date 6/12 @des 设置设备id @param data|json 原生传入的json
      setSeviceId (data) {
        this.deviceId = data.deviceID;
      },

      choiceenter(e) {
        var ids = e.target.dataset.id;
        if (ids == 2) { // 密码登录
          this.choicecolor = false;
          this.isShow1 = false;
          this.isShow2 = false;
          this.isShow3 = false;
          this.phone = "";
          this.code = "";
          _czc.push(['_trackEvent', '登录APP', '密码登录'])
        } else {
          this.choicecolor = true;
          this.phone = "";
          this.code = "";
          _czc.push(['_trackEvent', '登录APP', '验证码登录'])
        }
        console.log(e);
      },
      login() {
        let reg = /^1\d{10}$/;
        if (!reg.test(this.phone)) {
          this.$toast("请输入正确的手机号码！");
        } else if (!this.code && this.choicecolor) {
          this.$toast("验证码不能为空！");
        } else if (!this.code && !this.choicecolor) {
          this.$toast("密码不能为空！");
        } else {
          this.getAjax();
          _czc.push(['_trackEvent', '登录APP', '登录'])

        }
      },
      //监听
      closeInp(e, obj) {
        var self = this,
          objs = obj;
        if (e.data == "" || e.data == null) {
          if (objs == "isShow1") {
            this.isShow1 = false;
          } else if (objs == "isShow2") {
            this.isShow2 = false;
          } else if (objs == "isShow3") {
            this.isShow3 = false;
          }
        } else {
          if (objs == "isShow1") {
            this.isShow1 = true;
          } else if (objs == "isShow2") {
            this.isShow2 = true;
          } else if (objs == "isShow3") {
            this.isShow3 = true;
          }
        }
      },
      //清除input内容
      closeFun() {
        this.phone = "";
        this.isShow1 = false;
        this.isShow2 = false;
      },
      //清除密码
      closeFun2() {
        this.code = "";
        this.isShow3 = false;
      },
      login2() {
        let reg = /^1\d{10}$/;
        if (!reg.test(this.phone)) {
          this.$toast("请输入正确的手机号码！");
        } else if (!this.code && this.choicecolor) {
          this.$toast("验证码不能为空！");
        } else if (!this.code && !this.choicecolor) {
          this.$toast("密码不能为空！");
        } else {
          let params = {
              telphone: this.phone,
              password: this.code
            },
            u = navigator.userAgent,
            isAndroid =
              u.indexOf("Android") > -1 ||
              u.indexOf("Adr") > -1 ||
              u.indexOf("android") > -1, //android终端
            isiOS =
              !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iOS") > -1; //ios终端
          Api.loginPassword(params).then(res => {
            if (res.status == 0) {
              this.$toast("登录成功");
              let jsonData = JSON.stringify(res.data);
              localStorage.removeItem("personInfo");
              localStorage.setItem("personInfo", jsonData);
              if (res.data.setIf == "0") {
                let baseUrl = window.location.href.slice(
                  0,
                  window.location.href.indexOf("index.html")
                );
                window.location.href = baseUrl + "hosdetails.html#/userInfo";
              } else {
                if (isAndroid) {
                  android.loginSuccess(jsonData);
                } else if (isiOS) {
                  window.webkit.messageHandlers.loginSuccess.postMessage(jsonData);
                }
              }
            } else {
              this.$toast(res.message);
            }
          });

          _czc.push(['_trackEvent', '登录APP', '登录'])
        }
      },
      getAjax() {
        //获取登录的数据
        let self = this,
          u = navigator.userAgent,
          isAndroid =
            u.indexOf("Android") > -1 ||
            u.indexOf("Adr") > -1 ||
            u.indexOf("android") > -1, //android终端
          isiOS =
            !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iOS") > -1; //ios终端
        self.Api.getLogin({
          telphone: self.phone,
          random: self.code,
          last_login_cityId: "广东深圳",
          deviceId: self.deviceId
        }).then(function(res) {
          if (res.status == "0") {
            let jsonData = JSON.stringify(res.data);
            localStorage.removeItem("personInfo");
            localStorage.setItem("personInfo", jsonData);
            if (res.data.setIf == "0") {
              let baseUrl = window.location.href.slice(
                0,
                window.location.href.indexOf("index.html")
              );
              window.location.href = baseUrl + "hosdetails.html#/userInfo";
            } else {
              if (isAndroid) {
                android.loginSuccess(jsonData);
              } else if (isiOS) {
                window.webkit.messageHandlers.loginSuccess.postMessage(jsonData);
              }
            }
          } else {
            self.$toast(res.message);
          }
        });
      },
      getCode() {
        //点击验证码
        let reg = /^1\d{10}$/;
        if (!reg.test(this.phone)) {
          this.$toast("请输入正确的手机号码！");
        } else {
          $(".yzm").attr("disabled", true);
          var n = 60;
          //	        	$(".yzm").attr("disabled",true);
          var time = setInterval(function() {
            n--;
            $(".yzm").val(n + "秒后重发");
            if (n == 1) {
              clearInterval(time);
              $(".yzm").val("获取验证码");
              $(".yzm").removeAttr("disabled");
            }
          }, 1000);
          let data = {
            telphone: this.phone
          };
          let self = this;
          this.setSessionKey(data);
          this.Api.sendSms(data).then(function(res) {
            if (res.status == 0) {
              self.$toast(res.message ? res.message : "验证码发送成功！");
            } else {
              self.$toast(res.message);
            }
          });
        }
      },
      //查看协议
      agreement() {
        _czc.push(['_trackEvent', '查看协议', '仟姿用户使用协议'])
        this.isAgre = !this.isAgre;
      },
			
			//查看隐私协议
// 			privacy(){
// 				this.isSrceit = !this.isSrceit;
// 			},
      //关闭弹窗
      onChild() {
        this.isAgre = !this.isAgre;
      },
			// 关闭隐私协议
// 			onSrceit(){
// 				this.isSrceit = !this.isSrceit;
// 			}
    },
    computed: {
      deviceInfo () {
        return this.$store.state.deviceInfo
      }
    },
    watch:{
      deviceInfo (data) {
        this.setSeviceId(JSON.parse(data));
        localStorage.setItem('AppInfo', data);
      }
    }
  };
</script>
