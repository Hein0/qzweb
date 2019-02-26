<template>
  <div id="shop">
    <div class="container" style="margin-top:22px;">
      <div id="searchbar-head">
        <div class="searchbar-input">
					<form action="#" onsubmit="return false" style="width:100%;">
						<input id="search" ref="input1" type="search" placeholder="热门话题" @click="goToSearch">
					</form>
        </div>
				
				<div class="creatTopical" @click="publish">发布</div>
      </div>
			<!--推荐热门话题 -->
			<ul class="hotTopicalWrap">
				<li class="hotTopical" v-for="(item,index) in hotSearchList" :key="item.id+item.createTime" 
					@click="topicalDetail(item)">
					<div>#{{item.name}}</div>
					<div class="topicalNum">{{item.totalNum}}个兴趣相投</div>
				</li>
			</ul>
			<allTopical></allTopical>
    </div>
  </div>
</template>

<style type="text/css" scoped>
	#searchbar-head{
		width:9.2rem;
		margin:0 auto;
		display: flex;
		display: -webkit-flex;
		display: -ms-flexbox;
		/* background-color: #fff; */
		height: 0.854rem;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding-left:0.533rem
	}
	
	#searchbar-head .searchbar-input{
		border: 1px solid #e3e3e3;
		color: #999999;
		width: 7.5734rem;
		height: 0.854rem;
		line-height: 0.854rem;
		font-size: 0.373rem;
		border-radius: 999px;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
	}
	
	#search{
		width: 100%;
		height:100%;
		background: url("../community/images/search.png") 0.4rem center no-repeat;
		padding-left: 1.067rem;
		background-size: 0.4rem 0.4rem;
	}
	
	.creatTopical{
		color: #333333;
    font-size: 0.3733rem;
    text-align: right;
	}
	
	.homeTopical{
		padding: 0 0.4rem;
		padding-top: 0.667rem;
	}
	
	.hotTopicalWrap{
		overflow: auto;
    white-space: nowrap;
		padding-left:0.4rem;
		padding-top: 0.32rem;
	}
	
	.hotTopical{
		width: 3.6rem;
		height: 2rem;
		display: inline-block;
		margin-right: 0.16rem;
		padding-left: 0.2667rem;
    padding-top: 0.2667rem;
    color: #fff;
    font-size: 0.4rem;
	}
	
	.hotTopical:nth-child(3n+1) {
		background: url(../community/images/hotTopic_1.png) no-repeat;
		background-size: 3.6rem;
	}
	
	.hotTopical:nth-child(3n+2) {
		background: url(../community/images/hotTopic_2.png) no-repeat;
		background-size: 3.6rem;
	}
	
	.hotTopical:nth-child(3n+3) {
		background: url(../community/images/hotTopic_3.png) no-repeat;
		background-size: 3.6rem;
	}
	
	.topicalNum{
		margin-top: 0.2667rem;
		font-size: 0.32rem;
		background: url(../community/images/chaKanHuati.png) no-repeat right center;
		background-size: 0.14667rem;
		display: inline-block;
		padding-right: 0.2933rem;
	}
	
	
	
	.mint-datetime-action2 {
		display: block;
		width: 100%;
	}
	
	.picker-toolbar2 {
		height: 100%;
	}
	
	.mint-popup-4 {
		width: 100%;
	}
	
	.file{
		position: absolute;
    left: 0;
    top: 0;
    height: 1.3333rem;
    width: 1.3333rem;
    opacity: 0;
		z-index:-1
	}
	
	.preoperative .cover {
		font-size: 0.28rem;
		bottom: -0.4rem;
		margin-left: 0.3867rem;
	}
	

</style>
<script>
import { mapState } from "vuex";
import lrz from "lrz";
import {Indicator} from "mint-ui";
import allTopical from "./../community/components/allTopical.vue";
import "common/css/shop.css";
import axios from "axios";
import baseUrl from "../../common/api/config";
import imgPath from "../../common/api/imgConfig.js";
import scroller from "../../components/public/scoller.vue";
import utils from "../../common/js/utils";
import Api from "../../common/api/api.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
			signImgOrVideo:"",     // 上传类型的标记
			popupVisible2: false,   //选择上传文件类型列表
			imgData: {accept: "image/gif, image/jpeg, image/png, image/jpg"},
			config: {width: 828,quality: 0.8},     //图片的压缩标准
			imgs: [],                              //压缩后的图片
			imgTemp: "",
			imgTempShow: false,
			imgList:[],
			axios,
			baseUrl,
			imgPath,
			smbel:null,
			flag:false,
      message:"",
			hotSearchList:[],        //热门推荐话题
			categoryList:[],         //项目类别
			categoryAll:[],          //全部项目类别
      searchList:[],           //搜索的关联话题
			selectedList:[],          //用户选择的话题
			user_logo:""
    };
  },
	
	// 初始化
	created:function(){
		// 获取热门搜索话题,项目类别
		let userInfo = JSON.parse(localStorage.getItem("personInfo"));
		if (userInfo) {
			this.user_logo = userInfo.logo;
		}
		this.getHotTopics()
		sessionStorage.removeItem("topical")
		sessionStorage.removeItem("title")
		sessionStorage.removeItem("content")	
		sessionStorage.removeItem("imgList")
	},
  
  methods: {
		//获取推荐热门话题
		getHotTopics(){
			let self=this
			Api.getHotTopics().then(data=>{ 
				if(data.status == '0'){
					self.hotSearchList=data.data
					self.hotSearchList.forEach((item,i)=>{
						if(item.name.length>6){
							item.name=item.name.slice(0,6)+"..."
						}
					})
					
				}else{
					Toast({
						message: data.message,
						position: "middle",
						duration: 2000
					});
				}
			})
		},
	
		goToSearch(){
			let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
			
			window.location.href =baseUrl + "community.html#/topicalSearch"
		},
		
		publish(){
			let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
			
			window.location.href =baseUrl + "community.html#/publishPost"
		},
		
		//进入话题主页
		topicalDetail(item){
			// this.$router.push({path:"topicalDetail",query:{id:item.id,name:item.name}}),
			let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
			
			window.location.href =baseUrl + "community.html#/topicalDetail" +"?id="+item.id+"&name="+item.name;
			
		}
  },
	
	components:{
		allTopical
	}
};

</script>

