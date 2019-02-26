<template>
	<!-- 帖子内容 -->
	<div style="background: #f6f8fa;;">
		<!-- 帖子类型切换 -->
		<ul class="tab">
			<li v-for="(item,index) in tabs" :key="index+item" :class='tabCor==index?"active":"unselect"' 
				@click="changeTab(index)">{{item}}</li>
		</ul>
		
		<!-- 展示帖子信息 -->
		<scroller ref="scroller" v-on:load="loadMore">
			<ul class="tieZiWrap" v-for="(item,index) in commendTopcial" :key="item.totalNum+item.id+item.createTime+item.createName+index+item.title+item.content+item.browseNum">
				<li class="tieZiAuthor">
					<div class="authorImg">
						<img :src="imgPath+item.createLogo">
					</div>
					<div class="authorName">{{item.createNickname}}</div>
					
					<!-- 如果是公众好发帖，不展示关注 -->
					<div class="instred" :class='item.attentionCreator?"attention":"cancel"'
						@click="attendAndcancle(item)" v-text='item.attentionCreator?"已关注":"关注"'></div>
				</li>
				
				<li class="huaTiImg">
					<div class="swiper-container swiper-container-horizontal" style="cursor:pointer;min-height: 200px">
						<div class="swiper-wrapper" :key="index">
							<div class="swiper-slide" v-for="(list,idx) in item.mediaList" :key="list.id+idx+list.url+list.articleId">
								<img v-if="item.mediaType==1" alt="" class="preview-img" :src="list.url | filterImgSrc"
									@click="extendImg(goodImg,list.url)">
								
								<div v-else class="video-wrap" style="min-height: 200px">
									<!-- <img :src="list.coverPageUrl | filterImgSrc" alt=""  v-show="showVideo!=index"> -->
									<!-- 视频播放按钮 -->
									<p @click='play(index,list.url)' v-show="showVideo!=index"></p>  
									<!-- 视频遮罩层 -->	
									<!-- <div class="shade" v-show="showVideo!=index"></div> -->
									<!-- 视频内容 -->  <!-- :poster="list.coverPageUrl | filterImgSrc" -->
									<video  webkit-playsinline="" preload="auto" 
										:poster="list.coverPageUrl | filterImgSrc"
										width="400px" height="400px" playsinline="" x5-playsinline=""
										 x-webkit-airplay="" alt="" ref='video' @ended = "end(index,list.url)" 
											@click="pause(index,list.url)">
										<source :src="list.url | filterImgSrc" type="video/mp4"/>
									</video>
								</div>
							</div>
						</div>
					</div>
					
					<div class="toicalTitle">{{item.title}}</div>
				</li>
				
				<li class="tieZiTitle" @click="scanArticle(item,index)">
					<p>{{item.content}}
					<span v-if="item.contentFlag" v-text='item.scanFlag?"收起":"展开全部"'></span>
					</p>
				</li>
				
				<li class="tieZiHuaTi">
					<div v-for="(todoList,idx) in item.articleTopicList" 
						:key="todoList.id+todoList.topicId+idx+todoList.name">#{{todoList.name}}</div>
				</li>
				
				<!-- 点赞，评论 分享 -->
				<li class="scanWrap">
					<span class="scan">{{item.browseNum}}浏览</span>
					<span :class='item.clickLike?"like":"notLike"'
						@click="likeAndDelete(item)">{{item.likeNum}}
					</span>
					<span class="pingLun">{{item.commentNum}}</span>
					<!-- <span class="share">{{item.shareNum}}</span> -->
				</li>
				
				<!-- 默认展示两条评论 -->
				<li class="pingLunContent" v-show="item.commentNum>0">
					<ul>
						<li v-for="(todoList,idx) in item.commentList" :key="item.createId+item.id+item.createTime+idx">
							<span>{{todoList.createNickname}}：</span>{{todoList.content}}
						</li>
						
						<li v-show="item.commentNum>2" class="pingLunCount" 
							@click="showAllComment(item)">共<b>{{item.commentNum}}</b>条评论</li>
					</ul>
				</li>
				
				<li class="myPingLun">
					<div>
						<img :src="imgPath+user_logo" alt="">
					</div>
					<form action="#" onsubmit="return false" style="width: 88%;">
						<input type="text" placeholder="来一条你最走心的评论吧？" readonly="readonly"
						 @click="showAllComment(item)" ref="input">
					</form>
				</li>
			</ul>
			
		</scroller>
	</div>
</template>

