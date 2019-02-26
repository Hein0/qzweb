<template>
	<div id="course">
		<div class="container">
			<div class="pageList lineH90 arrowdow bord">
				<div class="pageListCen">
					<span class="leftTile">术后天数</span>
					<span class="rightText fl-r pd-30">
		    			<input type="number" style="text-align:right;" placeholder="请输入术后天数" v-model="sky" min="1">
		    			天
					</span>
				</div>
			</div>
			<div class="preoperative">
				<div class="picture">术前视频或照片<span>(只能选择一种类型)</span></div>
				<div class="beforeImgList">
					<!--图片或视频显示区-->
		          	<div class="fileInputContainer" v-for="(item, index) in before_pics" @click="iptpop(index + 1, 'before')">
			            <!--<span class="titles" v-if="index==0">封面</span>-->
			            <img :src="item | filterImgSrc" alt="">
			            <!--<span class="delete" @click.stop="deleteImg(index +1,'before')">-</span>-->
		            </div>
					<mt-popup v-model="popupVisible2" position="bottom" class="mint-popup-4">
						<div class="picker-toolbar picker-toolbar2">
							<div class="mint-datetime-action mint-datetime-action2" @click="selectimg('beforeFile')"> 图片</div>
							<div class="mint-datetime-action mint-datetime-action2" @click="selectvideo">视频</div>
						</div>
					</mt-popup>
					<!-- 点击调出下拉框 -->
          			<div class="fileInputContainer" @click="iptpop(null, 'before')" v-show="isShowBeforeAdd"></div>

          			<!--上传图片的input-->
          			<input class="file" name="file" readonly="readonly" type="file" accept="image/png,image/gif,image/jpeg"
                 	@change="ChangeBefore_picsUpdate($event)" style="z-index:1" ref="beforeFile" />
				</div>
				<span class="cover"></span>
			</div>
			<div class="preoperative">
				<div class="picture">术后视频或照片<span>(只能选择一种类型)</span></div>
				<div class="afterImgList">
					<div class="fileInputContainer" v-for="(item,index) in after_pics" @click="iptpop2(index + 1, 'after')">
						<!--<span class="titles" v-if="index==0">封面</span>-->
			            <img :src="item | filterImgSrc" alt="">
			            <!--<span class="delete" @click.stop="deleteImg(index +1,'after')">-</span>-->
					</div>
					<div class="fileInputContainer"  @click="iptpop2(null, 'after')"  v-show="isShowAfterAdd"></div>
					
					<mt-popup v-model="popupVisible3" position="bottom" class="mint-popup-4">
						<div class="picker-toolbar picker-toolbar2">
							<div class="mint-datetime-action mint-datetime-action2" @click="selectimg('afterFile')"> 图片</div>
							<div class="mint-datetime-action mint-datetime-action2" @click="selectVideoAfter">视频</div>
						</div>
					</mt-popup>
					<!--上传图片的input-->
          			<input class="file" name="file" @change="ChangeAfter_picsUpdate($event)" type="file" ref="afterFile" accept="image/png,image/gif,image/jpeg"/>
				</div>
			</div>
			<textarea style="overflow:hidden; resize:none;outline:none;" class="box" type="text" v-model="content" placeholder="输入日志内容！"></textarea>
			<mt-button type="danger" class="Next" @click="toContinue">发表日记</mt-button>
		</div>
		<img :src="imgTemp" v-show="imgTempShow" style="width:0;height:0;opacity:0" alt="">
	</div>
