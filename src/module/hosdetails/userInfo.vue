<template>
  <div>
    <!-- <div :class="userInfo1?'no':''"> -->
    <div class="wrap-page">
      <div class="pageList lineH148  arrow">
        <div class="pageListCen bord">
          <span class="leftTile">头像</span>
          <span class="rightText pd-30 fl-r btcright">
                            <img :src="imgPath+userinfo[0].logo" alt="">
                    
        						<input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="ChangeAfter_picsUpdate(index,$event)" style="z-index:100"/>
                            <img :src="imgPath+userinfo[0].logo" alt="">
                            	<!-- <img class="iconImg" src="./images/benyuananlitupian.png" alt=""> -->
        					</span>
        </div>
      </div>
      <div class="pageList lineH90">
        <div class="pageListCen bord">
          <span class="leftTile">昵称</span>
          <span class="rightText pd-30 fl-r">
        						<input type="text" maxlength="7" placeholder="请输入您的昵称" v-model="userinfo.clname" style="text-align:right;ime-mode:disabled">
        					</span>
        </div>
      </div>
      <div class="pageList lineH90">
        <div class="pageListCen bord">
          <span class="leftTile">性别</span>
          <span class="rightText fl-rr">
        						<span  @click="checkedperson">
        							<label class="mint-radiolist-label" data-id="1">
        								<span class="mint-radio"  data-id="1">
        									<span class="mint-radio-core" data-id="1" :class="corechecked?'':'woman' "></span>
          </span>
          <span class="mint-radio-label" :class="corechecked?'':'womancolor' " data-id="1">男</span>
          </label>
          <label class="mint-radiolist-label1" data-id="2">
        								<span class="mint-radio" data-id="2">
        									<span class="mint-radio-core" data-id="2" :class="corechecked?'woman':'' "></span>
        								</span> 
        								<span class="mint-radio-label"  data-id="2" :class="corechecked?'womancolor':'' ">女</span>
        							</label>
          </span>
          </span>
        </div>
      </div>
      <div class="pageList lineH90 arrowdow bord" @click="choiceArea">
        <div class="pageListCen">
          <span class="leftTile">年龄</span>
          <span class="rightText fl-r pd-30">
        						<input type="text"  style="text-align:right;color:#282828" readonly="readonly" placeholder="请选择您的年龄" v-model="userinfo.age">
        	</span>
        	<!--选择年龄-->
		      <select name="" v-model="userinfo.age" id=""  ref="select">
		        	<option value="" v-for="(item, index) in ageList" v-bind:value="index">{{index}}</option>
		      </select>
        </div>
      </div>
      
      <!--<mt-popup v-show="popupVisible" position="bottom" class="mint-popup-4">
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="5"></mt-picker>
      </mt-popup>-->
      <div class="pageList lineH90 arrowdow" @click="choiceArea1">
        <div class="pageListCen">
          <span class="leftTile">地区</span>
          <span class="rightText fl-r pd-30">
        						<input type="text" readonly="readonly" style="text-align:right;" placeholder="请选择您的地区" v-model="userinfo.address">
        					</span>
        </div>        
      </div>
    <div class="dispiker"  v-show="dispiker">
       <v-distpicker wrapper="customize" type="mobile" hide-area @selected="theend"  @province="onChangeProvince" @city="onChangeCity"></v-distpicker>

    </div>
      
      <div class="pageList marginTB lineH90 arrow">
        <div class="pageListCen" @click="enterpass">
          <span class="leftTile">登录密码</span>
          <span class="rightText fl-r"></span>
        </div>
      </div>
      <div class="pageList marginTB jianjie">
        <div class="pageListCen rigCent">
          <span class="leftTile ">简介:</span>
          <span class="rightText width80 fl-r">
        						<textarea maxlength="40" class="rigTexta" placeholder="简单的介绍自己，字符控制在40字符之内.." v-model="userinfo.txt"></textarea>
        					</span>
        </div>
      </div>
      <div class="pageList marginTB lineH90">
        <div class="pageListCen">
          <span class="leftTile">推荐码:</span>
          <span class="rightText fl-r">
        						<input class=" inpSt" type="text" name="name" placeholder="输入推荐码" v-model="userinfo.pushperson" />
        					</span>
        </div>
      </div>
      <div class="buttons">
        <span class="btn" @click="submitinfo">提交</span>
      </div>
    </div>
    
  </div>
  <!-- <keep-alive>
        <pass-word v-show="panelShow" :panelShow="panelShow" @ievent="ievent"></pass-word>
      </keep-alive> -->
  <!-- </div> -->
  
