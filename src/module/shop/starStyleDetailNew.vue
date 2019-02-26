<template>
  <!-- 热门活动 -->
  <div id="shop">
	<div class="container">
	    <div @click="toDetail">
			<div>
				<img src="./images/starImg.png" style="width: 10rem;">
			</div>

			<ul class="commodityList searchList" style="background: #f6f8fa">
		        <li class="commodity searchLity" style="background: #fff;">
		          <span style="width:2.213rem;;height:2.213rem;">
		          	<img class="wit_0"  src="./images/starGoodImgNew.jpg" alt="">
		          </span>

		          <div class="info starDity">
		            <h4 class="starDetailGood" style="height:0.9rem;font-weight: normal;-webkit-box-orient: vertical ">芭比无辜眼</h4>
		            <div class="price leftRig" style="position: relative;margin-bottom: .293rem;display: -webkit-flex;display: flex;align-items: center;">
		              <span class="left" style="color: #ff5c7e;font-size: 0.4267rem;margin-right: 0.1333rem;">￥1999 元</span>
		              <span class="right" style="position: absolute;right: 38%;color:#999999;text-decoration: line-through;font-size: 0.32rem">￥3800元</span>
		            </div>

		            <div class="price leftRig" style="font-size: 0.34rem;display: flex;align-items: center;position: relative;">
		              <span class="textLeft" style="color: #999;">武汉江岸中爱医疗美容</span>
		              <span class="bookOrder" style="position: absolute;right: 10%;margin-left: 0.26rem;color: rgb(153, 153, 153);">
		                <b>已预约</b>
		                <b style="color:#999999;vertical-align: bottom;margin-left: 0.1rem;">50</b>
		              </span>
		            </div>
		          </div>
		        </li>
		    </ul>	
	    </div>
	</div>
  </div>
</template>
<style type="text/css" scoped>
	.star{
		list-style: none;
	    width: 9.4933rem;
	    height: 3.36rem;
	    padding: .32rem .1333rem;
	    border-radius: .1333rem;
	    box-shadow: 0 1px 0.16rem 0.0267rem rgba(255,131,199,.2);
	    margin-bottom: .4rem;
	    display: flex;
	    cursor: pointer;
	    overflow: hidden;    box-shadow: none!important;
	}

	.starTitle{
		font-size: .3733rem;
	    color: #282828;
	    margin-bottom: .2rem;
	    font-weight: 700;
	    line-height: 125%;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	    overflow: hidden;
	    color: #333!important;
	    font-weight: 400!important;
	    height: 1.83333rem;
	    margin-top: 0;
	    margin-bottom: .3rem!important
	}

	.starInfo{
		margin-top: 0.26rem;
		display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	    margin-left: .26rem;
	    margin-right: .1rem;
	}

	.starLeft{
		color: #ff5c7e;
    	font-size: .4267rem;
	}

	.starRight{
		color: #c8c8c8;
	    font-size: .3733rem;
	    text-decoration: line-through;
	    font-weight: 500;
	    position: absolute;	
    	right: 6%;
	}
	
</style>

<script type="text/javascript">
	export default {
		data() {
			return {
				user_id:"",
				city:""
			};
		},

		created(){
			let userInfo = JSON.parse(localStorage.getItem("personInfo"));
		    if (userInfo) {
		      this.user_id = userInfo.user_id;
		    }
		    if(this.$route.query.city){
      			this.city=this.$route.query.city
      		}
		},

		methods:{
			//商品详情
		    toDetail() {
		      let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
		      window.location.href =baseUrl + "shop.html#/detail/" + 1068 + "/" + this.user_id+"/"+"?city="+this.city;
			}
		}
	}

</script>
