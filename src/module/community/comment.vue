<template>
	<div id="shop">
		<div class="container" ref="scrollerDocument">
			<div class="pingLunATotal">
				<img src="./images/back.png" alt="" @click="$router.back(-1)">
				共{{commentNum}}条评论
			</div>
			
			<scroller ref="scroller" v-on:load="loadMore">
				<div class="moreWrap">
					<div class="allPingLun"  v-for="(item,index) in commentList" 
							:key="item.replyUserId+item.createUserId+item.id+item.createId+item.articleId+item.replyId+item.createTime+index">
						<div class="pinLunTitle">
							<div class="pinLunImg">
								<img :src="imgPath+item.createLogo" alt="">
							</div>
							<div class="pinLunInfo">
								<div class="author">{{item.createNickname}}</div>
								<div class="pingLunTime" @click='replyComments(item,"thisComment")'>
									<p>{{item.content}}</p>
									<span class="time">{{item.createTime}}</span>
								</div>
								<div :class='item.clickLike?"like":"notLike"' 
									@click="likeAndDelete(item)">{{item.likeNum}}
								</div>
							</div>
						</div>
						
						<!-- 评论的回复 -->
						<ul class="pingLunWrap" v-show="item.subCommentNum>0">
							<li class="pingLunContent">
								<ul>
									<li v-for="(todo,index) in item.subCommentList" 
										:key="todo.id+todo.commentId+todo.replyId+todo.createTime+index">
										<span>{{todo.createNickname}}</span>
										<span v-if='todo.replyNickname && todo.replyNickname!=""' style="color:#2d7ee2">{{"回复@"+todo.replyNickname}}</span>
										<span  @click='replyComments(item,"thisReply",index)'>{{":"+todo.content}}</span>
									</li>
									<li v-if="item.subCommentNum>2" class="pingLunCount"
										@click="subComment(item)">共<b>{{item.subCommentNum}}</b>条评论</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</scroller>
		</div>
		<!-- 底部固定输入框 -->
		<div class="myPingLun"  id="loginFullScreen">
			<div class="imgWrap">
				<img :src="imgPath+user_logo" alt="">
			</div>
			<input type="text" placeholder="来一条你最走心的评论吧？" 
				v-model.trim="newContent" @click="isFocus" @focus="inpsocus" @keyup.13="sendComments" ref="input" @blur="changeReply">
			<div class="expression" @click="sendComments" >发送</div>
		</div>
	</div>
</template>

