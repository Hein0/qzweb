<template>
  <div id="shop">
    <div class="container allColor">
			
			<div class="navTitle">
				<img src="./images/back.png" alt="" @click="$router.back(-1)">
				<span class="topTitle">帖子</span>
				<span class="publish" @click="publish">上传</span>
			</div>
      <ul class="photoContent">
				<li v-for="(item,index) in imgList" :key="index" v-show="imgList">
					<img :src="item.url | filterImgSrc" alt="">
				</li>
				<li class="addPhoto" @click="addFile" v-show='addFileFlag=="true"'></li>
			</ul>
			
			<div class="preoperative">
				<!--选择视频或图片的下拉框-->
				<mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
					<div class="picker-toolbar picker-toolbar2">
						<div class="mint-datetime-action mint-datetime-action2" @click="selectimg">上传图片
						</div>
						<div class="mint-datetime-action mint-datetime-action2" @click="selectvideo">上传视频</div>
					</div>
				</mt-popup>
				
				<!--上传图片的input-->
				<input class="file" name="file" readonly="readonly" type="file"
					accept="image/png,image/gif,image/jpeg"
					@change="updateFile($event)" ref="upload"/>
				<!-- <span class="cover"></span> -->
			</div>
			
			<ul class="tieZiContent">
				<li class="title">
					<div class="biaoQian">添加标签</div>
					<div style="display: flex;text-decoration: none;" @click="selectTopical">
						<div class="huaTi">{{topicalList}}</div>
						<div class="relatedHuaTi"></div>
					</div>
				</li>
				
				<li class="createdHuaTi">
					<input type="text"  placeholder="有趣的标题更容易让大家看到~" v-model="title">
				</li>
				<li class="pinglun">
					<textarea type="textarea"  placeholder="分享点内容.引领话题吧" v-model="content"></textarea>
				</li>
			</ul>
			
    </div>
  </div>
