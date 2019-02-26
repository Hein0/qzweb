<template>
  <div id="shop">
    <div class="container mat04">
      <div id="search" class="" style=" margin-top: 0.344rem;">
        <div  id="SearchBar" class="">
          <div id="searchbar-head" style="width: 90%;margin-left: 0.5rem;display: flex;background-color: #fff;height: .88rem;-webkit-align-items: center;-ms-flex-align: center;align-items: center;-webkit-justify-content: space-between;-ms-flex-pack: justify;justify-content: space-between;padding: 0 4%;">
            <div class="searchbar-input" style=" padding-right: .3rem;line-height: .88rem;-webkit-flex: 1;-ms-flex: 1;flex: 1;font-size: .28rem;border: 1px solid #ccc;border-radius: 999px;display: -webkit-flex;display: -ms-flexbox;display: flex;height: 0.88rem;">
              <span class="iconfont icon-search"></span> 
              <form action="#" onsubmit="return false" class="search-wrapper">
                <input id="searchInput"  ref="input1" type="search" autofocus="autofocus" placeholder="搜索项目/医院/医生" v-model="msg" @keyup.13='clickSearch'>
              </form>
            </div>

            
            <!-- <span class="searchbar-btn" style="margin-left: .3rem;" @click="gotoMall">取消</span> -->
            
          </div> 
        </div> 
      </div>

      <!-- 搜索产品 -->
      <scroller  v-if="!no_data"  ref="scroller" :auto-fill="false" v-on:load="searchGoods" style="margin-top: 0.6rem;">
        <ul class="commodityList">
            <li class="commodity"  @click="toDetail(item.coId)" v-for="(item,index) in searchGoodsList"  :key="item.coId+item.coCatId+item.dtId+item.hsId+item.hsId+index" style="border-bottom: 1px solid #f6f8fa">
              <img class="wit_0" :src="(imgPath+item.coLogo)" alt="">
              <div class="info infoTy" style="margin-left:0.293rem ">
                <h4 class="searchGoodsLi" style="text-overflow: ellipsis;font-weight: normal;-webkit-box-orient:vertical">{{item.coName}}</h4>
                
                <div class="price priceTy" style="margin-bottom: 0.2667rem;">
                  <span class="left" style="font-size: 0.4533rem;margin-right: 0.2667rem;">￥{{item.coPlatPrice}}</span>
                  <span class="right" style="font-size: .32rem;">￥{{item.coFullPrice}}</span>
                </div>

                <div class="price" style="font-size: 0.34rem;position: relative;color:#999999;">
                  <span :data-hospitalId="item.hospital_id">{{item.hsAnotherName}}</span>
                  <span class="bookOrder" style="position: absolute;right: 10%;">
                    <b>已预约</b>
                    <b style='color:#999999;margin-left: 0.1rem;vertical-align: bottom;'>{{item.coPreOrder}}</b>
                  </span>
                </div>
              </div>
            </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>
<style type="text/css" scoped>
 #searchbar-head, .search-wrapper{
    width: 100%;
  }

  #searchInput{
   width: 100%;
   background: url("./images/search.png") no-repeat 6% 50%;
   padding-left: 0.8rem;
    padding-left: 1.0rem;
    background-size: 0.4rem 0.4rem;
    /*line-height: 0.6rem;*/
    /*height: 30px;margin: 10px 0;"*/
    height: 0.88rem;
 }

  #SearchBar{
    position: inherit;
  }

  #searchbar-head .searchbar-input{
    border: 1px solid #ccc;
    color: #ccc;
  }

  #searchbar-head{
    width: 90%;
    margin-left: 0.5rem;
  }
  
  #searchbar-head .searchbar-btn{
    font-size: 0.4rem
  }

  .bookOrder{
    position: absolute;
    right: 6%
  }

  .info{
    width: 6.4266rem !important;
  }

  .wit_0{
    width: 2.213rem;
    height: 2.213rem;
    border-radius: 0.1rem
  }

  .searchGoodsLi{
    text-overflow: ellipsis;
    font-weight: normal;
    -webkit-box-orient: vertical;
    font-size: 0.4rem;
    -webkit-line-clamp: 2;
    overflow: hidden;
    display: -webkit-box;
    height: 0.9rem;
    line-height: 0.48rem !important;
    margin-bottom: .293rem!important;
    color: #333!important;
    font-weight: 400!important;

  }

  .searchList{
    padding-top: 0.6rem !important;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    align-items: flex-start !important;
  }

  .searchLity{
    padding: 0 !important;
    margin-bottom: 0 !important; 
    align-items: center;
    width: 9.2rem !important;
  }

  .infoTy{
    margin-right: 0 !important; 
  }

 /* .priceTy{
        align-items:end !important;
  }*/
