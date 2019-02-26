<template>
  <div id="shop">
    <div class="container" style="margin-top:44px;">
      <div id="searchbar-head">
				<img class="searchBack" v-show="isPhoneType" src="./images/back.png" alt="" @click="$router.back(-1)">
        <div class="searchbar-input">
          <input id="search" ref="input1" type="search" autofocus="autofocus" placeholder="大家都在搜" v-model.trim="message" @keyup.13='topicalDetail("search",message)'>
        </div>
      </div>
			
			<!-- 搜索话题列表 -->
			<div class="fuzzyMain" v-if="searchList && searchList.length>0">
				<ul>
					<li v-for="(item,index) in searchList" :key="item.id" @click='topicalDetail("click",item)' v-html='"#"+item.name'></li>
				</ul>
			</div>
			
			<!-- 默认展示话题 -->
			<div class="searchMain" v-else>
				<div class="content">
					<h1>热门搜索</h1>
					<ul>
						<li v-for="(item,index) in hotSearchList" :key="item.id" @click='topicalDetail("click",item)'>#{{item.name}}</li>
					</ul>
				</div>
				
				<div class="content">
					<h1>项目类别</h1>
					<ul>
						<li v-for="(item,index) in categoryList" :key="item.id" @click='topicalDetail("click",item)'>#{{item.name}}</li>
					</ul>
					<h1 :class='flag?"hide":"show"' @click="showAll" v-text='flag?"收起":"展开全部"'></h1>
				</div>
			</div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
	#searchbar-head{
		margin-top: 0.344rem;
		width:8.8rem;
		margin:0 auto;
		display: flex;
		background-color: #fff;
		height: 0.854rem;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		/* padding-left:0.533rem */
	}
	
	.searchBack{
		width: 0.25333rem;
		height: 0.44rem;
	}
	
	#searchbar-head .searchbar-input{
		border: 1px solid #e3e3e3;
		color: #999999;
		height: 0.854rem;
		line-height: 0.854rem;
		-webkit-flex: 1;
		-ms-flex: 1;
		margin-left: 0.3rem;
		flex: 1;
		font-size: 0.373rem;
		border-radius: 999px;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
	}
	
  #search{
		width: 100%;
		height:100%;
		background: url("./images/search.png") 0.4rem center no-repeat;
		padding-left: 1.067rem;
		background-size: 0.4rem 0.4rem;
	}
	
	.fuzzyMain{
		padding: 0 0.4rem;
		margin-top: 0.16rem;
	}

	.fuzzyMain li{
		font-size: 0.3733rem;
		height: 1.067rem;
		line-height: 1.067rem;
		border-bottom: 1px solid #f6f8fa;
		border-top: 1px solid #f6f8fa;
		color: #999999
	}
	
	.searchMain{
		padding: 0 0.4rem;
		margin-top: 0.6933rem;
	}
	
	.content{
		margin-top: 0.426600rem
	}
	
	.content h1{
		color: #999999;
    font-size: 0.3733rem;
    margin-bottom: 0.4rem;
	}
	
	.content  ul{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}
	
	.content li{
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
	
	.hide{
		display: inline-block;
    padding-right: 0.45334rem;
		background: url("./images/hide.png") right center no-repeat;
		background-size: 0.2667rem 0.16rem;
	}
	
	.show{
		display: inline-block;
    padding-right: 0.45334rem;
		background: url("./images/show.png") right center no-repeat;
		background-size: 0.2667rem 0.16rem;
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
			flag:false,
      message:"",
			isPhoneType:false,
			hotSearchList:[],        //热门话题
			categoryList:[],         //项目类别
			categoryAll:[],          //全部项目类别
      searchList:[],            //搜索的关联话题
			isSearch:false
    };
  },
	
	// 初始化
	created:function(){
		// 获取热门搜索话题,项目类别
		this.getHotTopics()
		this.getProjects()
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
  
  methods: {
		//获取热门话题
		getHotTopics(){
			let self=this
			Api.getHotTopics().then(data=>{ 
				if(data.status == '0'){
					self.hotSearchList=data.data
				}else{
					Toast({
						message: data.message,
						position: "middle",
						duration: 2000
					});
				}
			})
		},
		
		//获取项目类别
		getProjects(){
			let self=this
			Api.getProjects().then(data=>{ 
				if(data.status == '0'){
					self.categoryList=data.data.slice(0,10)   //默认取前十个
					self.categoryAll=data.data               //全部项目类别
				}else{
					Toast({
						message: data.message,
						position: "middle",
						duration: 2000
					});
				}
			})
		},
		
		//进入话题详情
		topicalDetail(flag,item){
			let self=this;
			if(flag=="search"){//通过点击键盘搜索进入话题主页
				if(this.searchList.length){//搜索列表有话题
					for(let i=0;i<this.searchList.length;i++){
						if(self.message==this.searchList[i].nameShort){//搜索列表有该搜索话题
							this.message="";
							this.isSearch=true
							this.$router.push({name:"topicalDetail",query:{name:item.name||item,id:item.id}});
							break;
						}
					}
					
					if(!this.isSearch){//搜索列表没有该搜索话题
						Toast({
							message: "请选择正确话题",
							position: "middle",
							duration: 2000
						});
					}
						
				}else{//搜索列表为空，没有搜到该话题
					Toast({
						message: "请输入正确话题",
						position: "middle",
						duration: 2000
					});
					
					return
				}
			}
			
			else{  //通过选择话题进入话题主页
				this.message=""
				this.$refs.input1.blur();
				if(item && item.name && item.name.indexOf('<span style="color:#333">')>-1){
					item.name =item.nameShort
				}
				this.$router.push({name:"topicalDetail",query:{name:item.name||item,id:item.id}})
			}
		},
		
		// 查看全部项目
		showAll(){
			let self=this;
			this.flag=!this.flag
			if(this.flag){      //展开
				self.categoryList=this.categoryAll
			}else{
				self.categoryList=this.categoryList.slice(0,10)
			}
				
		},
		
		// 搜索话题
    searchTopical(){
			let self=this
			let params={name:this.message}
			Api.searchTopic(params).then(data=>{ 
				if(data.status == '0'){
					self.searchList=data.data              //模糊搜索出相关话题
					self.searchList.forEach((item,i)=>{
						item.nameShort=item.name
						if(item && item.name && item.name.indexOf(self.message)>-1){//搜索结果中，当前搜索的关键词显示不同的颜色。
							let replaceReg = new RegExp(self.message, 'g');
							item.name =item.name.replace(replaceReg,'<span style="color:#333">' + self.message + '</span>');
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
		
		//搜索框内容改变就触发搜索话题
		search(){
			let self=this;
			this.clearTimer();
			if(self.message && self.message.length>0){
				self.timer =setTimeout(()=>{
					self.searchTopical()
				},500)
			}else{
				self.searchTopical()
			}
		},
		
		// 清空定时器，防止在500ms内多次点击多次触发
		clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
		}   
  },
	
	watch:{
		message(){
			let self=this;
			this.clearTimer();
			if(self.message && self.message.length>0){
				self.timer =setTimeout(()=>{
					self.searchTopical()
				},500)
			}else{
				self.searchTopical()
			}
		}
	}
};

</script>

