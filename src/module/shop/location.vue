<template>
  <body>

  <div class="-widget-top-bar">
    <div class="page-title"></div>
    <!-- <div class="goBack" style="position: absolute;z-index: 9999">
        <img src="./images/back.png"  @click="$router.back(-1)">
    </div> -->
    <div class="curr-location" style="margin-left: 1.5rem;">当前定位城市:</div>
    
  </div>
        
  <!-- 项目选择 -->
  <div id="location-pop" style="display: block;transform-origin: 0px 0px 0px;opacity: 1;transform: scale(1, 1);">     
    <div class="list-wrapper" style="height: 622px;">         
      <div class="left-list" id="province_list" style="height: 622px;">
        <ul class="classifyWrap">
          <li v-for="(item,index) in provinceList" :key="item.id" @click="selectProvince(index)" :class='index===provinceActive?"current":""'>
            <span>{{item.province}}</span>
          </li>
        </ul>
      </div>

      <div class="right-list" id="city_list" v-if="cityList">
        <ul class="classifyWrap">
          <li v-for="(item,index) in cityList" :key="item.id" @click="selectCity(index)">
            <span>{{item.city}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
import { mapState } from "vuex";
// import "common/css/shop.css";
import imgPath from "../../common/api/imgConfig.js";
import setSessionKey from "../../common/js/setSessionKey.js";
import utils from "../../common/js/utils";
import Api from "../../common/api/api.js";
import { Toast } from "mint-ui";

export default {
   
  data() {
    return {
      imgPath,
      city:"",
      province:"",
      provinceList:[],
      cityList:[],
      user_id:"",
      provinceActive:false,
      cityActive:false
    };
  },

  created:function(){
    window.scrollTo(0,0)
    let userInfo = JSON.parse(localStorage.getItem("personInfo"));
    if (userInfo) {
      this.user_id = userInfo.user_id;
    }
	  let self=this
    Api.location()
    .then(data=>{ 
      if(data.status == '0'){
        self.provinceList=data.data
      }else{
        Toast({
          message: "系统错误，请稍后再试",
          position: "middle",
          duration: 2000
        });
      }
    })
  },
  
 //选择省份
  methods:{                                    
    selectProvince(index){
      this.cityList=this.provinceList[index].citys;
      // 记住所选省份的标示
      this.provinceActive=index;
      this.cityActive=false
    },

    // 选择城市
    selectCity(index){
      this.city=this.cityList[index].city;
      // this.province=this.provinceList[index].province;

      this.cityActive=index
      this.$router.push({path:'/', query: {city: this.city,province:this.provinceList[this.provinceActive].province}})
      // let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
      
      // window.location.href =baseUrl + "shopIndex.html#"+"/index/shop"+"?city="+this.city+"&province="+this.provinceList[this.provinceActive].province;
    },
  },

};
</script>

<style type="text/css" scoped>
  
  

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
  }

  .-widget-top-bar {
    height: 44px;
  }

  .-widget-top-bar .page-title {
    position: fixed;
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: #333;
    font-size: .8rem;
    text-align: center;
    background-color: #fff;
    z-index: 4000;
    font-size: 0.4rem;
  }

  .-widget-top-bar .curr-location {
    padding: 0 15px;
    left: 0;
    color: #72dacf;
    font-size: .65rem;
    max-width: 4.5rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.4rem;
    
  }


  .-widget-top-bar .show-search {
    right: 44px;
    width: 44px;
    
  }

  .-widget-top-bar .curr-location, .-widget-top-bar .show-search, .-widget-top-bar .show-user{
    top: 0;
    height: 44px;
    line-height: 44px;
    z-index: 4001;
    position: fixed;
    text-align: center;
  }

  .-widget-top-bar .icon {
    font-size: 20px;
    color: #2CC7C5;
  }

  .#location-pop{
    width: 100%;
    position: fixed;
    top: 45px;
    left: 0;
    z-index: 11;
    display: none;
  }

  .list-wrapper{
    position: absolute;
    width: 100%;
    background: #fff;
    z-index: 999;
    font-size: .6rem;
    color: #777;
    overflow-x: hidden;
  }

  .list-wrapper .current{
    width: 100%;
    border-left: 2px solid #ff67b2;
    color: #ff67b2;
    background: #fff;
  }

  .list-wrapper .left-list{
    float: left;
    width: 33%;
    background: #f5f5f5;
    overflow: auto;
  }

  .list-wrapper li{
    display: block;
    height: 1rem;
    line-height: 1rem;
    text-align: left;
    padding-left: .5rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .list-wrapper .right-list{
    padding-left: 34%;
  }
  
  .cityActive{
    background: #ff67b2;
    color: #fff
  }
  
</style>
