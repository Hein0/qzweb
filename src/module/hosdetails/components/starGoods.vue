<template>
  <!-- 明星商品 -->
  <scroller v-on:load="loadMore" ref="scroller" v-if="!no_data" :auto-fill="false">
    <ul class="commodityList starGoodList recommend">
        <li class="commodity searchLity recommendWrap" v-for="(item,index) in starGoodsList" @click="toDetail(item.id)">
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
	.starGoodList{
		padding-top: 0.4rem !important;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    -ms-flex-align: start !important;
    align-items: flex-start !important;
	}
  .recommend {
    background: #f6f8fa;
	}
	
	.searchList {
    padding-top: 0.6rem !important;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    -ms-flex-align: start !important;
    align-items: flex-start !important;
	}
	
	#shop .commodityList .commodity {
    box-shadow: none!important;
	}
	
	.searchLity{
		padding: .4rem!important;
    width: 9.2rem!important;
    height: auto!important;
    cursor: pointer;
    overflow: hidden;
    margin-bottom: .4rem;
    list-style: none;
	}
	
	.commodity {
    padding: .4rem!important;
    height: auto!important;
    width: 9.2rem!important;
	}
	
	.recommendImg {
    width: 2.213rem;
    height: 2.213rem;
	}
	
	.wit_0 {
    width: 2.213rem;
    height: 2.213rem;
    border-radius: .1rem;
	}
	
	.recommendWrap {
    background: #fff;
	}
	
	.infoDity {
    -ms-flex-pack: end!important;
    justify-content: end!important;
    margin-right: 0!important;
	}
	
	.recommendTitle {
    height: .9rem;
    font-weight: 400!important;
    line-height: .48rem!important;
	}
	
	.recommendContent {
    position: relative;
    margin-bottom: .293rem;
	}
	
	.left {
    font-weight: 400!important;
    margin-right: .3333rem;
	}
	
	.recommendRight {
    position: absolute;
    right: 44%;
    color: #999;
    text-decoration: line-through;
    font-size: .32rem;
	}
	
	.recommendLeft {
    font-size: .34rem;
    color: #999;
	}
	
	.recommendOrder {
    position: absolute;
    right: 10%;
    margin-left: .26rem;
    color: #999;
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
          id:"",
          city:"",
          goods_key_word:"",
					user_id:"",
          starGoodsList:[]
        }
      },

      //获取医生下推荐商品
      created(){
        let userInfo = JSON.parse(localStorage.getItem("personInfo"));
        if (userInfo) {
          this.user_id = userInfo.user_id;
        }

        if(this.$route.query.goods_key_word){
          this.goods_key_word=this.$route.query.goods_key_word
        }
				
        if(this.$route.query.city){
          this.city=this.$route.query.city
        }

        this.init()
      },

      methods:{
        init(){
          let self=this
          let params = {goods_key_word:this.goods_key_word,pageNum:this.pageNum,pageSize:10,city:this.city};
          Api.shopdetails(params)
          .then(data=>{
            if(data.status == '0'){
              self.starGoodsList=data.data
              self.starGoodsList.forEach((item,i)=>{
                if(item.anotherName && item.anotherName.length>6){
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
          let params = {goods_key_word:this.goods_key_word,pageNum:this.pageNum,pageSize:10};
          Api.shopdetails(params)
          .then(data=>{
            if(data.status == '0'){
              if(data.data.length){
                this.starGoodsList=this.starGoodsList.concat(data.data)
                self.starGoodsList.forEach((item,i)=>{
                  if(item.anotherName && item.anotherName.length>6){
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
        toDetail(id) {
          let baseUrl = window.location.href.slice(0,window.location.href.indexOf("hosdetails.html"));
          window.location.href =baseUrl + "shop.html#/detail/" + id + "/" + this.user_id
        },
      },

      components: {
        scroller
      },
    
  }
</script>
