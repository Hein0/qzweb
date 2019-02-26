<template>
	<!--真实案例-->
	<div class="caseListPage">
		<div class="caseTitle">
			<p>真实案例</p>
		</div>
		
		<!--分页数据-->
		<scroller  v-if="!noData"  ref="scroller" :auto-fill="false" v-on:load="loadMore" >
    		<ul class="caseList">
        		<li class="casedity" v-for="(item,index) in caseList"  @click="toDetail(item.user_id,item.hospital_id,item.goods_key_word,item.id,index)">                                                
        			<span class="imgWrap">
        				<img  :src="(item.after_main_pic)" alt="" />
        			</span>
	              	<div class="infoText" >{{item.goods_key_word}}</div>
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
		name:"truecase",
		data() {
			return {
				imgPath,
				hospital_id:"",//医院id
				caseList:[],//医院案例列表
				noData:false,//没有数据
				pageNum:1,//当前页
				pageSize:10,//一次显示10条
				firstLoadData:[],//第一次加载的商品
      			moreLoadData:[],//下拉加载商品
			};
		},
		//父组件传的参数
		props: ["infoData"],
		// 组件实例化完成之后钩子函数
		created() {
			this.hospital_id = this.infoData.id;//医院id
		 	this.loadData();//初始化数据
		},
		//子组件
		components: {
			scroller,
		},
		//方法
		methods: {
			//初始化数据
			loadData() {
				var params = {
					hospital_id: this.hospital_id,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				};
				Api.hosmy(params).then(res => {
					if(res.status==0 && res.data.length){
						for (let i = 0; i < res.data.length; i++) {
							if(res.data[i].goods_key_word.indexOf(">")>-1){
								res.data[i].goods_key_word = res.data[i].goods_key_word.split(">")[0];
							}
							
							if(!res.data[i].after_main_pic){
								res.data[i].after_main_pic=res.data[i].after_main_video_pic
							}
							
							if(res.data[i].after_main_pic.indexOf("http")>-1){//视频或者图片自带域名
								res.data[i].after_main_pic=res.data[i].after_main_pic
							}else{
								res.data[i].after_main_pic=imgPath+res.data[i].after_main_pic
							}
						
			　　　}
						this.caseList = res.data;
					}
				});
				
			},
			
			//加载更多
			loadMore() {

				var self = this;
				self.pageNum = self.pageNum + 1
				var params = {
					hospital_id: self.hospital_id,
					pageNum: self.pageNum ,
					pageSize: self.pageSize,
				};
				Api.hosmy(params).then(res => {
					if(res.status==0 && res.data.length){
						if(self.pageNum==1){ //初始化第一次返回的商品
			        self.firstLoadData = res.data;
			        self.caseList = self.firstLoadData;
			      }else{ //下拉刷新的商品
			        self.moreLoadData = res.data;
			        for (let i = 0; i < self.moreLoadData.length; i++) {
								if(self.moreLoadData[i].goods_key_word.indexOf(">")>-1){
									self.moreLoadData[i].goods_key_word = self.moreLoadData[i].goods_key_word.split(">")[0];
								}
								
								if(!self.moreLoadData[i].after_main_pic){
									self.moreLoadData[i].after_main_pic=self.moreLoadData[i].after_main_video_pic
								}
								
								if(self.moreLoadData[i].after_main_pic.indexOf("http")>-1){//视频或者图片自带域名
									self.moreLoadData[i].after_main_pic=self.moreLoadData[i].after_main_pic
								}
								
								else{
									self.moreLoadData[i].after_main_pic=imgPath+self.moreLoadData[i].after_main_pic
								}
								
			　　　　 }
			              	
							self.caseList = self.caseList.concat(self.moreLoadData);
			          if (typeof self.$refs.scroller !== "undefined") {
			            self.$refs.scroller.removeLoading();
			          }
			        }
//			            self.pageNum+= 1
					}else{
			      !self.noData ? self.$refs.scroller.isNoData() : null;
			      if (typeof self.$refs.scroller !== "undefined") {
			        self.$refs.scroller.removeLoading();
			      }
			      
						Toast({
			        message: self.pageNum==1?"系统错误，请稍后再试":"已加载完毕",
			        position: "middle",
			        duration: 2000
			      });
			            
						self.pageNum = self.pageNum - 1;
			    }

				});
				
			},
			
			//跳转原生查看案例视图
			toDetail(user_id, hospital_id, goods_key_word, id, index) {
		      	let pageIndex = index + 1;
		      	let parms = {
		       			pageIndex,
		        		user_id,
		        		id,
		        		hospital_id,
		        		goods_key_word,
		        		pageNum: this.pageNum,
		        		pageSize: this.pageSize,
		        		down: 0,
		        		type: "1.1",
		      	};
		      	let jsonData = JSON.stringify(parms);
				wb_OpenCaseWind(jsonData);//查看案例
		      
		    },
				   
		},
		//计算属性
		computed:{

		},
		//监听
		watch: {
//		　　	caseList: {
//		　　　　	handler:function(Val, oldValue) {
//		　　　　　　	for (let i = 0; i < Val.length; i++) {
//						console.log(Val)
//			　　　　　　　　		return Val[i].goods_key_word = Val[i].goods_key_word.split(">")[0];
//		　　　　　　	}
//		　　　　	},
//		　　　　	deep: true
//		　　	}
		},
			
		
	}	
</script>

<style scoped>
	.caseListPage{background:#ffff;padding-bottom: 0.4rem;}
	.caseTitle{padding:0rem 0.4rem;}
	.caseTitle p{border-bottom: 1px solid #f6f8fa;padding:0.33rem 0;font-weight: bold;font-size:0.4rem;}
	
	.caseList{
		-moz-column-count: 2;-webkit-column-count: 2;column-count: 2;
		-moz-column-gap: 1em;-webkit-column-gap: 1em;column-gap: 1em;
		flex-flow: row wrap;padding: 0.4rem;background: #ffffff;}
	.caseList .casedity{margin-bottom: 0.4rem;-moz-page-break-inside: avoid;
				-webkit-column-break-inside: avoid;
				break-inside: avoid;border-radius: 0.14rem;/*height: 5.13rem;width: 4.4rem;*/background: #FFFFFF;cursor: pointer;overflow: hidden;border: 1px solid #f6f8fa;}
	.caseList .casedity:nth-of-type(2n){}
	.caseList .casedity .imgWrap{width:100%;height:auto;display: block;border-top-left-radius:0.14rem ;border-top-right-radius:0.14rem ;}
	.caseList .casedity .imgWrap img{width:100%;height:auto;}
	.caseList .casedity .infoText{text-align: center;font-size:0.34rem;color:#444444;padding:0.2rem 0rem;}
	
	
</style>