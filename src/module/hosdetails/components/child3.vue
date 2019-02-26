<template>
	<!--本院医生-->
	<div class="doctorListPage">
		<div class="doctorTitle">
			<p>本院医生</p>
		</div>
		
		<!--分页数据-->
		<ul class="doctorList">
    		<li class="doctordity" v-for="(item ,index) in doctorList"  @click="toDoctorDetail(item.doctor_id)">
    			<span class="imgWrap">
    				<img  :src="(imgPath + item.doctorLogo)" alt="" />
    			</span>
              	<div class="infoText" >
              		<p class="name">{{item.doctorName}}</p>
              		<p class="say">{{item.position}}</p>
              	</div>
            </li>
            
		</ul>

		
	</div>

</template>

<script>
	import imgPath from "../../../common/api/imgConfig.js";
	export default {
		name:"doctor",
		data() {
			return {
				imgPath,
				doctorList:[],//医生列表
				city:"",//城市名称
			};
		},
		//父组件传的参数
		props: ["infoData"],
		// 组件实例化完成之后钩子函数
		created() {
			this.city = this.$route.query.city;
			this.doctorList = this.infoData.doctors;
			
		},
		//子组件
		components: {
			
		},
		//方法
		methods: {
			//去医生详情页
			toDoctorDetail:function(doctorId){
				let baseUrl = window.location.href.slice(0,window.location.href.indexOf("hosdetails.html"));
      			window.location.href = baseUrl + "shop.html#/DoctorDetail?doctor_id=" +doctorId
			}
		},
		
	}	
</script>

<style scoped>
	.doctorListPage{background:#ffff;padding-bottom: 0.4rem;}
	.doctorTitle{padding:0rem 0.4rem;}
	.doctorTitle p{border-bottom: 1px solid #f6f8fa;padding:0.33rem 0;font-weight: bold;font-size:0.4rem;}
	
	.doctorList{justify-content: inherit !important;display: flex;flex-flow: row wrap;padding: 0.4rem;background: #ffffff;}
	.doctorList .doctordity{margin-bottom: 0.4rem;margin-right:0.6rem;border-radius: 0.14rem;height: 3.8rem;width: 2.66rem;background: #FFFFFF;cursor: pointer;overflow: hidden;}
	.doctorList .doctordity:nth-of-type(3n){margin-right: 0;}
	.doctorList .doctordity .imgWrap{width:2.66rem;height:2.66rem;border-radius:0.14rem ;display: inline-block;}
	.doctorList .doctordity .imgWrap img{width:2.66rem;height:2.66rem;border-radius:0.14rem ;border:none;}
	.doctorList .doctordity .infoText{text-align: center;font-size:0.34rem;padding:0.2rem 0rem;}
	.doctorList .doctordity .infoText .name{color:#666666;}
	.doctorList .doctordity .infoText .say{color:#CCCCCC;padding:0.1rem 0rem 0rem}
	
</style>