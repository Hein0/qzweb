<template>
	<div class="likeList">
		<!--头部-->
		<!--<mt-header title="草稿箱" id="headera">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right" class="submits" id="selectId" >选择</mt-button>
        </mt-header>-->
        
		<div class="like-wrap">
			
			<div class="like-list" v-if="issueList && issueList.length>0">
	            <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> 
		            <ul class="cbp_tmtimeline">
		                <li v-for="(item,index) in issueList" @click="playFun(item.cover,item.url,item.content)">
		                    <time class="cbp_tmtime" ><span>{{item.publishTime ? item.publishTime.substring(5,10):"" }}</span> <span>{{item.publishTime ? item.publishTime.substring(0,4):"" }}</span></time>
		                    <div class="cbp_tmicon cbp_tmicon-phone"></div>
		                    <div class="cbp_tmlabel">
		                        <!--<div class="title">
		                        	<span class="yl"><i></i>{{item.scanNum}}</span>
		                        	<span class="sc"><i></i>{{item.voteNum}}</span>
		                        </div>-->
		                        <pre><img :src="item.cover" /></pre>
		                    </div>
		                </li>
		            </ul>
		        </v-loadmore>    
	        </div>
	        <!--没有数据-->
			<div class="novido" v-else>
				<img src="./images/nodata.png" />
				<div class="novido-txt">
					<span class="txt-titile">快去发布视频，生动记录变美蜕变</span>
				</div>
			</div>

			<div class="footers" v-if="issueList.length<=0" @click="openDraft">
				<span>打开草稿箱</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	import Api from "../../common/api/api.js";
	import imgPath from "../../common/api/imgConfig.js";
	export default {
	  	name: "userInfo",
	  	//组件
	  	components: {
	    	'v-loadmore':Loadmore,
	  	},
	  	//数据
  		data() {
    		return {
    			user_id:this.$route.query.user_id,
    			issueList:[],
    			imgPath:imgPath,
    			pageNum: 1,//pageNum为0时表示刷新或第一次加载，每加载一次增加1，刷新时默认为0
				pageSize: 10,
				allNum:"",  
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
//			this.$parent.init();
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
        		Api.videoList(params).then(data =>{  
	          		// 是否还有下一页，加个方法判断，没有下一页要禁止上拉  
	          		this.isHaveMore(data.dataCount);  
	          		this.issueList = data.data;  
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
		        Api.videoList(params).then(data=>{  
		          	this.issueList = this.issueList.concat(data.data);  
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
  			
  			//点击播放
  			playFun(imgUrl,vUrl,txt){
  				let jObj = {
  					"coverUrl": imgUrl,
  					"videoUrl": vUrl,
					"content": txt,
  				};
				playVideo(JSON.stringify(jObj));//调用原生播放
  			},
  			//打开草稿箱
  			openDraft(){
  				//调用原生方法
  				window.toDraftVideo();
  			}
			
  		}	
	  	
	}
</script>

<style scoped>
	#headera {height:1.17rem;background-color: #fff;color: #282828;box-shadow: 0 0 9px -2px #ff65b1 ;-webkit-box-shadow: 0 0 9px -2px #ff65b1; }
	.mint-header .mint-button.submits {color: #ff65b1;}
	.likeList{width:100%;height: 100%;overflow: auto;}
	.like-wrap{width: 100%;position:relative;height:100%;padding:0.66rem 0 ;overflow-x: hidden;overflow-y: auto;}
	.novido{margin: 3.54rem 0 0;text-align: center;}
	.novido img{width:3.22rem;height:2.61rem}
	.novido .novido-txt{margin-top:1.46rem;text-align: center;}
	.novido .novido-txt .txt-titile{color:#787878;font-size:0.37rem}
	.novido .novido-txt p{font-size:0.32rem;color:#787878;margin-top:0.24rem;}
	
	.like-wrap .footers{position:fixed;height:1.17rem;width:100%;background:#FF65B1;text-align: justify;display:flex;z-index: 10;left: 0;bottom: 0;border-top:1px solid #e3e3e3;}
	.like-wrap .footers span{font-size:0.45rem;color:#fff;padding:0rem 0.4rem;text-align: center;width:2.8rem;display: inline-block;line-height:1.17rem;flex: 2;-webkit-flex: 2;-moz-box-flex: 2;}

	.like-list{width: 95%;max-width: 69em;margin: 0 auto;padding: 0 0.1rem 0.4rem;}
	.cbp_tmtimeline{margin: 0 auto; padding: 0;list-style: none; position: relative;}
    /* The line */
    .cbp_tmtimeline:before{content: '';position: absolute;top: 0; bottom: 0;width: 0.1rem;background: #ffe0ef;left: 17%; }
    .cbp_tmtimeline > li{position: relative;}
    /* The date/time */
    .cbp_tmtimeline > li .cbp_tmtime{display: block;width: 25%;padding-right: 100px;position: absolute;}
    .cbp_tmtimeline > li .cbp_tmtime span{display: block;text-align: right;width:1.33rem;text-align: center;color: #FF65B1;}
    .cbp_tmtimeline > li .cbp_tmtime span:first-child{font-size: 0.42rem;}
    .cbp_tmtimeline > li .cbp_tmtime span:last-child{font-size: 0.32rem;}
    .cbp_tmtimeline > li:nth-child(odd) .cbp_tmtime span:last-child{color: #FF65B1;}
    /* Right content */
    .cbp_tmtimeline > li .cbp_tmlabel{margin: 0 0 0.37rem 23%;background: #fff;color: #fff;padding: 0.16rem;font-size: 1.2em;font-weight: 300;line-height: 1.4;position: relative; border-radius: 5px;box-shadow: 0 0 9px -2px #ff65b1;
    -webkit-box-shadow: 0 0 9px -2px #ff65b1;}
    .cbp_tmtimeline > li .cbp_tmlabel .title{padding: 0 0 0.08rem 0;display: flex;display: -webkit-flex;}
    .cbp_tmtimeline > li .cbp_tmlabel .title span{flex: 1;-webkit-flex: 1;color:#A0A0A0;font-size: 0.4rem}
    .cbp_tmtimeline > li .cbp_tmlabel .title .yl{text-align: left;}
    .cbp_tmtimeline > li .cbp_tmlabel .title .yl i{width: 0.35rem;height: 0.35rem;display: inline-block;margin-right:0.1rem;background:url("./images/yanjing.png") no-repeat center center;background-size:0.4rem 0.45rem;}
    .cbp_tmtimeline > li .cbp_tmlabel .title .sc{text-align: right;}
    .cbp_tmtimeline > li .cbp_tmlabel .title .sc i{width: 0.35rem;height: 0.35rem;display: inline-block;margin-right:0.1rem;background:url("./images/dianzan.png") no-repeat center center;background-size:0.35rem 0.35rem;}
    .cbp_tmtimeline > li .cbp_tmlabel pre{width:100%;height:6rem;display: inline-block;margin:0 auto;text-align: center;}
    .cbp_tmtimeline > li .cbp_tmlabel pre img{width:100%;height:100%;}
    /* The triangle */
    .cbp_tmtimeline > li .cbp_tmlabel:after{right: 100%;border: solid transparent;content: " ";height: 0;width: 0;position: absolute;
        pointer-events: none;border-right-color: #f7f5f5; border-width: 10px;top: 10px;}
    
    /* The icons */
    .cbp_tmtimeline > li .cbp_tmicon{
        width: 0.32rem;height: 0.32rem;font-family: 'ecoico';speak: none;
        font-style: normal;font-weight: normal;font-variant: normal;text-transform: none;font-size: 1.4em;
        line-height: 0.32rem;-webkit-font-smoothing: antialiased;position: absolute;color: #fff;
        background: #FF65B1;border-radius: 50%;box-shadow: 0 0 0 0.02rem #FF65B1;text-align: center;left: 20%;
        top: 0;margin: 0 0 0 -17px;}
	
	
</style>