</template>

<script>
import "./css/password.css";
import { DatetimePicker } from "mint-ui";
import passWord from "./password.vue";
import imgPath from "../../common/api/imgConfig";
import { Indicator } from "mint-ui";
import lrz from "lrz";
import baseUrl from "../../common/api/config";
import axios from "axios";
import "./css/password.css";
import Api from "../../common/api/api.js";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import utils from "../../common/js/utils.js";
import VDistpicker from "v-distpicker";
export default {
  name: "userInfo",
  //组件
  components: {
    passWord,
    VDistpicker
  },
  //数据
  data() {
    return {
      popupVisible: false,
      dispiker: false,
      corechecked: null,
      imgPath,
      value: "",
      panelShow: false,
      userInfo1: false,
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
      imgs: [],
      imgTemp: "",
      imgTempShow: false,
      baseUrl,
      axios,
      config: {
        width: 828,
        // height: 1104,
        quality: 0.8
      },
      after_pics: [],
      userinfo: [
        {
          logo: "",
          address: "",
          clname: "",
          pushperson: "",
          txt: "",
          age: "",
          sex: "1",
          password: ""
        }
      ],
      slots: [
        {
          flex: 1,
          values: [
            "18-19岁",
            "20-25岁",
            "26-30岁",
            "31-35岁",
            "36-40岁",
            "41-45岁",
            "45-50岁",
            "51-55岁",
            "56-60岁",
            "60岁以上"
          ],
          className: "slot1",
          textAlign: "center"
        }
      ],
      ageList:{"18-19岁":"18-19岁",
            "20-25岁":"20-25岁",
            "26-30岁":"26-30岁",
            "31-35岁":"31-35岁",
            "36-40岁":"36-40岁",
            "41-45岁":"41-45岁",
            "45-50岁":"45-50岁",
            "51-55岁":"51-55岁",
            "56-60岁":"56-60岁",
            "60岁以上":"60岁以上"},
      personInfo: [],
      zero: 0,
      clname: "",
      province: "",
      city: "",
      diqu: "",
      address: "",
      passwords: 0,//密码状态  是否已经设置密码
    };
  },
  //实例已经创建完成之后
  created() {
    //			this.$parent.init();
    // cbGoNextSetp()
    this.userinfo.clname = JSON.parse(localStorage.getItem("personInfo")).nick_name;
    utils.setTitle("完善用户资料");
  },
  //组件写入dom结构之前
  mounted() {
    this.personInfo = JSON.parse(localStorage.getItem("personInfo"));
    let jsonData = localStorage.getItem("personInfo");
    this.userinfo[0].logo =this.personInfo.logo;

    this.userinfo.sex = "1";
  },
  //方法对象
  methods: {
    // ievent(...data) {
    //   // let json=  JSON.parse(data)
    //   // console.log(.panelShow);// data为包含传过来所有数据的数组，第一个元素是对象，第二个元素是字符串
    //   console.log(data);
    //   this.panelShow = data[0].panelShow;
    //   this.userInfo1 = data[0].userInfo1;
    //   this.userinfo.password = data[0].password;
    // },
    onChangeProvince(data) {
      console.log(data.value);
      this.province = data.value;
    },
    onChangeCity(data) {
      console.log(data.value);
      this.city = data.value;
      this.userinfo.address = this.province + this.city;
      console.log(this.userinfo.address);
    },
    theend() {
      this.dispiker = false;
    },
    submitinfo() {
      let jsonData = localStorage.getItem("personInfo");
      // if (this.userinfo.sex == 0) {
      //   this.userinfo.sex = "1";
      // }

      let params = {
        telphone: this.personInfo.telphone,
        logo: this.userinfo[0].logo,
        nick_name: this.userinfo.clname,
        sex: this.userinfo.sex,
        age: this.userinfo.age,
        address: this.userinfo.address,
        introduce: this.userinfo.txt,
        referee: this.userinfo.pushperson,
        user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
        token: JSON.parse(localStorage.getItem("personInfo")).token
      };
      Api.updateUserInfo(params).then(res => {
        if (res.status == "0") {
          Toast({
            message: res.message,
            position: "bottom",
            duration: 1000
          });
          let jsonData = localStorage.getItem("personInfo");
          console.log(jsonData);
          let u = navigator.userAgent;
          let isAndroid =
            u.indexOf("Android") > -1 ||
            u.indexOf("Adr") > -1 ||
            u.indexOf("android") > -1; //android终端
          let isiOS =
            !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iOS") > -1;
          if (isAndroid) {
            android.loginSuccess(jsonData);
          } else if (isiOS) {
            window.webkit.messageHandlers.loginSuccess.postMessage(jsonData);
          }
        } else {
          Toast({
            message: res.message,
            position: "bottom",
            duration: 2000
          });
        }
      });
    },
    checkedperson(e) {
      console.log(e);
      this.userinfo.sex = e.target.dataset.id;
      if (e.target.dataset.id == "1") {
        this.corechecked = false;
      } else {
        this.corechecked = true;
      }
    },
    enterpass() {
      this.passwords = localStorage.getItem("password");
      if (this.passwords == 0 || this.passwords == null || this.personal.passwordIf == 0) {
          var JsonObjStr = {
				        web_url: imgPath + "app/module/hosdetails.html#/password",
				        title: "设置登录密码",
				        needNavBarHide: "0"
				      };
      } else if (this.personal.passwordIf == 1) {
          var JsonObjStr = {
            web_url: imgPath + "app/module/hosdetails.html#/resetpassword",
            title: "重置登录密码",
            needNavBarHide: "0"
          };
      }
      //打开原生vew
      openWebView(JSON.stringify(JsonObjStr));
      
    },
    onValuesChange(picker, values) {
      this.value = values[0];
      console.log(this.value);
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    //地区
    choiceArea() {
      this.popupVisible = true;
    },
    choiceArea1() {
      this.dispiker = true;
      this.userinfo.address = "";
    },
    //取消
    cancleaddress: function() {
      this.popupVisible = false;
    },
    //确定
    selectaddress: function(picker, index) {
      console.log(this.value);
      this.userinfo.age = this.value;
      this.popupVisible = false;
    },
    update(e, callback) {
      let self = this;
      let file = e.target.files[0];
      let type = file.type; //文件的类型，判断是否是图片
      // let size = file.size; //文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) == -1) {
        Toast({
          message: "请选择正确的图片格式！",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      Indicator.open({
        text: "上传中...",
        spinnerType: "fading-circle"
      });
      lrz(file, self.config)
        .then(function(rst) {
          self.imgs.push(rst.base64);
          let param = new FormData(); //创建form对象
          // console.log(file.name);
          self.imgTemp = self.imgs[0];
          var arr = self.imgTemp.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var obj = new Blob([u8arr], {
            type: mime
          });
          param.append("file", obj, file.name); //通过append向form对象添加数据
          param.append("chunk", "0"); //添加form表单中其他数据
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }; //添加请求头
          self.axios
            .post(baseUrl + "/case/upload.do", param, config)
            .then(response => {
              self.imgs = [];
              self.imgTemp = "";
              callback(response.data);
              Indicator.close();
              console.log(response.data);
              self.userinfo.logo = response.data.data;
            })
            .catch(error => {
              Toast({
                message: "上传图片出错！",
                position: "middle",
                duration: 2000
              });
            });
        })
        .catch(function(err) {
          console.log(err);
          Indicator.close();
          alert("压缩失败");
        })
        .always(function() {
          // 清空文件上传控件的值
          e.target.value = null;
        });
    },
    after_picsUpdate(e) {
      let self = this;
      let callback = function(response) {
        if (response.status != 0) {
          Toast({
            message: response.message,
            position: "middle",
            duration: 2000
          });
        } else {
          self.after_pics.push(response.data);
        }
      };
      this.update(e, callback);
    },
    ChangeAfter_picsUpdate(index, $event) {
      let self = this;
      let callback = function(response) {
        if (response.status != 0) {
          Toast({
            message: response.message,
            position: "middle",
            duration: 2000
          });
        } else {
        	self.userinfo[0].logo = response.data;
        }
      };
      this.update($event, callback);
    }
  },
  //计算属性
  computed: {}
};
</script>

<style scoped>
.ageclass:disabled {
  background-color: #fff;
}
.no {
  display: none;
}
.jianjie {
  line-height: 0.5rem;
  height: 1.8rem;
}
.dispiker {
  height: 6.6667rem;
  overflow: auto;
  position: relative;
  left: 0;
  bottom: -50%;
}
input,
button,
select,
textarea {
  outline: none;
}
.wrap-page {
  margin-top: 0.4rem;
  overflow: hidden;
}
.pageList {
  padding: 0.06rem 0;
  background: #fff;
  padding: 0 0.37rem;
}
.pageList select{position: absolute;width: 100%;right: 0;height: 100%;opacity: 0;z-index: 100;}
.pageListCen{width:100%;display:block;}
.arrow {
  position: relative;
}
.arrow:after,
.arrow:before {
  border: 8px solid transparent;
  border-left: 8px solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: 35%;
  right: 9px;
  content: " ";
}
.arrow:before {
  border-left-color: #a0a0a0;
  right: 7px;
}
.arrowdow {
  position: relative;
}
.arrowdow:after,
.arrowdow:before {
  border: 8px solid transparent;
  border-top: 8px solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: 35%;
  right: 13px;
  content: " ";
}
.arrowdow:before {
  border-top-color: #a0a0a0;
  top: 18px;
}
.lineH148 {
  line-height: 1.97rem;
}
.width80 {
  width: 80%;
}
.lineH90 {
  line-height: 1.2rem;
}
.pd-30 {
  padding-right: 0.4rem;
}
.marginTB {
  margin: 0.4rem 0;
}
.leftTile {
  font-size: 0.37rem;
  color: #282828;
  width: 1.33rem;
}
.rightText {
  font-size: 0.37rem;
  color: #a0a0a0;
  /* width: 75%; */
  text-align: right;
}
.rightText:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.bord {
  border-bottom: 1px solid #e3e3e3;
}
.fl-r {
  float: right;
  /* display: inline-block; */
  margin-right: 0.4rem;
}
.iconImg {
  display: block;
  width: 1.6rem;
  height: 1.6rem;
}
.rigCent {
  padding-top: 0.13rem;
  padding-bottom: 0.6rem;
}
.rigTexta {
  width: 100%;
  line-height: 0.4rem;
  height: 1.6rem;
  font-size: 0.37rem;
}
.inpSt {
  height: 0.6rem;
  width: 100%;
  line-height: 0.6rem;
  display: inline-block;
  text-align: right;
}
.buttons {
  width: 100%;
  text-align: center;
  margin: 1.04rem 0;
}
.buttons .btn {
  display: block;
  font-size: 0.45rem;
  background: #ff65b1;
  color: #fff;
  height: 1.17rem;
  line-height: 1.17rem;
  border-radius: 1.5rem;
  text-align: center;
  margin: 0 0.72rem;
}
.mint-popup-4 {
  width: 100%;
  z-index: 999;
}
.mint-popup-4 .picker-slot-wrapper,
.page-popup .mint-popup-4 .picker-item {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.genderRi {
  margin-right: 1.41rem;
}
.picker-items{background:#fff;}
.gender i {
  width: 0.33rem;
  height: 0.33rem;
  margin-right: 0.21rem;
  display: inline-block;
  border-radius: 100%;
  background: #a0a0a0;
}
.fl-rr {
  float: right;
}
.mint-radiolist-label {
  display: inline-block;
  margin-right: 0rem;
  /* float: left; */
  /* padding: 0 0.66rem 0 0; */
}
.mint-radiolist-label1 {
  /* display: inline-block; */
  /* float: right; */
  margin-right: 0rem;
  margin-left: 0.8133rem;
  /* padding: 0 0 0 0.66rem; */
}
.mint-radio-core {
  border-color: #ff65b1;
}
.mint-radio-input:checked + .mint-radio-core:after {
  background: none;
}
.woman {
  background-color: #ff65b1;
}
.womancolor {
  color: #ff65b1;
}
</style>