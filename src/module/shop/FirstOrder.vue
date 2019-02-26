 <template>
  <div id="shop">
    <div class="container mat04"  ref="top" id="shopList">
      <!-- <div class="goBack" style="margin-top: 0.4rem">
        <img src="./images/back.png"  @click="$router.back(-1)">
      </div> -->
      <h1 class="FirstOrder" style="padding-bottom: 0.4rem;color:#333333">新人第一单</h1>
      <span class="instruction">/现金红包无限叠加</span>
       
      <img src="./images/tip.png" style="margin-left: 0.2rem;width: 0.3733rem; margin-bottom: 0.1rem;" @click="packTips">
      <div class="hongaoImg" style="width: 9.1rem">
        <img src="./images/hongBao.png" style="width:100%">
      </div>
        
      <div v-if="goodsMenuList">
        <ul class="classifyFirst" style="overflow: auto;white-space: nowrap;">
          <li class="active"  v-for="(item,inx) in goodsMenuList" :key="item.count+item.catName" @click="showGoods(item.catName,inx)" :class='index==inx?"flag":""'>
            <span>{{item.catName}}</span>
          </li>
        </ul>
      </div>

      <scroller v-if="!no_data"  ref="scroller" :auto-fill="false" v-on:load="FirstOrder">
        <ul class="commodityList" v-if="goodsDetailList" style=" flex-flow: row wrap;padding-left: 0.4rem; padding-right: 0.4rem;padding-top: 0.4rem;background: #f6f8fa;padding-top: 0.4rem;background: #f6f8fa;" v-bind:class="{goodsWrap:isActive}">
            <li :class='index==0?"commodityNew":"commodity"'  :key="item.id+item.hospital_id+item.his_id+i+index+item.catid+item.doctor_id" v-for="(item, i) in goodsDetailList" @click="toDetail(item.id)" style="background: #fff;" id="jinPin">
              <img class="goodsImg" :src="(imgPath+item.goods_url)" alt="" v-if="isActive">
              <img class="wit_0" :src="(imgPath+item.goods_url)" alt="" v-else>
              <div class="info infoDity" :class="{firstInfo:isActive}">
                <h4 class="goodTitleFirst" style="text-overflow: ellipsis;-webkit-box-orient:vertical" v-bind:class="{goodsH4:isActive}">{{item.name}}</h4>

                <div class="price" style=" margin-bottom: 0.293rem;display: flex;align-items: center;">
                  <span class="left" style="color: #ff4242;font-size: 0.4rem;">￥{{item.qzd_price}}</span>
                  <span class="right" :class="{goodsPrice:isActive}" style="color:#999999;text-decoration: line-through;font-size: 0.32rem;">￥{{item.hos_price}}</span>
                </div>
                <div class="price" v-bind:class="{firstPrice:isActive}" style="font-size: 0.32rem;position: relative;">
                  <span :data-hospitalId="item.hospital_id" style="color: rgb(153, 153, 153);">{{item.anotherName}}</span>
                  <span class="bookCount" style=" position: absolute;right: 4%;margin-left: 0.26rem;color: rgb(153, 153, 153);">
                    <b>已预约</b>
                    <b style='color:#999999;vertical-align: bottom;margin-left: 0.1rem;'>{{item.appoint_count}}</b>
                  </span>
                </div>
              </div>
            </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>
