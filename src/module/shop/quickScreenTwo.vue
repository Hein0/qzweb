<template>
  <div id="shop" v-if='msg=="全部项目" || (categoryList && categoryList.length>0)'>
    <div class="container mat04">
      <!-- <div class="goBack" style="margin-top: 0.4rem;margin-bottom: 0.4rem;margin-left: 0.28rem;">
        <img src="./images/back.png"  @click="$router.back(-1)">
      </div> -->
      <div id="search">
        <div>
          <div v-text="title" class="title"></div>
        </div>
      </div>

      <!-- 展示分类 -->
      <div class="assortment">
        <ul id="quickItem">
          <li class="active showActive" v-for="(item,index) in categoryList" :key="item.id+item.name" @click="quickThree(item.name)">
            <span>{{item.name}}</span>
          </li>
          <div class="flag"></div>
        </ul>
      </div>

      <!-- 项目展示 -->
      <scroller  v-if="!no_data"  ref="scroller" :auto-fill="false" v-on:load="quick()">
        <ul class="commodityList searchList xiangMu">
            <li class="commodity searchLity"  @click="toDetail(item.coId)" v-for="(item,index) in quickGoodList" :key="item.dtId+item.coCatId+item.coId+item.hsId+item.dtHospitalId+index" style="background: #fff;">
              <span class="tuPian">
              	<img class="wit_0"  :src="(imgPath+item.coLogo)" alt="">
              </span>
              <div class="info infoDity">
                <h4 class="searchGoodsLi">{{item.coName}}</h4>
                <div class="price leftRig jiaGe">
                  <span class="left">￥{{item.coPlatPrice}}</span>
                  <span class="priceRight">￥{{item.coFullPrice}}</span>
                </div>

                <div class="price leftRig">
                  <span class="textLeft" :data-hospitalId="item.hospital_id">{{item.hsAnotherName}}</span>
                  <span class="bookOrder">
                    <b>已预约</b>
                    <b class="coPreOrder">{{item.coPreOrder}}</b>
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
	.title{
		font-size:0.6rem;
		color:#333333;
		margin-bottom: 0.4rem;
	}
	
	.assortment{
		padding-bottom:0.1333rem;
	}
	
	#search{
		margin-left:0.4rem;
		margin-bottom: 0.64rem;
		margin-top:0.4rem
	}

  .showActive{
  	border: 1px solid #edf0f4;
  	border-radius: 0.6rem;
  	padding-left:0.2666rem;
  	padding-right:0.2666rem;
  	padding-bottom: 0.1rem;
  	padding-top: 0.1rem;
  	height:100%;
  	margin-left:0.4rem;
  	margin-bottom: 0.2667rem;
  	font-size: 0.3733rem;
  }
	
	.xiangMu{
		background:#f6f8fa
	}
	
	.tuPian{
		width:2.213rem;
		height:2.213rem
	}
	
	.jiaGe{
		position: relative;
		margin-bottom: .293rem
	}

  .redCol{
    color: #ff67b2;
    background: #fff;
    border: 1px solid #ff67b2

  }
	
	.leftRig{
		font-size: 0.34rem
	}
	
  .leftRig:after{clear:both;content:'';display:block;width:0;height:0;visibility:hidden;}
  .marTop{
    margin-top: -0.46rem;
  }

  .textLeft{
    color:#999
  }

  .searchList{
    padding-top: 0.4rem !important;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    align-items: flex-start !important;
  }

  .searchLity{
    padding: 0.4rem 0.4rem !important;
    width: 9.2rem  !important;
    height: auto !important
  }

  .infoDity{
    justify-content: end !important;
    margin-left: 0.4rem !important;
    margin-right: 0 !important;
  }

   .wit_0{
    width: 2.213rem;
    height: 2.213rem;
    border-radius: 0.1rem
  }

  .searchGoodsLi{
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    /* font-size: 0.4rem; */
    /* -webkit-line-clamp: 2; */
    /* overflow: hidden; */
    /* display: -webkit-box; */
    height: 0.9rem;
    line-height: 0.48rem !important;
    margin-bottom: .293rem!important;
    color: #333!important;
    font-weight: normal!important;
  }
	
	.priceRight{
		position: absolute;
		right: 52%;
		color:#999999;
		text-decoration: line-through;
		font-size: 0.32rem
	}
	
	.coPreOrder{
		color:#999999;
		vertical-align: bottom;
		margin-left: 0.1rem;
	}
	
	.bookOrder{
		position: absolute;
		right: 10%;
		margin-left: .26rem;
		color: #999;
	}

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
			msgAll:"",
			title:"",
      city:"",
      user_id:"",
      quickGoodListFirst:[],
      quickGoodListMore:[], //下拉刷新
      quickGoodList:[],
      categoryList:[],
      pageNum:1
    };
  },
  
	// 初始化获取信息
	created:function(){
		let userInfo = JSON.parse(localStorage.getItem("personInfo"));
		if (userInfo) {
			this.user_id = userInfo.user_id;
		}
		
		if(this.$route.query.category){
			this.msgAll=this.$route.query.category
			if(this.msgAll.indexOf(">")){  //如果有">"则是传多级，则是app首页关键词跳转，则默认取最后一级
				let categoryArray=this.msgAll.split(">")
				this.msg=categoryArray[categoryArray.length-1].trim()
			}else{                                       //如果是只有一级
				this.msg=this.msgAll
			}
		}

		if(this.$route.query.city){
			this.city=this.$route.query.city
		}
		
		try{
			wb_ShowShoppingcart("0")
		}catch(err) {
			console.log(err)
		}
		this.quick()
	},

  methods: {
    //展示快捷搜索的商品
    quick(){
      let clickFlag;
      let self=this
			// 从商城首页快捷筛选入口进入,只筛选用户当前城市的商品;如果从APP首页关键词入口进入,则搜索该项目的所有商品,不分城市
      let params = {city:this.city?this.city:"",pageNum:this.pageNum,pageSize:10};
      if(this.msg!="全部项目"){
        params.category=this.msg
      }
      Api.quickScreening(params)
      .then(data=>{
        if(this.pageNum==1){//初始化调用此方法，则data.data.goods.length可以为0
          clickFlag=true
        }else{
          clickFlag=data.data.goods.length
        }

        if(data.status == '0' && clickFlag){ //下拉刷新的时候data.data.goods.length不为0(有商品)，才会执行，否则提示用户加载完毕
          self.categoryList=data.data.category //搜索该项目的子类
					if(self.msg!="全部项目" && (!self.categoryList || self.categoryList.length==0)){ //所搜索的项目没有子类，则跳到关键词页面
						let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
						window.location.replace(baseUrl + "hosdetails.html#/caseDetail"+"?goods_key_word="+self.msg+"&city="+self.city)
						sessionStorage.removeItem("categoryThree") ////点击第二级就跳转到关键词页面，说明没有第三级，那么就去掉第三级
					}
					
					else{//如果有子类，则展示子类，以及该类商品信息
						self.title=self.msg
						if(self.pageNum==1){ //初始化第一次返回的商品
							self.quickGoodListFirst=data.data.goods
							self.quickGoodList=self.quickGoodListFirst
						}else{ //下拉刷新的商品
							self.quickGoodListMore=data.data.goods
							self.quickGoodList=self.quickGoodList.concat(self.quickGoodListMore)
							if (typeof self.$refs.scroller !== "undefined") {
								self.$refs.scroller.removeLoading();
							}
						}
						self.pageNum+=1
						self.quickGoodList.forEach((item,i)=>{
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
					}
        }

        else{
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

    //跳转到关键词页面
    quickThree(categoryName){
     let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
     window.location.href=baseUrl + "hosdetails.html#/caseDetail"+"?goods_key_word="+categoryName+"&city="+this.city
		 sessionStorage.setItem("categoryThree",categoryName) //三级分类
    },

    // 商品购买详情
    toDetail(id) {
      let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
      window.location.href =baseUrl + "shop.html#/detail/" + id + "/" + this.user_id
    },
  },
	
	components: {
		scroller
	},
}

</script>


