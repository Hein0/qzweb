<template>
  <div class="container dairyDetail">
    <div class="mainScroll">
      <baseInfo type="subDetail" :kefUrl="kefUrl" :objData="objData" @refresh="attent()"></baseInfo>
      <section class="evaluate mg30 mg20" v-show="objData.scoreNum">
        <div class="evaluateItem" @click="goTail()">
          <!-- v-if="objData.goodsList.length>-1" -->
          <span>闺蜜们这样评价</span>
          <div class="getScore">
            <span class="score">{{objData.scoreNum || 0}}</span>
            <div class="evaluateImgList">
              <img :src="(index<objData.scoreNum)?imgStar:imgUnStar" alt="" v-for="(item,index) in 5"/>
            </div>
          </div>
        </div>
      </section>
      <section class="dairySubItem mg30 mg20" v-show="objData.logDetailInfo">
        <div class="num">
          <span class="numFirst">
            <em :class="{noTouch:!numFirst,touch:numFirst}"></em>
            {{objData.logDetailInfo && objData.logDetailInfo.scanNum || 0}}
          </span>
          <span class="numSecord">
            <em :class="{noTouch:!numSecord,touch:numSecord}"></em>
            {{objData.logDetailInfo && objData.logDetailInfo.evaluateNum || 0}}
          </span>
          <span class="numThird" @click="vote()">
            <em
              :class="{noTouch:objData.logDetailInfo&&objData.logDetailInfo.is_vote==0,touch:objData.logDetailInfo&&objData.logDetailInfo.is_vote==1}"></em>
            {{objData.logDetailInfo && objData.logDetailInfo.voteNum || 0}}
          </span>
        </div>
        <div class="itemBdyImgList">
          <div class="preview-img-wrap" v-for="(item,ind) in arr">
            <img :src="item.src" alt=""
                 :class="{max1:true,mgTop:ind!=0}" class="preview-img"/>
            <div class="shuiyin" @click="previewImg(index)"></div>
          </div>

          <!--<img :src="item.src" alt=""  v-for="(item,ind) in arr"
               :class="{max1:true,mgTop:ind!=0}"  @click="$preview.open(ind, arr)" class="preview-img"/>-->
        </div>
        <p v-html="objData.logDetailInfo&&objData.logDetailInfo.content"></p>
        <span>发布于: {{objData.logDetailInfo && objData.logDetailInfo.addTime}}</span>
      </section>
      <section class="newsList mg30 mg20" id="pinglu">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                     :bottomPullText='bottomText' :auto-fill="false">
          <div class="newsItem" :class="{be5:index!=0}" v-for="(item,index) in logEvaluateList">
            <div class="customerInfo">
              <img :src="item.logo | imgFullUrl" alt="">
              <div class="newsItemIn">
                <div class="newsItemInfo">
                  <h2 class="color">{{item.nick_name}}</h2>
                  <span>{{item.addTime}}</span>
                </div>
                <span class="start f28" v-show="false">{{item.skan_num || 0}}</span>
                <span class="zan f28" ref="likes" @click="good(item,index)">{{item.vote_num || 0}} <em
                  :class="{noTouch:item.is_vote==0,touch:item.is_vote==1}"></em></span>
              </div>
            </div>
            <p class="f28" style="width: 16.5rem;word-wrap: break-word;">{{item.content}}</p>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <!--<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>-->
            <span v-show="bottomStatus !== 'loading'" style="font-size:0.6rem">
            <mt-spinner type="snake"></mt-spinner>
            加载更多...
          </span>
          </div>
        </mt-loadmore>
        <div class="newsItem " v-if="false">
          <div class="customerInfo">
            <img :src="imgHeader" alt="">
            <div class="newsItemIn">
              <div class="newsItemInfo">
                <h2 class="color">柠檬鱼不是罪</h2>
                <span>2017年10月11日</span>
              </div>
              <span class="start f28">45</span>
              <span class="zan f28">20</span>
            </div>
          </div>
          <p class="f28">我的手上超成功下次一起来？</p>
          <div class="chat">
            <span class="name">松下幸足知：</span>
            <span class="hostptail">东海索菲亚医院</span>
          </div>
        </div>
      </section>
      <p class="nomore" v-show="noMoreData">没有更多了</p>
    </div>
    <footer style=" justify-content: center;">
      <!--<p class="sendMes" @click="show()">发表评价...</p>-->
      <textarea type="text" id="input" placeholder="发表评价..." @focus="onfocusTap('#pinglu')" class="sendMes"
                v-model="inputData"></textarea>
      <!--<img :src="imgDZ" alt="">-->
      <span @click="setDairys()">评价</span>
    </footer>
    <div class="model" v-show="false">
      <div class="modelContent">
        <textarea placeholder="发表评价..." autofocus="autofocus" v-model="inputData"></textarea>
        <div class="button">
          <button class="btn" @click="setDairys()">发送</button>
          <button class="btn" @click="hide()">取消</button>
        </div>
      </div>
    </div>
    <img src="../images/sy.png" alt="" ref="img" style="display: none">
  </div>
