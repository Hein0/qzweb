<template>
  <div class="list">
    <li v-for="(item,index) in shops" :key="index" data-id="item.id" @click="todetails(item.id)">
      <img :src="(imgPath+item.goods_url)" alt="" class="mx">
      <div class="right">
        <p>【{{item.keyword}}】&nbsp; {{item.name}}</p>
        <p>{{item.hospitalName}}&nbsp;&nbsp;<span style="color:#787878;font-size:0.32rem;margin-left: 0.4rem;margin-right: 0.2667rem;  ">{{item.doctorName}}</span></p>
        <p class="fflex"><span>￥{{item.qzd_price}} </span><del class="del">{{item.hos_price}}</del>
          <span class="yu">预约数：{{item.appoint_count}}</span>
        </p>
      </div>
    </li>
  </div>
</template>
  
<script>
  import imgPath from "../../common/api/imgConfig.js";
  import Api from "../../common/api/api.js";
  export default {
    data() {
      return {
        shops: [],
        imgPath,
        no_data: false
      };
    },
    created() {
      this.star();
    },
    methods: {
      star() {
        let params = {
          hospital_id: this.$route.query.hospital_id,
          // user_id:this.$route.query.user_id,
          // token:this.$route.query.token,
          id: this.$route.query.id
            //  hospital_id: 126,
          // user_id:"qz536106e8",
          // token:"62ec093bb7fd4fccbf27e1b3914ad7a1",
          // id: "126"
        };
        Api.stardetails(params).then(res => {
          console.log(res.data);
          this.shops = res.data;
        });
      },
      todetails(id){
 let baseUrl = window.location.href.slice(0,window.location.href.indexOf("hosdetails.html"));
      // console.log(baseUrl+'shop.html#/detail/'+id+'/'+user_id)
      let user_id=JSON.parse(localStorage.getItem("personInfo")).user_id;
      window.location.href =
        baseUrl + "shop.html#/detail/" + id + "/" + user_id;
    }
      }
     
  };
</script>
<style scoped>
  .list {
    /* margin-top: 0.4rem; */
    	box-shadow: 0rem 0.0833rem 0.24rem 0.0533rem rgba(254, 117, 192, 0.6) inset;
    /* height: 8rem; */
    	overflow-y: auto;
     	height: 100%;
  		width: 100%;
    /* display: flex; */
    /* overflow-x: hidden; */
  }
  .list li {
    margin: 0 0.33rem;
    /*height: 2.1867rem;*/
   	overflow: hidden;
    box-shadow: 0 0.0133rem 0.24rem 0.0533rem rgba(254, 117, 192, 0.3);
    margin-bottom: 0.2667rem;
    margin-top: 0.4rem;
    display: flex;
  }
  .mx {
    display: block;
    width: 2.1867rem;
    height: 2.1867rem;
  }
  .right {
    width: 100%;
    margin-left: 0.2667rem;
  }
  p {
    margin-top: 0.2667rem;
    text-align: left;
    flex-direction: column;
  }
  p :first-child {
    font-size: 0.3733rem;
    color: #4f4f4f;
  }
  p :nth-child(2) {
    font-size: 0.32rem;
    color: #787878;
  }
  p span:first-child {
    color: #ff66b2;
    font-size: 0.4rem;
  }
  p span:nth-child(3) {
    font-size: 0.32rem;
    color: #787878;
    /* flex-wrap:nowrap ; */
    /* text-align: right; */
    float: right;
    margin-right: 0.2667rem;
  }
</style>
