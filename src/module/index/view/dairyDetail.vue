<template>
  <div>
  <div class="container dairyDetail">

   	<baseInfo :objData="objData" :kefUrl="kefUrl" type="detail" @refresh="attent()"></baseInfo>
   <!--过去的她-->
    <section class="dairyDetailPic mg30 mg20">
      <h2 class="">过去的她</h2>
      <div class="imgList" >
      	<img src="../images/default.png" :style="'background: url('+item.src+') no-repeat center;background-size:cover;'" alt="" v-for="(item,index) in imgList"
             class="preview-img"
             @click="$preview.open(index, imgList)"
        />
      </div>
    </section>

    <!--数据列表-->
    <section class="dairyDetailDataList  mg20">
      <ul>
        <li class="dairyDetailItem" v-for="(item,index) in objData.detailList">
          <div class="dairyDetailItemHeader">
            <div class="lastDate">
              <span>手术后{{item.oper_after_day}}天</span>
            </div>
            <span class="timeDesc" v-show="index==0">时间倒序</span>
          </div>
          <div class="dairyDetailItemBody">
            <span class="line"></span>
            <div class="bodyContent">
              <div class="num">
                <span class="numFirst"><em :class="{noTouch:numFirst,touch:!numFirst}"></em>{{item.scanNum || 0}}</span>
                <span class="numSecord" @click="goToDetail(objData.id,item.id,'isFoucs')"><em :class="{noTouch:numSecord,touch:!numSecord}"></em>{{item.evaluateNum || 0}}</span>
                <span class="numThird" @click="vote(item)">
                  <em :class="{noTouch:item.is_vote==0,touch:item.is_vote==1}"></em>{{item.voteNum || 0}}</span>
              </div>
              <div class="itemBdyImgList">
              	<img src="../images/default.png"  :style="'background: url('+i.src+') no-repeat center;background-size:cover;'" alt="" :class="{
                max1:(detailArr[index].length==1 || detailArr[index].length==2)||detailArr[index].length==3&&ind==0 ,
                max2:(detailArr[index].length==3&&ind!=0 ||detailArr[index].length==4),
                max3:detailArr[index].length==5&&ind!=0 || detailArr[index].length==7&&ind!=0 || detailArr[index].length==6,
                max15:detailArr[index].length==5&&ind==0 || detailArr[index].length==7&&ind==0,
                mg10:(detailArr[index].length==3&&ind==1)||
                 (detailArr[index].length==4&&(ind==0||ind==2))||
                 (detailArr[index].length==5&&(ind==0 || ind==3))||
                  (detailArr[index].length==7&&(ind==0 || ind==3 || ind==5))||
                  detailArr[index].length==6&&(ind==0 || ind==2 ||ind==4)
                 ,
                mgTop:(detailArr[index].length==2&&ind==1)||
                (detailArr[index].length==3&&ind!=0) ||
                (detailArr[index].length==4&&(ind==2||ind==3)) ||
                (detailArr[index].length==5&&(ind!=0&&ind!=1))||
                 (detailArr[index].length==7&&(ind==2 || ind==3 || ind==4 || ind==5 ||ind==6))||
                 detailArr[index].length==6&&(ind==2 || ind==3 || ind==4 ||ind==5)
                }" v-for="(i,ind) in detailArr[index] " :key="ind" class="preview-img">

              </div>
			  			<p @click="goToDetail(objData.id,item.id)">{{item.content | filterContet}}</p>
             <i @click="goToDetail(objData.id,item.id)">详情</i>
            </div>
          </div>
        </li>
      </ul>
    </section>

    </div>
  </div>
</template>
<script>
import "../css/dairyDetail.css";
import sessionKey from "../../../common/js/setSessionKey.js";

