<template>
  <div class="top">
    <ul>
      <li v-for="(item,index) in imgs" :key="index">
        <img :src="(item.after_main_pic)" alt="" class="iimg" @click="imgclick(item.goods_key_word,index)" data-index=(index) data-hospital="item.hospital_id" data-goods="item.goods_key_word"/>
        <span>{{item.goods_key_word}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import by from "./images/benyuananlitupian.png";
  import imgPath from "../../common/api/imgConfig.js";
  import Api from "../../common/api/api.js";
  export default {
    data() {
      return {
        imgPath,
        imgs: [],
        pageSize: null
      };
    },
    created() {
      this.imgsload();
    },
    props: ["childMsg"],
    methods: {
      imgclick(goods_key_word, index) {
        let pageIndex = index + 1;
        let id = this.$route.query.id;
        let user_id = this.$route.query.attentioned_id;
        let parms = {
          user_id,
          id,
          pageIndex,
          goods_key_word,
          pageNum: this.childMsg,
          pageSize: this.pageSize,
          type:"2"

        };
        let jsonData = JSON.stringify(parms);
        // console.log(jsonData);
        let self = this,
          u = navigator.userAgent,
          isAndroid =
          u.indexOf("Android") > -1 ||
          u.indexOf("Adr") > -1 ||
          u.indexOf("android") > -1, //android终端
          isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iOS") > -1; //ios终端
        try {
          if (isAndroid) {
            gjc.todataforgeren(jsonData);
          } else if (isiOS) {
            window.webkit.messageHandlers.openBeautyDetail.postMessage(jsonData);
          }
        } catch (err) {
          console.log(err);
        }
      },
      imgsload() {
        let params = {
          id: this.$route.query.id,
          case_user_id: this.$route.query.attentioned_id,
          pageNum: this.childMsg,
          pageSize: "100",
          goods_key_word: this.$route.query.goods_key_word,
          // user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
          //   token: JSON.parse(localStorage.getItem("personInfo")).token,
          // id: "132",
          // user_id: "qz5546f404",
          // token: "d92d3ab9389f4fda99c02cbbc824bc64",
          // pageNum: "1",
          // pageSize: "10",
          // goods_key_word: "自体脂肪隆胸-隆胸",
        };
        Api.userDetails(params).then(res => {
          this.imgs = res.data;
          this.imgs.forEach((item,i)=>{
          	if(item.goods_key_word && item.goods_key_word.indexOf(">")>-1){
              item.goods_key_word = item.goods_key_word.slice(0,item.goods_key_word.indexOf(">"))
            }
            if(!item.after_main_pic && item.after_main_video_pic){
              this.imgs[i].after_main_pic = item.after_main_video_pic
            }
						if(item.after_main_pic.indexOf("http")>-1){//视频或者图片自带域名
							this.imgs[i].after_main_pic = item.after_main_pic
						}else{
							this.imgs[i].after_main_pic = imgPath + item.after_main_pic
						}
						
          })
          this.pageSize = res.data.length;
        });
      }
    }
  };
</script>
<style scoped>
  .top {
    /* height:600px; */
    /* width: 104%; */
    /* margin-left: -1%; */
    /* height: 4rem; */
    /* margin-top: 0.4rem; */
     height: 100%;
  width: 100%;
    overflow-y: auto;
  }
  ul {
    box-sizing: border-box;
    /* margin-top: 0.3467rem; */
    /* height: 555.3333rem; */
    /* overflow:hidden; */
    /* margin-top: 0; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 0.2667rem
  }
  li {
    float: left;
    list-style: none;
    display: block;
    margin-top: 0.4333rem;
    margin-left: 0.2667rem;
    position: relative;
    /* width: 2.9333rem; */
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.3333rem;
  }
  .iimg {
    display: block;
    width: 2.9333rem;
    height: 3.3333rem;
    border-radius: 0.1333rem;
  }
  li>span {
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
</style>


