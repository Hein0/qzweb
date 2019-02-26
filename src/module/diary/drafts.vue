<template>
	<div class="drafts">
		<!--头部-->
		<mt-header title="草稿箱" id="headera">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right" class="submits" id="selectId" v-show="select" @click="selectAll">选择</mt-button>
            <mt-button slot="right" class="submits" id="cancelId" v-show="cancel" @click="cancelOut">取消</mt-button>
        </mt-header>

		<div class="drafts-wrap">
			<!--没有视频数据-->
			<!--<div class="novido">
				<img src="./images/novideo.png" />
				<div class="novido-txt">
					<span class="txt-titile">暂无视频</span>
					<p>您可以选择从本地相册添加，或立即拍摄</p>
				</div>
			</div>-->

			<!--视频列表-->
			<div class="video-wrap">
				<div class="videoList">
					<ul>
						<li @click="playFun" v-for="(item,index) in items">
							<label :for="'checkbox-'+item.id" class="chagesIconLabel" v-if="nochages"></label>
							<input type="checkbox" class="chagesIcon nochages" name="checkVideo" :value="item.value" v-if="nochages" v-model="checkValues" :id="'checkbox-'+item.id" @click="checkFun($event,item)" />
							<span class="cheSpan" v-if="nochages"></span>
							<div class="imgs">
								<img :src="item.img" />
							</div>
							<span class="videoLogo"></span>
						</li>
					</ul>
				</div>
			</div>
			<div class="footers" v-if="isShowFot">
				<span class="locality">本地相册</span>
				<span></span>
				<span class="shoot">重新拍摄</span>
			</div>
			<div class="footers" v-else="isShowFot">
				<span>上传</span>
			</div>
		</div>

	</div>
</template>

<script>
	var videoData = [
		{id:'001',value:'视频1',img:'http://img.zcool.cn/community/018335598924a2a801215603db0836.png@2o.png'},
		{id:'002',value:'视频2',img:'http://img.zcool.cn/community/018335598924a2a801215603db0836.png@2o.png'},
		{id:'003',value:'视频3',img:'http://img.zcool.cn/community/018335598924a2a801215603db0836.png@2o.png'},
	];
	Array.prototype.remove = function (val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	}
	export default {
	  	name: "userInfo",
	  	//组件
	  	components: {

	  	},
	  	//数据
  		data() {
    		return {
    			cancel:false,//取消
    			select:true,//选择
    			nochages:false,//没选择的视频
    			isShowFot:true,//底部按钮显示
				isShowFun:true,
				items: '',
				checkValues: [],
				checkIds: []
    		}
    	},
    	//组件写入dom结构之前
  		mounted() {
			this.initData();
  		},
  		//计算属性
  		computed: {
  			filterCheckValues: function () {
				var value = this.checkValues;
				var reValue = '';
				for (var i = 0; i < value.length; i++) {
					reValue += value[i] + '、'
				}
				reValue = reValue.substring(0, reValue.length - 1)
				return reValue;   // 输出了选中的值 如'视频1、视频2、视频3'
			}
  		},
    	//实例已经创建完成之后
  		created() {
//			this.$parent.init();
		},
  		//方法对象
  		methods: {
  			//初始化数据
  			initData:function(){
  				var self = this;
  				self.items = videoData;
			},

  			//选择事件
  			selectAll:function(){
  				this.cancel = true;
  				this.select = false;
  				this.nochages = true;
  				this.isShowFot = false;
  			},
  			//取消事件
  			cancelOut:function(){
  				this.cancel = false;
  				this.select = true;
  				this.nochages = false;
  				this.isShowFot = true;this.checkValues=[];
  			},
  			//点击播放
  			playFun:function(){
  				console.log('1')
  			},
  			//点击选中、取消
  			checkFun:function($event,item){
  				console.log($event)
  				// if($event.target.className.indexOf('nochages')!==-1){
  				// 	$event.target.className='chagesIcon chages'
  				// }else{
  				// 	$event.target.className='chagesIcon nochages'
				  // }
				var id = 'food-' + item.id;
				if ($event.target.checked) {
					this.checkIds.push(id);
				} else if (this.checkIds.indexOf(id) > -1) {
					this.checkIds.remove(id);
				}
			},


  		}

	}
</script>

<style scoped>
	#headera {height:1.17rem;background-color: #fff;color: #282828;box-shadow: 0 0 9px -2px #ff65b1 ;-webkit-box-shadow: 0 0 9px -2px #ff65b1; }
	.mint-header .mint-button.submits {color: #ff65b1;}
	.drafts-wrap{width: 100%;position:relative;height:100%;}
	.novido{margin: 3.54rem 0 0;text-align: center;}
	.novido img{width:3.22rem;height:2.61rem}
	.novido .novido-txt{margin-top:1.46rem;text-align: center;}
	.novido .novido-txt .txt-titile{color:#787878;font-size:0.37rem}
	.novido .novido-txt p{font-size:0.32rem;color:#787878;margin-top:0.24rem;}
	.drafts-wrap .footers{position:fixed;height:1.17rem;width:100%;text-align: justify;display:flex;z-index: 10;left: 0;bottom: 0;border-top:1px solid #e3e3e3;}
	.drafts-wrap .footers span{font-size:0.45rem;color:#FF65B1;padding:0rem 0.4rem;text-align: center;width:2.8rem;display: inline-block;line-height:1.17rem;flex: 2;-webkit-flex: 2;-moz-box-flex: 2;}
	.drafts-wrap .footers .locality{}

	.video-wrap{margin-top:0.16rem;padding:0 0.01rem}
	.videoList ul:after{clear:both;content:'';display:block;width:0;height:0;visibility:hidden;}
	.videoList ul{text-align: justify;width:100%;}
	.videoList ul li{width:3.25rem;height:3.29rem;margin:0 0.03rem;float:left;position: relative;text-align: center;}
	.videoList ul li .imgs img{width: 100%;}
	.videoList ul li .chagesIconLabel{position: absolute;width:3.29rem;height:3.29rem;left:0;top:0;z-index:10;}

	.videoList ul li .chagesIcon{position: absolute;opacity:0;right:0.2rem;top:0.14rem;width:0.54rem;height:0.54rem;}
	/*.videoList ul li .nochages{background:url(./images/nocheck.png) no-repeat center center;background-size:0.73rem 0.73rem;display: block;}*/
	.videoList ul li .chages{background:url(./images/check.png) no-repeat center center;background-size:0.73rem 0.73rem;display: block;}
	.videoList ul li .videoLogo{position: absolute;left: 0.22rem;bottom: 0.13rem;z-index: 2;width:0.54rem;height:0.28rem;background:url(./images/videLogo.png) no-repeat center center;background-size:cover}
	.videoList ul li .cheSpan{position: absolute;right:0.2rem;top:0.14rem;z-index:8;width:0.54rem;height:0.54rem;background:url(./images/nocheck.png) no-repeat center center;background-size:0.73rem 0.73rem;display: inline-block;}
	input[type="checkbox"]:checked + span::before {background:url(./images/check.png) no-repeat center center;background-size:0.73rem 0.73rem;display: inline-block;}


</style>
