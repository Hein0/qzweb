<template>
  <div id="payment">
      <div class="container mat04" v-if="!orderInfo.order_status">
        <div class="totlePrice">
            <span class="amountTitle">预约金  合计</span>
            <span class="amount">￥{{orderInfo.appoint_price}}</span>
        </div>
            <span class="select">选择支付方式</span>
        <ul class="payments" v-if="orderInfo.appoint_price">
            <li class="payment">
            <img src="./images/zhifu_wx_@2.png" alt="" class="payment-icon">
                <label class="payment-text" for="payment-1">微信支付</label>
                <div class="radio">
                    <input type="radio" name="payment" v-model="peyType" value="wxPay" id="payment-1"/><span></span>
                </div>
            </li>
            <li class="payment">
            <img src="./images/zhifu_zfb_@2.png" alt="" class="payment-icon">
                <label class="payment-text" for="payment-2">支付宝支付</label>
                <div class="radio">
                    <input type="radio" name="payment" v-model="peyType" value="AliPay" id="payment-2"/><span></span>
                </div>
            </li>
            <!--<li class="payment">-->
            <!--<img src="./images/zhifu_mmt_@2.png" alt="" class="payment-icon">-->
                <!--<label class="payment-text"  for="payment-3">买买钱包支付</label>-->
                <!--<div class="radio">-->
                    <!--<input type="radio" name="payment" v-model="peyType" value="mmtPay" id="payment-3"/><span></span>-->
                <!--</div>-->
            <!--</li>-->
        </ul>

        <p class="attention">您的订单最长可保留5小时，过期未支付系统将自动取消。支付成功后可立即申请尾款分期或者到院支付尾款！</p>
        <div class="pay">
            <button @click="pay">付款</button>
        </div>
      </div>
  </div>
</template>
<script>
import "common/css/payment.css";
import { mapState } from "vuex";
import imgPath from "../../common/api/imgConfig";
import { Toast } from "mint-ui";
import utils from "../../common/js/utils";
export default {
  name: "payment",
  data() {
    return {
      user_id: this.$route.query.user_id,
      order_sn: this.$route.query.order_sn,
      telphone: this.$route.query.telphone,
      imgPath,
      peyType:'wxPay'
    }
  },
  methods: {
    init() {
      this.$store
        .dispatch({
          type: "orderOne",
          order_sn: this.order_sn,
          user_id:this.user_id
        })
        .then(res=>{

        })
    },
    pay() {
      let orderInfo = this.$store.state.payment.orderInfo;

      // 参数
      let param = {
        tradeId: orderInfo.order_sn, // 订单ID
        goodsName: orderInfo.goods[0].name,
        tradeIdPrice: orderInfo.appoint_price
      }

      if(orderInfo.appoint_price==0){//预约金为0，不调支付接口
        this.mmtPay()
      }else{
        this.peyType? this[this.peyType ](JSON.stringify(param)):this.$toast('请选择支付方式');
      }
    },

    // wx支付
    wxPay (jsonObjStr) {
      try {
        window.webkit.messageHandlers.WXPay.postMessage(jsonObjStr);
      } catch (e) {
        android.WXPay(jsonObjStr);
      }
    },

    // 支付宝支付
    AliPay (jsonObjStr) {
      try {
        window.webkit.messageHandlers.AliPay.postMessage(jsonObjStr);
      }catch(e) {
        android.AliPay(jsonObjStr);
      }
    },

    // 买买钱包
    mmtPay () {
      this.$store
        .dispatch({
          type: "payOrder",
          order_sn: this.order_sn,
        })
        .then(res => {
          if (res.data && res.status == "0") {
              this.$router.push({
                name: "paysuccess",
                query: {
                  user_id: this.user_id,
                  telphone: this.telphone,
                  order_sn: res.data
                }
              });
          }
        });
    },

    // 支付结果
    completePay (data) {
      data = JSON.parse(data);
      data.status == 0 && this.mmtPay();
      data.status == 1 && this.$toast('支付失败，重新支付');
    }
  },
  created() {
      let self=this;
      // u = navigator.userAgent,
      // isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1|| u.indexOf('android') > -1, //android终端
      // isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)|| u.indexOf('iOS') > -1; //ios终端
      // try{
      //   if(isAndroid){
      //     gwc.show('2')
      //   }else if(isiOS){
      //     window.webkit.messageHandlers.showShoppingcart.postMessage('0');
      //   }
      // }
      // catch(err){
      //   console.log(err)
      // }

      try{
        wb_ShowShoppingcart("0")
      }catch(err) {
        console.log(err)
      }

    utils.setTitle("支付");
    this.init();

  },
  computed: {
    ...mapState({
      order: state => state.payment.order,
      orderInfo: state => state.payment.orderInfo,
      payMes: state => state.payMes
    })
  },
  watch: {
    payMes (value) {
      this.completePay(value)
    }
  }
};
</script>
