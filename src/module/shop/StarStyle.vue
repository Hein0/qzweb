<template>
  <div id="shop">
    <div class="container mat04">
      <!-- <div class="goBack" style="margin-top: 0.4rem">
        <img src="./images/back.png"  @click="$router.back(-1)">
      </div> -->
      <h1 class="StarStyle">明星同款</h1>
      <span class="instruction" style="opacity: 0.5">/你想要的都在这里</span>
      <scroller v-if="!no_data"  ref="scroller" :auto-fill="false" v-on:load="init">
        <ul class= "commodityList commodiStarList">
            <li class="commodiStar" :key="item.id+item.order+item.imgUrl+index" v-for="(item,index) in imgList" @click="toDetail(item.link)" style="width:9.1rem">
              <img class="commodity-icon" :src="(imgPath+item.imgUrl)" alt="">
            </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<style type="text/css">
  
  .hotHead{
    font-size: 0.46rem;
    margin-left: 0.4rem;
    font-weight: bolder;
  }

  a{
    text-decoration: none
  }

  .bannerInfo{
    height: 6.1rem;
  }
  
  
  .projects{
    padding-top: 0.6rem !important
  }

  .topWrap{
    margin-bottom: 0.6rem
  }

  .instruction{
    display: inline-block;
    font-size: 0.4rem;
  }
  .myPacket{
    display: inline-block;
  }

  .myPacketWrap{
    height: 4.0rem !important
  }

  .packetProject{
    float: left; */
     display: -webkit-flex; 
     display: flex; 
     background-color: #fff; 
     flex-direction: column; 
     align-items: center; 
     justify-content: center; 
     border-radius: 0.08rem; 
     box-shadow: 0 0rem 0.24rem 0.0267rem rgba(255, 131, 199, 0.4); 
    margin-right: 0.1rem;
     cursor: pointer; 
  }

  ::-webkit-scrollbar {
    display:none;
  }

  .StarStyle{
    display: inline-block;
    margin-top: 0.5rem;
    margin-left: 0.4rem;
    font-size: 0.64rem;
    color: #333
  }

  #shop .commodityList .commodity{
    box-shadow: none !important;
  }

  .commodiStar{
    height: auto !important;
    width: 9.2rem !important;
    padding: 0; 
    margin-bottom: 0.4rem;
    display: -webkit-flex;
    display: flex;
    cursor: pointer;
    overflow: hidden;
    border-radius: 0.1333rem;
    list-style: none;
  }

  .commodiStarList{
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    padding-top: 0.667rem !important;
  }

  #shop .commodityList .commodiStar .commodity-icon{
    height: 4.0rem;
    width: 9.2rem;
  }
  
</style>
<script>

import "common/css/shop.css";
import imgPath from "../../common/api/imgConfig.js";
import setSessionKey from "../../common/js/setSessionKey.js";
import utils from "../../common/js/utils";
import scroller from "../../components/public/scoller.vue";
import Api from "../../common/api/api.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      user_id:"",
      imgPath,
      pageNum:1,
      no_data:false,
      firstRegion: "",
      city:"",
      imgListFirst:[], //第一次加载的商品
      imgListMore:[],//下拉加载商品
      imgList:[]
    };
  },

  created: function() {
    window.scrollTo(0,0)
    let userInfo = JSON.parse(localStorage.getItem("personInfo"));
    if (userInfo) {
      this.user_id = userInfo.user_id;
    }

    if(this.$route.query.city){
      this.city=this.$route.query.city
    }else{
      this.city="深圳市"
    }
    this.init("clickNext");
  },
  
  methods: {
    init(smble){
      let self=this
        let params = {city: this.city,pageNum:self.pageNum,pageSize:10};
        let clickFlag;
        Api.starStyle(params)
        .then(data=>{
          if(smble=="clickNext"){ //点击调用则data.data.goods.length可以为0，如果下拉则不可以
            clickFlag=true
          }else{
            clickFlag=data.data.length
          }
          if(data.status == '0' && clickFlag){
            if(self.pageNum==1){ //初始化第一次返回的商品
                self.imgListFirst=data.data
                self.imgList=self.imgListFirst
            }else{ //下拉刷新的商品
              self.imgListMore=data.data
              self.imgList=self.imgList.concat(self.imgListMore)
              if (typeof self.$refs.scroller !== "undefined") {
                self.$refs.scroller.removeLoading();
              }
            }
            self.pageNum+=1

          }else{
            if (typeof self.$refs.scroller !== "undefined") {
              self.$refs.scroller.removeLoading();
            }
            Toast({
              message: self.pageNum==1?"系统错误，请稍后再试":"已加载完毕",
              position: "middle",
              duration: 2000
            });
          }
        })
    },

    
    // 商品详情
    toDetail(link) {
      // let baseUrl = window.location.href.slice(
      //   0,
      //   window.location.href.indexOf("shop.html")
      // );
      // window.location.href =
      //   baseUrl + "shop.html#/detail/" + id + "/" + this.user_id;
      window.location.href=link+"?city="+this.city
    },
  },

  components: {
    scroller
  },
};
</script>


