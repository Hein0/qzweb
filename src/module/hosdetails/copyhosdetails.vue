<template>
	<div id="hospHome">
		<span class="backShop" @click="home">返回商城</span>
		<div class="container">
			<div class="header">
				<div class="hosdInfo">
					<!--名称-->
					<div class="infoCente">
						<div class="lImgWrap">
							<div class="imgW">
								<img :src="(imgPath + hosinfo.logo)" />
							</div>
							<span class="yrz">已认证</span>
						</div>
						<div class="rTexWrap">
							<p class="h4">{{hosinfo.anotherName}}</p>
							<p>{{hosinfo.propaganda}}</p>
						</div>
					</div>
					<!--点赞数，预约数-->
					<div class="infoMess">
						<ul class="messUl">
							<li>
								<span>关注数</span>
								<h3>{{hosinfo.followNum}}</h3>
							</li>
							<li>
								<span>预约数</span>
								<h3>{{hosinfo.appointNum}}</h3>
							</li>
						</ul>
					</div>
				</div>
			</div>
			
			<!--导航一级菜单-->
			<div class="navigation">
				<div class="naviWrap">
					<div class="naviTba" v-for="(tab ,index) in tabs" :class="{nactive:iscur==index}" @click="iscur=index,tabChange('child' + (index + 1))">{{tab.name}}</div>
				</div>
			</div>
			
	      	<!--内容显示区-->
	      	<div class="contentWrap" :is="currentView" :info-data="hosinfo">
	      		
	      	</div>
	      	
		</div>
		
		<!--立即咨询-->
		<div class="consultWrap">
			<div class="attention" :class="{attenTive:followIf}" @click="Attention">
				<i></i>
				<p>关注医院</p>
			</div>
			<div class="riBut" @click="openkefUrl(kefUrl)">立即咨询</div>
		</div>
	</div>
