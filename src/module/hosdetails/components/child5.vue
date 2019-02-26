<template>
	<!--执业资格、品牌认证、荣誉展示-->
	<div class="diversityListPage">
		<div class="diversityTitle">
			<p>品牌认证</p>
		</div>
		<!--分页数据-->
		<ul class="diversityList">
    		<li class="diversitydity" v-for="(item,index) in brandList"  :key="item"  >
    			<span class="imgWrap">
    				<img  :src="(imgPath + item)" class="preview-img" :key="index" :style="'background: url('+imgPath + item+') no-repeat center;background-size:cover;'" @click="$preview.open(index,goodImg)"/>
    			</span>
            </li>
            
		</ul>

		
	</div>

</template>

<script>
	import imageView from 'vue-imageview'
	import imgPath from "../../../common/api/imgConfig.js";
	export default {
		name:"brand",
		data() {
			return {
				imgPath,
				brand:"",//品牌认证
        		show: false,// 显示组件
				imageIndex: 0,// 从哪一张图片开始
				brandList:[],
				goodImg:[],//点开图
			};
		},
		//父组件传的参数
		props: ["infoData"],
		//子组件
		components: {
			'image-view': imageView
		},
		// 组件实例化完成之后钩子函数
		created() {
			this.brand = this.infoData.brand;
			this.brandList = this.brand ? this.brand.split(','):[];
			this.brandList.forEach(element => {
	            this.goodImg.push({
	              	src: imgPath  + element
	            })
          	});
		},
		//方法
		methods: {
			hideImageView () {
        		this.show = false
      		},
      		selectImg (index) {
        		this.show = true
        		this.imageIndex = index
      		}
		},
		//计算属性
		computed:{
		    
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