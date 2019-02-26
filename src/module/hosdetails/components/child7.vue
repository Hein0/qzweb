<template>
	<!--医院地址-->
	<div class="hospitalAddPage">
		<div class="hospitalAddTitle">
			<p>医院地址</p>
		</div>
		
		<!--分页数据-->
		<ul class="hospitalAddList">
    		<li class="diversitydity"  @click="toAddres(infoData.street)">
    			<div class="hospitalInfo">
    				<span class="infoImg">
    					<img :src="(imgPath + infoData.logo)" alt="" />
    				</span>
    				<div class="hospitalText">
    					<h4>{{infoData.anotherName}}</h4>
    					<p>{{infoData.hospital_type}}</p>
    				</div>
    			</div>
    			<div class="addres">{{infoData.street}}</div>
            </li>
            
		</ul>

		
	</div>

</template>

<script>
	import imgPath from "../../../common/api/imgConfig.js";
	export default {
		name:"addres",
		data() {
			return {
				imgPath,
			};
		},
		//父组件传的参数
		props: ["infoData"],
		//子组件
		components: {
			
		},
		// 组件实例化完成之后钩子函数
		created() {
			
		},
		//方法
		methods: {
			toAddres:function(addres){
				let baseUrl = window.location.href.slice(0,window.location.href.indexOf("hosdetails.html"));
      			window.location.href = baseUrl + "hosdetails.html#/map?city=" +addres ;
			}
		},
		//计算属性
		computed:{
		   
		},
		
	}	
</script>

<style scoped>
	.hospitalAddPage{background:#ffff;padding-bottom: 0.4rem;}
	.hospitalAddTitle{padding:0rem 0.4rem;}
	.hospitalAddTitle p{border-bottom: 1px solid #f6f8fa;padding:0.33rem 0;font-weight: bold;font-size:0.4rem;}
	
	.hospitalAddList{justify-content: inherit !important;display: flex;flex-flow: row wrap;padding: 0.4rem;background: #ffffff;}
	.hospitalAddList .diversitydity{margin-bottom: 0.4rem;height: auto;width: 100%;background: #FFFFFF;cursor: pointer;overflow: hidden;}
	.hospitalAddList .diversitydity .hospitalInfo{display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;margin-bottom: 0.13rem;width:100%;}
	.hospitalAddList .diversitydity .hospitalInfo .infoImg{width:1.33rem;height:1.33rem;border-radius:0.665rem;vertical-align: middle;text-align: center;}
	.hospitalAddList .diversitydity .hospitalInfo .infoImg img{width:1.33rem;height:1.33rem;border-radius:0.665rem;}
	.hospitalAddList .diversitydity .hospitalInfo .hospitalText{flex: 1;margin-left: 0.4rem;}
	.hospitalAddList .diversitydity .hospitalInfo .hospitalText h4{margin-top:0.26rem;font-size:0.4rem;color:#333333;font-weight: bold;}
	.hospitalAddList .diversitydity .hospitalInfo .hospitalText p{padding:0.2rem 0;font-size:0.34rem;color:#B6B6B6;}
	.hospitalAddList .diversitydity .addres{padding:0.13rem 0.4rem;font-size:0.32rem;display: -webkit-box;color:#B6B6B6;display: -moz-box; display: -ms-flexbox;display: -webkit-flex;display: flex;justify-content: space-between;background:url(../images/addresicon.png) no-repeat left center,url(../images/arrow.png) no-repeat right 0.14rem center;background-size: 0.25rem 0.33rem,0.14rem 0.26rem;}
	
</style>