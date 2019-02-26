<template>
  <div id="shop">
    <div class="container mat04">
      <!-- <div class="goBack">
        <img src="./images/back.png"  @click="$router.back(-1)">
      </div> -->
      
      <h1 class="FirstOrder">名医名院</h1>
      <span class="instruction">/你想要的都在这里</span>
      <div class="hospitalBannerImg" style="width: 9.1rem">
        <img src="./images/hospitalBanner.png" style="width: 100%">
      </div>

      <!-- 项目选择 -->
      <div class="chooseHospital">
        <ul class="classifyWrap">
          <li class="active" @click='changePorgram("hospitals")' :class='mask=="hospitals"?"flag":""'>医院</li>
          <li class="active" @click='changePorgram("doctors")' :class='mask=="doctors"?"flag":""'>医生</li>
        </ul>
      </div>

      <!-- 项目展示 -->
      <scroller  v-if="!no_data"  ref="scroller" :auto-fill="false" v-on:load='mask=="hospitals"?init():famousDocctors()'>
        <ul class="commodityList" style="padding-top: 0.4rem;background: #f6f8fa;">
            <li class='commodity'  v-for="(item,i) in infos" :key="item.id+item.hsType+item.createTime+i+item.updateTime+item.caseCount" style="background: #fff;" @click="gotoNext(mask,item.id)">
  
              <div  :style='"background: url("+imgPath+item.logo+") no-repeat center;border-radius: 0.8rem;width:1.386rem;height: 1.386rem;margin-top: 0.1rem;border:1px solid #e1e2e3;background-size: cover;"'></div>

              <div class="info" style="margin-left: 0.36rem;position: relative;">
                <h4 v-if='mask=="hospitals"'>{{item.anotherName}}</h4>
                <h4 v-if='mask=="doctors"'>{{item.dcName}}</h4>
                <span v-if="item.status==10" class="renZhen">已认证</span>
                <div v-if='mask=="hospitals"' style="color:#999999;font-size: 0.34rem;">{{item.hsType}}</div>
                <div  v-if='mask=="doctors"' style="color:#999999;font-size: 0.34rem;">{{item.anotherName}}</div>

                <div class="price" style="margin-top: 0.2rem;color:#999999;margin-bottom: 0.2rem">
                  <span class="leftPort">{{item.appointCount}}已预约</span>
                  <span class="right" style="margin-left: 0.8rem;font-size: 0.34rem; text-decoration:none;">{{item.caseCount}}案例</span>
                </div>
                <div>
                  <span class="bookGood" style="color:#999999">擅长</span>
                  <div class="bookDetail" v-for="object in item.goodProjects"> {{object}} </div>
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
    margin-left: 0.3rem;
    font-size: 0.64rem;
    color: #333
  }
  .hospitalBannerImg{
    margin: 0 auto;
    margin-top: 0.5rem; 
    margin-bottom: 0.6rem
  }

  .chooseHospital{
    margin-left: 0.4rem;
    overflow: hidden;
  }
  .bookGood{
      height: 0.48rem;
    width: 1.4rem;
    border-radius: 0.2rem;
    text-align: center;
    color: #ff7171;
    line-height: 0.48rem;
    font-size: 0.34rem;
  }

  .bookDetail{
    height: 0.5rem;
    border: 1px solid #c2dfff;
    color: #c2dfff;
    background: #fff;
    display: inline-block;
    line-height: 0.5rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    margin-left: 0.2rem;
    border-radius: 0.1rem;
  }

  .renZhen{
    width: 1.4rem;
    height: 0.5rem;
    border: 1px solid #60a4ff;
    color: #fff;
    background: #60a4ff;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 1.1rem;
    position: absolute;
    top:14%;
    right: 0
  }

  .active{
    height: 0.8rem !important;
  }

  .classifyWrap li:first-child {
      margin-left:0;
  }

