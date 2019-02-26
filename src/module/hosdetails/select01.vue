<template>
  <div class="page-index1">
    <div class="box"> </div>
    <div class="top">
      <ul>
        <li class="listone" v-for="(item,index) in imgs" :key="index" @click="imgclick(item.user_id,item.hospital_id,item.goods_key_word,index)" data-index=(index) data-ids="item.user_id" data-hospital="item.hospital_id" data-goods="item.goods_key_word">
          <img :src="(item.after_main_pic ? imgPath+item.after_main_pic : item.after_main_video_pic)" alt="" class="iimg">
          <span>{{item.goods_key_word}}</span>
        </li>
      </ul>
    </div>
    <div class="other">
      <p>本院其他项目</p>
      <ul class="twoul">
        <li class="list" v-for="(item,index) in imgss" :key="index" @click="downimgclick(item.user_id,item.hospital_id,item.goods_key_word,index)" data-index=(index) data-ids="item.user_id" data-hospital="item.hospital_id" data-goods="item.goods_key_word">
          <img :src="(item.after_main_pic ? imgPath+item.after_main_pic : item.after_main_video_pic)" alt="" class="iimg">
          <span>{{item.goods_key_word}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import imgPath from "../../common/api/imgConfig.js";
import Api from "../../common/api/api.js";
export default {
  data() {
    return {
      imgs: [],
      imgPath,
      imgss: [],
      pageSize: 100
    };
  },
  created() {
    this.myhos();
  },
  props: ["childMsg"],
  methods: {
    imgclick(user_id, hospital_id, goods_key_word, index) {
      let pageIndex = index + 1;
      let id = this.$route.query.id;
      let parms = {
        pageIndex,
        user_id,
        id,
        hospital_id,
        goods_key_word,
        pageNum: this.childMsg,
        pageSize: this.pageSize,
        down: 0,
        type: "1.1"
      };
      let jsonData = JSON.stringify(parms);
      console.log(jsonData);
      let self = this,
        u = navigator.userAgent,
        isAndroid =
          u.indexOf("Android") > -1 ||
          u.indexOf("Adr") > -1 ||
          u.indexOf("android") > -1, //android终端
        isiOS =
          !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iOS") > -1; //ios终端
      try {
        if (isAndroid) {
          gjc.todatayiyuan(jsonData);
        } else if (isiOS) {
            window.webkit.messageHandlers.openBeautyDetail.postMessage(jsonData);
        }
      } catch (err) {
        console.log(err);
      }
    },
    downimgclick(user_id, hospital_id, goods_key_word, index) {
      let pageIndex = index + 1;
      let id = this.$route.query.id;
      let parms = {
        pageIndex,
        user_id,
        id,
        hospital_id,
        goods_key_word: this.$route.query.goods_key_word,
        pageNum: this.childMsg,
        pageSize: this.pageSize,
        down: 1,
        type: "1.2"
      };
      let jsonData = JSON.stringify(parms);
      console.log(jsonData);
      let self = this,
        u = navigator.userAgent,
        isAndroid =
          u.indexOf("Android") > -1 ||
          u.indexOf("Adr") > -1 ||
          u.indexOf("android") > -1, //android终端
        isiOS =
          !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iOS") > -1; //ios终端
      try {
        if (isAndroid) {
          gjc.todatayiyuan(jsonData);
        } else if (isiOS) {
          window.webkit.messageHandlers.openBeautyDetail.postMessage(jsonData);
        }
      } catch (err) {
        console.log(err);
      }
    },
    myhos() {
      let params = {
        hospital_id: this.$route.query.hospital_id,
        id: this.$route.query.id,
        pageNum: this.childMsg,
        pageSize: this.pageSize,
        goods_key_word: this.$route.query.goods_key_word,

        // hospital_id: "135",
        // id: "304",
        // // user_id: "qz536106e8",
        // // token: "1145e9506ff34052af19a9f871dbb930",
        // pageNum: 1,
        // pageSize: 20,
        // goods_key_word: "玻尿酸填充卧蚕-隆鼻"
      };
      Api.hosmy(params).then(res => {
        console.log(res.data);
        this.imgs = res.data;
        this.pageSize = res.data.length;
      });
      Api.hosother(params).then(res => {
        this.imgss = res.data;
      });
    }
  }
};
</script>
<style scoped>
.page-index1 {
  height: 100%;
  width: 100%;
}
.top {
  /* height:600px; */
  width: 104%;
  margin-left: -1%;
  height: 100%;
  /* overflow-y: auto;
            overflow-y: auto; */
  /* display: flex; */
  /* flex-wrap:wrap; */
  box-shadow: 0rem 0.133rem 0.24rem 0.0533rem rgba(254, 117, 192, 0.5) inset;
}
ul:first-child {
  /* padding-left: 0.38rem; */
  box-sizing: border-box;
  /* margin-top: 0.3467rem; */
  /* height: 555.3333rem; */
  /* overflow:hidden; */
  /* margin-top: 0; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 0.2667rem;
}
ul::after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.listone {
  float: left;
  list-style: none;
  margin-top: 0.4333rem;
  /* padding-left: 0.2667rem; */
  margin-left: 0.2667rem;
  position: relative;
  width: 30%;
  height: 3.3333rem;
}
.list {
  float: left;
  list-style: none;
  margin-left: 0.2667rem;
  position: relative;
  width: 30%;
  height: 3.3333rem;
}
.iimg {
  display: block;
  width: 2.9333rem;
  height: 3.3333rem;
  border-radius: 0.1333rem;
}
li > span {
  /* width: 2.6rem; */
  width: 2.9333rem;
  /* width: 220px; */
  position: absolute;
  /* bottom: 7px;
            left:6px; */
  bottom: 0rem;
  left: 0rem;
  /* height: 42px; */
  height: 0.56rem;
  line-height: 0.56rem;
  background-color: #000;
  opacity: 0.2;
  color: #fff;
  text-align: center;
  /* font-size: 28px; */
  font-size: 0.3733rem;
}
.other {
  /* height: 368px; */
  width: 100%;
  height: 100%;
  /* height: 4.9067rem; */
  /* overflow: hidden; */
}
p {
  height: 1.1733rem;
  /* height: 88px */
  line-height: 1.1733rem;
  /* font-size: 27.9975px; */
  color: #282828;
  font-size: 0.3733rem;
  text-align: left;
  margin: 0;
  /* padding-left: 20px; */
  padding-left: 0.2667rem;
  box-sizing: border-box;
}
.twoul {
  margin: 0;
}
.twoul .list{
  margin-top: 0.1333rem;
}
</style>
