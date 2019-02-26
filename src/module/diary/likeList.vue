<template>
	<div class="likeList" :style="{'-webkit-overflow-scrolling': scrollMode}">
		<!--头部-->
		<!--<mt-header title="我的喜爱" id="headera">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right" class="submits" id="selectId" >选择</mt-button>
        </mt-header>-->

		<div class="like-wrap">
			<!--视频列表-->
			<div class="case-wrap">
				<div class="caseList" v-if="pageList && pageList.length>0" style="height:100vh;overflow: scroll;">
					<v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
						<ul>
							<li v-for="(item,index) in pageList" @click="goto_detail(item.pageNum,item.id)">
								<span class="cheSpan">{{item.keyword}}</span>
								<div class="imgs">
									<img :src="(item.after_main_pic ? imgPath+item.after_main_pic : item.after_main_video_pic)" />
								</div>
								<span class="hosplName">{{item.hospitalName}}</span>
							</li>
						</ul>
					</v-loadmore>
				</div>
				<!--没有视频数据-->
				<div class="novido" v-else>
					<img src="./images/nodata.png" />
					<div class="novido-txt">
						<span class="txt-titile"></span>
						<p>变美之路不易，请多点赞鼓励</p>
					</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	import Api from "../../common/api/api.js";
	import imgPath from "../../common/api/imgConfig.js";
	import scroller from "../../components/public/scoller.vue";
	export default {
		name: "likeList",
		//组件
		components: {
			scroller,
			'v-loadmore':Loadmore,
		},
		//数据
		data() {
			return {
				user_id:this.$route.query.user_id,
				imgPath: imgPath,
				pageNum: 1,//pageNum为0时表示刷新或第一次加载，每加载一次增加1，刷新时默认为0
				pageSize: 10,
				allNum:"",
		        pageList:[],
				allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        		scrollMode:"auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
			}
		},
		//组件写入dom结构之前
		mounted() {
			this.loadPageList();  //初次访问查询列表
		},
		//计算属性
		computed: {

		},
		//实例已经创建完成之后
		created() {

		},
		//方法对象
		methods: {
			//下拉加载  
			loadTop:function() { //组件提供的下拉触发方法  
		        let self = this;
				setTimeout(function () {
                    self.loadPageList();  
		        	self.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
                }, 1000);
	      	},
	      	// 上拉加载  
	      	loadBottom:function() { 
	      		let self = this;
	      		setTimeout(function () {
		        	self.more();// 上拉触发的分页查询  
		        	self.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
	      		}, 1000);
	      	},
	      	// 查询数据
			loadPageList:function (){
				let params = {
					user_id:this.user_id ? this.user_id :JSON.parse(localStorage.getItem("personInfo")).user_id,
					pageNum: this.pageNum = 1,
					pageSize: this.pageSize,
				};
        		Api.likeList(params).then(data =>{
	          		// 是否还有下一页，加个方法判断，没有下一页要禁止上拉

	          		this.isHaveMore(data.dataCount);
	          		this.pageList = data.data;
	          		this.$nextTick(function () {
	            	// 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
	            	// 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
	            	// 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
	            	this.scrollMode = "touch";
	          		});
	        	});
      		},
      		more:function (){
		          // 分页查询
		        this.pageNum = parseInt(this.pageNum) + 1;
		        let params = {
		        	user_id:this.user_id ? this.user_id :JSON.parse(localStorage.getItem("personInfo")).user_id,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				};
		        Api.likeList(params).then(data=>{
		          	this.pageList = this.pageList.concat(data.data);
	          		this.isHaveMore(data.dataCount);
		        });
		    },
		    isHaveMore:function(isHaveMore){
		    	let nums =  Math.ceil(isHaveMore/this.pageSize);
		        // 是否还有下一页，如果没有就禁止上拉刷新
		        if(this.pageNum>=nums){
		          	this.allLoaded = true; //true是禁止上拉加载
		        }else{
		        	this.allLoaded = false;
		        }
	      	},
			//详情  ---调用app方法
			goto_detail(num,id) {
				let jonsObj ={
						pageNum: num,
						case_id: id,
						type:"4",
				};
				toDataLike(JSON.stringify(jonsObj));
			},


		}

	}
</script>

<style scoped>
	#headera {
		height: 1.17rem;
		background-color: #fff;
		color: #282828;
		box-shadow: 0 0 9px -2px #ff65b1;
		-webkit-box-shadow: 0 0 9px -2px #ff65b1;
	}

	.mint-header .mint-button.submits {color: #ff65b1;}
	.like-wrap {width: 100%;position: relative;height: 100%;}
	.novido {margin: 3.54rem 0 0;text-align: center;}
	.novido img {width: 3.22rem;height: 2.61rem}
	.novido .novido-txt {margin-top: 1.46rem;text-align: center;}
	.novido .novido-txt .txt-titile {color: #787878;font-size: 0.37rem}
	.novido .novido-txt p {font-size: 0.32rem;color: #787878;margin-top: 0.24rem;}
	.like-wrap .footers {
		position: fixed;
		height: 1.17rem;
		width: 100%;
		text-align: justify;
		display: flex;
		z-index: 10;
		left: 0;
		bottom: 0;
		border-top: 1px solid #e3e3e3;
	}

	.like-wrap .footers span {
		font-size: 0.45rem;
		color: #FF65B1;
		padding: 0rem 0.4rem;
		text-align: center;
		width: 2.8rem;
		display: inline-block;
		line-height: 1.17rem;
		flex: 2;
		-webkit-flex: 2;
		-moz-box-flex: 2;
	}
	.likeList{width:100%;height:100%;overflow: auto;padding-top: 0.24rem;}
	.like-wrap .footers .locality {}
	.case-wrap {padding: 0 0.12rem}
	.caseList ul:after {
		clear: both;
		content: '';
		display: block;
		width: 0;
		height: 0;
		visibility: hidden;
	}
	.caseList ul {text-align: justify;width: 100%;}
	.caseList ul li {
		width: 49%;
		height: 4.8rem;
		margin: 0 1% 0.13rem 0;
		float: left;
		position: relative;
		text-align: center;
		overflow: hidden;
	}
	.caseList ul li:nth-of-type(2n) {margin-right: 0;margin-left: 1%;}
	.caseList ul li .imgs {
		width: 4.8rem;
		height: 4.8rem;
		display: inline-block;
	}
	.caseList ul li .imgs img {width: 100%;height: 100%;border: none;}
	.caseList ul li .chagesIconLabel {position: absolute;width: 3.29rem;height: 3.29rem;left: 0;top: 0;z-index: 10;}
	.caseList ul li .chagesIcon {
		position: absolute;
		opacity: 0;
		right: 0.2rem;
		top: 0.14rem;
		width: 0.54rem;
		height: 0.54rem;
	}
	/*.caseList ul li .nochages{background:url(./images/nocheck.png) no-repeat center center;background-size:0.73rem 0.73rem;display: block;}*/

	.caseList ul li .chages {
		background: url(./images/check.png) no-repeat center center;
		background-size: 0.73rem 0.73rem;
		display: block;
	}

	.caseList ul li .hosplName {
		position: absolute;
		left: 0.24rem;
		bottom: 0.24rem;
		z-index: 2;
		width: 4.5rem;
		text-align: left;
		color: #fff;
		font-size: 0.37rem;
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.caseList ul li .cheSpan {
		position: absolute;
		right: 0.2rem;
		top: 0.14rem;
		z-index: 2;
		width: 4.5rem;
		display: inline-block;
		text-align: right;
		color: #fff;
		font-size: 0.32rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