export default {
  data() {
    return {
      imgList: [],
      imgListHead: [require("../images/1.png")],
      objData: {},
      detailArr: [],
      numFirst: true,
      numSecord: true,
      numThird: true,
      userInfo: {},
      kefUrl: "",
      // case_main_id:""
    };
  },
  created() {
    CM.setTitle("仟姿-日志");
    this.userInfo =
      (localStorage.getItem("personInfo") &&
        JSON.parse(localStorage.getItem("personInfo"))) ||
      {};
    this.case_main_id =
      CM.getQueryMap(location.href.split("?")[1]) &&
      CM.getQueryMap(location.href.split("?")[1]).case_main_id;
    if (this.case_main_id == undefined) {
      this.$toast("案例ID为空！");
    } else {
      this.getAjaxData();
    }

  },
  methods: {
    getAjaxData() {
      //获取数据
      let self = this;
      self.Api.getDairyDetail({
        case_main_id: self.case_main_id,

        sessionKey: self.setSessionKey({
          case_main_id: self.case_main_id,
          user_id: self.userInfo.user_id
        })
      }).then(function(res) {
        if (res.status === 0) {
          self.objData = res;
          self.getImgList(res.before_main, res.before_two, res.before_three);
          self.getDetailImgList(res.detailList);
          self.getKeUrl(res.hospital_id);
        } else {
          self.$toast("获取数据失败!");
        }
      });
    },
    //获取客服url
    getKeUrl: function(id) {
      var self = this;
      if (id) {
        self.Api.getKeFuUrl({
          id: id
        }).then(function(res) {
          if (res.status == 0) {
            self.kefUrl = res.data.qiao_url;
          } else {
            self.$toast("获取数据失败!");
          }
        });
      }
    },
    getImgList(a, b, c) {
      //术前三张图片
      let self = this;
      self.imgList = [];
      var img = new Image();
      if (a && a != "") {
        img.src = imgPath + a;
        if (img.complete) {
          self.imgList.push({ src: imgPath + a, w: img.width, h: img.height });
        } else {
          img.onload = function() {
            self.imgList.push({
              src: imgPath + a,
              w: this.width,
              h: this.height
            });
          };
        }
        img = null;
      } else if (b && b != "") {
        img.src = imgPath + b;
        if (img.complete) {
          self.imgList.push({ src: imgPath + b, w: img.width, h: img.height });
        } else {
          img.onload = function() {
            self.imgList.push({
              src: imgPath + b,
              w: this.width,
              h: this.height
            });
          };
        }
        img = null;
      } else if (c && c != "") {
        img.src = imgPath + c;
        if (img.complete) {
          self.imgList.push({ src: imgPath + c, w: img.width, h: img.height });
        } else {
          img.onload = function() {
            self.imgList.push({
              src: imgPath + c,
              w: this.width,
              h: this.height
            });
          };
        }
        img = null;
      }
    },
    getDetailImgList(arr) {
      //图片的数据转换
      var self = this;
      var arrList_ = [];
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].pic_list) {
            var arrList = arr[i].pic_list.split(",");
            arrList_[i] = [];
            $.each(arrList, function(index, item) {
              var img = new Image();
              img.src = imgPath + item;
              if (img.complete) {
                arrList_[i].push({
                  src: imgPath + item,
                  w: img.width,
                  h: img.height
                });
              } else {
                img.onload = function() {
                  arrList_[i].push({
                    src: imgPath + item,
                    w: this.width,
                    h: this.height
                  });
                };
              }
              img = null;
            });
            self.detailArr.push(arrList_[i]);
          }
        }
      }
    },
    goToDetail(id, case_main_id, isFoucs) {
      //跳转到二级详情
      let self = this;
      self.Api.getLook({
        user_id: self.$route.query.user_id,
        token: JSON.parse(localStorage.getItem("personInfo")).token,
        log_id: case_main_id,
        type: 2,
        sessionKey: self.setSessionKey({
          user_id: self.objData.user_id,
          log_id: case_main_id,
          type: 2
        })
      }).then(function(res) {
        if (res.status == 0) {
          self.$router.push({
            name: "dairySubDetail",
            query: {
              id: id,
              case_main_id: case_main_id,
              user_id: self.objData.user_id,
              isFoucs: isFoucs,
              token: JSON.parse(localStorage.getItem("personInfo")).token
            }
          });
        } else {
          self.$toast("获取失败");
        }
      });
    },
    vote(item) {
      //点赞
      let self = this;
      self.Api.getVote({
        user_id: self.userInfo.user_id,
        log_id: item.id,
        type: 2,
        status: item.is_vote == 0 ? 1 : 2,
        token: JSON.parse(localStorage.getItem("personInfo")).token
      }).then(function(res) {
        if (res.status == 0) {
          self.getAjaxData();
        } else {
          self.$toast("点赞失败");
        }
      });
    },
    attent() {
      //关注
      this.getAjaxData();
    }
  },
  components: {
    baseInfo: require("../components/baseInfo.vue")
  }
};
</script>
