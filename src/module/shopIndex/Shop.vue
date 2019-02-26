<template>
  <div id="shop" @scroller="handleScroll">
    <div class="container"  ref="scrollerDocument">
      <div class="topWrap">
        <!-- 搜索框 -->
        <div id="SearchBar" v-bind:class='searchBarFixed?"isFixed":""'>
            <div id="searchbar-head">
               <!-- style="z-index:9" -->
              <span id="searchCity" @click="goToLocation" onclick="_czc.push(['_trackEvent', 'app商城定位框', '选择城市']);">{{city}}</span>
               <!-- style="z-index: 9999" -->
                <div class="searchbar-input" @click="SearchGoods" onclick="_czc.push(['_trackEvent', 'app商城搜索框', '搜索']);">
                  <span class="iconfont icon-search"></span> 
                  <form action="#" onsubmit="return false" class="search-wrapper">
                    <input id="searchInput" type="search" placeholder="搜索项目/医院/医生">
                  </form> 
                </div>
              </div> 
            <div id="autoCompleteList" style="display: none;">
              <div class="searchlist"></div>
            </div>
        </div>

        <!-- 轮播图 bannerList --> 
        <div class="bannerInfo">
          <mt-swipe  :auto="2000" :continuous='true'>
            <mt-swipe-item v-for="(item,index) in bannerList" :key="item.id+item.link">
              <ul class="bannertalList" @click="nextTo(item.link)" onclick="_czc.push(['_trackEvent', 'app商城轮播图', '跳转图片链接']);">
                <li class="hospital">
                  <img :src="(imgPath+item.imgUrl)" alt="" style="width: 100%;height: 100%">
                </li>
              </ul>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <location v-show='isLocation' class="location" v-on:close="close"></location>
      <!-- 我的红包 -->
      <my-packet></my-packet>

      <!-- 热门活动 -->
      <hot-activity :cityName="cityAll" ></hot-activity>

      <!-- 快捷筛选 -->
      <h1 class="hotHead titleColor">热门项目</h1>
      <ul class="quickScreen">
        <li style='width:20%;text-align: center;padding-bottom: 0.24rem' v-for="(item,index) in projectList" :key="item.name" @click="quickScreening(item.name)" class="hot" v-bind:class='(index+1)%5==0?"no_marginRight":""' onclick="_czc.push(['_trackEvent', 'app商城热门项目', '项目名称']);">
          <img :src="imgPath+'app'+item.src" alt="" style="opacity: 1;width:1.24rem;">
          <p style="text-align: center;line-height:0.8rem;font-size: 0.32rem;">{{item.name}}</p>
        </li>
         <div class="jiantou" @click="showAll" v-text='isHide?"收起":"展开全部"' :class='isHide?"showProgram":"hideProgram"'></div>
      </ul>

      <!-- 推荐商品 -->
      <scroller v-on:load="recommendedGoods" ref="scroller" v-if="!no_data" :auto-fill="false">
        <ul class="commodityList" v-if="commendedGoods" style="flex-direction: row;flex-wrap:wrap;padding-left: 0.3733rem;background: #f5f7f9;padding-top: 0.46rem;">
              <li  :key="item.id+item.his_id+item.catid+item.doctor_id+i+item.create_time+item.hospital_id+item.doctor_name" v-for="(item,i) in commendedGoods" @click="toDetail(item.id)" v-bind:class='(index+1)%2==0?"no_marginRight":""' style="margin-right:0.4rem;width: 4.4rem;margin-bottom: 0.3733rem;border-radius: 0.21rem;overflow: hidden;">
              <img :src="(imgPath+item.goods_url)" alt="" style="width:100%;opacity: 1;height: 4.5rem;">
              <div class="info">
                <h4 class="goodTitle">{{item.name}}</h4>
                <div class="price" style="height: 0.48rem">
                  <span class="left" style="font-weight: 500;" >￥{{item.qzd_price}}</span>
                  <span class="right">￥{{item.hos_price}}</span>
                </div>

                <div class="price" style="position: relative;font-size: 0.3267rem;margin-left: 0.1rem;height: 0.4rem">
                  <span class="hospitalName" style="color:#999999;">{{item.anotherName}}</span>
                  <span class="hasBook" style="position: absolute;right: 4%;"><b style="color:#999999;">已预约</b><b style="color:#999999;"> {{item.appoint_count}}</b></span>
                </div>
              </div>
            </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<style scoped>
  #SearchBar{
    position: absolute;
    box-sizing: border-box;
    /*margin-top: 0.46rem;*/
    z-index: 100000;
    position: fixed;
    height: 1.8rem;
    width:100%;
  }

  .isFixed{
    position:fixed;
    background-color:#f5f7f9;
    top:0;
    z-index:999;
  }

  .no_marginRight{
    margin-right: 0 !important
  }

  .titleColor{
    color: #444444
  }
  
  /*.hasBook{
    line-height: 0.48rem;
  }*/
