<template>
  <div id="shop">
    <div class="container">
      <div class="top">
        <div class="hospitalInfo">
          <mt-swipe @change="handleChange" :auto="4000">
            <mt-swipe-item v-for="(n,nIndex) in hospitalSortList">
              <ul class="hospitalList">
                <li class="hospital" v-for="(item,index) in n" :data-id="item.id">
                  <img :src="(imgPath+item.code)" alt="">
                  <h3>{{item.name}}</h3>
                  <span>预约：{{item.sort}}</span>
                  <button v-if="!item.is_attention" @click="attention(index,nIndex)">关注</button>
                  <button class="isAttention" v-if="item.is_attention" @click="cancelAttention(index,nIndex)">已关注</button>
                </li>
              </ul>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <mt-swipe @change="handleChange" :auto="0" id="Project" :continuous='false'>
        <mt-swipe-item v-for="n in allCategory">
          <ul class="projects">
            <li class="project" v-for="item in n" :data-id="item.id" @click="searchProject">
              <img :src="(imgPath+item.img)" alt="">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </mt-swipe-item>
      </mt-swipe>
      <div class="cleanscoller">
        <ul class="classify">
          <li class="active" v-for="(item,index) in regionList" :data-code="item.id">
            <input type="radio" :id="('region'+index)" :value="item.id" @change="searchRegion" v-model="regionChecked" @click="cancleSearchRegion">
            <i></i><label :for="('region'+index)">{{item.name}}</label>
          </li>
        </ul>
      </div>
      <scroller v-if="!no_data" v-on:load="loadMore" ref="scroller" :auto-fill="false">
        <ul class="commodityList" v-if="goodsList">
            <li class="commodity" :data-id="item.id" :data-catId="item.catId" :data-type="item.type" v-for="item in goodsList" @click="toDetail(item.id,user_id)">
              <img class="commodity-icon" :src="(imgPath+item.goods_url)" alt="">
              <div class="info">
                <h4>{{item.name}}</h4>
                <p :data-hospitalId="item.hospital_id">{{item.hospital_name}}</p>
                <ul><i class="scale"></i><li v-for="tip in item.keyword">{{tip}}</li></ul>
                <div class="price">
                  <span class="left">￥{{item.qzd_price}}</span>
                  <span class="right">￥{{item.hos_price}}</span>
                  <span class="book">预约数：{{item.appoint_count}}</span>
                </div>
              </div>
            </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import "common/css/shop.css";