<style type="text/css">
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

  /*.topWrap{
    padding-top: 0.46rem;
  }*/
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
    color: #888888
  }
  .myPacket{
    display: inline-block;
  }

  .myPacketWrap{
    height: 4.0rem !important
  }

  .packetProject{
    float: left;
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

  #shop .commodityList{
    justify-content: inherit !important;
  }

  .commodity{
    padding: 0.4rem 0.4rem !important;
    height: auto !important;
    width: 9.2rem !important;
  }

  .hongaoImg{
    margin: 0 auto;
    margin-top: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .FirstOrder{
    display: inline-block;
    margin-top: 0.4rem;
    margin-left: 0.3rem;
    font-size: 0.64rem;
    color: #333333
  }
  
  .active{
    display: inline-block;
    text-align: center;
    height: 0.64rem;
    line-height: 0.64rem;
    font-size: 0.4rem;
    color: #8c8c8c;
    margin-left: 0.72rem;
    background-color: #fff;
    cursor: pointer;
    position: relative;
  }

  .classifyFirst li:first-child{
    margin-left: 0.4rem;
  }
  
  .bookCount{
    border-radius: 0.2rem;
    text-align: center;
    font-size: 0.32rem;
    margin-left: 0.26rem;
    vertical-align: sub;
  }

  .firstInfo{
    padding-top: 0.2667rem;
    padding-bottom: 0.293rem;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
  }

  .infoDity{
    justify-content: end !important;
    /*margin-left: 0.4rem !important;*/
    margin-right: 0 !important;
  }

  .left {

    font-weight: normal !important;
    margin-right: 0.3333rem;
  }

   .flag{
    background: url("./images/trigger.png") no-repeat 0 0.66rem;
    color:#000 !important;
    background-size: 1.0rem 0.1rem;
    background-position-x: 50%;
    background-position-y: 100%;
  }

  .size{
    font-size: 0.3rem;
    margin-bottom: 0.3rem;
    line-height: 0.66rem;
  }
  .sizeTittle{
    margin-bottom: 0.3rem;
     margin-top: 0.3rem;
  }

  .goBack{
    width: 0.85rem;
    margin-left: 0.2rem;
    margin-top: 0.2rem;
  }

  .goBack img{
    width: 100%;
  }

  .goodsImg{
    width: 4.4rem;
    opacity: 1;
    height: 4.5rem;
    border-radius: 0.21rem
  }

   .commodityNew{
    margin-right: 0.4rem;
    width:4.4rem;
    border-radius: 0.21rem;
    margin-bottom: 0.3733rem
  }

  .commodityList li:nth-of-type(even){
    margin-right: 0 !important;
  }

  #jinPin{
    /*width:50%;
    margin-right: 0 !important;
    margin-bottom: 0.4rem;
    background: #fff;
    padding-right: 0.1rem;
    padding-left: 0.1rem;*/
    /*width:4.4rem;*/

  }

  .firstPrice{
    margin-bottom: 0.293rem;
    margin-top: 0.1rem
  }

  .goodTitleFirst{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-top: 0.38rem;
    margin-bottom: 0.293rem !important;
    line-height: 0.48rem !important;
    font-size: 0.3733rem;
    -webkit-box-orient: vertical;
    margin-top: 0px;
    font-weight: normal;
    height: 0.9rem;
    color:#333333 !important;
    font-weight: normal !important;

  }

  .wit_0{
    width: 2.213rem;
    height: 2.213rem;
   /* margin-left: 0.3rem;
    margin-top: 0.28rem;*/
    border-radius: 0.1rem
  }

  .goodsH4{
    height: 0.9333rem !important
  }

  .goodsPrice{
    right: 42% !important;
    line-height: 0rem;
    font-weight: normal;
  }

  .classifyFirst::-webkit-scrollbar {display:none}

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
      isActive:true,
      wrapperHeight:0,
      user_id:"",
      city:"",
      goodsMenuList:[],
      index:0,
      goodsDetailList:[],
      commendedGoodsFirst:[], //第一次加载的商品
      commendedGoodsMore:[],//下拉加载商品
      category:"精品",
      pageNum:1
    };
  },
  created: function() {
    let userInfo = JSON.parse(localStorage.getItem("personInfo"));
    if (userInfo) {
      this.user_id = userInfo.user_id;
    }

    if(this.$route.query.city){
      this.city=this.$route.query.city
    }else{
      this.city="深圳市"
    }

   this.init();
  },
  
  methods: {
    init(){
      let self=this
        let params = {city: this.city};
        Api.FirstOrderMenu(params)
        .then(data=>{ 
          if(data.status == '0'){
            self.$refs.top.scrollTop=0
            self.goodsMenuList=data.data
            self.goodsMenuList.forEach((item,i)=>{
              self.city=item.city
              if(item.catName=="精品"){
                self.goodsMenuList.splice(i,1)
                self.goodsMenuList.unshift(item)
                self.FirstOrder("clickNext")
              }
            })

          }else{
            Toast({
              message: "系统错误，请稍后再试！",
              position: "middle",
              duration: 2000
            });
          }
        })
    },

    FirstOrder(smble){
      let self=this
      let clickFlag;
       self.$refs.top.scrollTop=0
        let params = {city: this.city,category:this.category,pageNum:self.pageNum,pageSize:10};
        Api.FirstOrder(params)
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

    // 点击项目切换商品展示
    showGoods(catName,index){
      this.index=index
      if(this.index==0){
        this.isActive=true
      }else{
        this.isActive=false
      }
      this.goodsDetailList=[]
      this.pageNum=1  //切换菜单，则重新计算分页
      this.category=catName
      this.FirstOrder("clickNext")
    },

    // 商品详情
    toDetail(id) {
      // let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
      // let data ={web_url:baseUrl+"shop.html#/detail/" + id + "/" + this.user_id+"/"+"?city="+encodeURI(this.city)}; 
      // let JsonObjStr =JSON.stringify(data);
      // try{
      //   openWebView(JsonObjStr)
      // } 
      // catch(err){
      //   window.location.href =baseUrl + "shop.html#/detail/" + id + "/" + this.user_id+"/"+"?city="+encodeURI(this.city);
      // }
      // 
      let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
      
      window.location.href =baseUrl + "shop.html#/detail/" + id + "/" + this.user_id+"?city="+this.city;
    },

    back(){
      alert("1")
      //window.history.go(-1);
      $router.back(-1)
    },

    packTips(){
      this.$router.push({path:"/redpacketTips"})
    }
  },

  components: {
    scroller
  },
}
</script>


