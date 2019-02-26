<template>
  <section class="dairyDetailBaseInfo">
    <!--头部基本信息-->
    <header>
      <div class="header">
        <img :src="imgFullUrl(objData.logo)" alt="头像"/>
        <!--<span>V1.12</span>-->
      </div>
      <div class="headerText">
        <div class="headerName">
          <div class="headerTextInfo">
            <h2>
              {{objData.nick_name || ""}}
              <span class="degree" v-show="false">v2</span>
            </h2>
            <p class="dateTime">
              <span>{{objData.operTime ||""}}</span>
              <span>共{{objData.logs_num || 0}}篇日记</span>
            </p>
          </div>
          <div class="guanzhu" @click="getAttent()">
            <i v-show="objData.is_attention==0"></i>
            {{objData.is_attention==1?"已关注":"关注"}}
          </div>
        </div>
        <div class="userdProduct" >
          <span v-for="item in formatData(objData.project)">{{item}}</span>
        </div>
      </div>
    </header>
    <!--咨询-->
    <a class="zixun" @click="onlineService"></a>
    
    <!--某个产品-->
    <!-- <div class="product mg20"  v-if="objData.goodsList">
      <h1>她的变身法宝</h1>
      <div class="product-item" v-for="(item,index) in objData.goodsList" @click="goToShop(item.id)" :class="{mgTop:index!=0}">
        <div class="productImg">
          <img :src="imgFullUrl(item.goods_url)" alt="产品">
        </div>
        <div class="productInd">
          <h2>{{item.name}}</h2>
          <div>
            <span class="font34">￥ {{item.qzd_price}}</span>
            <span class="font24">￥ {{item.hos_price}}</span>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <ul class="mg20 zx mg30" v-if="objData.goodsList">
      <li><img :src="type=='subDetail'?imgHP:imgYH" alt="仟姿优惠"><p><span>{{type=='subDetail'?objData.hospital_name:"仟姿优惠"}}</span></p></li>
      <li><img :src="type=='subDetail'?imgDT:imgZX" alt="咨询专业整容顾问"><p>{{type=='subDetail'?"操作医生:":""}}<span :class="{color:type=='subDetail'}">{{type=='subDetail'?objData.doctor_name:"咨询专业整容顾问"}}</span></p></li>
    </ul> -->
  </section>
</template>
<style scoped>
.degree {
  font-size: 0.25rem;
  position: absolute;
  left: 34%;
  top: 3.6%;
  color: #f56f0e;
}
</style>

<script>
import Api from "../../../common/api/api.js";
import { Toast } from "mint-ui";
export default {
  props: ["objData", "type", "kefUrl"],
  data() {
    return {
      imgHead: require("../images/header-other.png"),
      imgProduct: require("../images/product.png"),
      imgYH: require("../images/youhui.png"),
      imgZX: require("../images/xiaoxi.png"),
      imgHP: require("../images/hosptail.png"),
      imgDT: require("../images/doctor.png"),
      attention: 0,
      userInfo: {}
    };
  },
  mounted() {
    this.userInfo =
      localStorage.getItem("personInfo") &&
      JSON.parse(localStorage.getItem("personInfo"));
  },
  methods: {
    imgFullUrl(str) {
      //图片
      if (str) {
        return imgPath + str;
      } else {
        return this.imgHead;
      }
    },
    formatData(str) {
      if (str && str != "") {
        return str.split(",");
      } else {
        return [];
      }
    },
		
		//在线咨询
		onlineService() {
			let hosIdList=["2","16","156","6","127"]
			let index = Math.floor((Math.random()*hosIdList.length))
			let params = {hospitalId:hosIdList[index]};
			Api.getHospitalService(params)
			.then(res=>{
				if(res.status == '0'){
					let chatStr={
						"chatId"  : res.data.imUserId,
						"name"    : res.data.userName,
						"pic_url" : res.data.logoUrl
					}
					let chatInfo =JSON.stringify(chatStr);
					
					try{
						qz_gotoChatView(chatInfo)
					}catch(err) {
						console.log(err)
					}
					
				}else{
					Toast({
						message: res.message,
						position: "middle",
						duration: 2000
					});
				}
			})
		},
    goToShop(id, user_id) {
      var self = this;
      if (id != undefined && self.userInfo.user_id) {
        location.href = location.href.replace(
          /(\/module\/)(.+)$/g,
          "$1" + `shop.html#/detail/${id}/${self.userInfo.user_id}`
        );
      } else {
        this.$toast("id不存在!");
      }
    },
    //跳转商品详情页评论部分
    goToShopTail(id, user_id) {
      var self = this;
      if (id != undefined && self.userInfo.user_id) {
        location.href = location.href.replace(
          /(\/module\/)(.+)$/g,
          "$1" + `shop.html#/detail/${id}/${self.userInfo.user_id}`
        );
      } else {
        this.$toast("id不存在!");
      }
    },
    getAttent() {
      //判断是否关注
      if (this.objData.is_attention == "0") {
        this.attent();
      } else {
        this.deleteAttention();
      }
    },
    attent() {
      //关注
      let data = {
          attention_id: this.userInfo.user_id,
          attentioned_id: this.objData.user_id,
          attention_type: 1,
          attentioned_type: 1,
           user_id:JSON.parse(localStorage.getItem("personInfo")).user_id,
          token:JSON.parse(localStorage.getItem("personInfo")).token
        },
        self = this;
      //        ,sessionKey:this.setSessionKey({attention_id:1,attentioned_id:this.objData.user_id-0,attention_type:1,attentioned_type:1})
      this.Api.getAttention(data).then(function(res) {
        if (res.status == 0) {
          self.$emit("refresh", "");
          self.$toast("关注成功")
          
        } else {
          self.$toast("操作失败!");
        }
      });
    },
    deleteAttention() {
      //取消关注
      let data = {
          attention_id: this.userInfo.user_id,
          attentioned_id: this.objData.user_id,
          status: 2,
           user_id:JSON.parse(localStorage.getItem("personInfo")).user_id,
          token:JSON.parse(localStorage.getItem("personInfo")).token
        },
        self = this;
      this.Api.deleteAttention(data).then(function(res) {
        if (res.status == 0) {
          
          self.$emit("refresh", "");
          self.$toast("取消关注成功")
          
        } else {
          self.$toast("操作失败!");
        }
      });
    }
    //      goToCustomer(){//客服
    //        let self=this;
    //        CM.goToCustomer({telphone:self.userInfo.tel});
    //      }
  },
  watch: {}
};
</script>