/*  .hot{
    background: url("./images/hotActivity.jpg");
  }*/

  #searchbar-head{
    height: 1.8rem;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: flex-end;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 6%;
    display: flex;
    width: 100%;
    padding-bottom: 0.2rem;
    /*border-bottom:1px solid #ccc */
  }

  #searchbar-head .searchbar-input{
    padding-left: .4rem;
    padding-right: .3rem;
    background-color: #fff;
    line-height: .6rem !important;
    -webkit-flex: 1;
    -ms-flex: 1;
    /*flex: 1;*/
    font-size: .28rem;
    color: #999999;
    /*border: 1px solid #fff;*/
    border-radius: 1rem;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    /*display: inline-table;*/
    z-index: 9999;
    width: 6.6rem;
    height:0.88rem;
  }

  #searchInput{
    background: url("./../shop/images/search.png") no-repeat 2% 50%;
    padding-left: 0.66rem;
    width: 6.6rem;
    background-size: 0.4rem 0.4rem;
    line-height: 0.88rem;
    height: 0.88rem;
  }

  .iconfont{
    font-family: iconfont!important;
    font-size: 100%;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #searchbar-head .searchbar-btn{
    width: .8rem;
    margin-left: .3rem;
    color: #333;
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
    opacity: 0.8;
  }

  #searchCity{
    display: inline-block;
    width: 1.8rem;
    background: #fff;
    color: #999999;
    height: 0.88rem;
    z-index: 99999;
    margin-right: 0.36rem;
    border-radius: 0.8rem;
    border: 1px solid #fff;
    text-align: center;
    line-height: 0.88rem;
  }
  
  .quickScreen{
    padding: 0 0.2667rem;
    overflow: hidden;
    padding-bottom: 1.0rem;
    padding-top: 0.5rem;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    position: relative;

  }

  .hotHead{
    font-size: 0.4rem;
    margin-left: 0.4rem;
    
  }

  a{
    text-decoration: none
  }

  /*.topWrap{
    padding-top: 0.46rem;
  }*/
  .bannerInfo{
    height: 6.1rem;
  }
  
  .hospitalList{
    
    padding-top: 0 !important
  }

  .bannerInfo .mint-swipe-indicators {
    bottom: 0.3467rem !important;
  }

  .projects{
    padding-top: 0.6rem !important
  }

  .topWrap{
    margin-bottom: 0.48rem
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

  .goodTitle{
/*    margin-top: 0.3467rem;*/
    font-size: 0.3733rem;
    color: #444444;
    margin-bottom: 0.293rem;
    line-height: 0.48rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient:vertical;
    text-overflow: ellipsis;
    height: 0.9rem;
  }

  .left{
    color: #ff4242;
    font-size: 0.4rem;
    margin-right: 0.1333rem;
    
  }

  .right{
    color: #c8c8c8;
    font-size: 0.32rem;
    text-decoration: line-through;
    font-weight: 500;
  }

  .book{
    
  }

  .hospitalName{
    color: #8c8c8c;
    font-size: 0.32rem;
  }
  .price{
    margin-bottom: 0.293rem
  }

  .bannertalList{
    display: -webkit-flex;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-around;
  }

  #shop .mint-swipe {
    height: 6.1rem !important
  }

  .jiantou{
    margin-left: 3.6rem;
    font-size: 0.32rem;
    color: #999;
    width: 2.6rem;
    height: 1.0rem;
    line-height: 1.0rem;
    position: absolute;
    right: 32%;
    bottom: 0%;
  }
  .hideProgram{
    background: url("./../shop/images/jianTou_1.png") no-repeat 88% 53%;;
    background-size: 14px auto;
    background-position: 64%;
  }
  .showProgram{
    background: url("./../shop/images/ico.png") no-repeat 48% 53%;;
    background-size: 14px auto;
    background-position: 40%;
    
  }

  #shop .commodityList{
    justify-content: inherit !important
  }

  .info{
    background:#fff;
    padding-top: 0.2667rem;
    padding-bottom: 0.293rem;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
  }
  .location{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999999999
  }
