<template>
  <div id="shop">
      <div class="container containerAll">
          <div class="header">
            <div class="header_top">
                <div class="firstView" @click="home">返回商城</div>
            </div>
          </div>

          <div class="contentAll">
            <div class="doctorInfoAll">
              <div class="doctorInfoWrap">

                <div class="appointCount">
                  <div class="count">预约数</div>
                  <div class="number">{{docotorInfoList.appointNum}}</div>
                </div>

                <div class="doctorImg">
                  <div class="imgInfo"><img :src="(imgPath+docotorInfoList.doctorLogo)" alt="" /></div>
                  <div class="renZhen" id="hasDetity" v-if="docotorInfoList.status==10">已认证</div>
                </div>

                <div class="consultCount">
                  <div class="count">粉丝数</div>
                  <div class="number">{{fansNum}}</div>
                </div>
              </div>

              <div class="doctorTitleWrap">
                <p class="doctorTitle">{{docotorInfoList.doctorName}}<span class="doctorName">{{docotorInfoList.position}}</span></p>
                <p  class="doctorGoodAt doctorGoodAt_detail">擅长：<span>{{docotorInfoList.good_projects}}</span></p>
                <p class="doctorGoodAt">从业年限：<span>{{docotorInfoList.workLenth}}</span></p>
              </div>
            </div> 

            <div class="header_bottom" @click="goHospitialDetail">
              <div class="header_bottom_wrap">
                <div class="header_bottom_img">
                  <img :src="(imgPath+docotorInfoList.hospitalLogo)" alt="" />
                </div>

                <div>
                  <h4 class="hosName">{{docotorInfoList.anotherName}}</h4>
                  <p class="hosAnother">{{docotorInfoList.hospital_type}}</p>
                </div>
              </div>

              <div class="addressCont">
                <span class="addressImg_wrap"><img src="./images/locationImg.png"></span>
                <span class="address">{{docotorInfoList.street}}</span>
              </div>
            </div>
          </div>

          <div class="doctorDetail">
            <ul>
              <li class="doctorItem" :class='status==doctorInfo?"selectedItem":""' @click="status=doctorInfo">医生资料</li>
              <li class="doctorItem" :class='status==doctorCard?"selectedItem":""' @click="status=doctorCard">医生证件</li>
              <li class="doctorItem" :class='status==successCase?"selectedItem":""' @click="status=successCase">真实案例</li>
              <!-- <li class="doctorItem" :class='status==recommendGood?"selectedItem":""' @click="status=recommendGood">推荐商品</li> -->
            </ul>
          </div>
          <componet :is="status" :docotorMsg="docotorInfoList" style="background: #fff"></componet>
      </div>

      <div class="footer_doc">
        <div class="footerWrap">
          <div class="focusImgCommon" :class='focusFlag==1?"hasFocusImg":"focusImg"' @click="focusDoctor"></div>
          <div class="focusColorCommon" :class='focusFlag==1?"hasFocusColor":"focusColor"' v-text='focusFlag==1?"已关注":"关注医生"'></div>
        </div>
        <a class="consult_doc" :href="kefUrl">立即咨询</a>
      </div>
  </div>
</template>

