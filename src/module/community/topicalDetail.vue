<template>
	<!-- 帖子内容 -->
	<div id="shop">
		<div class="container" style="margin-top: 44px;">
			<!-- 帖子类型切换 -->
			<div class="titleHot">
				<img v-show="isPhoneType" src="./images/back.png" alt="" @click="$router.back(-1)">
				<div class="topicalDetail">#{{topicalName}}</div>
			</div>
			<allTopical :nameDetail="topicalName" :idDetail="topicalId"></allTopical>
		</div>
	</div>
</template>
<style>
	.titleHot{
		font-size: 0.64rem;
		color: #333333;
		padding-left: 0.4rem;
		padding-bottom: 0.32rem;
		background: #fff;
		display: flex;
		align-items: center;
	}
	
	.titleHot img{
		width: 0.25333rem;
		height: 0.44rem;
	}
	
	.topicalDetail{
		margin-left: 0.4rem;
	}
</style>


<script>
	import "common/css/shop.css";
	import allTopical from "./components/allTopical.vue";
	import imgPath from "../../common/api/imgConfig.js";
	import scroller from "../../components/public/scoller.vue";
	import utils from "../../common/js/utils";
	import Api from "../../common/api/api.js";
	import { Toast } from "mint-ui";
	
export default {
	props:["name","id"],
  data() {
    return {
			user_id:"",
			user_logo:"",
			commentNum:"",
			articleId:"",            //帖子id
			tabCor:0,
			commentFlag:false,        //是否展示所有评论
			scanFlag:false,           //展开还是收起
			imgPath,
			goodImg:[],
			contentFlag:false,           //帖子内容是否够两行  
			queryType:1,
			topicalId:"",             //话题id
			topicalName:"",
			pageNum:1,
			isPhoneType:false,         //手机类型
			videoExtend:"",						//当前播放的视频
			showVideo:null,
			tabs:["推荐","关注","最新"],
			commendTopcial:[]          //默然推荐的话题
    };
  },
	
	// 初始化
	created:function(){
		// 获取推荐话题
		let userInfo = JSON.parse(localStorage.getItem("personInfo"));
		if (userInfo) {
			this.user_id = userInfo.user_id;
			this.user_logo = userInfo.logo;
		}
		
		if(this.$route.query.id){
			this.topicalId=this.$route.query.id
		}
		
		if(this.$route.query.name){
			this.topicalName=this.$route.query.name
		}
	},
	
	updated(){
		try{
			if(getCurNativeType() == 2){//ios
				this.isPhoneType=true
			}
		}catch(err) {
			console.log(err)
		}
	},

	components:{
		scroller,
		allTopical
	}
};

</script>