</style>


<script>
import { mapState } from "vuex";
import "common/css/shop.css";
import imgPath from "../../common/api/imgConfig.js";
import setSessionKey from "../../common/js/setSessionKey.js";
import scroller from "../../components/public/scoller.vue";
import utils from "../../common/js/utils";
import Api from "../../common/api/api.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      imgPath,
      no_data:false,
      msg:"",
      city:"",
      searchGoodsList:[],
      searchGoodsListFirst:[], //第一次显示
      // searchGoodsListMore:[], //下拉刷新
      user_id:"",
      pageNum:1
    };
  },
  components: {
    scroller
  },
  
  methods: {
    // 搜索商品
    searchGoods(smble){
      let self=this
      if(this.msg){
        let clickFlag;
        let params = {name:this.msg ,city: this.city,pageNum:self.pageNum,pageSize:10};
        Api.searchGoods(params)
        .then(data=>{ 

          if(smble=="clickNext"){ //字符变化调用此方法搜索，则data.data.goods.length可以为0，如果下拉则不可以
            clickFlag=true
          }else{
            clickFlag=data.data.length
          }

          if(data.status == '0' && clickFlag){
            if(self.pageNum==1){ //初始化第一次返回的商品
              self.searchGoodsListFirst=data.data
              self.searchGoodsList=self.searchGoodsListFirst
            }else{ //下拉刷新的商品
              self.searchGoodsListMore=data.data
              self.searchGoodsList=self.searchGoodsList.concat(self.searchGoodsListMore)
              if (typeof self.$refs.scroller !== "undefined") {
                self.$refs.scroller.removeLoading();
              }
            }
            
            self.pageNum+=1
            self.searchGoodsList.forEach((item,i)=>{
              if(item.coPlatPrice.indexOf(".")>-1){
                  item.coPlatPrice=item.coPlatPrice.slice(0,item.coPlatPrice.indexOf("."))
              }
              
              if(item.coFullPrice.indexOf(".")>-1){
                  item.coFullPrice=item.coFullPrice.slice(0,item.coFullPrice.indexOf("."))
              }

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
      }
    },
  

    // 商品详情
    toDetail(id) {
      let baseUrl = window.location.href.slice(
        0,
        window.location.href.indexOf("shop.html")
      );
      window.location.href =
        baseUrl + "shop.html#/detail/" + id + "/" + this.user_id+"/"+"?city="+this.city;
    },

    gotoMall(){
      let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
      window.location.href =baseUrl + "shopIndex.html#"+"/index/shop"
    },

    clickSearch(){
      this.$refs.input1.blur();
      this.pageNum=1
      this.searchGoods("clickNext")
    }
  },
    
  // 初始化
  created:function(){
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

    try{
      wb_ShowShoppingcart("0")
    }catch(err) {
      console.log(err)
    } 
  },

  // 搜索框内容改变就触发搜索
  watch:{
    msg(){
      let self=this;
      setTimeout(function(){
        self.pageNum=1
        self.searchGoods("clickNext")
      },200)
    }
  },

  // 失去焦点才触发
  // computed:{
  //   message:function(){
  //     return this.searchGoods()
  //   }
  // }
};

</script>