</template>
<style scoped>
	#hospHome {position: relative;padding-bottom: 1.5rem;background:#f6f8fa;top: 0;left: 0;font-family: "微软雅黑";display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-direction: column;overflow: hidden;flex-wrap: nowrap;-webkit-overflow-scrolling: touch;width: 100%;height: 100%;}                           
	#hospHome .container {-webkit-box-flex: 1;-moz-box-flex: 1;-webkit-flex: 1;-ms-flex: 1;flex: 1;flex: 1 1 auto;overflow-y: auto;height: 100%;-webkit-overflow-scrolling: touch;}
	#hospHome .container .header {padding-top:1.33rem;background-image: url(images/headbg1.png);background-repeat:no-repeat;background-size:100%;margin-bottom: 0.26rem;}
	#hospHome .container .header .hosdInfo{width: 9.45rem; height: 4.86rem;padding:0.4rem; border-radius: 0.1333rem; margin: 0% auto;background-image: url(images/headbg2.png); background-position: bottom; background-repeat: no-repeat;background-size: 100%;box-shadow: 0 0 0 0 rgba(238, 243, 249, 0.6);}
	#hospHome .backShop{position:fixed;right:0.4rem;z-index: 1490;color: #fff; font-size: 0.4rem;font-weight: normal;top: 0.4rem;left: 7.8267rem;line-height: 1.04rem;height: 1.04rem; text-align: center;}
	.infoCente{}
	.infoCente:after,.messUl:after,.consultWrap:after,.naviWrap:after{clear:both;content:'';display:block;width:0;height:0;visibility:hidden;}
	.infoCente .lImgWrap{width:2.13rem;height:2.33rem;position:relative;display: inline-block;float:left;margin-right:0.3rem;}
	.infoCente .lImgWrap .imgW{width:2.13rem;height:2.13rem;display: inline-block;border-radius:1.06rem;box-shadow:0.1rem 0.1rem 0.1rem #eef3f9 ;}
	.infoCente .lImgWrap .imgW img{width:2.13rem;height:2.13rem;border:none;border-radius:1.06rem;}
	.infoCente .lImgWrap .yrz{width:1.41rem;text-align: center;height:0.44rem;color:#FFFFFF;font-size:0.32rem;background:#62a5ff;padding:0.06rem;border-radius:0.3rem;position:absolute;bottom: 0.1rem;left:0;right:0;margin:0 auto;}
	.infoCente .rTexWrap{float:left;width:6.13rem;display: inline-block;text-align: left;}
	.infoCente .rTexWrap .h4{font-size:0.48rem;color:#333333;margin-bottom: 0.26rem;padding-top:0.35rem;}
	.infoCente .rTexWrap p{font-size:0.32rem;color:#999999;line-height:0.45rem;}
	
	.messUl{margin-top:0.46rem}
	.messUl li{width:1.33rem;float: left;margin:0 0.4rem 0 0.13rem;text-align: center;}
	.messUl li span{color:#999999;font-size:0.32rem;}
	.messUl li h3{color:#333333;font-size:0.5rem;margin-top:0.16rem;}
	
	/*导航*/
	.navigation{padding:0.2rem 0.4rem;background:#FFFFFF;}
	.naviWrap{text-align: center;}
	.naviWrap .naviTba:nth-of-type(4n){margin-right:0rem}
	.naviWrap .naviTba{padding:0.13rem;height:0.9rem;text-align: center;line-height:0.6rem;width:2.06rem;margin:0.2rem 0;display: inline-block;color:#333333;font-size:0.37rem;border: 1px solid #ecf0f4;border-radius:0.9rem;float:left;margin-right:0.3rem}
	.naviWrap .nactive{border:1px solid #ff67b2 !important;color:#ff67b2 !important;}
	
	/*咨询*/
	.consultWrap{width:100%;position:fixed;bottom: 0;left:0;height:1.6rem;padding:0.2rem 0.26rem;background:#fff;}
	.consultWrap:before{content: " ";position: absolute;left: 0;top: 0;right: 0;height: 1px;border-top: 1px solid #C0BFC4; color: #C0BFC4; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleY(0.5); transform: scaleY(0.5);}
	.consultWrap .attention{width:1.6rem;height:1.2rem;float:left;display: inline-block;margin-right:0.16rem;}
	.consultWrap .attention i{width:0.52rem;height:0.48rem;margin-top:0.1rem;margin: 0 auto;text-align: center;display:block;background-image: url(images/nogz.png);background-size:0.52rem 0.48rem}
	.consultWrap .attenTive i{background-image: url(images/ygz.png) !important;}
	.consultWrap .attention p{padding-top:0.24rem;text-align: center;color:#999999;font-size:0.29rem;display: block;}
	.consultWrap .attenTive p{color:#ff67b2 !important;}
	.consultWrap .riBut{width:7.5rem;height:1.2rem;float:left;border-radius:0.6rem;margin-left:0.16rem;background:#42b0ff;text-align: center;display: inline-block;line-height:1.2rem;font-size:0.48rem;color:#FFFFff;}
	
	
</style>
<script>
	// import child1 from "./components/child1.vue";//热卖商品
	import child1 from "./components/child2.vue";//真实案例
	import child2 from "./components/child3.vue";//本院医生
	import child3 from "./components/child4.vue";//执业资格
	import child4 from "./components/child5.vue";//品牌认证
	import child5 from "./components/child6.vue";//荣誉展示
	import child6 from "./components/child7.vue";//医院地址
	import scroller from "../../components/public/scoller.vue";
	import imgPath from "../../common/api/imgConfig.js";
	import Api from "../../common/api/api.js";
	import utils from "../../common/js/utils.js";
	import {Toast} from "mint-ui";
	export default {
		data() {
			return {
				user_id:"",//用户id
				hospital_id:"",//医院id
				city:"",//城市名称
				kefUrl:"",//客服地址
				currentView: 'child1', // 默认选中第一项
				iscur: 0,//选中下标
				isAttention:false,//是否关注
				followIf:"",//是否关注
				no_data: false,
				msg: 1,
				tab: this.$route.query.tab, //选中第几个
				imgPath,
				tabs: [
					{name: "真实案例"},
					{name: "本院医生"},
					{name: "执业资格"},
					{name: "品牌认证"},
					{name: "荣誉展示"},
					{name: "医院地址"}
				],
				
				spanflag: false,
				hosinfo: [],//医院信息
				goodsDetailList:[],//列表
			};
		},
		//子组件
		components: {
			child1,
			child2,
			child3,
			child4,
			child5,
			child6,
			// child7,
			scroller
		},
		//创建组件实例化之前
		beforeCreate(){
			
		},
		// 组件实例化完成之后钩子函数
		created:function() {
			this.user_id = JSON.parse(localStorage.getItem("personInfo")).user_id;
			this.hospital_id = this.$route.query.hospital_id;
			this.city = this.$route.query.city;
			this.getHospitalInfo();//获取医院信息
			//调用原生隐藏头部购物车图标
			this.outImg();
			
		},
		//方法
		methods: {
			//tab切换
			tabChange:function(tab){
      			this.currentView = tab;
			},
			
			//医院信息
			getHospitalInfo(){
				var params = {
					hospital_id: this.hospital_id,
					user_id: this.user_id,
				};
				Api.getHospitalInfo(params).then(res => {
					this.hosinfo = res.data;
					if(this.hosinfo.hospital_type){
                		this.hosinfo.hospital_type=utils.hospitalChange(this.hosinfo.hospital_type)
              		}
					if(this.hosinfo.doctors.length>0){
						for(let i=0;i<this.hosinfo.doctors.length;i++){
							this.hosinfo.doctors[i].position = utils.doctorPosition(this.hosinfo.doctors[i].position);
						}
              		}
					this.followIf = res.data.followIf;//是否关注
					this.getKeUrl(res.data.id);//客服地址
				});
				
			},
			//调用原生隐藏头部购物车图标
			outImg(){
				try{
			        wb_ShowShoppingcart('0')
		      	}catch(err) {
		        	console.log(err)
		      	}
			},
			//获取客服url
	      	getKeUrl(id) {
	      		let self = this;
	          	Api.getKeFuUrl({
	            	id: id
	          	}).then(function(res) {
	            	if(res.status == 0) {
	              		self.kefUrl = res.data.qiao_url;
	            	} else {
	              		self.$toast('获取数据失败!')
	            	}
	          	})
	        	
	      	},
	      	//打开客服地址
	      	openkefUrl(url){
	      		if(url){
	      			window.location.href = url;
	      		}else{
	      			Toast({
						message: "暂时还不可以咨询",
						position: "center",
						duration: 2000
					});
	      		}
	      	},
	      	
	      	//关注、取消关注
	      	Attention(){
	      		if(this.followIf=="0"){//如果没有0 ,是未关注 1是已关注
	      			this.followIf = 1;
	      			var params = {
						attention_id: this.user_id,//用户id
						attentioned_id:	this.hospital_id,//医院id
						attention_type: 1,//关注类型-用户
						attentioned_type:	2,//被关注类型-医院
					};
					Api.insertAttentionRecord(params).then(res => {
						this.getHospitalInfo();//获取医院信息
					});
	      		}else{//取消关注
	      			this.followIf = 0;
	      			var pms = {
	      				attention_id: this.user_id,//用户id
						attentioned_id:	this.hospital_id,//医院id
						status: 2,
					};
					Api.cancleOrDeleteAttention(pms).then(res => {
						this.getHospitalInfo();//获取医院信息
					});
	      		}
	      	},
			//返回商城
			home(){
            	let baseUrl = window.location.href.slice(0,window.location.href.indexOf("hosdetails.html"));
            	window.location.href =baseUrl + "shopIndex.html#/index/shop"
          	},

		},
		
	};
</script>