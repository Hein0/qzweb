<template>
  <div>
    <div class="header">请选择一个相关日记的订单</div>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore  :autoFill="false" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div v-for="(item,index) in orderlist">
          <div class="orders" @click="selectOrderHandle(item.order_sn)">
            <div class="order-sn">
              订单号：{{item.order_sn}}
            </div>
            <div class="goods" v-for="el in item.goods">
              <div class="logo">
                <img :src="imgPath + el.goods_url" alt="">
              </div>
              <div class="center">
                <div>{{el.name}}
                </div>
                <p class="neixing">{{el.keyword}}</p>
                <p class="neixing">180cl </p>
              </div>
              <div class="right">
                <p>￥{{el.money}}</p>
                <p class="number">x{{el.nums}}</p>
              </div>
            </div>
          </div>
        </div>

        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            正在加载...
          </span>
        </div>
      </mt-loadmore>
    </div>

    <!--跳过-->
    <div class="page">
      <div class="btnred" @click="skip()">跳过</div>
    </div>
  </div>
</template>
<script>
  import Api from "../../../common/api/api.js";
  import imgPath from '../../../common/api/imgConfig'

  // import orderList from "../../../common/store/modules/orderList.js";
  export default {
    data() {
      return {
        orderlist: [],
        imgPath,
        dataCount: 10,
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0,
        pageNum: 1,
        pageSize: 10
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        Api.orderList(params).then(res => {
          this.orderlist.push(...res.data);
          this.dataCount = res.dataCount;

          if (!res.data.length) {
            this.allLoaded = true;
            this.$toast('没有更多');
          }

          if (this.dataCount <= this.pageSize) {
            this.allLoaded = true;
          }
        });
      },
      selectOrderHandle(order_sn) {
        this.$router.push({
          path: 'creatdiary',
          query: {order_sn}
        })
      },
      loadBottom (id) {
        this.pageNum ++;
        this.init();// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded(id);
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      skip() {
        this.$router.push({
          path: 'creatdiary'
        })
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  };
</script>

<style scoped>
  .mint-loadmore-bottom > span >span div {
    background-color: pink;
  }

  .page-loadmore-wrapper {
    overflow: scroll;
  }
  .logo {
    width: 1.3333rem;
    height: 1.3333rem;
    /*background: url("../images/pic1.png") no-repeat;*/
    background-size: cover;
    margin: 0.3467rem;
  }
  .logo img {
    width: 100%;
    height: 100%;
  }
  .center {
    width: 45%;
    margin-top: 0.3467rem;
  }

  .header {
    height: 1.2667rem;
    line-height: 1.2667rem;
    padding-left: 0.3467rem;
    color: #a0a0a0;
    font-size: 0.32rem;
    box-shadow: 0px 4px 18px 0px rgba(255, 131, 199, 0.2) inset;
  }

  .neixing {
    color: #a0a0a0;
    font-size: 0.32rem;
    margin-top: 0.2rem;
  }

  .orders {
    background-color: #ffffff;
    padding-bottom: 0.93rem;
    margin-bottom: 0.2666rem;
  }

  .order-sn {
    height: 0.93rem;
    line-height: 0.93rem;
    font-size: 12px;
    color: #787878;
    padding-left: 0.3467rem;
  }

  .goods {
    width: 100%;
    display: flex;
    height: 2.0133rem;
    background-color: #f3f3f3;
    margin-bottom: 0.106rem;
  }

  .orders .goods:last-child {
    margin-bottom: 0;
  }

  .right {
    width: 30%;
    text-align: right;
    margin-right: 0.3733rem;
    margin-top: 0.48rem;
    color: #a0a0a0;
  }

  .number {
    margin-top: 0.2267rem;
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
    font-size: 0.4rem
  }

</style>
