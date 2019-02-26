<template>  
  <div class="list">
    <li v-for="(item,index) in shops" :key="index" data-id="item.id" @click="todetails(item.id)">
      <img :src="(imgPath+item.goods_url)" alt="" class="mx">
      <div class="right">
        <p style="display: -webkit-box;-webkit-line-clamp: 2;overflow: hidden;-webkit-box-orient: vertical;line-height: 110%;"> 【{{item.keyword}}】&nbsp;&nbsp;&nbsp;{{item.name}}</p> 
        <p>{{item.hospital_name}}&nbsp;&nbsp;<span style="color:#787878;font-size:0.32rem;margin-left: 0.4rem;margin-right: 0.2667rem;  ">{{item.doctor_name}}</span></p>
        <p class="fflex" style="padding-top: 0.2rem;margin-top: 0px;"><span>￥{{item.qzd_price}} </span><del class="del">{{item.hos_price}}</del>
        <span class="yu">预约数：{{item.appoint_count}}</span>  
        </p>
      </div>
    </li>
    </div>   
</template>  
  
<script>
import imgPath from "../../common/api/imgConfig.js";
import Api from "../../common/api/api.js";
import { Toast } from 'mint-ui';
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
    props: ['childMsg'],
  
  methods: {
    star() {
      let params = {
        hospital_id: this.$route.query.hospital_id,
        id: this.$route.query.id,
        goods_key_word:  this.$route.query.category,
        pageNum: this.childMsg,
        pageSize: 10,
          user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
          token: JSON.parse(localStorage.getItem("personInfo")).token
        
        //  hospital_id: 125,
        // id:132,
        // goods_key_word:"胸部整形",
        // pageNum: this.childMsg,
        // pageSize: 10
      };

      Api.shopdetails(params).then(res => {
        console.log(res.data);
        if (res.data.length == 0) {
          Toast({
            message: "目前无商品",
            position: "bottom",
            duration: 5000
          });
        }
        this.shops = res.data;
        this.shops.forEach((item,i)=>{
          if(item.hospital_name.length>6){
            item.hospital_name=item.hospital_name.slice(0,6)
          }
        })
        // this.shops = res.data;
      });
    },
      todetails(id){
      let baseUrl;
      // console.log(baseUrl+'shop.html#/detail/'+id+'/'+user_id)
      let user_id=JSON.parse(localStorage.getItem("personInfo")).user_id;

      if(window.location.href.indexOf("shop")){
        baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
      }else{
        baseUrl = window.location.href.slice(0,window.location.href.indexOf("hosdetails.html"));
      }
      window.location.href =baseUrl + "shop.html#/detail/" + id + "/" + user_id;
    }
  }
};
</script>
<style scoped>
.list {
  /* margin-top: 0.4rem; */
  box-shadow: 0rem 0.0833rem 0.24rem 0.0533rem rgba(254, 117, 192, 0.6) inset;
  width: 104%;
  margin-left: -1%;
   height: 10rem; 
  overflow-y: auto;

  /* display: flex; */
  /* overflow-x: hidden; */
}
.list li {
  margin: 0 0.6rem;
  height: 2.1867rem;
  box-shadow: 0 0.0133rem 0.24rem 0.0533rem rgba(254, 117, 192, 0.3);
  margin-bottom: 0.2667rem;
  margin-top: 0.4rem;
  /* position: relative;
  top: 0px; */

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
  margin-top: 0.2rem;
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
.yu {
  /* float: right; */
}
.del {
  /* margin-right: 3rem; */
  /* box-sizing: border-box; */
}
/* .fflex{
  display: block;
  width: 80%;
  flex: 1
} */
</style>
