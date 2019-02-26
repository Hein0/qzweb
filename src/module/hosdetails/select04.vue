<template>
    <div>
        <div class="list" v-for="items in mei">
            <div class="border"> <span>{{items.addTime}}使用法宝</span><span>变美效果&nbsp;></span>
            </div>
            <li>
                <div class="bt" v-for="item in items.goodsList" :data-id="item.id" @click="todetails(item.id)">
                    <img :src="(imgPath+item.goods_url)" alt="" class="mx"/>
                    <div class="right">
                        <p>
                            【{{item.keyword}}】&nbsp;&nbsp;&nbsp;
                            {{item.name}}</p>
                      <p>{{item.hospitalName}}&nbsp;&nbsp;<span style="color:#4f4f4f;font-size:0.32rem;  margin-left: 0.4rem;  ">{{item.doctorName}}</span></p>
                        <p> <span>￥{{item.qzd_price}} </span><del class="del">{{item.hos_price}}</del><span>预约数：{{item.appoint_count}}</span> </p>
                    </div>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
import mm from "./images/mingxingchanpingtupian.png";
import imgPath from "../../common/api/imgConfig.js";
import Api from "../../common/api/api.js";
export default {
  data() {
    return {
      imgPath,
      shops: [],
      mei: []
    };
  },
  created() {
    this.shopinfo();
  },
  props: ["childMsg"],

  methods: {
    shopinfo() {
      let params = {
        id:  this.$route.query.id,
        case_user_id: this.$route.query.attentioned_id,
        pageNum: this.childMsg,
        pageSize: "100",
        goods_key_word:this.$route.query.goods_key_word,
        // user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
        //     token: JSON.parse(localStorage.getItem("personInfo")).token
        // id:  "281",
        // user_id:"qz87645d71",
        // token: "000f84c53ba241e38672da9f9b3fd841",
        // pageNum: "1",
        // pageSize: "10",
        // goods_key_word:  "玻尿酸隆鼻"
      };
      Api.usershop(params).then(res => {
        this.mei = res.data;
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
  	margin: 0.4rem 2% 0;
  	/* height: 11.2rem; */
  	overflow-y: auto;
  	color: #282828;
   	height: 100%;
  	width: 96%;
   	background: #fff;
}
.list li {
  /*height: 3.0867rem;*/
  /* box-shadow: 0 0.0133rem 0.24rem 0.0533rem rgba(254, 117, 192, 0.3); */
  padding-bottom: 0.2667rem;
  padding-left: 0.2rem;
  margin-top: 0.4rem;
  box-sizing: border-box;

}
.list li::after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.list li .bt{display: flex;display: -webkit-flex;display: -moz-flex;}
.list li .bt:after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.list li .bt:nth-child(2n){padding-top:0.13rem}
.pad {
  height: 0.1333rem;
  background-color: #282828;
}
.mx {
  display: block;
  width: 2.1867rem;
  height: 2.1867rem;
  float: left;
}
.right {
  float: left;
  margin-left: 0.2667rem;
}
p {
  margin-top: 0.2667rem;
  text-align: left;
}
.border {
  border-bottom: 1px solid #e3e3e3;
  padding: 0.2rem 0;
  margin-left: 0.3467rem;
  margin-right: 0.3467rem;
}
.border:after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.border span:first-child {
  color: #282828;
  font-size: 0.4rem;
  float: left;
}
.border span:nth-child(2) {
  color: #ff66b2;
  font-size: 0.4rem;
  float: right;
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
p span:nth-child(2) {
  font-size: 0.32rem;
  color: #787878;
  /* float: right; */
  /* margin-right: 0.2667rem; */
}
p span:nth-child(3) {
  font-size: 0.32rem;
  color: #787878;
  text-align: right;
  /* float: right; */
  /* margin-right: 0.2667rem; */
}
.del {
  margin-right: 3rem;
}
</style>
