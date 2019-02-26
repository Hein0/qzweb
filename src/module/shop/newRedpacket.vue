<template>
  <!-- 热门活动 -->
  <div id="opticy_wrap">
     <!-- 遮罩层 -->
    <div id="opticy"></div>
    <div class="tanChuangHongbao">
    	<img src="./images/tanChuangPacket.png" style="width:100%">
      	<img src="./images/closeHongbao.png" style="width:1.12rem;height: 1.12rem;margin-top:0.4rem;margin-left: 4.4rem;" @click="closeTip">
     	<div style=" width: 6.6rem;font-size: 0.66rem;line-height: 1.4rem;border: 1px solid #f54291;background: #f54291;color: #fff;border-radius: 1.1rem;text-align: center;position:absolute;bottom: 3%;left: 16%;" @click="goToMall">立即使用</div>
    </div>
  </div>
</template>
<style type="text/css">
	.tanChuangHongbao{
	    /*background: url("../static/img/tanChuangPacket.627ad3c.png") no-repeat;*/
	    width: 10.38rem;
	    height: 14.72rem;
	    position: absolute;
	    bottom:10%;
	  }

	  #opticy{
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    position: fixed;
	    height: 100%;
	    width: 100%;
	    opacity: 0.9;
	    background-color: #000;
	  }
</style>

<script type="text/javascript">
	// import h5native from "../../../dist-sit/module/h5native";

	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goToMall(){
				let data ={viewName:2};
				let JsonObjStr =JSON.stringify(data);
				gotoView(JsonObjStr)
			},

			closeTip(){
				closeWebView()
			}
		}
	}

</script>