<style type="text/css">
  .containerAll{
    position: relative;
    height: 100%;
    background: #f6f8fa;
  }

  .header_top{
    background: #468be2;
    height: 4.3733rem;
    width:100%;
    overflow: hidden
  }

  .contentAll{
    background: #f6f8fa;
    overflow:hidden;
    padding-bottom: 0.2667rem
  }

  .firstView{
    color: #fff;
    font-size: 0.4rem;
    font-weight: normal;
    margin-top:0.4rem;
    margin-left:7.8267rem;
    line-height:1.04rem;
    height: 1.04rem;
    text-align: center;
  }

  .doctorInfoWrap{
    padding-top: 0.5333rem;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
  }

  .doctorInfoAll{
    width: 9.4667rem;
    height: 4.3733rem;
    margin:0 auto;
    border-radius: 0.6rem;
    background: #ffffff;
    margin-top: -2.2133rem;
    box-shadow: 0 0.026rem #edf2f8;
    position: absolute;
    margin-left: 0.26665rem;
  }

  .appointCount{
    margin-left: 1.2533rem;
  }

  .count{
    color:#959aaa;
    font-size: 0.32rem;
    margin-bottom:0.24rem;
  }

  .number{
    color: #35465f;
    font-size: 0.5067rem;
    font-family: "Arial";
    text-align: center
  }

  .doctorImg{
    margin-left: 1.36rem;
    margin-right:1.36rem;
    margin-top: -1.413rem;
  }

  .imgInfo{
    width: 2.5067rem;
    height:2.5067rem;
    background: #c9e0ff;
    border-radius: 1.3rem;
    border: 0.08rem solid #fff;
  }

  .imgInfo img{
    width: 100%;
    /*width: 2.5067rem;*/
    height: 2.5067rem;
    border-radius: 1.3rem;
  }

  #hasDetity{
    top:28%;
    right: 42%
  }

  .doctorTitleWrap{
    width: 9.4667rem;
    height: 2.2933rem;
    background:url("./images/yinHao.png") no-repeat 50% 45%;
    background-size: 90%;
    margin-top: 0.48rem
  }

  .doctorTitle{
    color: #333333;
    font-size: 0.48rem;
    text-align:center;
  }

  .doctorName{
    font-size:0.32rem;
    color: #999999;
    margin-left: 0.2133rem
  }

  .doctorGoodAt{
    color: #666;
    font-size: 0.3733rem;
    text-align: center;
  }

  .doctorGoodAt_detail{
    margin-bottom: 0.2667rem;
    margin-top: 0.4rem;
  }

 
  .header_bottom{
    height: 2.8rem;
    margin-top:2.48rem;
    flex-direction: row;
    padding-left: 0.4rem;
    padding-top: 0.4rem;
    background: #fff
  }

  .header_bottom_wrap{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.2933rem
  }

  .header_bottom_img{
    width:1.333rem;
    height: 1.333rem;
    border: 1px solid rgb(225, 226, 227);
    border-radius: 0.8rem;
    margin-right: 0.32rem
  }

  .header_bottom_img img{
    width:1.333rem;
    height: 1.333rem;
    border-radius: .8rem;
  }

  .hosName{
  color: #333;
  font-size: 0.42667rem;
  margin-bottom: 0.2133rem
  }

  .hosAnother{
    color: #999;
    font-size:0.32rem
  }

  .addressCont{
    background:url("./images/jianTouRight.png") no-repeat 94% 50%;;
    background-size: .15rem .3rem;
  }

  .addressImg_wrap{
   width: .26rem; 
   height: .36rem;

  }

  .addressImg_wrap img{
   width: .26rem; 
   height: .36rem;
  }

  .address{
    color: #999;
    font-size: 0.32rem;
    margin-left:0.2133rem;
  }

  .doctorDetail{
    padding-top: 0.5333rem;
    padding-left: 0.4rem;
    padding-bottom: 0.4rem;
    background: #fff
  }

  .doctorDetail ul{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
  }

  .doctorDetail ul li:first-child{
    margin-left:0
  }
  
  .doctorItem{
    color: #555555;
    font-size: 0.3733rem;
    border:1px solid #ecf0f4;
    border-radius: 0.4rem;
    padding: 0.16rem 0.24rem;
    margin-left: 0.32rem
  }

  .selectedItem{
    color: #ff67b2;
    border-color: #ff67b2
  }

  .focusImgCommon{
    width: 0.533rem;
    height: 0.533rem;
    
  }

  .focusImg{
    background:url("./images/focus.png") no-repeat 100% 100%;
    background-size: 0.52rem 0.48rem
  }

  .hasFocusImg{
    background:url("./images/hasFocus.png") no-repeat 100% 100%;
    background-size: 0.52rem 0.48rem
  }

  .focusColorCommon{
    margin-top: 0.24rem;
    
    font-size: 0.14666rem
  }

  .focusColor{
   color: #78869e;
  }

  .hasFocusColor{
    color: #ff67b2
  }


  .footer_doc{
   height: 1.8rem;
   display: flex;
   display: -webkit-flex;
   flex-direction: row;
   align-items: center;
  }

  .footerWrap{
    margin-left: 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 0.4533rem;
    width: 1.28rem
  }

  .consult_doc{
    width: 7.5rem;
    height: 1.2rem;
    background:#1699ff;
    font-size: 0.48rem;
    color: #fff;
    border-radius: 0.6rem;
    text-align: center;   
    line-height: 1.2rem;
  }
  