</template>
<style type="text/css" scoped>
	.navTitle{
		background: #fff;
		text-align: center;
		color: #333333;
		font-size: 0.42667rem;
		line-height: 44px;
		position: relative;
		align-items: center;
		display: flex;
	}
	
	.topTitle{
		margin-left: 3.4rem;
	}
	
	.navTitle img{
		margin-left: 0.4rem;
		width: 0.25333rem;
		height: 0.44rem;
	}
		
	.navTitle .publish{
		font-size: 0.3733rem;
		position: absolute;
		right: 0.4rem;
	}
	
	.file{
		position: absolute;
		left: 0;
		top: 0;
		height: 1.3333rem;
		width: 1.3333rem;
		opacity: 0;
		z-index: 1;
	}
	.allColor{
		background:#f6f8fa;
	}
	.photoContent{
		background: #fff;
		border-top: 1px solid #e3e3e3;
    padding:0.4rem;
    display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding-bottom: 0;
	}
	.photoContent li{
		width: 2rem;
		height: 2rem;
		border-radius: 10px;
		margin-right: 0.4rem;
		margin-bottom: 0.4rem;
	}
	 
	.photoContent li:nth-child(4n){
		margin-right: 0
	}
	
	.addPhoto{
		background-color: #e8e8e8;
		background-image: url(images/addPhoto.png);
		background-repeat:no-repeat;
		background-position: center center;
		background-size: 0.72rem;
	}
	
	.photoContent li  img{
		width: 2rem;
    height: 2rem;
	}
	
	/* .tieZiContent{
		padding-top: 0.2667rem;
	} */
	
	.tieZiContent .title{
		height: 1.0667rem;
		background: #fff;
		padding-left: 0.4rem;
		display: flex;
		align-items: center;
		margin-bottom: 0.2667rem;
	
	}
	
	.tieZiContent .createdHuaTi{
		height: 1.0667rem;
		line-height:1.0667rem;
		margin-bottom: 0.2667rem;
    padding-left: 0.4rem;
    background: #fff;
	}
	
	.tieZiContent .title .biaoQian{
		color:#282828;
		font-size: 0.373rem;
		background: url("./images/biaoQian.png") no-repeat right center;
		background-size: 0.16rem;
		height: 1.0667rem;
		line-height: 1.0667rem;
		width: 1.7867rem;
	}
	
	.tieZiContent .title .huaTi{
		width:7.36rem;
		line-height: 1.0667rem;
		height: 1.0667rem;
		text-align: right;
		color: #a0a0a0;
		font-size: 0.3733rem;
		padding-right: 0.2667rem;
	}
	
	.tieZiContent .title .relatedHuaTi{
		width: 0.5067rem;
		line-height: 1.0667rem;
		height: 1.0667rem;
		background: url(images/addHuaTi.png) no-repeat left center;
		background-size: 0.1467rem;
		background-position-y: 52%;
	}
	
	.tieZiContent .createdHuaTi input{
		height: 1.0667rem;
		line-height:1.0667rem;
		width: 100%;
	}
	
	.pinglun{
		height: 4.4rem;
		background: #fff;
		padding-left: 0.4rem;
	}
	
	.pinglun textarea{
		width: 100%;
		color: #a0a0a0;
		height: 100%;
		outline: none;
		resize:none;
		line-height: 20px;
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
	
	.preoperative{
		margin-top: 0.2667rem;
	}
	
	.preoperative .cover {
		font-size: 0.28rem;
		bottom: -0.4rem;
		margin-left: 0.3867rem;
	}
	
</style>
<script>
import { mapState } from "vuex";
import "common/css/shop.css";
import lrz from "lrz";
import {Indicator} from "mint-ui";
import imgPath from "../../common/api/imgConfig.js";
import setSessionKey from "../../common/js/setSessionKey.js";
import scroller from "../../components/public/scoller.vue";
import utils from "../../common/js/utils";
import Api from "../../common/api/api.js";
import { Toast } from "mint-ui";
import axios from "axios";
import baseUrl from "../../common/api/config";

export default {
	data() {
		return {
		signImgOrVideo:"",                    //首页选择的文件类型
		topicalList:"",
		flag:false,
		imgPath,
		imgData: {accept: "image/gif, image/jpeg, image/png, image/jpg"},
		config: {width: 828,quality: 0.8},     //图片的压缩标准
		imgs: [],                              //压缩后的图片
		imgTemp: "",
		imgTempShow: false,
		axios,
		baseUrl,
		message:"",
		imgList:[],               //上传的图片或者视频
		hotSearchList:[],        //热门话题
		categoryList:[],         //项目类别
		categoryAll:[],          //全部项目类别
		searchList:[],            //搜索的关联话题
		title:"",
		content:"",
		mediaType:null,
		isShowAdd:true,
		markList:[],
		vieoData:[],
		dataImg:[],
		addFileFlag:"true",
		popupVisible:false
    };
  },
	
	// 初始化
	created:function(){
		//获取所关联的话题	
		if(sessionStorage.getItem("topical")){
			this.markList=JSON.parse(sessionStorage.getItem("topical"))
			this.markList.forEach((item,i)=>{
				this.topicalList+=item.name+","
				if(this.topicalList.length>20){
					this.topicalList=this.topicalList.slice(0,20)+"..."
				}
			})
		}
		
		if(sessionStorage.getItem("title")){
			this.title=sessionStorage.getItem("title")
		}
		
		if(sessionStorage.getItem("content")){
			this.content=sessionStorage.getItem("content")
		}
		
		if(sessionStorage.getItem("imgList")){
			this.imgList=JSON.parse(sessionStorage.getItem("imgList"))
		}
		
		if(sessionStorage.getItem("vieoData")){
			this.vieoData=JSON.parse(sessionStorage.getItem("vieoData"))
		}
		
		if(sessionStorage.getItem("signImgOrVideo")){
			this.signImgOrVideo=sessionStorage.getItem("signImgOrVideo")
		}
	},
			
	computed: {
		nativeToH5Video() {
			return this.$store.state.nativeToH5Video;
		}
	},
	
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
	
	beforeMount(){
		if(sessionStorage.getItem("addFileFlag")){
			this.addFileFlag=sessionStorage.getItem("addFileFlag")
		}
	},
	
	watch:{
		nativeToH5Video(value) {
			let self=this;
			let data = JSON.parse(this.nativeToH5Video);
			let Vdatas = {url:data.videoUrl,coverPageUrl:data.coverUrl};
			let Vdatas2 = {url:data.coverUrl,coverPageUrl:data.videoUrl};
			self.signImgOrVideo = 'video';
			self.addFileFlag="false";
			
			self.vieoData.push(Vdatas);   //视频封面和视频链接
			//清空视频信息 选择相同视频是出发watch
			self.imgList.push(Vdatas2);
			self.$store.commit('CLEAR_VIDEO_INFO');
			// 视频只上传一个
			self.isShowAdd = false;
		}
	},
  
  methods: {
		// 选择上传文件的类型
		addFile(){
			if(this.signImgOrVideo=="img"){
				this.$refs["upload"].click()
			}else if(this.signImgOrVideo=="video"){
				this.selectvideo()
			}else{
				this.popupVisible = true;
			}
		},
		
		//选择话题
		selectTopical(){
			sessionStorage.setItem("title",this.title)
			sessionStorage.setItem("content",this.content)
			sessionStorage.setItem("imgList",JSON.stringify(this.imgList))
			sessionStorage.setItem("vieoData",JSON.stringify(this.vieoData))
			sessionStorage.setItem("addFileFlag",this.addFileFlag)
			sessionStorage.setItem("signImgOrVideo",this.signImgOrVideo)
			this.$router.push({name:"topicalSelect"})
		},
		
		//上传图片
		selectimg() {
			this.popupVisible = false;
			this.$refs["upload"].click()
		},
		
		//上传是视频
		selectvideo() {
			this.popupVisible = false;
			if (this.signImgOrVideo == 'img') {
				this.$toast('只能上传图片')
				return;
			}
			try {
				window.webkit.messageHandlers.chooseVideo.postMessage("");

			}catch (e) {
				android.chooseVideo("");

			}
			if(this.imgList.lenght){ //有视频就隐藏添加文件按钮
				self.addFileFlag="false"
			}
		},
		
		// 上传图片
		updateFile($event) {
			let self = this;
			let callback = function (response) {
				if (response.status != 0) {
					Toast({
						message: response.message,
						position: "middle",
						duration: 2000
					});
				} else {
					self.signImgOrVideo = 'img';
					self.imgList.push({url:response.data});
					if(self.imgList.length>4){
						self.addFileFlag="false"
						return;
					}else{
						self.addFileFlag="true"
					}
				}
			};
			this.update($event, callback);
		},
		
		// 上传并压缩图片
		update(e, callback) {
			let self = this;
			let file = e.target.files[0];
			let type = file.type; //文件的类型，判断是否是图片
			// let size = file.size; //文件的大小，判断图片的大小
			if (this.imgData.accept.indexOf(type) == -1) {
				Toast({
					message: "请选择正确的图片格式！",
					position: "middle",
					duration: 2000
				});
				return false;
			}
			Indicator.open({
				text: "上传中...",
				spinnerType: "fading-circle"
			});

			lrz(file, self.config)
				.then(function (rst) {
					self.imgs.push(rst.base64);
					let param = new FormData(); //创建form对象
					// console.log(file.name);
					self.imgTemp = self.imgs[0];
					var arr = self.imgTemp.split(","),
						mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(arr[1]),
						n = bstr.length,
						u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					var obj = new Blob([u8arr], {
						type: mime
					});
					param.append("file", obj, file.name); //通过append向form对象添加数据
					param.append("chunk", "0"); //添加form表单中其他数据
					let config = {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}; //添加请求头
					self.axios
						.post(baseUrl + "/case/upload.do", param, config)
						.then(response => {
							self.imgs = [];
							self.imgTemp = "";
							self.signImgOrVideo = 'img';
							callback(response.data);
							Indicator.close();
						})
						.catch(error => {
							Indicator.close();
							Toast({
								message: "上传图片出错！",
								position: "middle",
								duration: 2000
							});
						});
				})
				.catch(function (err) {
					console.log(err);
					Indicator.close();
					alert("压缩失败");
				})
				.always(function () {
					// 清空文件上传控件的值
					e.target.value = null;
				});
		},
		
		//发表帖子
		publish(){
			let self=this
			if(this.topicalList==""){
				this.$toast('话题不能为空')
				return;
			}else{
				self.signImgOrVideo=='img'?self.mediaType=1:self.mediaType=2;
				let params={title:this.title,
									content:this.content,
									mediaType:this.mediaType,
									mediaList:self.signImgOrVideo=='img'?self.imgList:self.vieoData,
									topicList:this.markList
					};
				Api.createArticle(params).then(data=>{ 
					if(data.status == '0'){
						sessionStorage.removeItem("topical")
						sessionStorage.removeItem("title")
						sessionStorage.removeItem("content")	
						sessionStorage.removeItem("imgList")
						sessionStorage.removeItem("vieoData")
						sessionStorage.removeItem("addFileFlag")
						sessionStorage.removeItem("signImgOrVideo")
						
						if(getCurNativeType() == 2){//iso
							try{
								let baseUrl = window.location.href.slice(0,window.location.href.indexOf("community.html"));
								
								window.location.href =baseUrl + "shopIndex.html#/index/community"
							}catch(err) {
								console.log(err)
							}
						
						}else{
							try{
								let data ={viewName:4};
								let JsonObjStr =JSON.stringify(data);
								gotoView(JsonObjStr)
							}catch(err) {
								console.log(err)
							}
						}
						
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
  },
};

</script>

