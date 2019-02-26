<template>
  <div id="shop">
    <div class="container mat04" ref="top">
      <!-- <div class="goBack" style="margin-top: 0.4rem">
        <img src="./images/back.png"  @click="$router.back(-1)">
      </div> -->
      <!-- <h1 class="FirstOrder">白富美城堡</h1>
      <span class="instruction">/你想要的都在这里</span> -->
      <div class="hongaoImg whiteRichMeiImg">
        <img class="commodity-icon" src="./images/whiteRichMei.png" style="width:100%;height:100%">
      </div>

      <!-- 项目选择 -->
      <div  v-if="goodsMenuList">
        <ul class="classifyFirst" style="overflow: auto;white-space: nowrap;">
          <li class="active" v-for="(item,inx) in goodsMenuList" :key="item.count+item.catName" @click="showGoods(item.catName,inx)" :class='index==inx?"flag":""'>
            <span>{{item.catName}}</span>
          </li>
        </ul>
      </div>

      <!-- 项目展示 -->
      <div>
      <scroller  v-if="!no_data"  ref="scroller" :auto-fill="false" v-on:load="BaiFuMei">
        <ul class="commodityList" v-bind:class="{goodsWrap:isActive}" style="flex-flow: row wrap;padding-left: 0.4rem;padding-right: 0.4rem;padding-top: 0.4rem;background: #f6f8fa;">
            <li v-bind:class='index==0? "commodityNew":"commodity"'  @click="toDetail(item.id)" v-for="(item,i) in goodsDetailList"  :key="item.id+item.catid+item.doctor_id+item.his_id+i+index" id="jinPin">
              <img class="goodsImg" :src="(imgPath+item.goods_url)" alt="" v-if="isActive">
              <img class="wit_0" :src="(imgPath+item.goods_url)" alt="" v-else>
              <div class="info infoDity" v-bind:class="{firstInfo:isActive}">
                <h4 class="goodTitle goodTitleFirst" v-bind:class="{goodsH4:isActive}" style="text-overflow: ellipsis;-webkit-box-orient:vertical;margin-top: 0; font-weight: normal;">{{item.name}}</h4>

                <div class="price" style=" margin-bottom: 0.293rem;display: flex;align-items: center;">
                  <span class="leftPrice">￥{{item.qzd_price}}</span>
                  <span class="right" :class="{goodsPrice:isActive}" style=";color:#999999;text-decoration: line-through;">￥{{item.hos_price}}</span>
                </div>

                <div class="price"  v-bind:class="{firstPrice:isActive}" style="font-size: 0.32rem;position: relative;color:#999;">
                  <span :data-hospitalId="item.hospital_id">{{item.anotherName}}</span>
                  <span class="goodBook bookCount" style="position: absolute;right: 10%;">
                    <b>已预约</b>
                    <b style='margin-left: 0.1rem;'>{{item.appoint_count}}</b>
                  </span>
                </div>
              </div>
            </li>
        </ul>
      </scroller>
    </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>

  .hotActivity{
    padding: 0 0.2667rem;
    overflow: hidden;
    padding-bottom: 0.9067rem;
    padding-top: 0.5rem;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
  }
  ::-webkit-scrollbar {
    display:none;
  }
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

  .hospitalList{

    padding-top: 0 !important
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

  .FirstOrder{
    display: inline-block;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    font-size: 0.64rem;
    color: #333333
  }

  #shop .classifyWrap li {
    display: inline-block;
    /* text-align: center; */
    /* height: .64rem; */
    line-height: .64rem;
    font-size: .4rem;
    /* border-radius: .32rem; */
    /* box-shadow: 0 1px 0.16rem 0.0267rem rgba(255,131,199,.2); */
    color: #8c8c8c;
    margin-left: .66rem;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    height: 0.8rem;
    margin-top:0.3rem;
  }

  /*.classifyWrap::-webkit-scrollbar {display:none}*/

  .goodsWrap{
    flex-direction: row !important;
  /*  flex-wrap:wrap;*/
    padding-left: 0.2667rem;
    align-items: normal !important;
  }

  .goodsImg{
    width: 4.4rem;
    opacity: 1;
    height: 4.5rem;
    border-radius: 0.21rem
  }

  .commodityList li:nth-of-type(even){
    margin-right: 0 !important;
  }

  .goodsHead{
    margin-right: 0.2667rem;
  }

  .commodityNew{
    margin-right: 0.4rem;
    border-radius: 0.21rem;
    margin-bottom: 0.3733rem
  }

  .commodity-icon h4{
    margin-top: 0.3467rem;
    color: #282828;
    margin-bottom: 0.2rem;
    font-weight: bold;
    line-height: 125%;
    /* display: -webkit-box; */
    /* -webkit-box-orient: vertical; */
    /* -webkit-line-clamp: 2; */
    /* overflow: hidden; */
    font-size: 0.36rem;
  }

  .classifyFirst li:first-child{
    margin-left: 0.4rem;
  }

  .flag{
    background: url("./images/trigger.png") no-repeat 0 0.66rem;
    background-size: 1.0rem 0.1rem;
    background-position-x: 50%;
    background-position-y: 100%;
    color:#000 !important;
  }

  .whiteRichMeiImg{
    width: 9.1rem;
  }

  .leftPrice{
    color: #ff4242;
    font-size: 0.4rem;
    margin-right: 0.3333rem;
    font-weight: normal;
  }

  .goodBook{
    font-size: 0.32rem;
    margin-left: 0.26rem;
    vertical-align: sub
  }
  #shop .commodityList{
    justify-content: inherit !important;
  }

  #jinPin{
   /* width:50%;
    margin-right: 0 !important;
    margin-bottom: 0.4rem;
    background: #fff;
    padding-right: 0.1rem;
    padding-left: 0.1rem;*/
     background: rgb(255, 255, 255);
}


  .goodTitle{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-top: 0.38rem;
    margin-bottom: 0.4rem;
    font-size: 0.34rem;
    line-height: 125%;
    font-size: 0.3733rem;
  }

