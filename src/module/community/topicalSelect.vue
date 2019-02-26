<template>
  <div id="shop">
    <div class="container mat04">
      <div id="searchbar-head">
        <div class="searchbar-input">
          <input id="search" ref="input1" type="search" autofocus="autofocus" placeholder="大家都在搜" v-model.trim="message" 
					@keyup.13='searchSelect(message)'>
        </div>
				<!-- <div class="creatTopical">新建话题</div> -->
      </div>
			
			<!-- 搜索话题列表 -->
			<div class="fuzzyMain" v-if="searchList && searchList.length>0">
				<ul>
					<li v-for="(item,index) in searchList" 
					:key="item.id" @click='selectTopical(item)' v-html='"#"+item.newName'></li>
				</ul>
			</div>
			
			<!-- 默认展示话题 -->
			
			<div class="searchMain" v-else>
				<!-- 用户选择的话题 -->
				<div class="content">
					<ul>
						<li class="active" v-for="(item,index) in selectedList" :key="item.name+index">{{item.name}}
							<img src="./images/delete.png" @click="deleted(item,index)" alt/>
						</li>
					</ul>
				</div>
				
				<!-- 热门搜索 -->
				<div class="content">
					<h1>热门搜索</h1>
					<ul>
						<li :class='item.sign==true?"active":"current"' v-for="(item,index) in hotSearchList" 
						:key="item.id" @click='selectTopical(item)'>#{{item.name}}</li>
					</ul>
				</div>
				
				<!-- 项目类别 -->
				<div class="content">
					<h1>项目类别</h1>
					<ul>
						<li :class='item.sign==true?"active":"current"' v-for="(item,index) in categoryList" 
						:key="item.id" @click='selectTopical(item)'>#{{item.name}}</li>
					</ul>
					<h1 :class='flag?"hide":"show"' @click="showAll" v-text='flag?"收起":"展开全部"'></h1>
				</div>
			</div>
			
			<div class="submit" @click="submit">确认</div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
	#searchbar-head{
		width:9.2rem;
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
		padding-left:0.533rem
	}
	
	#searchbar-head .searchbar-input{
		border: 1px solid #e3e3e3;
		color: #999999;
		/* width: 6.747rem; */
		width: 9.2rem;
		height: 0.854rem;
		line-height: 0.854rem;
		font-size: 0.373rem;
		border-radius: 999px;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
	}
	
	.creatTopical{
		font-size: 0.3733rem;
		color: #333;
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
		margin-top: 0.426600rem;
		padding-bottom: 0.4rem;
    border-bottom: 1px solid #f5f7f9;
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
    height: 0.533rem;
    line-height: 0.533rem;
		padding-left: 0.1867rem;
    padding-right: 0.213rem;
		margin-right: 0.133rem;
		margin-bottom:0.2667rem;
		border-radius: 10px 10px 10px 0;
		text-align: center;
	}
	
	.content .active img{
		width: 0.1867rem;
		height: 0.2rem;
		margin-bottom: 0.05rem;
	}
	
	.hide{
		background: url("./images/hide.png") 20% center no-repeat;
		background-size: 0.2667rem 0.16rem;
	}
	
	.show{
		background: url("./images/show.png") 20% center no-repeat;
		background-size: 0.2667rem 0.16rem;
	}
	
	.submit{
		width: 9.2rem;
    height: 1.2rem;
    background: #ff65b1;
    color: #fff;
    text-align: center;
    line-height: 1.2rem;
    border-radius: 0.64rem;
    margin: 0 auto;
		margin-top: 0.667rem;
    font-size: 0.4534rem;
	}
	
	.current{
		background: #c4b7f4;

	}
	
	.active{
		background: #ff84bd;
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
			messageFlag:false,       //是否创建过该话题
			hotSearchList:[],        //热门话题
			categoryList:[],         //项目类别
			categoryAll:[],          //全部项目类别
      searchList:[],           //搜索的关联话题
			selectedList:[],          //用户选择的话题
			noSelect:[],
			idExist:"",               //搜索列表中存在该搜索话题的id
			selectFlag:false,					//该话题是否被选择过
			searchFlag:false          //搜索列表是否包含该搜索话题
    };
  },
	
	// 初始化
	created:function(){
		// 获取热门搜索话题,项目类别
		this.getHotTopics();
		this.getProjects();
		if(sessionStorage.getItem("topical")){
			this.selectedList=JSON.parse(sessionStorage.getItem("topical"))
		}
	},
	
	beforeUpdate(){
		// 从发帖页面返回时,热门搜索和项目类别中,已选话题选中
		this.selectedList.forEach((element,i)=>{
			this.categoryList.forEach((item,index)=>{
				if(element.id==item.id && element.name==item.name){
					item.sign=true
				}
			})
		})
	},

  methods: {
		//获取热门话题
		getHotTopics(){
			let self=this
			Api.getHotTopics().then(data=>{ 
				if(data.status == '0'){
					self.hotSearchList=data.data
					if(self.hotSearchList.length){
						self.selectedList.forEach((element,i)=>{
							self.hotSearchList.forEach((item,index)=>{
								if(element.id==item.id && element.name==item.name){
									item.sign=true
								}
							})
						})
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
		
		//获取项目类别
		getProjects(){
			let self=this;
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
		
		//通过搜索框选择话题
		searchSelect(){
			let self=this;
			this.selectFlag=false;
			this.$refs.input1.blur();
			if(this.selectedList.length<9){//添加的话题小于9个
				if(this.message){
					if(this.searchList.length){//搜索话题时，搜索列表不为空，有相关信息
						for(let j=0;j<this.searchList.length;j++){//判断搜索列表里面是否有和搜索框里面一样的话题，如果有就不创建
							if(this.message==this.searchList[j].name){
								this.idExist=this.searchList[j].id;
								this.searchFlag=true;                  //搜索列表中存在该话题
							}
						}
					}
					
					for(let i=0;i<this.selectedList.length;i++){//判断是否有重复的话题
						if(this.message==this.selectedList[i].name){
							Toast({
								message: "不能重复添加话题",
								position: "middle",
								duration: 2000,
							});
							this.searchList=[];	
							this.message="";
							this.selectFlag=true   //已经被选择过的话题
							break;
						}
					}
					
					if(!this.selectFlag){ //该话题没有被选择过,如果搜索列表中有该话题this.idExist不为空
						this.selectedList.push({"name":this.message,"id":this.idExist});
						this.message=""
					}
				}
			}
			
			else{
				Toast({
					message: "最多只能选择9个话题",
					position: "middle",
					duration: 2000,
				});
				this.message="";
				return
			}
		},
		
		
		 //通过点击分类和搜索列表选择话题
		selectTopical(item){
			this.selectFlag=false;
			this.searchList=[];	
			this.message="";
			if(this.selectedList.length<9){//添加的话题小于9个
				for(let i=0;i<this.selectedList.length;i++){//判断是否有重复的话题
					if(item.name==this.selectedList[i].name){
						Toast({
							message: "不能重复添加话题",
							position: "middle",
							duration: 2000,
						});
						this.selectFlag=true   //已经被选择过的话题
						break;
					}
				}
				
				if(!this.selectFlag){ //没有重复
					item.sign=true;  //选择话题
					this.selectedList.push({"name":item.name,"id":item.id})
				}
			}
			
			else{
				Toast({
					message: "最多只能选择9个话题",
					position: "middle",
					duration: 2000,
				});
			}
		},
		
		//删除话题
		deleted(item,index){
			this.$set(this.selectedList, index, item)
			this.selectedList.splice(index,1)
			//匹配被删除话题属于热门搜索还是项目类别，并进行相对应的清除
			this.hotSearchList.forEach((element,i)=>{
				if(element.id==item.id && element.name==item.name){
					element.sign=false
				}
			})
			
			this.categoryList.forEach((element,i)=>{
				if(element.id==item.id && element.name==item.name){
					element.sign=false
				}
			})
			
		},
		
		// 确定话题
		submit(){
			//用户搜索话题，但是没有选择搜索列表里面的话题，或者搜索列表没有相关话题，点击确定，默认用户创建话题(同键盘确认)
			if(this.message){ 
				this.selectedList.push({"name":this.message})
			}
			
			if(this.selectedList.length==0){ //没有话题
				Toast({
					message: "请选择关联话题",
					position: "middle",
					duration: 2000
				});
				return
			}
			
			if(this.selectedList.length>9){
				Toast({
					message: "最多只能选择9个话题",
					position: "middle",
					duration: 2000
				});
				return
			}
			
			sessionStorage.setItem("topical",JSON.stringify(this.selectedList))
			this.$router.push({name:"publishPost"})
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
					self.searchList=data.data               //模糊搜索出相关话题
					self.searchList.forEach((item,i)=>{
						if(item && item.name){//搜索结果中，当前搜索的关键词显示不同的颜色。
							let replaceReg = new RegExp(self.message, 'g');
							item.newName = item.name.replace(replaceReg,'<span style="color:#333">' + self.message + '</span>');
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
		},
	}
};

</script>