</template>
<script>
	import axios from "axios";
	import { mapState } from "vuex";
	import { Toast } from "mint-ui";
	import imgPath from "../../common/api/imgConfig";
	import baseUrl from "../../common/api/config";
	import lrz from "lrz";
	import utils from "../../common/js/utils";
	import { Indicator } from "mint-ui";
	import Api from "../../common/api/api.js";
	export default {
		name: "course",
		data() {
			return {
				caseId: this.$route.query.casid,//路由带过来的案例id
				hisid: "",//历史id
				slaveid: "",//案例续写id
				popupVisible2: false,
				popupVisible3: false,
				sky: "", //天数
				pickerValue: new Date(),
				mytime: "",
				user_id: this.$route.query.user_id,//路由带过来的userid
				after_pics: [],//术后视频或照片
				before_pics: [],//术前视频或照片
				before_main:"",//术前图一
				before_two :"",//术前图2
		        before_three:"",//术前图3
				imgPath:imgPath,
				isBefore:"",
				fisrt: true,
				content: "",
				imgData: {
					accept: "image/gif, image/jpeg, image/png, image/jpg"
				},
				axios,
				baseUrl,
				config: {
					width: 828,
					// height: 1104,
					quality: 0.8
				},
				imgs: [],
				imgTemp: "",
				imgTempShow: false,
				ableUpAfter_pics: true,
        		ableUpBefore_pics: true,
        		currentIndex: '',
		        currentUploadType: '', // 当前上传术前还是术后
		        signImgOrVideo: {}, // 上传类型的标记
		        videoData: {},
		        isShowBeforeAdd: true, // 是否显示术前添加视频 视频上传一个即可
        		isShowAfterAdd: true,// 是否显示术前添加视频 视频上传一个即可
        		dataAll:"",
        		
			};
		},
		//组件写入dom结构之前
		mounted() {
			
		},
		//实例已经创建完成之后
		created: function() {
			utils.setTitle("日记历程");		
		    this.initData();    
		},
		//计算属性
		computed: {
			H5Json () {
		        return this.$store.state.H5Json
	      	}
			
		},
		//过滤器
		filters: {
	      	filterImgSrc (value) {
//	        	console.log(value);
				value = value || '';
	        	if (value.includes('http')) {
	          		return value
	        	} else {
	          		return imgPath + value
	        	}
	      	}
	    },
		//监听
		watch: {
			inputdata(value) {
//				console.log(value);
			},
			after_pics() {
				if(this.after_pics.length >= 7) {
					this.ableUpAfter_pics = !this.after_pics;
				}
			},
			before_pics() {
				if(this.before_pics.length >= 7) {
					this.ableUpBefore_pics = !this.before_pics;
				}
			},
			//监听h5回调
			H5Json () {
		        let data = JSON.parse(this.H5Json);
		        let arr = [];
		        this.signImgOrVideo[this.currentUploadType] = 'video';
        		this[this.currentUploadType + '_pics'][0] = data.coverUrl;
        		arr.push(data);
        		this.videoData[this.currentUploadType] = arr;
        		
        		// 清空视频信息 选择相同视频是出发watch
        		this.$store.commit('CLEAR_VIDEO_INFO');
        		
				// 视频只上传一个
        		this['isShow' + this.currentUploadType.substring(0, 1).toUpperCase() + this.currentUploadType.substring(1) + 'Add'] = false;
		    }
		},
		//方法
		methods: {
			//初始化数据请求   --回显信息
			initData(){
				let params = {
					user_id:this.user_id ,
					id: this.caseId,
				};
		        Api.caseDetail(params).then(data=>{ 
		        	data.status == '0' && this.showdata(data.data);//回显数据
		          	
		        });
			},
			//显示数据
			showdata(data){
				var self = this;
				this.dataAll = data;
				this.content = data.content;//内容
          		this.sky = data.oper_after_day;//天数
          		this.hisid = data.slave_his_id;//历史id
          		this.slaveid = data.slave_id;//案例续写id
          		
          		'before_main' in data && data["before_main"] && this.before_pics.push(data.before_main);//术前图1
        		'before_two' in data && data["before_two"] && this.before_pics.push(data.before_two);//术前图2
        		'before_three' in data && data["before_three"] && this.before_pics.push(data.before_three);//术前图3
		        
		        data.after_pic.length && showAfterMes(data.after_pic);
        		'before_main_video_pic' in data && showBeforeMes();

        		function showAfterMes(data) {
          			data.forEach(v => {
            			'pic_url' in v && self.after_pics.push(v.pic_url);
            			if ('video_pic_url' in v) {
              				self.after_pics[0] = v.video_pic_url;
              				self.isShowAfterAdd = false;
              				self.videoData.after = [
                				{
                  				'videoUrl': v.video_url,
                  				'coverUrl': v.video_pic_url
                				}
              				]
            			}
          			})
    			};

        		function showBeforeMes() {
          			self.before_pics[0] = data.before_main_video_pic;
          			self.isShowBeforeAdd = false;
          			self.videoData.before = [
            			{
              			'videoUrl': data.before_main_video,
              			'coverUrl': data.before_main_video_pic
            			}
          			]
        		}  	
			},
			//点击选择图片
			selectimg(str) {
		        this.popupVisible2 = false;
		        this.popupVisible3 = false;
		        
				if (this.signImgOrVideo[this.currentUploadType] == 'video') {
		          	this.$toast('只能上传视频')
		          	return;
		        }
		        this.$refs[str].click()
		    },
			//点击术前选择视频
			selectvideo() {
				this.popupVisible2 = false;
				this.popupVisible3 = false;
				this.isBefore = true;
				if (this.signImgOrVideo[this.currentUploadType] == 'img') {
		          this.$toast('只能上传图片')
		          return;
		        }
				try {
		          	window.webkit.messageHandlers.chooseVideo.postMessage("");
		        }catch (e) {
		          	android.chooseVideo("");
		        }
		        
			},
			//点击术后选择视频
			selectVideoAfter() {
		        this.popupVisible2 = false;
		        this.popupVisible3 = false;
		        this.isBefore = false;
		
		        if (this.signImgOrVideo[this.currentUploadType] == 'img') {
		          	this.$toast('只能上传图片')
		          	return;
		        }
		        
		        try {
		          	window.webkit.messageHandlers.chooseVideo.postMessage("");
		        }catch (e) {
		          	android.chooseVideo("");
		        }
		        
		    },
			//点击添加图片
			iptpop(index, str) {
				if (!index && this.before_pics.length >=3) {
					this.isShowBeforeAdd = false;
			        this.$toast('最多只能上传三张图片')
			        return;
			    }
			    this.popupVisible2 = true;
			    this.currentIndex = index?index:null;
			
			    str && (this.currentUploadType = str);
			},
			//点击添加图片
			iptpop2(index, str) {
				if (!index && this.after_pics.length >=7) {
					this.isShowAfterAdd = false;
		          	this.$toast('最多只能上传七张图片')
		          	return;
		        }
		        this.popupVisible3 = true;
		        this.currentIndex = index?index:null;
		
		        str && (this.currentUploadType = str);

			},
			//删除图片
			deleteImg(index,type){
				if(type=="before"){//术前图片
					this.before_pics.splice(index-1,1);
				}else if(type=="after"){
					this.after_pic.splice(index-1,1);
				}
				
			},
			//上传图片
			update(e, callback) {
				let self = this;
				let file = e.target.files[0];
				let type = file.type; //文件的类型，判断是否是图片
				// let size = file.size; //文件的大小，判断图片的大小
				if(this.imgData.accept.indexOf(type) == -1) {
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
				// if (size > 10485760) {
				//   Toast({
				//     message: "请选择10M以内的图片！",
				//     position: "middle",
				//     duration: 2000
				//   });
				//   return false;
				// }
				// console.log(file);
				lrz(file, self.config)
					.then(function(rst) {
						self.imgs.push(rst.base64);
						let param = new FormData(); //创建form对象
						// console.log(file.name);
						self.imgTemp = self.imgs[0];
						var arr = self.imgTemp.split(","),
							mime = arr[0].match(/:(.*?);/)[1],
							bstr = atob(arr[1]),
							n = bstr.length,
							u8arr = new Uint8Array(n);
						while(n--) {
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
						self.axios.post(baseUrl + "/case/upload.do", param, config)
							.then(response => {
								self.imgs = [];
								self.imgTemp = "";
								callback(response.data);
								Indicator.close();
							})
							.catch(error => {
								Toast({
									message: "上传图片出错！",
									position: "middle",
									duration: 2000
								});
							});
					})
					.catch(function(err) {
						console.log(err);
						Indicator.close();
						alert("压缩失败");
					})
					.always(function() {
						// 清空文件上传控件的值
						e.target.value = null;
					});
			},
			ChangeBefore_picsUpdate($event) {
		        let self = this;
		        let callback = function (response) {
			        if (response.status != 0) {
			            Toast({
			              message: response.message,
			              position: "middle",
			              duration: 2000
			            });
			        } else {
			            self.currentIndex ? (self.before_pics[self.currentIndex - 1] = response.data) : self.before_pics.push(response.data);
            			self.signImgOrVideo.before = 'img';
			        }
		        };
		        this.update($event, callback);
		    },
			ChangeAfter_picsUpdate($event) {
		        let self = this;
		        let callback = function (response) {
		          	if (response.status != 0) {
		            	Toast({
		              		message: response.message,
		              		position: "middle",
		              		duration: 2000
		            	});
		          	} else {
		            	self.currentIndex ? (self.after_pics[self.currentIndex - 1] = response.data) : self.after_pics.push(response.data);
            			self.signImgOrVideo.after = 'img';
		          	}
		        };
		        this.update($event, callback);
		    },
			//文本框失去焦点清空
			fisrtWrite() {
				if(this.fisrt) {
					this.content = "";
					this.fisrt = false;
				} else {
					return;
				}
			},
			//发布
			toContinue() {
				if(this.sky != "" && Number(this.sky) <0) {
					return Toast({
						message: "请输入术后天数",
						position: "middle",
						duration: 2000
					});
				}
				if(this.before_pics.length == 0 && this.after_pics.length == 0){
					return Toast({
						message: "请至少上传一张术前或术后照片",
						position: "middle",
						duration: 2000
					})
				}
				
				let data = {};
				data.id = this.caseId;//案例id
				data.user_id = this.user_id ? this.user_id : JSON.parse(localStorage.getItem("personInfo")).user_id;
		        data.oper_after_day = this.sky;//天数
				data.slave_his_id = this.hisid;//历史id
				data.slave_id = this.slaveid;//案例续写id
		        data.content = this.content;//内容
		        
		        if ('before' in this.videoData) {//术前视频
		        	data.before_main_video = this.videoData.before[0].videoUrl;
          			data.before_main_video_pic = this.videoData.before[0].coverUrl;
		        }else{//术前图片
		        	data.before_main = this.before_pics[0];
		        	data.before_two = this.before_pics[1] ? this.before_pics[1] : '';
		        	data.before_three = this.before_pics[2] ? this.before_pics[2] : "";
		        }
				
				data.after_pic = [];
				//术后图片
		        data.after_pic = this.after_pics.map((v) => {
		          return {pic_url: v}
		        });
				//术后视频
		        if ('after' in this.videoData) {
		          data.after_pic[0] = {};
		          data.after_pic[0].video_url = this.videoData.after[0].videoUrl;
		          data.after_pic[0].video_pic_url = this.videoData.after[0].coverUrl;
		        }
				
//		        delete data.before;
		        
				Api.perfectCase(data).then(res => {
					let self = this;
					if(res.status == 0) {
						Toast({
							message: "完善日志成功！",
							position: "middle",
							duration: 2000
						});
						setTimeout(function() {
//							self.$router.push({path: '/notPerfect',query:{user_id:self.user_id}});
							try {
                				window.webkit.messageHandlers.closeWebView.postMessage("");
              				}catch(e){
                				android.closeWebView("");
              				}
						}, 2000);
					} else {
						Toast({
							message: res.message,
							position: "middle",
							duration: 2000
						});
					}
				});
			}
		},
		
	};
</script>
<style scoped>
	#course {
		width: 100%;
		height: 100%;
		background-color: #f8f8f8;
		/* margin-bottom: 1.4667rem; */
		display: -webkit-box;
		/* OLD - iOS 6-, Safari 3.1-6 */
		display: -moz-box;
		/* OLD - Firefox 19- (buggy but mostly works) */
		display: -ms-flexbox;
		/* TWEENER - IE 10 */
		display: -webkit-flex;
		/* NEW - Chrome */
		display: flex;
		/* NEW, Spec - Opera 12.1, Firefox 20+ */
		flex-direction: column;
		overflow: hidden;
		flex-wrap: nowrap;
	}
	
	#course img {
		width: 1.333rem;
		height: 1.333rem;
	}
	
	#course .container {
		-webkit-box-flex: 1;
		/* OLD - iOS 6-, Safari 3.1-6 */
		-moz-box-flex: 1;
		/* OLD - Firefox 19- */
		/* width: 20%; For old syntax, otherwise collapses. */
		-webkit-flex: 1;
		/* Chrome */
		-ms-flex: 1;
		/* IE 10 */
		flex: 1;
		/* NEW, Spec - Opera 12.1, Firefox 20+ */
		flex: 1 1 auto;
		overflow-x: hidden;
		overflow-y: auto;
		/*解决ios上滑动不流畅*/
		-webkit-overflow-scrolling: touch;
		/* height: 100%; */
	}
	
	.pageList {
		position: relative;
		background: #fff;
		padding: 0 0.37rem;
		line-height: 1.2rem;
		margin-top: 0.4rem;
	}
	
	/*.pageList:after,.pageList:before {
		border: 8px solid transparent;
		border-left: 8px solid #fff;
		width: 0;
		height: 0;
		position: absolute;
		top: 35%;
		right: 9px;
		content: " ";
	}*/
	
	.pageList:before {
		border-left-color: #a0a0a0;
		right: 7px;
	}
	
	.pageList .leftTile {
		font-size: 0.37rem;
		color: #282828;
		width: 1.33rem;
	}
	
	.pageList .rightText {
		font-size: 0.37rem;
		color: #a0a0a0;
		/* width: 75%; */
		float: right;
		/*padding-right: 0.4rem;
		margin-right: 0.4rem;*/
		text-align: right;
	}
	
	.pageList .rightText input {border: 0;}
	
	.pageList .rightText:after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	
	.mint-popup-4 {
		width: 100%;
	}
	#course .preoperative {
		margin-top: 0.4rem;
		background-color: #fff;
		padding: 0 0.3733rem;
		padding-bottom: 0.2rem;
	}
	
	#course .preoperative .picture {
		height: 1.0667rem;
		border-bottom: 0.0133rem solid #ccc;
		font-size: 0.32rem;
		line-height: 0.9067rem;
		color: #282828;
	}
	
	#course .preoperative .picture span {
		font-size: 0.2667rem;
		color: #ff65b1;
	}
	
	.fileInputContainer {
		height: 1.5rem;
		background: url("./images/a11.png") center center;
		position: relative;
		width: 1.5rem;
		background-size: 100%;
	}
	.fileInputContainer .titles{width:0.8rem;height:0.35rem;line-height:0.35rem;font-size:0.15rem;text-align:center;padding-right:0.1rem;display: inline-block;color:#fff;background:#ff65b1;position: absolute;z-index: 5;border-top-right-radius: 0.13rem;border-bottom-right-radius: 0.13rem;}
	.fileInputContainer .delete{width:0.35rem;height:0.35rem;display: inline-block;color:#fff;background:#ff65b1;position: absolute;z-index: 5;right:-5px;top:-5px;border-radius:50%;text-align: center;font-size:0.26rem}
	.fileInput {
		height: 1.3333rem;
		overflow: hidden;
		font-size: 4rem;
		position: absolute;
		right: 0;
		top: 0;
		opacity: 0;
		filter: alpha(opacity=0);
		cursor: pointer;
	}
	
	#course .container .box {
		margin-top: 0.4rem;
		background-color: #fff;
		padding-left: 0.3733rem;
		padding-bottom: 3rem;
		padding-top: 0.3733rem;
		border: none;
		width: 100%;
		font-size: 0.32rem;
		color: #a0a0a0;
	}
	
	#course .Next {
		width: 6.4rem;
	    height: 1.04rem;
	    margin: 0 auto;
	    display: block;
	    border-radius: 0.6667rem;
	    background-color: #ff65b1;
	    font-size: 0.4133rem;
	    margin-top: 1rem;
	    margin-bottom: 1rem;
	}
	
	
	
	#course .preoperative .imgList {
		display: -webkit-box;
		/* OLD - iOS 6-, Safari 3.1-6 */
		display: -moz-box;
		/* OLD - Firefox 19- (buggy but mostly works) */
		display: -ms-flexbox;
		/* TWEENER - IE 10 */
		display: -webkit-flex;
		/* NEW - Chrome */
		display: flex;
		/* NEW, Spec - Opera 12.1, Firefox 20+ */
	}
	
	#course .preoperative .picture {
		height: 1.0667rem;
		border-bottom: 0.0133rem solid #ccc;
		font-size: 0.32rem;
		line-height: 0.9067rem;
		color: #282828;
	}
	
	#course .preoperative .picture span {
		font-size: 0.2667rem;
		color: #ff65b1;
	}
	
	#course .preoperative .fileInputContainer {
		margin-top: 0.3333rem;
		width: 1.5rem;
		height: 1.5rem;
		position: relative;
		margin-right: 0.4rem;
	}
	
	#course .preoperative .fileInputContainer .afterImgList img {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.4rem;
	}
	
	#course .preoperative .afterImgList {
		display: -webkit-box;
		/* OLD - iOS 6-, Safari 3.1-6 */
		display: -moz-box;
		/* OLD - Firefox 19- (buggy but mostly works) */
		display: -ms-flexbox;
		/* TWEENER - IE 10 */
		display: -webkit-flex;
		/* NEW - Chrome */
		display: flex;
		/* NEW, Spec - Opera 12.1, Firefox 20+ */
		flex-wrap: wrap;
		/*position: relative;*/
	}
	
	#course .preoperative .beforeImgList {
		display: -webkit-box;
		/* OLD - iOS 6-, Safari 3.1-6 */
		display: -moz-box;
		/* OLD - Firefox 19- (buggy but mostly works) */
		display: -ms-flexbox;
		/* TWEENER - IE 10 */
		display: -webkit-flex;
		/* NEW - Chrome */
		display: flex;
		/* NEW, Spec - Opera 12.1, Firefox 20+ */
		flex-wrap: wrap;
		/*position:relative;*/
	}
	
	#course .preoperative .beforeImgList img {
		/* margin-top: 0rem; */
		/* margin-top: 0.3333rem; */
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.4rem;
	}
	
	#course .fileInputContainer input {
		position: absolute;
		left: 0;
		top: 0;
		height: 1.5rem;
		width: 1.5rem;
		opacity: 0;
	}
	
	#course .fileInputContainer {
		height: 1.5rem;
		background: url("./images/a12.png") center center;
		position: relative;
		width: 1.5rem;
		background-size: 100%;
	}
	
	#course .preoperative .cover {
		font-size: 0.28rem;
		bottom: -0.4rem;
		margin-left: 0.3867rem;
	}
	
	#course .fileInputContainer img {
		position: absolute;
		left: 0;
		top: 0;
		height: 1.5rem;
		width: 1.5rem;
	}
	
	.mint-datetime-action2 {
		display: block;
		width: 100%;
	}
	
	.picker-toolbar2 {
		height: 100%;
	}
	
	.fileipt {
		width: 100%;
		height: 50%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}
	.file {
	    position: absolute;
	    left: 0;
	    top: 0;
	    height: 1.3333rem;
	    width: 1.3333rem;
	    opacity: 0;
	}
</style>