<style type="text/css" scoped>
	#shop{position: relative;}
	.pingLunATotal{
		color: #333333;
    font-size: 0.42667rem;
    line-height: 44px;
		margin-left: 0.4rem;
		width: 100%;
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    z-index: 2;
	}
	
	.moreWrap{
		padding-top: 1.17333rem;
		padding-bottom: 1.6rem;
	}
	
	.pingLunATotal img{
		width: 0.2267rem;
    margin-right: 3.0rem;
	}
	
	.allPingLun{
		padding: 0.4rem;
		/* border-bottom: 1px solid #f6f8fa; */
		border-top: 1px solid #f6f8fa;
	}
	
	.allPingLun .pinLunTitle{
		display: flex;
		position: relative;
	}
	.pinLunImg{
		margin-right: 0.2667rem;
	}
	
	.pinLunImg img{
		width: 1.0667rem;
		height:1.0667rem;
		border-radius: 20px;
	}
	
	.author{
		color: #333;
	}
	
	.pinLunInfo p{
		font-size: 0.3733rem;
    color: #333;
    margin-bottom: 0.24rem;
	}
	
	.pingLunTime{
		margin-top: 0.2667rem;
	}
	
	.pingLunTime .time{
		color: #a0a0a0;
		font-size: 0.2667rem;
	}
	
	.pingLunWrap{
		padding-left: 1.333rem;
	}
	
	.like{
		padding-left:0.5333rem;
		background: url(./images/like.png) no-repeat left center;
		background-size: 0.3733rem;
		position: absolute;
		right: 0;
    bottom: 0;
	}
	
	.notLike{
		padding-left:0.5333rem;
		background: url(./images/notLike.png) no-repeat left center;
		background-size: 0.3733rem;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	
	.pingLunContent{
		background: #f6f8fa;
		margin-top: 0.4rem;
		padding-left: 0.4rem;
		padding-top: 0.4rem;
		padding-bottom: 0.4rem;
		border-radius:10px
	}
	
	.pingLunContent ul li{
		color: #666;
		line-height: 0.7466rem;
		border-radius: 10px;
	} 
	.pingLunContent ul span{
		color: #333333;
		font-size: 0.3467rem;
	}
	
	.pingLunContent ul .pingLunCount{
		color: #2d7ee2;
		display: inline-block;
		padding-right: 0.32rem;
		background: url(./images/showAll.png) no-repeat right center;
		background-size: 0.133rem;
		margin-left: 4.933rem;
	}
	
	.myPingLun{
		height: 1.6rem;
		display: flex;
		align-items: center;
		width: 100%;
		position: absolute;
		z-index:9999;
		left:0;
		right:0;
		background: #fff;
		bottom: 0;
		background: #f5f5f7;
	}
	
	.myPingLun .imgWrap{
		width: 0.935rem;
		height: 0.935rem;
		margin-left: 0.16rem;
	}
	.myPingLun .imgWrap img{
		width: 0.935rem;
		height: 0.935rem;
		border-radius:20px;
	}
	
	.myPingLun input{
		height: 0.9334rem;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		color: #b5b5b5;
		width: 100%;
		padding-left: 0.1867rem;
		margin-left: 0.1867rem;
		width: 7.28rem;
    margin-right: 0.2667rem;
	}
	
	.expression{
		/* width: 0.8rem;
		height: 0.8rem;
		line-height: 0.8rem; */
		font-size: 0.4rem;
		/* background: url(./images/expression.png) no-repeat center center;
		background-size: 0.8rem; */
	}
	
	
</style>

<script>
	import imgPath from "../../common/api/imgConfig.js";
	import scroller from "../../components/public/scoller.vue";
	import utils from "../../common/js/utils";
	import Api from "../../common/api/api.js";
	import { Toast } from "mint-ui";
export default {
  data() {
    return {
			newContent:"",         //我的评论列表
			imgPath,
			commentFlag:false,      //判断是对帖子评论还是对帖子的评论进行回复
			itemComment:{},        //当前所要回复的评论的信息
			replyFlag:false,			//判断是对评论的回复再进行回复
			itemReply:{},					//该评论的某一条具体回复信息
			replyIndex:null,        //该回复的序号
			flag:false,
			articleId:"",						//帖子id
			commentNum:"",         //评论数
			commentList:[],        //评论列表
			pageNum:1,             //查询评论的分页
			replyNum:1,							//查询回复的分页
			user_logo:"",
			selectedList:[],          //用户选择的话题
			
    };
  },
	
	// 初始化
	created:function(){
		let userInfo = JSON.parse(localStorage.getItem("personInfo"));
		
		if (userInfo) {
			this.user_logo = userInfo.logo;
		}
		
		if(this.$route.query.articleId){
			this.articleId=this.$route.query.articleId
		}
		
		// 获取评论条数
		this.getCommentnNub();
		// 获取评论列表
		this.getCommentList();
	},
	
// 	mounted(){
// 		window.onresize = () => {
// 			return (() => {
// 				let pageHeight = document.getElementById('loginFullScreen').clientHeight
// 					// 高度低于530就隐藏底部
// 					if (pageHeight < 530) {
// 							this.hideBottomClass = false // 隐藏
// 							console.log('隐藏')
// 					} else {
// 							this.hideBottomClass = true // 显示
// 							console.log('显示')
// 					}
// 			})()
// 		}
// 	},
  
  methods: {
  		//查询评论总条数
  		getCommentnNub(){
  			let self=this;
			let params={articleId:this.articleId,};
			Api.queryArticleCommentNum(params).then(data=>{ 
				if(data.status == '0'){
					self.commentNum = data.data;
				}else{
					Toast({
						message: data.message,
						position: "middle",
						duration: 2000
					});
				}
			})
  		},
		//查询评论
		getCommentList(){
			let self=this
			let params={articleId:this.articleId,pageSize:10,pageNum:this.pageNum}
			Api.queryCommentList(params).then(data=>{ 
				if(data.status == '0'){
					self.commentList=data.data
					this.pageNum++                    //初始化完成之后,分页数加1
					
					self.commentList.forEach((item,i)=>{
						item.subCommentList.forEach((element,i)=>{
							item.replyNum=1     //所有评论的回复，默认都显示第一页
						})
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
		
		// 上滑查询更多评论
		loadMore(){
			let self=this
			let params={articleId:this.articleId,pageSize:10,pageNum:this.pageNum}
			Api.queryCommentList(params).then(data=>{ 
				if(data.status == '0'){
					if(data.data.length>0){        //查询评论列表不为空，标示评论没有加载完
						self.commentList=self.commentList.concat(data.data)
						this.pageNum++               //初始化完成之后,分页数加1
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
		
		// 查询更多回复
		subComment(item){
			let self=this
			let params={commentId:item.id,articleId:this.articleId,pageSize:10,pageNum:item.replyNum}
			Api.queryCommentList(params).then(data=>{ 
				if(data.status == '0'){
					if(data.data.length>0){        //查询回复列表不为空，标示评论没有加载完
						item.subCommentList=item.subCommentList.concat(data.data)
						item.replyNum++              //初始化完成之后,分页数加1
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

		//发表评论
		sendComments(){
			let self=this;
			window.scrollTo(0,0);
			this.$refs["input"].placeholder="来一条你最走心的评论吧？";
			if(self.newContent==""){
				Toast({
					message: "不能发表空表评论",
					position: "middle",
					duration: 2000
				});
			}else{
				if(self.commentFlag){   //commentFlag为true，对帖子的评论进行回复
					let params={articleId:self.articleId,commentType:2,commentId:self.itemComment.id,content:self.newContent}
					Api.addComment(params).then(data=>{ 
						if(data.status == '0'){
							self.newContent=""
							self.itemComment.subCommentList.push(data.data)// 用户回复的评论默认展示在第一个
							self.itemComment.subCommentNum=data.data.subCommentNum
							self.$refs["input"].blur();
						}else{
							Toast({
								message: data.message,
								position: "middle",
								duration: 2000
							});
						}
					})
					this.commentFlag = false;
					this.replyFlag = false;
				}else if(self.replyFlag){  //commentFlag为true，对评论的回复进行回复
					let params={articleId:this.articleId,commentType:2,commentId:this.itemReply.commentId,
							content:this.newContent,replyId:this.itemReply.id}
					Api.addComment(params).then(data=>{ 
						if(data.status == '0'){
							self.newContent="";
							self.itemComment.subCommentList.push(data.data);
							self.itemComment.subCommentNum=data.data.subCommentNum;
							self.$refs["input"].blur();
						}else{
							Toast({
								message: data.message,
								position: "middle",
								duration: 2000
							});
						}
					})
				}else{  //当直接点击输入框的时候，commentFlag标示任然为false，认为是对帖子进行评论
					let params={articleId:this.articleId,commentType:1,content:this.newContent}
					Api.addComment(params).then(data=>{ 
						if(data.status == '0'){
							// 用户对帖子发表的评论默认展示在第一个
							this.newContent=""
							self.commentList.push(data.data)
							this.commentNum=data.data.commentNum
							self.$refs["input"].blur();
						}else{
							Toast({
								message: data.message,
								position: "middle",
								duration: 2000
							});
						}
					})
					this.commentFlag = false;
					this.replyFlag = false;
				}
			}
		},
		
		//评论帖子的评论回复(包括对具体的某一个回复进行回复)
		replyComments(item,flag,index){
			this.$refs["input"].focus();   
			if(flag=="thisComment"){  //只有当点击评论的时候,引发输入框获取焦点,此时回复评论标示才为true,为回复评论
				this.commentFlag=true;
				this.itemComment=item; 
				this.$refs["input"].placeholder="回复" +this.itemComment.createNickname;
			}else if(flag=="thisReply"){  //获取当前评论的某一个回复进行回复
				this.replyFlag=true
				this.itemComment=item        //获取当前评论信息
				this.itemReply=item.subCommentList[index]   //获取当前下，当前的回复信息
				this.replyIndex=index
				this.$refs["input"].placeholder = "回复" +this.itemReply.createNickname
			}       
		},
		
		//失去焦点的时候，回复评论的编标示为false
		changeReply(){
			window.scrollTo(0,0);
//			this.$refs["input"].placeholder="来一条你最走心的评论吧？";
		},
		//点击input
		isFocus(){
//			this.commentFlag = false;
//			this.replyFlag = false;
//			this.$refs["input"].placeholder="来一条你最走心的评论吧？";
		},
		
	
		//评论点赞和取消点赞
		likeAndDelete(item){
			if(!item.clickLike){ //没有被点赞，clickLike为判断标示
				this.likeComment(item)
			}else{
				this.deleteComment(item)
			}
		},
		
		//评论点赞
		likeComment(item){
			let self=this
			let params={commentId:item.id}
			Api.addLikeComment(params).then(data=>{ 
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
		
		//取消评论点赞
		deleteComment(item){
			let self=this
			let params={commentId:item.id}
			Api.deleteLikeComment(params).then(data=>{ 
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
		
		showInput(){
			let self=this

// 			setTimeout(function(){ 
// 				self.$refs.scrollerDocument.scrollTop=self.$refs.scrollerDocument.scrollHeight
// 			},300)
			
// 			setTimeout(function() {
//         document.getElementById('loginFullScreen').scrollTop = 
// 				document.getElementById('loginFullScreen').scrollHeight
//       }, 300)
			
			var inputTextBox = document.getElementById('loginFullScreen');
        inputTextBox.scrollIntoView(true);
		},
		
		back(){
			this.$emit("close")
		},
		/*input焦点*/
		inpsocus(){
			var userAgent = navigator.userAgent,app = navigator.appVersion;
			var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			var heis = document.documentElement.clientHeight || document.body.clientHeight;
			if(isiOS){
				window.setTimeout(function(){
				 	window.scrollTo(0, heis);
				}, 500)
			}
			
		},
  },
	
	directives: {
		blur: {
			// 指令的定义
			inserted: function (el) {
				el.blur()
			}
		}
	},
	
// 	watch:{
// 		$refs["input"](){   
// 			if(this.$refs["input"].blur()){  //当输入框失去焦点的时候，回复评论标示为false
// 				this.replyFlag=false
// 			}
// 			
// 			
// 		}
// 	},
	components:{
		scroller
	}
};

</script>

