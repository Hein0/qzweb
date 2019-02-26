<template>
  <div class="page-index">
    <div class="hops-index">
      <div class="header"><img :src="(imgPath+goodkeyword.img)" alt="" class="iimg">
      </div>
      <p class="adress">{{goodkeyword.name}}</p>
      <p class="hosadress">{{goodkeyword.introduction}}</p>
      <div class="doublespan">
        <span>价格{{goodkeyword.reference_price}}元</span>
        <span>效果持续{{goodkeyword.duration_day}}</span>
      </div>
      <div class="gz">详细介绍&nbsp;&nbsp;></div>
      <div class="radio-wrap">
        <div class="radio-group" v-model="tabView">
          <span v-for="(tab ,index) in tabs" :class="{cur:iscur==index}" @click="iscur=index,tabclick('select' + (index + 1))">
                      <p :class="{cur:iscur==index}" class="pnum">
                          <img :src="tab.imgss" alt="" class="successicon" v-if="tabView=='select1'">
                          <img :src="tab.imgsflag" alt="" class="successicon" v-else>
                          
                          </p>
                    <p :class="{cur:iscur==index}" class="ptxt">{{tab.shopss}}</p>
                    <span class="i">|</span>
          </span>
        </div>
       <!-- <div class="triangle_border_down">
          <span :class="[spanflag?'span_two':'span_one']"></span>
        </div> -->
        <!-- <div style="margin:0.4rem 0;"></div> -->
        <scroller v-if="!no_data" v-on:load="loadMore" ref="scroller" :auto-fill="false">
          <keep-alive>
            <component v-bind:is="tabView" :child-msg="msg"></component>
          </keep-alive>
        </scroller>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-index {
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  font-family: "微软雅黑";
  display: -webkit-box;
  /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;
  /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;
  /* TWEENER - IE 10 */
  display: -webkit-flex;
  /* NEW - Chrome */
  display: flex;
  /* NEW, Spec - Opera 12.1, Firefox 20+ */
  flex-direction: column;
  overflow: hidden;
  flex-wrap: nowrap;
}
.hops-index {
  -webkit-box-flex: 1;
  /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1;
  /* OLD - Firefox 19- */
  /* width: 20%; For old syntax, otherwise collapses. */
  -webkit-flex: 1;
  /* Chrome */
  -ms-flex: 1;
  /* IE 10 */
  flex: 1;
  /* NEW, Spec - Opera 12.1, Firefox 20+ */
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  /*解决ios上滑动不流畅*/
  -webkit-overflow-scrolling: touch;
}
.iimg {
  /* width: 118px; */
  display: block;
  width: 1.5733rem;
  height: 1.5733rem;
  margin: 0 auto;
  border-radius: 50%;
  /* margin-top: 0.2667rem */
}
.authentication {
  /* width: 64px; */
  /* height: 26.0025px; */
  /* font-size: 18px; */
  width: 0.8533rem;
  height: 0.3467rem;
  font-size: 0.24rem;
  color: #fff;
  border: 1px solid #5fc5ff;
  border-radius: 0.25rem;
  margin: 0 auto;
  background-color: #5fc5ff;
}
.adress {
  text-align: center;
  font-size: 0.4533rem;
  color: #282828;
  margin-top: 0.4rem;
  /* font-size: 34px; */
  /* margin-top: 30px; */
}
.hosadress {
  color: #787878;
  margin-top: 0.4rem;
  line-height: 0.6rem;
  width: 98%;
  margin: 0.1067rem;
  font-size: 0.32rem;
  height: 1.1667rem;
  position: relative;
  /* max-height: 1.1667rem; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  /* font-size: 24px */
  /* margin-top:20px;     */
}
/* .hosadress::after {
      content: "...";
      position: absolute;
      bottom: 0;
      right: 0;
      padding-left: 0.5333rem;
      background: -webkit-linear-gradient(left, transparent, #fff 55%);
      background: -o-linear-gradient(right, transparent, #fff 55%);
      background: -moz-linear-gradient(right, transparent, #fff 55%);
      background: linear-gradient(to right, transparent, #fff 55%);
    } */