</style>


<script>
import { mapState } from "vuex";
import "common/css/shop.css";
import imgPath from "../../common/api/imgConfig.js";
import setSessionKey from "../../common/js/setSessionKey.js";
import scroller from "../../components/public/scoller.vue";
import hotActivity from "./../shop/components/hotActivity.vue";
import myPacket from "./../shop/components/myPacket.vue";
import utils from "../../common/js/utils";
import Api from "../../common/api/api.js";
import { Toast } from "mint-ui";
import location from './location.vue';

export default{
  props: ["cityName"],
  data() {
    return {
      imgPath,
      no_data:false,
      bannerList:[],
      imgSrc:"./images/hotActivity.png",
      city:"",
      cityAll:"",
      province:"",
      locationMsg:"",
      user_id:"",
      isHide:false,
      searchBarFixed:false,
      myRedpacketList:[],
      commendedGoodsFirst:[],//第一次返回的商品
      commendedGoods:[],
      projectList:[],
      pageNum:1,
      isLocation:false,
      // newRedpacketList:[],
      hotActivityList:[
        {name:"全部项目",src:"/static/img/allProgram.png"},
        {name:"玻尿酸",src:"/static/img/boNiaoSuan.png"},
        {name:"肉毒素",src:"/static/img/rouDuSu.png"},
        {name:"水光针",src:"/static/img/shuiGuangZhen.png"},
        {name:"脂肪填充",src:"/static/img/tianChong.png"},
        {name:"眼部整形",src:"/static/img/eyes.png"},
        {name:"鼻部整形 ",src:"/static/img/nose.png"},
        {name:"半永久妆",src:"/static/img/wenMei.png"},  
        {name:"激光脱毛",src:"/static/img/tuoMao.png"},
        {name:"皮肤美容",src:"/static/img/skin.png"},

        {name:"美体塑形",src:"/static/img/meiTi.png"},
        {name:"面部轮廓",src:"/static/img/face.png"},
        {name:"胸部整形",src:"/static/img/breast.png"},
        {name:"牙齿美容",src:"/static/img/mouth.png"},
        {name:"毛发种植",src:"/static/img/hair.png"},
        {name:"抗衰抗初老",src:"/static/img/preventOld.png"},
        {name:"失败修复",src:"/static/img/repair.png"},
        {name:"下巴",src:"/static/img/jaw.png"},
        {name:"私密整形",src:"/static/img/siMi.png"},
        {name:"唇部整形",src:"/static/img/lip.png"},
      ]
    };
  },
  components: {
    scroller,
    hotActivity,
    myPacket,
    location
  },
 
  methods: {

    init() {
       
      this.projectList=this.hotActivityList.slice(0,10)
    },

    nextTo(link){
      window.location.href=link+"?city="+this.cityAll
    },

    close(city,province){
      let self=this
      if(city && province){
        this.city=city
        this.cityAll=city
        this.province=province;
        if(self.city.length>3){
          self.city=self.city.slice(0,3)+"..."
        }
        sessionStorage.setItem("city",this.cityAll);
        sessionStorage.setItem("province",this.province);
      }
      this.isLocation=false
     
    },
    // 定位城市
    showCityInfo(fn,fn1){
      var self=this
      var citysearch = new AMap.CitySearch();
      //自动获取用户IP，返回当前城市
      citysearch.getLocalCity(function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
              let cityinfo = result.city;
              let citybounds = result.bounds;
              // 选择省份，取省份简称
              self.province=result.province.slice(0,2);
              if(self.province=="内蒙古自治区" || self.province=="黑龙江省"){
                self.province=result.province.slice(0,3);
              }

              // 获取城市，默认显示三位
              self.city=cityinfo;
              self.cityAll=cityinfo
              if(self.city.length>3){
                self.city=self.city.city.slice(0,3)+"..."
              }
            }
        } else { 
          self.city="深圳市"
        }

        fn && fn()
        fn1 && fn1()
      });
    },

    // 展开所列图
    showAll(){
      this.isHide= !this.isHide
      if(this.isHide){  //显示缩略图
        this.projectList=this.hotActivityList
      }else if(!this.isHide){ //显示展开图
       this.projectList=this.hotActivityList.slice(0,10)
      }else{
        this.projectList=this.hotActivityList.slice(0,10)
      }
    },

    // 获取轮播图
    initEd(){
      let self=this
      let params = {city:this.province};
        Api.mallBanner(params)
        .then(data=>{ 
          if(data.status == '0'){
            self.bannerList=data.data
            
          }else{
            Toast({
              message: "系统错误，请稍后再试",
              position: "middle",
              duration: 2000
            });
          }
        })

    },

    // 快捷筛选
    quickScreening(item,id){
      // this.$router.push({path:'./quickScreening',query:{city:this.city,category:item}})
      let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
      
      window.location.href =baseUrl + "shop.html#/quickScreening"+"?city="+this.city+"&category="+item;

    },

    SearchGoods(){
      // this.$router.push({path:'./SearchGoods',query:{city:this.city}})
      let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
      
      window.location.href =baseUrl + "shop.html#/SearchGoods/" +"?city="+this.city;
    },

    goToLocation(){
      // let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
      
      // window.location.href =baseUrl + "shopIndex.html#/location/index";
      this.isLocation=true
    },

    // 推荐商品
    recommendedGoods(){
      let self=this
      let params = {city:this.cityAll,pageNum:self.pageNum,pageSize:10};
        Api.recommendedGoods(params)
        .then(data=>{ 
          let clickFlag
          if(self.pageNum==1){
            clickFlag=true
          }else{
            clickFlag=data.data.length
          }
          if(data.status == '0' && clickFlag){
            if(self.pageNum==1){ //初始化第一次返回的商品
              self.commendedGoodsFirst=data.data
              self.commendedGoods=self.commendedGoodsFirst
            }else{ //下拉刷新的商品
              self.commendedGoodsMore=data.data
              self.commendedGoods=self.commendedGoods.concat(self.commendedGoodsMore)
              if (typeof self.$refs.scroller !== "undefined") {
                self.$refs.scroller.removeLoading();
              }
            }
            self.pageNum+=1
            self.commendedGoods.forEach((item,i)=>{
              if(!item.goods_url){
                item.goods_url=item.goods_video_url_pic
              }
            })
          }else{
            if (typeof self.$refs.scroller !== "undefined") {
              self.$refs.scroller.removeLoading();
            }
            Toast({
              message: this.pageNum==1?"系统错误，请稍后再试":"已加载完毕",
              position: "middle",
              duration: 2000
            });
          }
        })
    },

    // 商品详情
    toDetail(id, user_id) {
      // this.$router.push({path:'./detail/'+id+'/'+this.user_id, query: {city: this.city}})
      let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
      window.location.href =baseUrl + "shop.html#/detail/" + id + "/" + this.user_id+"?city="+this.city;
      // window.location.href =baseUrl + "shopIndex.html#/"+this.user_id;
    },

    handleScroll () {
      let scrollTop =  this.$refs.scrollerDocument.scrollTop || document.documentElement.scrollTop
      let clientHeight=this.$refs.scrollerDocument.clientHeight;
      if (scrollTop >100) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }
    }
  },
  
  created: function() {
    let self=this
    let userInfo = JSON.parse(localStorage.getItem("personInfo"));
    if (userInfo) {
      this.user_id = userInfo.user_id;
    }
    // 清除掉进日关键词页面的标示
    sessionStorage.removeItem("caseFlag")  
    if(sessionStorage.getItem("city") && sessionStorage.getItem("province")){ //用户选择了城市，则以用户选择为准
      self.city=sessionStorage.getItem("city")
      self.province=sessionStorage.getItem("province")
      self.cityAll=sessionStorage.getItem("city")

      if(self.city.length>3){
        self.city=self.city.slice(0,3)+"..."
      }
      // this.initEd();
      // this.recommendedGoods();
    }else{ //如果没有选择，则系统定位
      this.showCityInfo()
    }

    this.init()
  },

  watch:{
    city(){
      this.pageNum=1
      this.initEd();
      this.recommendedGoods();

    } 
  },

  mounted () {
    this.$refs.scrollerDocument.addEventListener('scroll', this.handleScroll)
  },
};
</script>