</style>

<script>
import { mapState } from "vuex";
// import "common/css/shop.css";
import imgPath from "../../common/api/imgConfig.js";
import setSessionKey from "../../common/js/setSessionKey.js";
import scroller from "../../components/public/scoller.vue";
import utils from "../../common/js/utils";
import Api from "../../common/api/api.js";
import { Toast } from "mint-ui";

export default {

  data() {
    return {
      isActive:true,
      no_data:false,
      imgPath,
      city:'',
	    goodsMenuList:[],
      index:0,
      goodsDetailList:[],
      commendedGoodsFirst:[],//第一次加载的商品
      commendedGoodsMore:[],//下拉加载商品
      user_id:"",
      category:"精品",
      pageNum:1
    };
  },

  created:function(){

    // document.getElementById("shop").scrollTop=0
    // this.$refs[top].scrollIntoView()
    // this.$refs.top.scrollTop=0
    this.$root.$el.scrollTop=0
    // document.body.scrollTop=0
    let userInfo = JSON.parse(localStorage.getItem("personInfo"));
    if (userInfo) {
      this.user_id = userInfo.user_id;
    }
    if(this.$route.query.city){
      this.city=this.$route.query.city
    }else{
      this.city="深圳市"
    }

   let self=this
   let params = {city:this.city};
      Api.BaiFuMeiMenu(params)
      .then(data=>{
        if(data.status == '0'){
          self.goodsMenuList=data.data
          self.goodsMenuList.forEach((item,i)=>{
            self.city=item.city
            if(item.catName=="精品"){
              self.goodsMenuList.splice(i,1)
              self.goodsMenuList.unshift(item)
              self.BaiFuMei("clickNext")
            }
          })

        }else{
          Toast({
            message: "系统错误，请稍后再试",
            position: "middle",
            duration: 2000
          });
        }
      })

      try{
        wb_ShowShoppingcart("0")
      }catch(err) {
        console.log(err)
      }
  },

 //点击项目切换商品展示
  methods: {
    BaiFuMei(smble){
      let self=this
      let clickFlag;
        let params = {city: this.city,category:this.category,pageNum:self.pageNum,pageSize:10};
        Api.BaiFuMei(params)
        .then(data=>{
          if(smble=="clickNext"){ //点击调用则data.data.goods.length可以为0，如果下拉则不可以
            clickFlag=true
          }else{
            clickFlag=data.data.length
          }
          if(data.status == '0' && clickFlag){
            if(self.pageNum==1){ //初始化第一次返回的商品
                self.commendedGoodsFirst=data.data
                self.goodsDetailList=self.commendedGoodsFirst
            }else{ //下拉刷新的商品
              self.commendedGoodsMore=data.data
              self.goodsDetailList=self.goodsDetailList.concat(self.commendedGoodsMore)
              if (typeof self.$refs.scroller !== "undefined") {
                self.$refs.scroller.removeLoading();
              }
            }

            self.pageNum+=1
            self.goodsDetailList.forEach((item,i)=>{
              if(!item.goods_url){
                item.goods_url=item.goods_video_url_pic
              }
            })

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

    showGoods(catName,index){
      this.index=index
      if(this.index==0){
        this.isActive=true
      }else{
        this.isActive=false
      }

      this.goodsDetailList=[]
      this.pageNum=1
      this.category=catName
      this.BaiFuMei("clickNext")
    },

    // 商品详情
    toDetail(id, user_id) {
      // let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
      // let data ={web_url:baseUrl+"shop.html#/detail/" + id + "/" + this.user_id+"/"+"?city="+encodeURI(this.city)};
      // let JsonObjStr =JSON.stringify(data);
      // try{
      //   openWebView(JsonObjStr)
      // }
      // catch(err){
      //   window.location.href =baseUrl + "shop.html#/detail/" + id + "/" + this.user_id+"/"+"?city="+encodeURI(this.city);
      // }
      let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));

      window.location.href =baseUrl + "shop.html#/detail/" + id + "/" + this.user_id+"?city="+this.city;
    },
  },

  components: {
    scroller
  }

};
</script>