.doublespan {
  display: block;
  margin-top: 0.3467rem;
  color: #ff78ac;
  font-size: 0.32rem;
  /* margin-top: 26px; */
}
.doublespan span {
  width: 50%;
  font-size: 0.32rem;
}
.doublespan span:first-child {
  text-align: right;
  margin-right: 0.6rem;
}
.gz {
  width: 2.4rem;
  /* width: 180px; */
  /* height: 48px; */
  height: 0.64rem;
  background-color: #ff86b4;
  color: #fff;
  text-align: center;
  line-height: 0.64rem;
  border-radius: 0.8rem;
  margin: 0 auto;
  /* font-size: 24px; */
  font-size: 0.32rem;
  /* margin-top: 30px; */
  margin-top: 0.4rem;
  /* margin-bottom: 35px; */
  margin-bottom: 0.4667rem;
}
.tab {
  display: flex;
}
.i {
  position: absolute;
  margin-top: -1.13rem;
  left: 50%;
  color: #f6f6f6;
  /* color:black; */
  width: 0;
  height: 0px;
}
.successicon {
  display: block;
  width: 0.5867rem;
  height: 0.6267rem;
  margin: 0 auto;
}
.ptxt {
  font-size: 0.32rem;
  /* font-size:24px; */
  color: #282828;
  margin-top: 0.1333rem;
  margin-bottom: 0.4667rem;
}
/* 三角形 */
.triangle_border_down {
  width: 0;
  height: 0;
  position: relative;
}
.span_one {
  display: block;
  width: 0;
  height: 0;
  border-width: 0.2667rem 0.2667rem 0;
  border-style: solid;
  border-color: #fff transparent transparent;
  position: absolute;
  top: 0em;
  left: 2.3rem;
}
.span_two {
  display: block;
  width: 0;
  height: 0;
  border-width: 0.2667rem 0.2667rem 0;
  border-style: solid;
  border-color: #fff transparent transparent;
  position: absolute;
  top: 0em;
  left: 7.25rem;
}
.radio-group > span {
  /* cursor: pointer; */
  display: inline-block;
  text-align: center;
  width: 49%;
}
.cur {
  color: #ff66b2;
}
</style>
<script>
import select1 from "./select05.vue";
// import select2 from "./select06.vue";
import scroller from "../../components/public/scoller.vue";
import imgPath from "../../common/api/imgConfig.js";
import Api from "../../common/api/api.js";
import utils from "../../common/js/utils";
import by from "./images/chenggonganli-icon.png";
import by1 from "./images/chenggonganli-icon-fen.png";
import by2 from "./images/mingxingshangping-icon.png";
import by3 from "./images/mingxingshangping-icon-fen.png";
export default {
  data() {
    return {
      tabView: "select1",
      msg: 1,
      tabs: [
        {
          name: "选项一",
          shopss: "成功案例",
          imgss: by1,
          imgsflag: by
        },
//         {
//           name: "选项二",
//           shopss: "明星商品",
//           imgss: by2,
//           imgsflag: by3
//         }
      ],
      iscur: 0,
      spanflag: false,
      goodkeyword: [],
      imgPath
    };
  },
  created() {
    this.goodskeywordss();
  },
  methods: {
    loadMore() {
      this.msg++;
      setTimeout(() => {
        this.$refs.scroller.removeLoading();
      }, 2000);
    },
    tabclick(tab) {
      this.tabView = tab;
      console.log(this.tabView);
      if (this.tabView == "select1") {
        this.spanflag = false;
      } else {
        this.spanflag = true;
      }
    },
    goodskeywordss() {
      var params = {
        goods_key_word: this.$route.query.category,
                  user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
          token: JSON.parse(localStorage.getItem("personInfo")).token,
        // goods_key_word: "玻尿酸隆鼻"
      };
      Api.goodskeyword(params).then(res => {
        this.goodkeyword = res.data;
        console.log(this.goodkeyword);
      });
    }
  },
  components: {
    select1,
    // select2,
    scroller
  }
};
</script>

