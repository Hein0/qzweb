<template>
  <div>
    <div class="box"> </div>
    <div class="top">
      <ul>
        <li v-for="(item,index) in imgs" :key="index">
          <img :src="(item.after_main_pic)" alt="" class="iimg" @click="imgclick(index)" data-index=(index)>
          <!-- <img src="./images/benyuananlitupian.png" alt="" class="iimg"> -->
          <span>{{item.hospital_name}}</span>
        </li>
      </ul>
    </div>
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
      }
    },
    created() {
      this.imgsload()
    },
    props: ['childMsg'],
    methods: {
      imgclick(index) {
        // let pageIndex =
        let parms = {
          id:this.$route.query.id,
          pageIndex:index + 1,
          hospital_id:this.$route.query.hospital_id,
          goods_key_word:this.$route.query.category,
          pageNum: this.childMsg,
          pageSize: this.pageSize,
          type:"3"


        };
        let jsonData = JSON.stringify(parms);
        console.log(jsonData)
        let self = this,
          u = navigator.userAgent,
          isAndroid =
          u.indexOf("Android") > -1 ||
          u.indexOf("Adr") > -1 ||
          u.indexOf("android") > -1, //android终端
          isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iOS") > -1; //ios终端
        try {
          if (isAndroid) {
            gjc.todataforbiaoqian(jsonData);
          } else if (isiOS) {
            window.webkit.messageHandlers.openBeautyDetail.postMessage(jsonData);

          }
        } catch (err) {
          console.log(err);
        }
      },
      imgsload() {
        let params = {
          id:this.$route.query.id,
          hospital_id: this.$route.query.hospital_id,
          // user_id: this.$route.query.user_id,
          pageNum: this.childMsg,
          pageSize: 20,
          goods_key_word: this.$route.query.category,
          // token:  this.$route.query.token,
          user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
            token: JSON.parse(localStorage.getItem("personInfo")).token
          // hospital_id: 126,
          // user_id: 12,
          // pageNum: 1,
          // pageSize: 10,
          // goods_key_word: "玻尿酸"
        };
        Api.case(params).then(res => {
          let self=this
          console.log(res.data);
          self.imgs = res.data;
          self.imgs.forEach((item,i)=>{
          	//防止有些地址不带域名的图片地址
            if(!item.after_main_pic && item.after_main_video_pic){
              self.imgs[i].after_main_pic = item.after_main_video_pic
            }
						if(item.after_main_pic.indexOf("http")>-1){//视频或者图片自带域名
							self.imgs[i].after_main_pic = item.after_main_pic
						}else{
							self.imgs[i].after_main_pic = imgPath + item.after_main_pic
						}
            if(item.hospital_name.length>6){
              item.hospital_name=item.hospital_name.slice(0,6)
            }
          })
          this.pageSize = res.data.length;
        });
      }
    }
  };
</script>
<style scoped>
  /* .box{
      height: 3rem;
      box-shadow: 0 0.0133rem 0.24rem 0.0533rem rgba(254,117,192, .7) inset;
    } */
  .top {
    /* height:600px; */
    width: 104%;
    margin-left: -1%;
    /* height: 100%;s */
    /* overflow-y: auto; */
    box-shadow: 0rem 0.133rem 0.24rem 0.0533rem rgba(254, 117, 192, .5) inset;
  }
  ul {
    /* padding-left: 0.68rem; */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
  }
  li {
    float: left;
    list-style: none;
    margin-top: 0.4333rem;
    position: relative;
    width: 30%;
    margin-left: 0.2467rem;
    height: 3.3333rem;
  }
  .iimg {
    display: block;
    width: 2.9333rem;
    height: 3.3333rem;
    border-radius: 0.1333rem
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
    font-size: 0.3733rem
  }
  .other {
    /* height: 368px; */
    height: 4.9067rem;
    overflow: hidden;
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
    padding-left: 0.8333rem;
    box-sizing: border-box;
  }
</style>
