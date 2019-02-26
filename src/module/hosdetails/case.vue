<template>
  <div id="shop" style="background: #fff;">
    <div class="container mat04"  ref="top" id="shopList">
      <div class="hongaoImg keyword_img" @click='gotoDetail("induction")'>
				<div class="keyWord_wrap">
					<span class="keyWordName">{{goodkeyword.name}}</span>
					<span class="keyWordTime">效果持续{{goodkeyword.duration_day}}</span>
				</div>
 
        <p class="keyWordTimeIntro" style="-webkit-box-orient:vertical;">{{goodkeyword.introduction}}</p>
        <div class="keyWordPrice">价格区间<span style="font-size: 0.4267rem;">{{jiaGe[0]}}~{{jiaGe[1]}}</span>元/次</div>
      </div>
			
			<ul class="keyword_tab">
				
				<li class="induction keyword_common" @click='gotoDetail("induction")'>项目介绍</li>
				<li class="fitPeople keyword_common" @click='gotoDetail("fitPeople")'>适合人群</li>
				<li class="operaCare keyword_common" @click='gotoDetail("operaCare")'>术后护理</li>
				<li class="commonQue keyword_common" @click='gotoDetail("commonQue")'>常见问题</li>
				<!-- <li class="goodVedio keyword_common">精彩视频</li> -->
			</ul>
			
			<div class="detail_wrap">
				<ul class="detailTab">
					<li class="tabItem" :class='status==realCase?"current":""' @click='status=realCase'>真实案例</li>
					<li class="tabItem" :class='status==starGoods?"current":""' @click='status=starGoods'>明星商品</li>
					<li class="tabItem" :class='status==recommendDoc?"current":""' @click='status=recommendDoc'>推荐医生</li>
					<li class="tabItem" :class='status==recommendHos?"current":""' @click='status=recommendHos'>推荐医院</li>
				</ul>
				
				<componet :is="status" :status="status"></componet>
			</div>
			
    </div>
  </div>
</template>

<style>
	.keyWord_wrap{
		color: #fff;
		padding-top: 0.3rem;
		margin-bottom: 0.2667rem
	}
	.keyWordName{
		font-size: 0.48rem;
	}
	.keyWordTime{
		font-size:0.2933rem;
		margin-left: 0.2667rem;
	}
	
	.keyWordTimeIntro{
		font-size:0.2933rem;
		color: #fff;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		overflow: hidden;
		-webkit-box-orient:vertical;
		text-overflow: ellipsis;
		margin-bottom: 0.48rem;
		line-height: 0.38rem;
	}
	.keyWordPrice{
		font-size:0.2933rem;
		color: #fff;
	}
	.keyword_img{
		background: url("./images/keyWord.png") no-repeat;
		background-position: 100% 100%;
		background-size: 9.2rem 3rem;
		width: 9.2rem;
		height: 3rem;
		padding-left: 0.4rem;
	}
	
	.hongaoImg{
		margin: 0 auto;
		margin-top: 0.5rem;
		margin-bottom: 0.6rem;
	}
	
	.keyword_tab{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 0.24rem;
		margin-bottom: 0.667rem;
		padding-left: 0.4rem;
		padding-right: 0.4rem;
	}
	.keyword_common{
		padding-top: 0.907rem;
		color: #333333;
		font-size: 0.32rem;
	}
	
	.induction{
		background: url("./images/xiangMuJieShao.png") no-repeat;
		background-size: 0.52rem 0.587rem;
		background-position: 50% 0;
	}
	
	.fitPeople{
		background: url("./images/shiYongRenQun.png") no-repeat;
		background-size: 0.6rem 0.587rem;
		background-position: 50% 0;
	}

	.operaCare{
		background: url("./images/shuHouHuLi.png") no-repeat;
		background-size: 0.587rem 0.533rem;
		background-position: 50% 0;
	}
	
	.commonQue{
		background: url("./images/changJianwenTi.png") no-repeat;
		background-size: 0.6133rem 0.6133rem;
		background-position: 50% 0;
	}
	
	.goodVedio{
		background: url("./images/jinCaiShiPin.png") no-repeat;
		background-size: 0.6133rem 0.6133rem;
		background-position: 50% 0;
		padding-top: 0.7113rem;
	}
	
	.detail_wrap{
		background: rgb(246, 248, 250);
		padding-top: 0.2667rem;
    padding-bottom: 0.4rem;
	}
	
	.detail_wrap .detailTab{
		background: rgb(255, 255, 255);
		display: flex;
		justify-content: space-around;
		align-items: center;
		
	}
	
	.tabItem{
		color: #999999;
		font-size: 0.3733rem;
		padding-bottom: 0.453rem;
		padding-top: 0.453rem;
	}
	
	.current{
		color: #333333;
		font-size: 0.4rem;
		font-weight: bold;
		background: url("../shop/images/trigger.png") no-repeat 0 0.66rem;
		background-size: 1.0rem 0.08rem;
		background-position-x: 50%;
		background-position-y: 100%;
	}
		
</style>

<script>
import realCase from "./components/realCase.vue";  
import starGoods from "./components/starGoods.vue"; 
import recommendDoc from "./components/recommendDoc.vue"; 
import recommendHos from "./components/recommendDoc.vue";
import imgPath from "../../common/api/imgConfig.js";
import Api from "../../common/api/api.js";
import utils from "../../common/js/utils";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      goodkeyword: [],
			realCase:"realCase",  //真实案例
			starGoods:"starGoods",//明星商品
			recommendDoc:"recommendDoc", //推荐医生 
			recommendHos:"recommendHos", //推荐医院
			status:"realCase",
			jiaGe:[],
      imgPath,
			
    };
  },
	
	// 获取关键词信息
  created() {
    this.goodskeywords();
  },
	
  methods: {
    loadMore() {
      this.msg++;
      setTimeout(() => {
        this.$refs.scroller.removeLoading();
      }, 2000);
    },

		// 获取关键词信息
    goodskeywords() {
      let params = {
        goods_key_word: this.$route.query.goods_key_word,
        user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
        token:JSON.parse(localStorage.getItem("personInfo")).token,
      };
			let self=this
      Api.goodskeyword(params).then(res => {
				if(res.status==0){
					self.goodkeyword = res.data?res.data:"";
 					if(/\d+/g.test(self.goodkeyword.reference_price)){ //获取数字
						self.jiaGe=self.goodkeyword.reference_price.match(/\d+/g) //按数字进行分割，获取中文
					}
				}else{
					Toast({
						message: "系统错误，请稍后再试",
						position: "middle",
						duration: 2000
					});
				}
      });
    },
		
		// 查看项目详情
		gotoDetail(ctx){
			this.$router.push({name:'projectDetails',query:{ctx:ctx,keyword:this.$route.query.goods_key_word}})
		}
  },
	
  components:{
    realCase,
    starGoods,
    recommendDoc,
		recommendHos
  }
};
</script>

