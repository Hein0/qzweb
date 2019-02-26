<template>
  <!-- 推荐商品 -->
  <scroller v-on:load="loadMore" ref="scroller" v-if="!no_data" :auto-fill="false">
    <ul class="commodityList searchList recommend">
        <li class="commodity searchLity recommendWrap" v-for="(item,index) in doctorGoodList" @click="toDetail(item.id)">
          <span class="recommendImg">
            <img class="wit_0" :src="(imgPath+item.goods_url)" alt="">
          </span>

          <div class="info infoDity">
            <h4 class="searchGoodsLi recommendTitle">{{item.name}}</h4>
            <div class="price leftRig recommendContent">
              <span class="left">￥{{item.qzd_price}}</span>
              <span class="right recommendRight">￥{{item.hos_price}}</span>
            </div>

            <div class="price leftRig recommendLeft">
              <span class="textLeft">{{item.anotherName}}</span>
              <span class="bookOrder recommendOrder">
                <b>已预约</b>
                <b class="recommendNum">{{item.appoint_count}}</b>
              </span>
            </div>
          </div>
        </li>
    </ul>
  </scroller>

</template>

<style type="text/css">
  .recommend{
    background: #f6f8fa;
  }
  .recommendWrap{
    background: #fff;
  }
  
  .recommendImg{
     width:2.213rem;
     height:2.213rem
  }

  .recommendTitle{
    height:0.9rem;
    font-weight: normal !important;
    -webkit-box-orient: vertical;
    line-height: 0.48rem !important
  }

  .recommendContent{
    position: relative;
    margin-bottom: .293rem;
  }

  .recommendRight{
    position: absolute;
    right: 44%;
    color:#999999;
    text-decoration: line-through;
    font-size: 0.32rem
  }

  .recommendLeft{
    font-size: 0.34rem;
    color: rgb(153, 153, 153);
  }

  .recommendOrder{
    position: absolute;
    right: 10%;
    margin-left: 0.26rem;
    color: rgb(153, 153, 153)
  }

  .recommendNum{
    color:#999999;
    vertical-align: bottom;
    margin-left: 0.1rem;
  }

</style>
<script>
  import scroller from "../../../components/public/scoller.vue";
  import imgPath from "../../../common/api/imgConfig.js";
  import Api from "../../../common/api/api.js";
  import utils from "../../../common/js/utils";
  import { Toast } from "mint-ui";

  export default {
      data(){
        return{
          imgPath,
          pageNum:1,
          user_id:"",
          city:"",
          doctor_id:"",
          doctorGoodList:[]
        }
      },

      //获取医生下推荐商品
      created(){
        let userInfo = JSON.parse(localStorage.getItem("personInfo"));
        if (userInfo) {
          this.user_id = userInfo.user_id;
        }

        if(this.$route.query.doctor_id){
          this.doctor_id=this.$route.query.doctor_id
        }

//         if(this.$route.query.city){
//           this.city=this.$route.query.city
//         }

        this.init()
      },

      methods:{
        init(){
          let self=this
          let params = {user_id:this.user_id,doctor_id:this.doctor_id,pageNum:this.pageNum,pageSize:10};
          Api.doctorGood(params)
          .then(data=>{
            if(data.status == '0'){
              self.doctorGoodList=data.data
              self.doctorGoodList.forEach((item,i)=>{
                if(item.anotherName.length>6){
                  item.anotherName=item.anotherName.slice(0,6)
                }
                if(!item.goods_url){
                  item.goods_url=item.goods_video_url_pic
                }
              })
              self.pageNum++
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

        loadMore(){
          let self=this
          let params = {user_id:this.user_id,doctor_id:this.doctor_id,pageNum:this.pageNum,pageSize:10};
          Api.doctorGood(params)
          .then(data=>{
            if(data.status == '0'){
              if(data.data.length){
                this.doctorGoodList=this.doctorGoodList.concat(data.data)
                self.doctorGoodList.forEach((item,i)=>{
                  if(item.anotherName.length>6){
                    item.anotherName=item.anotherName.slice(0,6)
                  }
                  if(!item.goods_url){
                    item.goods_url=item.goods_video_url_pic
                  }
                })
                this.pageNum++
              }else{
                Toast({
                  message: "已加载完毕",
                  position: "middle",
                  duration: 2000
                });
              }
              if (typeof self.$refs.scroller !== "undefined") {
                self.$refs.scroller.removeLoading();
              }
              
            }else{
              Toast({
                message: "系统错误",
                position: "middle",
                duration: 2000
              });
            }
          })
        },
        // 商品详情
        toDetail(id, user_id) {
          let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
          window.location.href =baseUrl + "shop.html#/detail/" + id + "/" + this.user_id
        },
      },

      components: {
        scroller
      },
    
  }
</script>
