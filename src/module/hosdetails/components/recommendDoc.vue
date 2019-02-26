<template>
		<!-- 项目展示 -->
		<scroller  v-if="!no_data"  ref="scroller" :auto-fill="false" v-on:load='mask=="recommendHos"?init():famousDocctors()'>
			<ul class="commodityList" style="padding-top: 0.4rem;background: #f6f8fa;">
					<li class='commodity'  v-for="(item,i) in infos" :key="item.doctor_id+item.hospital_id+item.hospital_type+i+item.his_id+i" style="background: #fff;" @click="gotoNext(mask,item)">

						<div  :style='"background: url("+imgPath+item.logo+") no-repeat center;border-radius: 0.8rem;width:1.386rem;height: 1.386rem;margin-top: 0.1rem;border:1px solid #e1e2e3;background-size: cover;"'></div>

						<div class="info" style="margin-left: 0.36rem;position: relative;">
							<h4 v-if='mask=="recommendHos"'>{{item.anotherName}}</h4>
							<h4 v-if='mask=="recommendDoc"'>{{item.doctorName}}</h4>
							<span v-if="item.status==10" class="renZhen">已认证</span>
							<div v-if='mask=="recommendHos"' style="color:#999999;font-size: 0.34rem;">{{item.hospital_type}}</div>
							<div  v-if='mask=="recommendDoc"' style="color:#999999;font-size: 0.34rem;">{{item.anotherName}}</div>

							<div class="price" style="margin-top: 0.2rem;color:#999999;margin-bottom: 0.2rem">
								<span class="leftPort">{{item.appointNum}}已预约</span>
								<span class="right" style="margin-left: 0.8rem;font-size: 0.34rem; text-decoration:none;">{{item.caseNum}}案例</span>
							</div>
							<div>
								<span class="bookGood" style="color:#999999">擅长</span>
								<div class="bookDetail" v-for="object in item.good_projects"> {{object}} </div>
							</div>
						</div>
					</li>
			</ul>
		</scroller>
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
import imgPath from "../../../common/api/imgConfig.js";
import setSessionKey from "../../../common/js/setSessionKey.js";
import scroller from "../../../components/public/scoller.vue";
import utils from "../../../common/js/utils";
import Api from "../../../common/api/api.js";
import { Toast } from "mint-ui";

export default { 
	props:["status"],
  data() {
    return {
      user_id:"",
      no_data:false,
			city:"",
      imgPath,
      hospitalInfoFirst:[],//初始化返回医院的信息
      hospitalInfoMore:[], //下拉返回医院的信息
      hospitalInfo:[],
      doctorsInfoFirst:[],//初始化返回医生的信息
      doctorsInfoMore:[], //下拉返回医生的信息
      doctorsInfo:[],
      goods_key_word:"",
      goodProjects:[],
      infos:[],
      mask:"hospitals",
      pageNum:1
    };
  },

	// 名院
  methods: {
    init(smble){
        let params = {goods_key_word: this.goods_key_word,pageNum:this.pageNum,pageSize:10,city:this.city};
        let self=this
        let clickFlag;
        Api.keywordsForHospital(params)
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
              if(item.good_projects && typeof(item.good_projects)=="string"){
                item.good_projects=item.good_projects.split(",")
              }

              if(item.hospital_type){
                item.hospital_type=utils.hospitalChange(item.hospital_type)
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
      let params = {goods_key_word: this.goods_key_word,pageNum:this.pageNum,pageSize:10,city:this.city};
        let self=this
        let clickFlag;
        Api.keywordsForDoctor(params)
        
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
							if(item.good_projects && typeof(item.good_projects)=="string"){
								item.good_projects=item.good_projects.split(",")
							}
							if(item.doctorLogo){
								item.logo=item.doctorLogo
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

    // 选择医生和医院
    changePorgram(flag){
      this.pageNum=1
      this.mask=flag
      this.infos=[] //切换的时候先清空信息
      if(flag=="recommendDoc"){
        this.famousDocctors("clickNext")
      }else if(flag=="recommendHos"){
        this.init("clickNext")
      }else{
       this.init("clickNext")
      }
    },

    //进入医院或者医生主页
    gotoNext(mask,item){
      let baseUrl = window.location.href.slice(0,window.location.href.indexOf("hosdetails.html"));
      if(mask=="recommendHos"){
        window.location.href =baseUrl + "hosdetails.html#/hosdetails"+"?hospital_id="+item.id;
      }else if(mask=="recommendDoc"){
        window.location.href =baseUrl + "shop.html#/DoctorDetail"+"?doctor_id="+item.doctor_id;
      }
    }
  },

  created: function() {
    let userInfo = JSON.parse(localStorage.getItem("personInfo"));
    if (userInfo) {
      this.user_id = userInfo.user_id;
    }

    if(this.$route.query.goods_key_word){
      this.goods_key_word=this.$route.query.goods_key_word
    }else{
      this.goods_key_word=""
    }
    
		if (this.$route.query.city) {
			this.city = this.$route.query.city;
		}
		
		this.changePorgram(this.status)
  },

  components: {
    scroller
  },
};
</script>



