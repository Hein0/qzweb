<template>
	<!-- 列表展示 -->
  	<div class="classList">
  		<!--分类菜单-->
		<div class="cleanscoller">
			<nav class="nav">
				<ul class="classify">
		          	<li  v-for="(item,index) in classifyMenu" :key="item.num+item.cat" @click="showList(item.cat,index)" :class='isShow == index ? "liactive":"" ' >
		            	<label>{{item.cat}}</label>
		          	</li>
		        </ul>
			</nav>
      	</div>
	      	
	      	
  		<scroller  v-if="!no_data"  ref="scroller" :auto-fill="false" v-on:load="loadData">
    		<ul class="commodityList">
        		<li class="commodity" v-for="(tem,inx) in classifyList"  @click="toDetail(tem.id,user_id)" >
        			<span class="wit_0">
        				<img  :src="(tem.goods_url ? imgPath + tem.goods_url : imgPath +tem.goods_video_url_pic)" alt="" />
        			</span>
	              	<div class="dityinfo infoDity" >
	                	<h4 class="goodTitle goodTitleFirst">{{tem.name}}</h4>
		                <div class="price" >
		                  	<span class="leftPrice">￥{{tem.qzd_price}}</span>
		                  	<span class="right">￥{{tem.hos_price}}</span>
		                </div>
	
		                <div class="price2" >
		                  	<span data-hosId="1">{{tem.anotherName}}</span>
			                  <span class="goodBook bookCount">
			                    <b>已预约</b>
		                    	<b style='margin-left: 0.1rem;'>{{tem.appoint_count}}</b>
		                  	</span>
		                </div>
	              	</div>
	            </li>
    		</ul>
  		</scroller>
	</div>

	
</template>

<script>
	import scroller from "../../../components/public/scoller.vue";
	import imgPath from "../../../common/api/imgConfig.js";
	import Api from "../../../common/api/api.js";
	import {Toast} from "mint-ui";
	export default {
		name:"hotsale",
		data() {
			return {
				classifyMenu:[],//菜单
				classifyList:[],//列表数据
				no_data:false,//没有数据
				hospId:"",//医院id
				user_id:"",//用户id
				city:"",//城市名称
				isShow:0,//选中下标
				goods_key:"",//分类名
				pageNum:1,//当前第几页
				pageSize:10,//一页展示多少条
				firstLoad:[],//第一次加载的商品
      			moreLoad:[],//下拉加载商品
      			imgPath,//图片地址
			};
		},
		props: ["infoData"],
		//
		created() {
			this.hospId = this.$route.query.hospital_id;
			this.city = this.$route.query.city;
			this.user_id = JSON.parse(localStorage.getItem("personInfo")).user_id;
    		var params = {
					hospital_id: this.hospId,
				};
				Api.getCat(params).then(res => {
					if(res.status==0 && res.data.length){
						this.classifyMenu = res.data;
						this.goods_key = this.classifyMenu[0].cat;
						this.loadData("nextTab")
					}
				});
  		},
  		
		//子组件
		components: {
			scroller
		},
		//方法
		methods: {
			
			//点击tab切换
			showList(name,ins){
				this.isShow = ins;
				this.pageNum = 1;
				this.classifyList = [];
				this.goods_key = name;
				this.loadData("nextTab")
			},
			
			//初始化列表数据
			loadData(next) {
				let self = this;
      			let clickFlag;
				var params = {
					hospital_id: self.hospId,
					goods_key_word: self.goods_key,
					pageNum: self.pageNum,
					pageSize: self.pageSize,
				};
				Api.stardetails(params).then(res => {
					if(next == "nextTab"){ 
			            clickFlag = true
			        }else{
			            clickFlag = res.data.length
			        }
					if(res.status==0 && clickFlag){
						if(self.pageNum==1){ //初始化第一次返回的商品
			                self.firstLoad = res.data
			                self.classifyList = self.firstLoad
			            }else{ //下拉刷新的商品
			              	self.moreLoad = res.data
			              	self.classifyList = self.classifyList.concat(self.moreLoad)
			              	if (typeof self.$refs.scroller !== "undefined") {
			                	self.$refs.scroller.removeLoading();
			              	}
			            }
			            self.pageNum+= 1
					}else{
			            !self.no_data ? self.$refs.scroller.isNoData() : null;
			            if (typeof self.$refs.scroller !== "undefined") {
			              self.$refs.scroller.removeLoading();
			            }
			            Toast({
			              message: self.pageNum==1?"系统错误，请稍后再试":"已加载完毕",
			              position: "middle",
			              duration: 2000
			            });
			        }
					
				});
				
			},
			
			//详情购买
			toDetail(id, user_id) {
      			let baseUrl = window.location.href.slice(0,window.location.href.indexOf("hosdetails.html"));
      			window.location.href = baseUrl + "shop.html#/detail/" + id + "/" + user_id
    		},
			
			
		}	
		
		
	}	
		
