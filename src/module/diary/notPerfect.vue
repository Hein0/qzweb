<template>
	<div class="page-index">
		<div class="padd" v-if="caselist.length>0">补充日记内容才能获得返现奖励哦！</div>
		
		<div class="prefectList" v-for="(item,index) in caselist" :key="index" @click="goDetail(item.id)">
			<div class="content">
				<div class="wei"></div>
				<div><img src="./images/pic3.png" alt="" class="touxiang"></div>
				<div class="txt">
					<p class="hos">{{item.hospital_name}}</p>
					<p class="words">
						<ul>
							<i></i>
							<li>{{item.goods_key_word}}</li>
						</ul>
					</p>
					<p class="date">{{item.update_time}}</p>
					<div class="video">
						<i>{{item.op_status=="11" ? "缺少术前视频" : "缺少术后视频" }} </i>
					</div>
				</div>
			</div>
		</div>
		<div class="noData" v-if="caselist==''">
			<img src="./images/nodata.png" />
			<div class="noData-txt">
				<p>没有待完善内容</p>
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../common/api/api.js";
	import imgPath from "../../common/api/imgConfig.js";

	export default {
		name: "notPerfect",
		//组件
		components: {

		},
		//数据
		data() {
			return {
				user_id:this.$route.query.user_id,
				isFooteShow: false,
				caselist: "",
				imgPath: imgPath,
			}
		},
		//组件写入dom结构之前
		mounted() {
			this.getData();
		},
		//计算属性
		computed: {

		},
		//实例已经创建完成之后
		created() {
			
		},
		//方法对象
		methods: {

			getData() {
				let params = {
					user_id:this.user_id ? this.user_id :JSON.parse(localStorage.getItem("personInfo")).user_id,
					op_status: 1,
				};
				Api.caseList(params).then(res => {
					this.caselist = res.data
					console.log(res);
				});
			},
			
			//去详情页
			goDetail(id){//案例id
//				this.$router.push("/course/" + id);
				this.$router.push({path: '/course',query:{ casid:id,user_id:this.user_id}});
			},

		}

	}
</script>
<style scoped>
	.page-index {
		background-color: #f8f8f8;
		overflow-x: hidden;
		width: 100%;
		height: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		font-family: PingFang-SC-Medium;
		position: relative;
		-webkit-overflow-scrolling: touch;
	}
	.padd{padding:0.4rem;color:#A0A0A0;font-size: 0.37rem;}
	
	.content {
		/* padding-top:  */
		height: 2.9467rem;
		display: flex;
		display: -ms-flexbox;
		overflow: hidden;
		background:#fff;
		display: flex;
		margin-bottom: 0.4rem;
	}
	.noData{margin: 3.54rem 0 0;text-align: center;}
	.noData img{width:3.22rem;height:2.61rem}
	.noData .noData-txt{margin-top:1.46rem;text-align: center;}
	.noData .noData-txt p{font-size:0.32rem;color:#787878;margin-top:0.24rem;}
	.wei {
		display: block;
		width: 1.4267rem;
		height: 1.24rem;
		position: absolute;
		background: url("./images/ico10.png") no-repeat left top;
		background-size: 100%;
		/* z-index: 100000; */
	}
	
	.btnred {
		height: 1.3067rem;
		background-color: #ff65b1;
		color: #fff;
		line-height: 1.367rem;
		text-align: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		font-size: 0.4rem
	}
	
	.touxiang {
		width: 2.1467rem;
		height: 2.1467rem;
		background: url("./images/pic3.png") no-repeat center center;
		background-size: cover;
		border-radius: 50%;
		margin: 0.4rem;
		/* z-index: 999; */
	}
	
	.txt {width: 70%;height: 100%;color: #b5b5b5;}
	.hos {font-size: 0.3733rem;padding-top: 0.7333rem;box-sizing: border-box;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}
	.words ul {/* fle */display: flex;}
	
	.words li {
		flex-direction: column;
		flex-wrap: wrap;
		margin-left: 0.4rem;
		font-size: 0.32rem;
		margin-top: 0.2667rem;
		margin-bottom: 0.2667rem;
	}
	
	.video {
		display: block;
		text-align: right;
		width: 97%;
		/* float: right; */
		color: #ff65b1;
		margin-right: 0.4rem;
		font-size: 0.32rem;
	}
	
	.video i {
		display: inline-block;
		font-style:normal;
		width: 2.6rem;
		height: 0.3633rem;
		text-align: left;
		padding-left: 0.4rem;
		background: url("./images/ico9.png") no-repeat 0 center;
		background-size: 0.3633rem 0.3633rem;
	}
	/* ----------- */
	
	.content1 {
		/* padding-top:  */
		height: 2.9467rem;
		display: flex;
		display: -ms-flexbox;
		display: flex;
	}
	
	.touxiang1 {
		width: 2.1467rem;
		height: 2.1467rem;
		background: url("./images/pic3.png") no-repeat center center;
		background-size: cover;
		border-radius: 50%;
		margin: 0.4rem;
	}
	
	.txt1 {
		width: 70%;
		height: 100%;
		color: #666666;
	}
	
	.hos1 {
		font-size: 0.3733rem;
		padding-top: 0.7333rem;
		box-sizing: border-box;
	}
	
	.words i {
		display: inline-block;
		width: 0.3733rem;
		height: 0.3867rem;
		background: url("./images/ico7.png") no-repeat;
		background-size: 100%;
		margin-top: 0.27rem;
	}
	
	.words1 i {
		display: inline-block;
		width: 0.3733rem;
		height: 0.3867rem;
		background: url("./images/ico8.png") no-repeat;
		background-size: 100%;
		margin-top: 0.27rem;
	}
	
	.words1 ul {
		/* fle */
		display: flex;
	}
	
	.words1 li {
		flex-direction: column;
		flex-wrap: wrap;
		margin-left: 0.4rem;
		font-size: 0.32rem;
		margin-top: 0.2667rem;
		margin-bottom: 0.2667rem;
		color: #ff6fb6;
	}
	
	.data1 {
		color: #c8c8c8;
	}
</style>