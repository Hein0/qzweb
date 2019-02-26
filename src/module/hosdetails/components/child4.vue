<template>
	<!--执业资格、品牌认证、荣誉展示-->
	<div class="diversityListPage">
		<div class="diversityTitle">
			<p>执业资格</p>
		</div>
		
		<!--分页数据-->
		<ul class="diversityList">
    		<li class="diversitydity" v-for="(item,index) in listData" :key="item" >
    			<span class="imgWrap">
    				<img  :src="(imgPath + item)" alt="" class="preview-img" :key="index" :style="'background: url('+imgPath + item+') no-repeat center;background-size:cover;'" @click="$preview.open(index,goodImg)" />
    			</span>
            </li>
            
		</ul>

		
	</div>

</template>

<script>
	import imgPath from "../../../common/api/imgConfig.js";
	export default {
		name:"qualification",
		data() {
			return {
				imgPath,
				business_license:"",
				licence:"",
				examination:"",
				listData:[],
				goodImg:[],//点开图
			};
		},
		//父组件传的参数
		props: ["infoData"],
		//子组件
		components: {
			
		},
		// 组件实例化完成之后钩子函数
		created() {
			if(this.infoData.business_license){
				this.listData.push(this.infoData.business_license);
			}
			if(this.infoData.licence){
				this.listData.push(this.infoData.licence);
			}
			if(this.infoData.examination){
				this.listData.push(this.infoData.examination);
			}
			this.listData.forEach(element => {
	            this.goodImg.push({
	              	src: imgPath  + element
	            })
          	});
		},
		//方法
		methods: {
			
		},
		//监听
		watch:{
			goodImg(value) {
	        	value.forEach(element => {
	          		let imgTemp = new Image();
	          			imgTemp.src = element.src;
	          		if(imgTemp.complete) {
	           			element.w = imgTemp.width;
	            		element.h = imgTemp.height;
	          		} else {
	            		imgTemp.onload = function() {
	              		element.w = this.width;
	              		element.h = this.height;
	            	};
	          	}
	          	imgTemp = null;
	        	})
      		},
		}
		
	}	
</script>

<style scoped>
	.diversityListPage{background:#ffff;padding-bottom: 0.4rem;}
	.diversityTitle{padding:0rem 0.4rem;}
	.diversityTitle p{border-bottom: 1px solid #f6f8fa;padding:0.33rem 0;font-weight: bold;font-size:0.4rem;}
	
	.diversityList{justify-content: inherit !important;display: flex;flex-flow: row wrap;padding: 0.4rem;background: #ffffff;}
	.diversityList .diversitydity{margin-bottom: 0.4rem;display: -webkit-flex;display: flex;border-radius: 0.14rem;height: auto;width: 100%;background: #FFFFFF;cursor: pointer;overflow: hidden;}
	.diversityList .diversitydity .imgWrap{width:100%;height:auto;text-align: center ;}
	.diversityList .diversitydity .imgWrap img{width:100%;height:auto;border:none;}
	
</style>