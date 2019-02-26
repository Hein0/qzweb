<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomPullText='bottomText' :auto-fill="false">
    <div class="myFineContain">
      <div class="myFineItem" v-for="item in list">
        <div class="header">
          <img :src="item.logo | imgFullUrl" alt="头像">
        </div>
        <div class="headerText">
          <div class="headerName">
            <div class="headerTextInfo">
              <h2 style="color:#ff64b0">{{item.name}}</h2>
              <p class="dateTime">
                <img :src="degree" alt="" v-show="item.type==1">
                <span v-show="item.type==2" class="rz" style="  padding-right: 0;">认证</span>
              </p>
            </div>
            <div class="shanchu attention" @click="getAttent(item)" v-if="item.huxiang==1">关注</div>
            <div class="shanchu" @click="getAttent(item)" v-if="item.huxiang!=1">已关注</div>
          </div>
          <div class="userdProduct">
            <span style="color:#b5b5b5">深圳</span>
          </div>
        </div>
      </div>
    </div>
    <div slot="bottom" class="mint-loadmore-bottom">
      <!--<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>-->
      <span v-show="bottomStatus !== 'loading'" style="font-size:0.6rem">
              <mt-spinner type="snake"></mt-spinner>
              加载更多...
            </span>
    </div>
    <div class="model" v-show="show">
      <div class="content">
        <div class="isOrAttent">
          <div class="img"></div>
          <p v-if="item.huxiang=='2'">是否取消关注?</p>
          <p v-if="item.huxiang=='1'">是否关注?</p>
        </div>
        <div class="btn">
          <span @click="show=!show">取消</span>
          <span @click="ToAttention()" v-if="item.huxiang=='1'">确定</span>
          <span @click="cancleAttent()" v-if="item.huxiang=='2'">确定</span>
        </div>
      </div>
    </div>
  </mt-loadmore>
</template>
<style scoped>
.userdProduct span:before {
  display: inline-block;
  content: "";
  width: 0.35rem;
  height: 0.5rem;
  margin-right: 0.25rem;
  background: url("../images/location.png") no-repeat;
  background-size: contain;
}
.dateTime img {
  width: 0.875rem;
  height: 0.65rem;
}
.dateTime .rz {
  background: #5ec5ff;
  color: #fff;
  display: inline-block;
  width: 2rem;
  height: 0.8rem;
  border-radius: 0.175rem;
  font-size: 0.5rem;
  line-height: 0.8rem;
  text-align: center;
}
.mint-loadmore-bottom span {
  display: inline-block;
  transition: 0.2s linear;
  vertical-align: middle;
}
.is-rotate {
  transform: rotate(180deg);
}
</style>
<script>
import "../css/dairyDetail.css";
import loadmore from "mint-ui";
export default {
  data() {
    return {
      list: [],
      allLoaded: false,
      bottomStatus: "",
      bottomText: "加载更多...",
      reqData: {
        user_id: 1,
        pageNum: 1,
        pageSize: 6
      },
      attention: true,
      show: false,
      item: {},
      degree: require("../images/grade1.png")
    };
  },
  mounted() {
    CM.setTitle("我的粉丝");
    this.reqData.user_id = this.userInfo =
      (localStorage.getItem("personInfo") &&
        JSON.parse(localStorage.getItem("personInfo")).user_id) ||
      (CM.getQueryMap(location.href.split("?")[1]) &&
        CM.getQueryMap(location.href.split("?")[1]).user_id);
    this.getAjaxData();
  },
  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      //加载更多
      this.getAjaxData();
      this.$refs.loadmore.onBottomLoaded();
    },
    getAjaxData(param) {
      //获取列表数据
      let self = this;
      if (param == "refresh") {
        self.reqData.pageNum = 1;
        self.list = [];
      }
      self.Api.getFineList({
        // user_id: self.reqData.user_id,
        pageNum: self.reqData.pageNum,
        pageSize: self.reqData.pageSize,
         
        
        sessionKey: self.setSessionKey(self.reqData)
      }).then(function(res) {
        if (res.status == 0) {
          if (res.data.length == 0 && self.reqData.pageNum == 1) {
            self.$toast("暂无数据");
            return false;
          }
          if (self.reqData.pageSize > res.data.length) {
            self.allLoaded = true;
          } else {
            self.reqData.pageNum++;
          }
          self.list = self.list.concat(res.data);
        } else {
          self.$toast("获取失败");
        }
      });
    },
    getAttent(item) {
      //关注
      //先要判断是否登录
      if (item.huxiang) {
        this.show = true;
        this.item = item;
      } else {
        this.show = true;
        this.item = item;
      }
    },
    cancleAttent() {
      //取消关注
      var item = this.item,
        data = {
          attention_id: this.reqData.user_id,
          attentioned_id: item.id,
          status: 2,
          user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
          token: JSON.parse(localStorage.getItem("personInfo")).token
        },
        self = this;
      this.Api.cancleOrDeleteAttention(data).then(function(res) {
        if (res.status == 0) {
          self.show = false;
          self.getAjaxData("refresh");
        } else {
        }
      });
    },
    ToAttention() {
      var item = this.item;
      let data = {
          attention_id: this.reqData.user_id,
          attentioned_id: item.id,
          attention_type: 1,
          user_id: this.$route.query.user_id,
          token: JSON.parse(localStorage.getItem("personInfo")).token,
          attentioned_type: parseInt(item.type)
        },
        self = this;
      self.Api.getAttention(data).then(function(res) {
        if (res.status == 0) {
          self.show = false;
          self.getAjaxData("refresh");
        } else {
        }
      });
    }
  },
  components: {
    loadmore
  }
};
</script>
