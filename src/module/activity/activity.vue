<template>
	<div id="activity">
		<div class="container">
			<!--转盘-->
			<div class="wrapCanvs">
				<canvas class="turnable" width="315" height="315"></canvas>
				<img id="tips" class="points2 i_cont" src="./images/pointer.png" @click="promptlyOut">
			</div>
			
			<div class="bgiocnWrap"></div>
			
			<div class="timeTitle">已成功邀请<span>{{num}}</span>人</div>
			
			<div class="wrapCenter">
				<!--获得抽奖机会-->
				<div class="textCenten chance">
					<h4>获得抽奖机会</h4>
					<div class="textList textListUl">
						<div class="textListTitle">邀请{{after}}个人下载app并完成注册，可兑换一次抽奖机会</div>
						<div class="loadingWrap">
							<div class="loading-status">
							  	<div class="process" :style="{width : widthNub +'%'}"></div>
							</div>
							<div class="timeNub">{{front}}/{{after}}</div>
						</div>
						<div class="residue" v-show="isShowDiff">还差{{diff}}人兑换</div>
						<div class="butWrap">
							<div class="buts" v-show="bottonOne" @click="goShare">去邀请</div>
							<div class="buts" v-show="!bottonOne" @click="promptlyOut">立即抽奖</div>
						</div>
					</div>
				</div>
				<!--好友的奖品-->
				<div class="textCenten friend" v-if="friendList.length>0">
					<h4>好友的奖品</h4>
					<div class="textList friendUl" id="friendUl">
						<div class="textListTitle">您的好友 {{friendTel}}成功推荐{{friendNum}}人，已获得奖品</div>
						<ul>
							<li v-for="(item,index) in friendList">
								<img :src="(imgPath+item.imgUrl)"  />
								<p>{{item.prizeName}}</p>
							</li>
						</ul>
					</div>
				</div>
				<!--获奖名单-->
				<div class="textCenten Crunchies">
					<h4>获奖名单</h4>
					<div class="textList CrunchiesUl" id="CrunchiesUl" >
						<ul >
							<li v-for="(ims,index) in rollList" ref="lis">
								恭喜{{ims.phone}}于{{ims.createTime.substring(10,16)}} 抽中{{ims.prizeName}}
							</li>
						</ul>
					</div>
				</div>
				<!--活动规则-->
				<div class="textCenten rule">
					<h4>活动规则</h4>
					<div class="textList">
						<p>● 此活动仅限湖北用户参与，发货仅发湖北地区, 下期将会陆续推出其他地区活动。  </p>
						<p>● 活动时间为2018年9月1日00:00:00至2018年9月30日23:59:59，此活动仅限湖北用户参与，下期将会陆续推出其他地区活动。</p>
						<p>● 成功邀请新客户下载并登录仟姿App数目达成，即可兑换抽奖机会。</p>
						<p>● 用户抽中奖后，下次将在剩余奖品中抽取。</p>
						<p>● 已注册过仟姿App或使用过仟姿分期的用户不属于新用户，不能被邀请，但可邀请他人，依旧可获得抽奖机会。</p>
						<p>● 同一用户多次被邀请只第一次邀请有效，同一手机注册多个用户只第一个注册有效。</p>
						<p>● 获奖后需添加客服微信，填写详细信息。</p>
						<p>● 活动结束后10个工作日内发放实物奖品。</p>
						<p>● 本活动最终解释权归仟姿所有，如存在作弊行为，仟姿将取消其已获得奖励资格。</p>
					</div>
				</div>
			</div>	
			
			<!--弹出层-->
			<div class="pop" id="pop" v-show="isShowpop">
			    <div class="pop-bg"></div>
			    <div class="popWrap" v-show="popWrap">
			        <div class="popImg">
			        	<h4 class="popTitle">恭喜您！</h4>
			        	<p class="poptext">{{name}}</p>
			            <span class="goToUrl" @click="goShare"></span>
			        </div>
			        <div class="close" @click="closeWin"></div>
			    </div>
			    <!--弹窗邀请内容-->
			    <div class="hint" v-show="hintpop">
			        <div class="hintImg">
			        	<h4 class="hintTitle">您没有抽奖机会</h4>
			        	<p class="hinttext">邀请{{after}}人下载APP完成注册即可抽奖</p>
			            <span class="hintgoToUrl" @click="goShare">立即邀请</span>
			        </div>
			        <div class="close" @click="closeWin"></div>
			    </div>
			    <!--弹窗活动结束内容-->
			    <div class="hint" v-show="overpop">
			        <div class="hintImg">
			        	<h4 class="hintTitle">恭喜你已完成本次活动</h4>
			        	<p class="hinttext">全部4次抽奖机会，后续将有更多活动推出，敬请留意。</p>
			            <span class="hintgoToUrl" @click="gohome">我知道了</span>
			        </div>
			    </div>
			</div>	
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import "./css/activity.css";
	import { mapState } from "vuex";
	import { Toast } from "mint-ui";
	import baseUrl from "../../common/api/config.js";
	import imgPath from "../../common/api/imgConfig.js";
	import Api from "../../common/api/api.js";
	import utils from "../../common/js/utils";
	import TurnTable from "../../common/js/turntable.js";
	export default {
		name: "activity",
		data() {
			return {
				axios,
				baseUrl,
				imgPath,
				user_id:"",//用户id
				deviceId:"",//设备id
				bottonOne:true,//显示按钮
				after: "",// 后
				front: "",//前
				num:"",//成功多少人
				isShowDiff:true,//是否显示差多少人
				diff:"",//差多少人
				friendTel:"",//好友手机号码
				friendNum:"",//好友推荐了多少人
				prizeList:[],//转盘奖品列表
				friendList:[],//好友中奖列表
				rollList:[],//中奖名单列表
				animate:false,
				widthNub:"",
				whether:0,//默认0可以抽奖，1后不可以再抽奖
				isShowpop:false,//是否显示弹窗
				name:"",//中奖名称
				prizeId:"",//奖品id
				condition:0,//中奖条件为50的时候不可以抽奖
				popWrap:false,//中奖弹窗弹窗
				hintpop:false,//没中奖弹窗
				overpop:false,//抽奖活动结束提示内容
				selectIndex:1,
				turnTable:'',
			};
		},
		/*组件*/
		components: {
			
		},
		beforeCreate: function() {
			
		},
		created: function() {
			let userInfo = JSON.parse(localStorage.getItem("personInfo"));
			let appInfo = JSON.parse(localStorage.getItem("AppInfo"));
			if(userInfo) {
				this.user_id = userInfo.user_id;
			}
			if(appInfo){
				this.deviceId = appInfo.deviceID;
			}
			//初始化请求
			this.init();

		},
		/*方法*/
		methods: {
			init() {
				//奖品列表
				Api.prizeList({user_id:this.user_id}).then(res=>{ 
		        	let self = this;
					if(res.status == 0) {
						self.after = res.data.after;
						self.front = res.data.front;
						self.num = res.data.num;
						self.whether = res.data.whether;//默认0可以抽奖，1后不可以再抽奖
						self.prizeList =res.data.prizes; 
						if(self.after > self.front){
							self.isShowDiff = true;
							self.diff = self.after - self.front
						}else{
							self.isShowDiff = false;
						}
						self.initData();
					} else {
						Toast({
							message: res.message,
							position: "middle",
							duration: 2000
						});
					}
		        })
		        //好友中奖列表
				Api.friendList({user_id:this.user_id}).then(res=>{ 
		        	let self = this;
					if(res.status == 0) {
						self.friendTel = res.data.phone;
						self.prizeList =res.data.prizes; 
					} 
		        })
				//获奖名单列表
				Api.rollList({}).then(res=>{ 
		        	let self = this;
					if(res.status == 0) {
						self.rollList =res.data; 
						
						//ul li添加类
						$('.CrunchiesUl li:even').addClass('lieven');
						//自动轮播
						$("#CrunchiesUl").myScroll({
							speed:50, //数值越大，速度越慢
							rowHeight:35, //li的高度
						});
						
					} else {
						Toast({
							message: res.message,
							position: "middle",
							duration: 2000
						});
					}
		        })
		        
			},
			
			//初始化转盘数据
			initData:function(){
				this.prizeList.map((item,index)=>{
					item.class = "pic"+item.id;
					if(item.percent=="100"){
						this.selectIndex = index+1;
						this.prizeId = item.id;//奖品id
						this.name = item.name;//中奖名称
						this.condition = item.condition;//中奖条件
					}
				});
				if(this.whether=="1"){
					this.isShowpop = !this.isShowpop;//打开弹窗
					this.overpop = true;//打开不可抽奖内容
				}
				this.turnTable =  new TurnTable({
			        ele: document.querySelector('canvas'),
			        prize: this.prizeList,
		            selectIndex: this.selectIndex,
		            
		    	})
				
			},

			//去分享
			goShare(){
				if(this.condition=="50"){
					//this.isShowpop = !this.isShowpop;
					this.popWrap = false;//关闭中奖内容
					this.overpop = true;//打开不可抽奖内容
				}else{
					let objdata = {
						webpageUrl:imgPath+"app/exterioractivity/index.html?userId="+this.user_id +"&clientId=" + this.deviceId,//分享地址
						title:"您有一份礼物未领取",//标题
						descr:"您有一份礼物未领取",//文本描述
						thumImage:"",//缩略图地址
					};
					let strObj = JSON.stringify(objdata);
					wb_SocialShare(strObj);
				}
				
			},
			//立即抽奖
			promptlyOut(){
				
				if(this.front >= this.after){
					this.turnTable.luckDraw();
					
					Api.prizeExchange({user_id:this.user_id,prizeId:this.prizeId,condition:this.condition,prizeName:this.name}).then(res=>{ 
				    	if(res.status=="0"){
				    		//中奖后1s提示中奖内容
							setTimeout(() =>{
								this.isShowpop = !this.isShowpop;
								this.popWrap = !this.popWrap;
								
							},2000);
				    	}
				    })
					setTimeout(() =>{
						this.turnTable.reload()
					},3000)
				}else{
					this.isShowpop = !this.isShowpop;
					this.hintpop = !this.hintpop;
				}
				
			},
			/*跳去首页*/
			gohome(){
				let strObj = JSON.stringify({viewName:"3"});
				gotoView(strObj)
			},
			/*关闭弹窗*/
			closeWin(){
				window.location.reload();
				this.isShowpop = !this.isShowpop;
				this.hintpop = !this.hintpop;
			}
		},
		//监听
		watch: {
			front:function(){//监听前数字
				this.widthNub = this.front / this.after *100;
				if(this.front >= this.after){
					this.bottonOne = !this.bottonOne;
				}else{
					this.bottonOne = this.bottonOne;
				}
			},
			
		}
		
	};
</script>