<style type="text/css" scoped>
	.tab{
		display: flex;
		align-items: center;
		padding-left: 0.4rem;
		border-bottom: 1px solid #e3e3e3;
		background:#fff;
	}
	
	.tab li{
		margin-right: 0.667rem;
		height: 1.1733rem;
		line-height: 1.1733rem;
	}
	
	.unselect{
		color: #999999;
		font-size: 0.3733rem;
		
	}
	
	.active{
		color: #333333;
		font-size: 0.4rem;
		font-weight: bold;
		background: url(../images/tabChange.png) no-repeat center bottom;
		background-size: 0.7733rem;
	} 
	
	.tieZiWrap{
		padding: 0 0.4rem;
		margin-bottom:0.2667rem;
		background: #fff;
	}
	
	.tieZiAuthor{
		display: flex;
		align-items: center;
		padding-top: 0.4rem;
		padding-bottom: 0.24rem;
		position: relative;
	}
	
	.authorImg{
		width:0.64rem;
		height: 0.64rem;
		margin-right: 0.133rem;
		
	}
	
	.authorImg img{
		width:0.64rem;
		height: 0.64rem;;
		border-radius:14px;
	}
	
	.authorName{
		color: #333;
		font-size: 0.3733rem;
		margin-right: 5.12rem;
	}
	
	.instred{
		border: 1px solid #ff545f;
		border-radius: 12px;
		padding-right: 0.2667rem;
		padding-left: 0.56rem;
		line-height: 0.6rem;
		position: absolute;
		right: 0;
	}
	
	.cancel{
		color: #ff545f;
		background: url(../images/insterted.png) no-repeat 20% center;
		background-size: 0.24rem;
	}
	
	.attention{
		color: #fff;
		background:#ff545f;
		padding-left: 0.2667rem;
	}
	
	.authorImg img{
		width: 100%;
	}
	
	.huaTiImg img{
		width: 100%;
		height: 4.533rem;
	}
	
	.huaTiImg .toicalTitle{
		font-size: 0.3733rem;
		color: #333333;
		padding-top: 0.2667rem;
    padding-bottom:0.2667rem;
	}
	
	.tieZiTitle{
		color:#777777;
		line-height: 0.4667rem;
	}
	
	.tieZiTitle span{
		color: #2d7ee2;
		padding-right: 0.2667rem;
		background: url(../images/showAll.png) no-repeat right center;
		background-size: 0.133rem;
	}
	
	.tieZiHuaTi{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding-top: 0.4267rem;
		padding-bottom: 0.4rem;
	}
	
	.tieZiHuaTi div{
		font-size: 0.32rem;
		color: #ffffff;
		background: #c4b7f4;
		height: 0.533rem;
		line-height: 0.533rem;
		padding-left: 0.1867rem;
		padding-right: 0.213rem;
		margin-right: 0.133rem;
		margin-bottom:0.2667rem;
		border-radius: 10px 10px 10px 0;
		text-align: center;
	}
	
	.scanWrap{
		position: relative;	
		color: #b5b5b5;
	}
	
	.like{
		padding-left:0.5333rem;
		background: url(../images/like.png) no-repeat left center;
		background-size: 0.3733rem;
		position: absolute;
		left: 68%;
	}
	
	.notLike{
		padding-left:0.5333rem;
		background: url(../images/notLike.png) no-repeat left center;
		background-size: 0.3733rem;
		position: absolute;
		left: 68%;
	}
	
	.scanWrap .pingLun{
		padding-left:0.533rem;
		background: url(../images/pingLun.png) no-repeat left center;
		background-size: 0.33333rem;
		position: absolute;
		left: 88%;
	}
	
	.scanWrap .share{
		padding-left:0.533rem;
		background: url(../images/share.png) no-repeat left center;
		background-size: 0.32rem;
		position: absolute;
		left: 88%;
	}
	
	.pingLunContent{
		background: #f6f8fa;
		margin-top: 0.4rem;
		padding-left: 0.4rem;
		padding-top: 0.34rem;
		padding-bottom: 0.34rem;
		border-radius: 10px;
	}
	
	.pingLunContent ul li{
		color: #666;
		line-height: 0.6rem;
		font-weight: normal;
	} 
	.pingLunContent ul span{
		color: #333333;
		font-size: 0.3467rem;
	}
	
	.pingLunContent ul .pingLunCount{
		color: #2d7ee2;
		display: inline-block;
		padding-right: 0.32rem;
		background: url(../images/showAll.png) no-repeat right center;
		background-size: 0.133rem;
		margin-left: 6.293rem;
	}
	
	.myPingLun{
		height: 1.6rem;
		display: flex;
		align-items: center;
		width: 100%;
	}
	
	.myPingLun div{
		width: 0.935rem;
		height: 0.935rem;
	}
	.myPingLun div img{
		width: 0.935rem;
		height: 0.935rem;
		border-radius: 20px;
	}
	
	.myPingLun input{
		height: 0.9334rem;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		color: #b5b5b5;
		width: 100%;
		padding-left: 0.1867rem;
		margin-left: 0.1867rem;
	}
	
	.swiper-slide img{
    width: 100%;
    height: 100%;
  }
	
	.swiper-wrapper,  .swiper-wrapper img {
    height: 100%;
		border-radius:10px
  }
	
	video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
		/* z-index: 9; */
  }
	
	::-webkit-media-controls-panel {
		display: none!important;
		-webkit-appearance: none;
	}

	::--webkit-media-controls-play-button {
		display: none!important;
		-webkit-appearance: none;
	}

	::-webkit-media-controls-start-playback-button {
		display: none!important;
		-webkit-appearance: none;
	}
	
	.video-wrap {
    position: relative;
    width: 100%;
		
    height: 100%;
  }
  .video-wrap img {
    position: absolute;
    left: 0;
    top: 0;
  }
 
  .video-wrap p {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 50px;
    height: 50px;
    z-index: 10;
    transform: translate(-50%, -50%);
    background-image: url(../images/play.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50px;
  }
  .video-wrap .shade{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
  }
	
</style>

<script>
	import imgPath from "../../../common/api/imgConfig.js";
	import scroller from "../../../components/public/scoller.vue";
	import utils from "../../../common/js/utils";
	import Api from "../../../common/api/api.js";
	import { Toast } from "mint-ui";
	
export default {
	props:["nameDetail","idDetail"],
  data() {
    return {
			articleId:"",              //帖子的id
			commentNum:"",             //帖子的评论数
			user_id:"",
			user_logo:"",
			tabCor:0,
			showVideo: null,          //视屏是否播放的标示
			mySwiper: '',
			imgPath,
			contentFlag:false,           //帖子内容是否够两行   
			videoList:[],                //视频
			imgList:[],                  //图片
			goodImg:[],									//点击放大的图片
			imgExtend:"",              //当前放大的图片
			videoExtend:"",						//当前播放的视频
			queryType:1,
			scanFlag:false,             //帖子内容是收起还是展开
			commentFlag:false,         //是否展示所有评论
			pageNum:1,
			tabs:["推荐","关注","最新"],
			commendTopcial:[]          //默然推荐的话题
    };
  },
	
	// 初始化
	created:function(){

		let userInfo = JSON.parse(localStorage.getItem("personInfo"));
		if (userInfo) {
			this.user_id = userInfo.user_id;
			this.user_logo = userInfo.logo;
		}
		// 获取推荐话题
		this.getArticleList()
	},
	
// 	updated(){
// 		let self=this
// 		self.$nextTick(function(){     //重新刷新视频播放
// 			self.$refs.video.forEach((element,i)=>{
// 				self.$refs.video[i].load()
// 			})
// 		});
// 	},
	
	filters: {
		filterImgSrc(value) {
			value = value || '';
			if (value.includes('http')) {
			return value
			} else {
			return imgPath + value
			}
		}
	},
	
    methods: {
		//获取热门话题
		getArticleList(){
			let self=this;
			let params={queryType:this.queryType,pageNum:this.pageNum,pageSize:10,
									topicName:this.nameDetail,topicId:this.idDetail}
			Api.getArticleList(params).then(data=>{ 
				if(data.status == '0'){
					self.goodImg=[]                               //如果是切换话题类型，则初始化就要清空图片
					self.commendTopcial=data.data;
					self.$nextTick(function(){
						if(self.$refs.video && self.$refs.video.length){
							self.$refs.video.forEach((element,i)=>{
								self.$refs.video[i].load()
							})
						}
						
					});
					self.initSwiper();//拿到数据后初始化轮播图
					self.commendTopcial.forEach((item,i)=>{
						item.contentAll=item.content                //获取内容的全部
						if(item.content.length>38){
							item.content=item.content.slice(0,38)+"..."
							item.contentFlag=true
						}else{
							setTimeout(function(){
								self.scanInit(item)
							},0)
							item.contentFlag=false
						}
						
						item.mediaList.forEach((element,i) => {
							if(item.mediaType==1){
								self.goodImg.push({
									src: imgPath+element.url
								})
							}
						});
					})	
					self.pageNum++                    //第一次请求成功之后，分页数就加1
				}else{
					Toast({
						message: data.message,
						position: "middle",
						duration: 2000
					});
				}
			})
		},
		
		// 向上滑动加载更多帖子
		loadMore(){
			let self=this
			let params={queryType:this.queryType,pageNum:this.pageNum,pageSize:10}
			Api.getArticleList(params).then(data=>{ 
				if(data.status == '0'){
					if(data.data.length>0){    //帖子列表不为空，标示帖子没有加载完
						self.goodImg=[];         //下拉加载更多的时候，清空以前的视频，会重新从第一个到最后一个添加
						self.commendTopcial=self.commendTopcial.concat(data.data);
						self.$nextTick(function(){
				        	self.initSwiper();
									if(self.$refs.video && self.$refs.video.length){
										self.$refs.video.forEach((element,i)=>{
											self.$refs.video[i].load()
										})
									}
				      	});
						self.commendTopcial.forEach((item,i)=>{
							item.contentAll=item.content                //获取内容的全部
							if(item.content.length>38){
								item.content=item.content.slice(0,38)+"..."
								item.contentFlag=true
							}else{
								setTimeout(function(){                    //帖子内容不够两行，默认刷新就浏览
									self.scanInit(item)
								},0)                  
								item.contentFlag=false
							}
							
							if(item.mediaType==1){
								item.mediaList.forEach((element,i) => {
									self.goodImg.push({
										src: imgPath+element.url
									})
								});
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
						message: data.message,
						position: "middle",
						duration: 2000
					});
				}
			})
		},
		
		//切换帖子类型
		changeTab(index){
			let self=this
			this.$nextTick(function(){
				if(self.$refs.video && self.$refs.video.length){
					self.$refs.video.forEach((element,i)=>{
						self.$refs.video[i].load()
					})
				}
			});
			
			self.commendTopcial="";     //切换的时候，当前帖子信息清空重新获取下一类型帖子信息
			// self.goodImg=[];            //切换的时候，清空以前的视频，会重新从第一个到最后一个添加
			this.tabCor=index;        
			this.pageNum=1;             //切换帖子类型时，相当于出息查询，分页数置为1
			this.queryType=index+1;     //用1 2 3来区分查询帖子的类型
			this.getArticleList();
			this.$nextTick(function(){
	        	this.initSwiper();
						
	      	});
		},
		
		// 不够两行,默认刷新就浏览帖子
		scanInit(item){
			let params={articleId:item.id}
			Api.addViewCount(params).then(data=>{ 
				if(data.status == '0'){
				}else{
					Toast({
						message: data.message,
						position: "middle",
						duration: 2000
					});
				}
			})
		},
		
		//展开帖子类容详情,则表示浏览过帖子,收起帖子不算浏览，如果帖子内容过短没有展开，
		scanArticle(item,index){  
			let self=this
			if(!item.scanFlag){  //展开
				let params={articleId:item.id}
				Api.addViewCount(params).then(data=>{ 
					if(data.status == '0'){
						item.scanFlag=true
						self.$set(self.commendTopcial,index,item)
						item.content=item.contentAll       //展开之后查看帖子全部内容
						
					}else{
						Toast({
							message: data.message,
							position: "middle",
							duration: 2000
						});
					}
				})
			}
			else{  //收起
				item.content=item.content.slice(0,38)+"..."
				item.scanFlag=false
				self.$set(self.commendTopcial,index,item)
			}
		},
		
		//评论帖子
		sendComment(item,index){
			let self=this
			if(this.newContent==""){
				Toast({
					message: "不能发表空表评论",
					position: "middle",
					duration: 2000
				});
			}else{
				let params={articleId:item.id,commentType:1,content:this.newContent}
				Api.addComment(params).then(data=>{ 
					if(data.status == '0'){
						// 用户对帖子发表的评论默认展示在第一个
						this.newContent=""
						item.commentList.unshift(data.data)
						item.commentNum=item.commentNum                  //评论之后,重新获取评论数
						self.$refs.input[index].blur()
					}else{
						Toast({
							message: data.message,
							position: "middle",
							duration: 2000
						});
					}
				})
			}
		},
		
		// 展开所有评论
		showAllComment(item){
// 			this.commentFlag=true
// 			this.articleId=item.id
// 			this.commentNum=item.commentNum
				if(window.location.href.indexOf("shopIndex.html")>-1){
					let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
					
					window.location.href =baseUrl + "community.html#/comment"+"/"+"?commentNum="+item.commentNum+"&articleId="+item.id
				}else{
					this.$router.push({name:"comment",query:{commentNum:item.commentNum,articleId:item.id}})
				}
		},
		
		//关注和取消关注
		attendAndcancle(item){
			if(!item.attentionCreator){ //没有关注就关注，attentionCreator为判断标示
				this.attention(item)
			}else{
				this.cancleAttention(item)
			}
		},
		
		// 关注用户
		attention(item){
			let attentioned_type=""    //关注官方，attention_type为4
			item.creatorType==1?attentioned_type="4":attentioned_type="1"
			let params = {attention_id:this.user_id,attentioned_id:item.createUserId,attention_type:"1",attentioned_type:attentioned_type};
			Api.insertAttentionRecord(params)
			.then(data=>{
				if(data.status == '0'){
					item.attentionCreator=true;
				}else{
					Toast({
						message: "系统错误，请稍后再试",
						position: "middle",
						duration: 1000
					});
				}
			})
		},
		
		//取消关注用户
		cancleAttention(item){
			let params={}
			if(item.creatorType==1){
				params = {attention_id:this.user_id,attentioned_type:4};
			}else{
				params = {attention_id:this.user_id,attentioned_id:item.createUserId,status:"2"};
			}
			
			Api.cancleOrDeleteAttention(params)
			.then(data=>{
				if(data.status == '0'){
					item.attentionCreator=false;
				}else{
					Toast({
						message: "系统错误，请稍后再试",
						position: "middle",
						duration: 1000
					});
				}
			})
		},
		
		// 帖子点赞和取消点赞
		likeAndDelete(item){
			if(!item.clickLike){ //没有被点赞，clickLike为判断标示
				this.likeArticle(item)
			}else{
				this.deleteArticle(item)
			}
		},
		
		// 帖子点赞
		likeArticle(item){
			let self=this
			let params={articleId:item.id}
			Api.addLikeArticle(params).then(data=>{ 
				if(data.status == '0'){
					item.clickLike=true
					item.likeNum++
				}else{
					Toast({
						message: data.message,
						position: "middle",
						duration: 2000
					});
				}
			})
		},
		
		//取消帖子点赞
		deleteArticle(item){
			let self=this
			let params={articleId:item.id}
			Api.deleteLikeArticle(params).then(data=>{ 
				if(data.status == '0'){
					item.clickLike=false
					item.likeNum--
				}else{
					Toast({
						message: data.message,
						position: "middle",
						duration: 2000
					});
				}
			})
		},
		
		initSwiper () {
			setTimeout(() => {
				this.mySwiper = new Swiper('.swiper-container',{autoplay : true,})
				if(document.querySelector('.video-wrap')){
					document.querySelector('.video-wrap').style.height = 
					document.querySelector('.swiper-container').offsetHeight + 'px';
				}
			}, 1000)
		},
		
		//过滤图片和视频是否包含http
		filterImgHttp(value) {
			value = value || '';
			if (value.includes('http')) {
			return value
			} else {
			return imgPath + value
			}
		},
		
		//播放
		play (index,src) {
			let self=this
			this.$refs.video.forEach((element,i)=>{
				if(element.currentSrc==self.filterImgHttp(src)){
					self.videoExtend=i
				}else{
					this.$refs.video[i].pause();
				}
			})
			this.$refs.video[self.videoExtend].play();        
			this.showVideo=index
			this.mySwiper[this.videoExtend].autoplay.stop();
		},
		
		// 暂停
		pause (index,src) {
			let self=this
			this.$refs.video.forEach((element,i)=>{
				if(element.currentSrc==self.filterImgHttp(src)){
					self.videoExtend=i
				}
			})
			this.$refs.video[self.videoExtend].pause();
			this.showVideo=-1
			this.mySwiper[self.videoExtend].autoplay.start();
		},
		
		// 结束
		end(item,list,index,src) {
			let self=this
			this.$refs.video.forEach((element,i)=>{
				if(element.currentSrc==self.filterImgHttp(src)){
					self.videoExtend=i
				}
			})
			this.showVideo=-1
			// this.$set(item.mediaList,index,list)
			this.mySwiper[self.videoExtend].autoplay.start();
		},
		
		extendImg(goodImg,src){
			let self=this
			this.goodImg.forEach((element,i)=>{
				if(element.src==self.filterImgHttp(src)){
					self.imgExtend=i
				}
			})
			this.$preview.open(self.imgExtend,self.goodImg)
		},
		// 关闭所有评论弹窗
		close(){
			this.commentFlag=false
		}
    },
	
	watch:{
		//图片放大
		goodImg(value) {
			value.forEach(element => {
				let imgTemp = new Image();
				imgTemp.url = element.src;
				if(imgTemp.complete) {
					element.w = imgTemp.width||400;
					element.h = imgTemp.height||600;
				} else {
					imgTemp.onload = function() {
						element.w = this.width;
						element.h = this.height;
					};
				}
				imgTemp = null;
			})
		},
	},
	
	components:{
		scroller
	}
};

</script>