/*  .info{
    width:auto !important;
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
      user_id:"",
      no_data:false,
      imgPath,
      hospitalInfoFirst:[],//初始化返回医院的信息
      hospitalInfoMore:[], //下拉返回医院的信息
      hospitalInfo:[],
      doctorsInfoFirst:[],//初始化返回医生的信息
      doctorsInfoMore:[], //下拉返回医生的信息
      doctorsInfo:[],
      city:"",
      goodProjects:[],
      infos:[],
      mask:"hospitals",
      pageNum:1
    };
  },

  methods: {
    init(smble){
        let params = {city: this.city,pageNum:this.pageNum,pageSize:10};
        let self=this
        let clickFlag;
        Api.famousHospital(params)
        .then(data=>{ 
          if(smble=="clickNext"){ //点击调用则data.data.goods.length可以为0，如果下拉则不可以
            clickFlag=true
          }else{
            clickFlag=data.data.length
          }

          if(data.status == '0' && clickFlag){
            if(self.pageNum==1){ //初始化第一次返回的医院信息
              self.hospitalInfoFirst=data.data
              self.infos=self.hospitalInfoFirst
            }else{ //下拉刷新返回的医院信息
              self.hospitalInfoMore=data.data
              self.infos=self.infos.concat(self.hospitalInfoMore)
              if (typeof self.$refs.scroller !== "undefined") {
                self.$refs.scroller.removeLoading();
              }
            }
              
            self.pageNum+=1
            self.infos.forEach((item,i)=>{
              if(typeof(item.goodProjects)=="string"){
                item.goodProjects=item.goodProjects.split(",")
              }

              if(item.hsType){
                item.hsType=utils.hospitalChange(item.hsType)
              }

            })

          }else{
            if (typeof self.$refs.scroller !== "undefined") {
              self.$refs.scroller.removeLoading();
            }
            Toast({
              message:  self.pageNum==1?"系统错误，请稍后再试":"已加载完毕",
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

    // 名医
    famousDocctors(smble){
      let params = {city: this.city,pageNum:this.pageNum,pageSize:10};
        let self=this
        let clickFlag;
        Api.famousDocctors(params)
        
        .then(data=>{ 
          if(smble=="clickNext"){ //点击调用则data.data.goods.length可以为0，如果下拉则不可以
            clickFlag=true
          }else{
            clickFlag=data.data.length
          }
          
          if(data.status == '0' && clickFlag){
            if(self.pageNum==1){ //初始化第一次返回的医生信息
              self.doctorsInfoFirst=data.data
              self.infos=self.doctorsInfoFirst
            }else{ //下拉刷新返回的医生信息
              self.doctorsInfoMore=data.data
              self.infos=self.infos.concat(self.doctorsInfoMore)
              if (typeof self.$refs.scroller !== "undefined") {
                self.$refs.scroller.removeLoading();
              }
            }
              
            this.pageNum+=1
            self.infos.forEach((item,i)=>{
              item.goodProjects=item.goodProjects.split(",")
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

    // 选择医生和医院
    changePorgram(flag){
      this.pageNum=1
      this.mask=flag
      this.infos=[] //切换的时候先清空信息
      if(flag=="doctors"){
        this.famousDocctors("clickNext")
      }else if(flag=="hospitals"){
        this.init("clickNext")
      }else{
       this.init("clickNext")
      }
    },

    //进入医院或者医生主页
    gotoNext(mask,id){
      let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
      if(mask=="hospitals"){
        window.location.href =baseUrl + "hosdetails.html#/hosdetails/"+"?city="+this.city+"&hospital_id="+id;
      }else if(mask=="doctors"){
        window.location.href =baseUrl + "shop.html#/DoctorDetail"+"?city="+this.city+"&doctor_id="+id;
      }
    }
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
    this.init("clickNext");
    // this.famousDocctors();
  },

  components: {
    scroller
  },
};
</script>