</script>
	
<style scoped>
	.classList{padding-bottom: 0.4rem;;}
	/*分类导航*/
	.cleanscoller{height:1.06rem;overflow: hidden;background:#FFFFFF;-webkit-box-sizing: border-box;box-sizing: border-box;}
	.cleanscoller .nav{height: 100%;overflow-x: scroll;overflow-y: hidden; background-color: #fff;padding-bottom:0.02rem;-webkit-overflow-scrolling: touch;}
	.cleanscoller .nav .classify{height:100% ;align-items: center; overflow: auto;overflow-y: hidden;white-space: nowrap;display: flex;}
	.cleanscoller .nav .classify li{display: inline-block;text-align: center;height: auto;line-height: 1rem;
    font-size: 0.37rem;color: #999999;margin:0 0.4rem;background-color: #fff; cursor: pointer; }
	.cleanscoller .nav .classify li label{font-size: 0.37rem;}
	.cleanscoller .nav .classify li.liactive{border-bottom: 2px solid #FF67B2;color: #333333;}

	/*列表样式*/
	.commodityList{justify-content: inherit !important;display: flex;flex-flow: row wrap;padding-left: 0.4rem;padding-right: 0.4rem;padding-top: 0.4rem;}
	.commodityList .commodity{margin-bottom: 0.4rem;border-radius: 0.1333rem;padding: 0.4rem 0.4rem;height: auto;width: 9.2rem;background: rgb(255, 255, 255);display: -webkit-flex;display: flex;cursor: pointer;overflow: hidden;}
	.commodityList .commodity .wit_0 {width: 2.213rem;display: block;height: 2.213rem;border-radius:0.15rem;}
	.commodityList .commodity .wit_0 img{width: 2.213rem;height: 2.213rem;border-radius: 0.15rem;}
	.commodityList .commodity .dityinfo {width: 6.4266rem;display: -webkit-flex;display: flex;flex-direction: column;justify-content: space-between;margin-left: 0.26rem;}
	.commodityList .commodity .dityinfo h4{height:0.9rem;font-size:0.4rem;color:#333333;display: -webkit-box;-webkit-line-clamp: 2;overflow: hidden;text-overflow: ellipsis;line-height:125%;-webkit-box-orient:vertical;margin-top: 0; font-weight: normal;}
	.commodityList .commodity .dityinfo .price{position: relative;margin-bottom: 0.293rem;display: flex;align-items: center;}
	.commodityList .commodity .dityinfo .price2{font-size: 0.32rem;position: relative;color:#999;display: flex;align-items: center;}
	.leftPrice{color: #ff4242;font-size: 0.45rem;margin-right: 0.3333rem;font-weight: normal;}
	.commodityList .commodity .dityinfo .price .right {color:#999999;font-size: 0.32rem;text-decoration: line-through;font-weight: 500;}
	.goodBook {position: absolute;right: 0rem;border-radius: 0.2rem;text-align: center;font-size: 0.32rem;margin-left: 0.26rem; vertical-align: sub;}

</style>