</template>
<style scoped>
  .dairyDetail {
    -webkit-overflow-scrolling: touch;
  }

  .model {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #666;
  }

  .modelContent {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  textarea {
    font-size: 0.8rem;
    height: 5rem;
  }

  .button {
    margin-top: 1rem;
    text-align: center;
  }

  .btn {
    width: 8rem;
    height: 2rem;
    background: #fff;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .mint-loadmore-bottom span {
    display: inline-block;
    transition: 0.2s linear;
    vertical-align: middle;
  }

  .is-rotate {
    transform: rotate(180deg);
  }
  .preview-img-wrap {
    position: relative;
  }
  .shuiyin {
    position: absolute;
    top: 0;

    width: 100%;
    height: 100%;
    background-image: url(../images/shuiyin.png);
    background-repeat: no-repeat;
    background-size: cover;

  }
</style>
<script>
  import "../css/dairyDetail.css";
  import scroll from "../../../components/public/scoller.vue";

  export default {
    data() {
      return {
        imgStar: require("../images/good.png"),
        imgHead: require("../images/1.png"),
        imgHeader: require("../images/tx1.png"),
        imgDZ: require("../images/dazan.png"),
        imgUnStar: require("../images/unactStar.png"),
        objData: {},
        arr: [],
        inputData: "",
        param: {},
        numFirst: false,
        numSecord: false,
        numThird: false,
        showModel: false,
        userInfo: {},
        reqData: {
          case_main_id: "",
          user_id: "",
          pageNum: 1,
          pageSize: 6
        },
        logEvaluateList: [],
        params: {},
        clientH: document.body.clientHeight,
        allLoaded: false,
        bottomStatus: "",
        noMoreData: false,
        kefUrl: "" //客服地址
      };
    },
    mounted() {
      CM.setTitle("日记详情");
      this.userInfo =
        localStorage.getItem("personInfo") &&
        JSON.parse(localStorage.getItem("personInfo"));
      this.params =
        Object.keys(this.$route.params) == ""
          ? CM.getQueryMap(decodeURIComponent(location.href.split("?")[1]))
          : this.$route.params;
      this.getAjaxData(this.params);
      this.getEvetList(this.params);
      window.addEventListener("resize", function () {
        //解决键盘被遮住的问题
        if (navigator.userAgent.indexOf("Android") != -1) {
          $("input").on("click", function () {
            var target = this;
            setTimeout(function () {
              target.scrollIntoView(true);
            }, 100);
          });
        }
      });
    },
    methods: {
      getAjaxData(obj) {
        let self = this;
        self.Api.getDairySubDetail({
          id: obj.id,
          case_main_id: obj.case_main_id,
          user_id: self.userInfo.user_id,
          sessionKey: self.setSessionKey({
            id: obj.id,
            case_main_id: obj.case_main_id,
            user_id: self.params.user_id
          })
        }).then(function (res) {
          if (res.status == 0) {
            self.objData = res;
            console.log(self.objData);
            self.getImgList(
              res.logDetailInfo && res.logDetailInfo.pic_list.split(",")
            );
            self.getKeUrl(res.hospital_id);
          } else {
            self.$toast("获取数据失败!");
          }
        });
      },
      getImgList(arr) {
        let self = this;
        self.arr = [];
        if (arr && arr.length > 0) {
          $.each(arr, function (index, item) {
            self.arr.push({src: imgPath + item, w: 400, h: 600});
          });
        }
      },
      //获取客服url
      getKeUrl: function (id) {
        var self = this;
        if (id) {
          self.Api.getKeFuUrl({
            id: id
          }).then(function (res) {
            if (res.status == 0) {
              self.kefUrl = res.data.qiao_url;
            } else {
              self.$toast("获取数据失败!");
            }
          });
        }
      },
      //点击评论输入框
      onfocusTap(el) {
        let anchor = this.$el.querySelector(el);
        console.log(anchor.offsetTop);
        this.$el.querySelector(".mainScroll").scrollTop = anchor.offsetTop;
      },
      setDairys() {
        //评论
        let self = this;
        if (
          self.inputData &&
          self.inputData != "" &&
          self.params.id != undefined
        ) {
          self.Api.setDariy({
            user_id: self.userInfo.user_id,

            log_id: self.params.id,
            type: 1,
            content: self.inputData,
            token: JSON.parse(localStorage.getItem("personInfo")).token,

            sessionKey: self.setSessionKey({
              user_id: self.params.user_id,
              log_id: self.params.case_main_id,
              type: 1,
              content: self.inputData
            }),

          }).then(function (res) {
            if (res.status == 0) {
              self.inputData = "";
              self.showModel = false;
              self.loadBottom("refresh");
              //评论成功后评论条数加1
              self.objData.logDetailInfo.evaluateNum =
                self.objData.logDetailInfo.evaluateNum + 1;
              //                    self.getAjaxData(self.params);
            } else {
              self.$toast("评论失败！");
            }
          });
        } else {
          self.$toast("请输入内容！");
        }
      },
      good(item, index) {
        //大母子点赞
        let self = this;
        if (self.logEvaluateList[index].is_vote == "1") {
          self.Api.getInsertVote({
            user_id: self.userInfo.user_id,
            token: JSON.parse(localStorage.getItem("personInfo")).token,

            log_evaluate_id: item.id,
            status: item.is_vote == 0 ? 1 : 2
          }).then(function (res) {
            if (res.status == "0") {
              self.logEvaluateList[index].is_vote = "0";
              self.logEvaluateList[index].vote_num =
                self.logEvaluateList[index].vote_num - 1;
            }
          });
        } else if (self.logEvaluateList[index].is_vote == "0") {
          self.Api.getInsertVote({
            user_id: self.userInfo.user_id,
            token: JSON.parse(localStorage.getItem("personInfo")).token,

            log_evaluate_id: item.id,
            status: item.is_vote == 0 ? 1 : 2
          }).then(function (res) {
            if (res.status == "0") {
              self.logEvaluateList[index].vote_num =
                self.logEvaluateList[index].vote_num + 1;
              self.logEvaluateList[index].is_vote = "1";
            }
          });
        }
      },
      vote() {
        //点赞
        let self = this;
        self.Api.getVote({
          user_id: self.userInfo.user_id,
          log_id: self.params.case_main_id,
          token: JSON.parse(localStorage.getItem("personInfo")).token,
          type: 2,
          status:
            self.objData.logDetailInfo && self.objData.logDetailInfo.is_vote == 0
              ? 1
              : 2
        }).then(function (res) {
          if (res.status == 0) {
            self.getAjaxData(self.params);
          } else {
            self.$toast("点赞失败");
          }
        });
      },
      show() {
        //弹出层输入
        this.showModel = !this.showModel;
      },
      hide() {
        this.showModel = false;
        this.inputData = "";
      },
      attent() {
        this.getAjaxData(this.params);
      },
      getEvetList(obj) {
        //评论列表
        let self = this;
        self.reqData.user_id = obj.user_id;
        self.reqData.case_main_id = obj.id;
        console.log(self.reqData);
        self.Api.getEvetList({
          case_main_id: self.reqData.case_main_id,
          user_id: self.reqData.user_id,
          pageNum: self.reqData.pageNum,
          pageSize: self.reqData.pageSize,
          sessionKey: self.setSessionKey(self.reqData)
        }).then(function (res) {
          if (res.status == 0) {
            if (res.data && res.data.length > 0) {
              self.logEvaluateList = self.logEvaluateList.concat(res.data);
              if (self.reqData.pageSize > res.data.length) {
                self.allLoaded = true;
              } else {
                self.reqData.pageNum++;
              }
            }
            if (
              self.reqData.pageNum > 1 &&
              res.data &&
              res.data.length < self.reqData.pageSize
            ) {
              self.noMoreData = true;
            } else {
              self.noMoreData = false;
            }
          } else {
            self.$toast("获取评论数据失败");
          }
        });
      },
      //闺蜜跳转详情页
      goTail() {
        let self = this;
        let id =
          self.objData.goodsList.length > 0 ? self.objData.goodsList[0].id : "";
        let baseUrl = window.location.href.slice(
          0,
          window.location.href.indexOf("index.html")
        );
        window.location.href =
          baseUrl +
          "shop.html#/detail/" +
          id +
          "/" +
          self.userInfo.user_id +
          "/1";
      },
      loadBottom(param) {
        if (param == "refresh") {
          this.allLoaded = false;
          this.logEvaluateList = [];
          this.reqData.pageNum = 1;
        }
        this.getEvetList(this.params);
        this.$refs.loadmore.onBottomLoaded();
      },
      // 水印
      previewImg(index) {
        return;
        if (this.key) {
          this.$preview.open(index, this.newArr);
          return
        }
        var arr = this.arr.map((v) => {
          return this.imgToBase64(v.src)
        })

        Promise.all(arr).then(res => {
          this.key = true;
          this.newArr = res;
        }).catch(e => {
          console.log()
        })
      },

      // 图片转base64
      imgToBase64(src) {
        let img = new Image();
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let self = this;
        let w;
        let h;

        return new Promise((reslove, reject) => {
          img.onload = function () {
            w = img.naturalWidth;
            h = img.naturalHeight;

            canvas.width = w;
            canvas.height = h;
            try {
              ctx.drawImage(img, 0, 0, w, h);
              ctx.drawImage(self.$refs.img, 0, 0, w, h);
              src = canvas.toDataURL('image/jpeg', .6);
              reslove({src, w, h})
            } catch (e) {
              reject(e)
            }

          }
          img.onerror = function (e) {
            reject(e)
          }
          img.src = src
        })

      }
    },
    components: {
      baseInfo: require("../components/baseInfo.vue"),
      scroll: scroll
    }
  };
</script>
