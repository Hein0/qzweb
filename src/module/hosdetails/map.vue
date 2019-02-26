<template>
	<div id="mapWrap">
		<div id="mapView">
			
		</div>
	</div>

</template>
		

<script>
	import AMap from 'AMap';
	var geocoder,marker;
	export default {
		name: "mapview",
		data() {
			return {
				map:null,
				geocoder:null,
				marker:null,
				city:this.$route.query.city,
			};
		},
		//创建完成
		created() {
			
		},
		//html完成挂载成功后
		mounted() {
			
	      	this.loadmap();
	    },
		//子组件
		components: {

		},
		//方法
		methods: {
			loadmap:function() {
				const self = this;
				const map = new AMap.Map('mapView', {
		          	zoom: 9
		        });
		        if(!geocoder){
		            geocoder = new AMap.Geocoder({
		                city: self.city, //城市设为北京，默认：“全国”
		            });
		        }
//		        const tool = new AMap.ToolBar();
//  			map.addControl(tool);  
		        geocoder.getLocation(self.city, function(status, result) {
		            if (status === 'complete'&&result.geocodes.length) {
		                var lnglat = result.geocodes[0].location
		                if(!marker){
		                    marker = new AMap.Marker();
		                    map.add(marker);
		                }
		                marker.setPosition(lnglat);
		                map.setFitView(marker);
		            }else{alert(JSON.stringify(result))}
		        });
		        return true;

			},
		},
	}
</script>

<style scoped>
	#mapWrap{width:100%;height:100%;display:block;position:relative}
	#mapView{height:100%;width:100%;}
        
</style>