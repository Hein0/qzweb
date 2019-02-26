<template>
  <div class="page-index">
    <div class="padd"></div>

    <div v-for="(item,index) in caselist" :key="index">

      <!--待完善-->
      <div class="content" v-if="(item.op_status== 11 || (item.op_status== 12))" @click="nonePerfectHandle(item.id, item.op_status)">
        <div class="wei"></div>
        <div class="img dws">
        </div>

        <div class="txt">
          <p class="hos">{{item.hospital_name}}</p>
          <p class="words">
          <ul>
            <i></i>
            <li>{{item.goods_key_word}}</li>
          </ul>
          </p>
          <p class="date">{{item.update_time}}</p>
          <div class="video">
            <i></i> {{item.op_status == 11?'缺少术前视频':'缺少术后视频'}}
          </div>
        </div>
      </div>

      <!--已发布-->
      <div class="content" v-if="(item.op_status==2) || (!item.op_status)" @click="renewHandle(item.id)">
        <div class="img"></div>

        <div class="txt1">
          <p class="hos1">{{item.hospital_name}}</p>
          <p class="words1">
          <ul>
            <i></i>
            <li>{{item.goods_key_word}}</li>
          </ul>
          </p>
          <p class="date1">{{item.update_time}}</p>
        </div>

        <!--续写-->
        <div class="continue">
          续写
        </div>
      </div>
    </div>
    <div class="page">
      <div class="btnred" @click="addDiaryHandle()">创建新日记本</div>
    </div>
  </div>
</template>
<script>
  import Api from "../../../common/api/api.js";
  import imgPath from "../../../common/api/imgConfig.js";
  import Base64 from '../../../common/js/base64'

  export default {
    data() {
      return {
        caselist: "",
        imgPath,
        debugMes: ''
      };
    },
    created() {
      this.init();
      this.parseUrlHandle();
    },
    methods: {
      init() {
        let params = {
          user_id: JSON.parse(localStorage.getItem("personInfo")).user_id,
          token: JSON.parse(localStorage.getItem("personInfo")).token,
        };
        Api.caseList(params).then(res => {
          this.caselist = res.data
        });
      },

      // 创建日记本
      addDiaryHandle() {

        // 是否有订单
        Api.orderList({
          order_status: 2
        }).then(res => {
          if (res.status == 0) {
            res.dataCount?this.hrefToOrder():this.hrefToCreatDiary();
          } else {
            this.$toast(res.message)
          }
        })
      },

      // 日志里程
      nonePerfectHandle(id, before) {
        let user_id = JSON.parse(localStorage.getItem("personInfo")).user_id;
        console.log(before)
        before = before == 11?1:2;
        location.href=`/app/module/hosdetails.html#/courseview?casid=${id}&user_id=${user_id}&before=${before}`
      },

      // 续写
      renewHandle (id) {
        let user_id = JSON.parse(localStorage.getItem("personInfo")).user_id;
        location.href=`/app/module/diary.html#/Continue?id=${id}&user_id=${user_id}`
      },

      // 跳转订单页
      hrefToOrder() {
        this.$router.push('diaryorder')
      },

      // 跳转创建日记页
      hrefToCreatDiary() {
        this.$router.push('creatdiary')
      },

      // 解析url
      parseUrlHandle() {
        let str = this.$route.query.data;
        str?(localStorage.setItem('formAppMessage', Base64.decode(decodeURIComponent(str)))):
          (localStorage.removeItem('formAppMessage'));
      }
    }
  };
</script>

<style scoped>
 .page-index {
    background-color: #f8f8f8;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    font-family: PingFang-SC-Medium;
    position: relative;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 2rem;
  }

  .padd {
    width: 100%;
    height: 0.2667rem;
  }

  .content {
    position: relative;
    /* padding-top:  */
    height: 2.9467rem;
    display: flex;
    display: -ms-flexbox;
    overflow: hidden;
    display: flex;
    background-color: white;
    box-shadow: 0px  0px 28px rgba(255,131,199,0.4);
    margin-bottom: 0.2667rem;
  }

  .wei {
    display: block;
    width: 1.4267rem;
    height: 1.24rem;
    position: absolute;
    background: url("../images/ico10.png") no-repeat left top;
    background-size: 100%;
    /* z-index: 100000; */
  }

  .btnred {
    height: 1.3067rem;
    background-color: #ff65b1;
    color: #fff;
    line-height: 1.367rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
    font-size: 0.4rem
  }

  .touxiang {
    width: 2.1467rem;
    height: 2.1467rem;
    background: url("../images/pic3.png") no-repeat center center;
    background-size: cover;
    border-radius: 50%;
    margin: 0.4rem;
    /* z-index: 999; */
  }

  .txt {
    width: 70%;
    height: 100%;
    color: #b5b5b5;
  }

  .hos {
    font-size: 0.3733rem;
    padding-top: 0.7333rem;
    box-sizing: border-box;
  }

  .words ul {
    /* fle */
    display: flex;
  }

  .words li {
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 0.4rem;
    font-size: 0.32rem;
    margin-top: 0.2667rem;
    margin-bottom: 0.2667rem;
  }

  .video {
    display: block;
    text-align: right;
    width: 97%;
    /* float: right; */
    color: #ff65b1;
    margin-right: 0.4rem;
    font-size: 0.32rem;
  }

  .video i {
    display: inline-block;
    width: 0.3733rem;
    height: 0.3633rem;
    background: url("../images/ico9.png") no-repeat bottom;
    background-size: cover;
  }

  /* ----------- */
  .content1 {
    /* padding-top:  */
    height: 2.9467rem;
    display: flex;
    display: -ms-flexbox;
    display: flex;
  }

  .touxiang1 {
    width: 2.1467rem;
    height: 2.1467rem;
    background: url("../images/pic3.png") no-repeat center center;
    background-size: cover;
    border-radius: 50%;
    margin: 0.4rem;
  }

  .txt1 {
    width: 70%;
    height: 100%;
    color: #666666;
  }

  .hos1 {
    font-size: 0.3733rem;
    padding-top: 0.7333rem;
    box-sizing: border-box;
  }

  .words i {
    display: inline-block;
    width: 0.3733rem;
    height: 0.3867rem;
    background: url("../images/ico7.png") no-repeat;
    background-size: 100%;
    margin-top: 0.27rem;
  }

  .words1 i {
    display: inline-block;
    width: 0.3733rem;
    height: 0.3867rem;
    background: url("../images/ico8.png") no-repeat;
    background-size: 100%;
    margin-top: 0.27rem;
  }

  .words1 ul {
    /* fle */
    display: flex;
  }

  .words1 li {
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 0.4rem;
    font-size: 0.32rem;
    margin-top: 0.2667rem;
    margin-bottom: 0.2667rem;
    color: #ff6fb6;
  }

  .date1 {
    color: #c8c8c8;
  }

  .img{
    width: 2.13rem;
    height: 2.13rem;
    background-image: url(../images/pic4.png);
    background-repeat: no-repeat;
    background-size: 2.13rem;
    margin: 0 0.4rem;
    margin-top: 0.42rem;
  }
  .dws {
    background-image: url(../images/pic3.png);
  }
  .continue {
    position: absolute;
    right: 3%;
    bottom: 0.4rem;
    width: 1.33rem;
    height: 0.64rem;
    border-radius: 0.32rem;
    background-color: #ff65b1;
    text-align: center;
    line-height: 0.64rem;
    font-size: 12px;
    color: white;
  }
</style>