import imgPath from "../../common/api/imgConfig.js";
import setSessionKey from "../../common/js/setSessionKey.js";
import scroller from "../../components/public/scoller.vue";
import utils from "../../common/js/utils";
export default {
  name: "shop",
  props: ["user_id"],
  data() {
    return {
      regionChecked: "",
      no_data: false,
      imgPath,
      firstRegion: ""
    };
  },
  components: {
    scroller
  },
  beforeCreate: function() {
    //  window.location.href = "https://www.wjx.cn/jq/21876285.aspx";
  },
  methods: {
    init() {
      this.$store.dispatch({
        type: "project"
      });
      this.$store.dispatch({
        type: "region"
      });
      this.$store.dispatch({
        type: "hospitalSortList",
        user_id: this.user_id
      });
      this.$store.dispatch({
        type: "goodsList"
      });
    },
    loadMore() {
      // this.loading = true;
      // let commodityList = document.querySelector(".commodityList");
      // let list = commodityList.children;
      // setTimeout(() => {
      //   let last = this.list[this.list.length - 1];
      //   for (let i = 1; i <= 10; i++) {
      //     this.list.push(last);
      //   }
      //   this.loading = false;
      // }, 2500);
      // console.log("...");
      var self = this;
      this.$store
        .dispatch({
          type: "goodsList",
          searchType: 3,
          append: true,
          pageNum: this.goodsListParam.pageNum + 1
        })
        .then(function(res) {
          if (typeof self.$refs.scroller !== "undefined") {
            self.$refs.scroller.removeLoading();
          }
          if (res.data.length) {
            self.no_data = false;
          } else {
            !self.no_data ? self.$refs.scroller.isNoData() : null;
            // self.$store.commit({ type: "resetParam" });
          }
        });
    },
    handleChange(index) {
      // console.log(index);
    },
    searchProject(e) {
      this.regionChecked = [];
      this.$refs.scroller.reset();
      this.$store.commit({ type: "resetGoodsList" });
      this.$store
        .dispatch({
          type: "goodsList",
          searchType: 2,
          catId: e.currentTarget.dataset.id
        })
        .then(res => {
          this.goAnchor("#Project");
        });
    },
    searchRegion() {
      this.$refs.scroller.reset();
      this.$store.commit({ type: "resetGoodsList" });
      this.$store
        .dispatch({
          type: "goodsList",
          searchType: 1,
          code: this.regionChecked
        })
        .then(res => {
          this.goAnchor("#Project");
        });
    },
    attention(index, nIndex) {
      let self = this;
      this.$store
        .dispatch({
          type: "insertAttentionRecord",
          attention_id: this.user_id,
          attentioned_id: this.hospitalSortList[nIndex][index].id,
           user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
        token:JSON.parse(localStorage.getItem("personInfo")).token
        })
        .then(res => {
          if (res.status == "0") {
            self.hospitalSortList[nIndex][index].is_attention = !self
              .hospitalSortList[nIndex][index].is_attention;
          }
        });
    },
    cancelAttention(index, nIndex) {
      let self = this;
      this.$store
        .dispatch({
          type: "cancleOrDeleteAttention",
          attention_id: this.user_id,
          attentioned_id: this.hospitalSortList[nIndex][index].id,
          user_id:JSON.parse(localStorage.getItem("personInfo")).user_id,
          token:JSON.parse(localStorage.getItem("personInfo")).token
        })
        .then(res => {
          if (res.status == "0") {
            self.hospitalSortList[nIndex][index].is_attention = !self
              .hospitalSortList[nIndex][index].is_attention;
          }
        });
    },
    toDetail(id, user_id) {
      // '/detail/'+item.id+'/'+user_id
      // console.log(window.location.href)
      // console.log(window.location.href.slice(0,window.location.href.indexOf('shopIndex.html')))
      let baseUrl = window.location.href.slice(
        0,
        window.location.href.indexOf("shopIndex.html")
      );
      // console.log(baseUrl+'shop.html#/detail/'+id+'/'+user_id)
      window.location.href =
        baseUrl + "shop.html#/detail/" + id + "/" + user_id;
    },
    cancleSearchRegion(e) {
      if (this.firstRegion == e.target.value) {
        this.inputdata = "0";
        this.regionChecked = "";
        this.$store
          .dispatch({
            type: "goodsList"
          })
          .then(res => {
            this.goAnchor("#Project");
          });
      } else {
        this.firstRegion = e.target.value;
      }
    },
    goAnchor(selector) {
      let anchor = this.$el.querySelector(selector);
      let scollerEl = this.$el.querySelector(".container");
      scollerEl.scrollTop = anchor.offsetTop + 38; // chrome
      // document.documentElement.scrollTop = anchor.offsetTop; // firefox
      // window.pageYOffset=anchor.offsetTop;
    }
  },
  computed: {
    ...mapState({
      allCategory: state => state.shop.allCategory,
      regionList: state => state.shop.regionList,
      hospitalSortList: state => state.shop.hospitalSortList,
      goodsList: state => state.shop.goodsList,
      goodsListParam: state => state.shop.goodsListParam
    })
  },
  created: function() {
    // this.request();
    // utils.setTitle("");
    this.init();
    let userInfo = JSON.parse(localStorage.getItem("personInfo"));
    if (userInfo) {
      this.user_id = userInfo.user_id;
    }
  }
};
</script>