</style>
<script>
    import doctorInfo from "./components/doctorInfo.vue";
    import doctorCard from "./components/doctorCard.vue";
    import successCase from "./components/successCase.vue";
    // import recommendGood from "./components/recommendGood.vue";
    import imgPath from "../../common/api/imgConfig.js";
    import utils from "../../common/js/utils";
    import Api from "../../common/api/api.js";
    import { Toast } from "mint-ui";
    export default {
        props: ["docotorMsg"],
        data(){
          return{
            focusFlag:0,
            fansNum:null,
            user_id:"",
            city:"",
            imgPath,
            goodImg: [],
            hospital_id:"",
            kefUrl:"",
            doctor_id:null,
            docotorInfoList:[],
            status:"doctorInfo",
            doctorInfo:"doctorInfo",
            doctorCard:"doctorCard",
            successCase:"successCase"
            // recommendGood:"recommendGood"
          }
        },

        //获取医生信息
        created(){
          let userInfo = JSON.parse(localStorage.getItem("personInfo"));
          if (userInfo) {
            this.user_id = userInfo.user_id;
          }

          if(this.$route.query.doctor_id){
            this.doctor_id=this.$route.query.doctor_id
          }

          if(this.$route.query.city){
            this.city=this.$route.query.city
          }


          let self=this;
          let params = {user_id:this.user_id,doctor_id:this.doctor_id};
          Api.doctorInfomation(params)
          .then(data=>{
            if(data.status == '0'){
              self.getKeUrl(data.data.hospital_id);
              self.docotorInfoList=data.data
              self.hospital_id= self.docotorInfoList.hospital_id
              self.focusFlag=self.docotorInfoList.followIf
              self.fansNum=self.docotorInfoList.fansNum
              if(self.docotorInfoList.hospital_type){
                self.docotorInfoList.hospital_type=utils.hospitalChange(self.docotorInfoList.hospital_type)
              }

              if(self.docotorInfoList.position){
                self.docotorInfoList.position=utils.doctorPosition(self.docotorInfoList.position)
              }
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

        methods:{
          home(){
            let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
            window.location.href =baseUrl + "shopIndex.html#/index/shop"
          },

          goHospitialDetail(){
            let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
            window.location.href =baseUrl + "hosdetails.html#/hosdetails"+"?hospital_id="+this.hospital_id+"&city="+this.city
          },

          focusDoctor(){
            this.focusFlag=!this.focusFlag
            if(this.focusFlag){
              this.fansNum++ 
              this.selectAttention()
            }else if(!this.focusFlag){
              this.fansNum--
              this.cancleAttention()
            }
          },

          // 用户关注
          selectAttention(){
            let params = {attention_id:this.user_id,attentioned_id:this.doctor_id,attention_type:"1",attentioned_type:"3"};
            Api.insertAttentionRecord(params)
            .then(data=>{
              if(data.status == '0'){
                Toast({
                  message: "关注成功",
                  position: "middle",
                  duration: 1000
                });
              }else{
                Toast({
                  message: "系统错误，请稍后再试",
                  position: "middle",
                  duration: 1000
                });
              }
            })
          },

          // 用户取消关注
          cancleAttention(){
            let params = {attention_id:this.user_id,attentioned_id:this.doctor_id,status:"2"};
            Api.cancleOrDeleteAttention(params)
            .then(data=>{
              if(data.status == '0'){
                Toast({
                  message: "已取消关注",
                  position: "middle",
                  duration: 1000
                });
              }else{
                Toast({
                  message: "系统错误，请稍后再试",
                  position: "middle",
                  duration: 1000
                });
              }
            })
          },

          //获取客服url
          getKeUrl(id) {
            var self = this;
            if(id) {
              self.Api.getKeFuUrl({
                id: id
              }).then(function(res) {
                if(res.status == 0) {
                  self.kefUrl = res.data.qiao_url;
                } else {
                  self.$toast('获取数据失败!')
                }
              })
            }
          },
        },

        components: {
          doctorInfo,
          doctorCard,
          successCase
          // recommendGood
        },
    }
</script>
