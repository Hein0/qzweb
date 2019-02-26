<template>
  <div id="confirmOrder">

    <div class="container mat04">
      <ul class="confirmList">
        <li class="commodity" v-for="item in confirmGoods" :key="item.id">
          <img :src=" imgPath +  item.goods_url " alt="">
          <div class="commodityInfo">
            <h4 style="line-height: 0.46rem;">{{item.name}}</h4>
            <div class="specification" style="margin-top: 0.2rem;">
              <span>{{brand}}</span>
              <span>{{standard}}</span>
            </div>
          </div>
          <div class="purchaseInfo">
            <span class="price">￥{{item.qzd_price}}</span>
            <span class="number">×{{item.nums}}</span>
          </div>
        </li>
      </ul>
      <ul class="amountList">
        <li class="amount">
          <i class="amountName">预约金</i>
          <span class="totlePrice"><em v-if="discountPrice" style="font-size: 0.32rem;color:#999999;margin-left: 4.35rem;">红包已抵扣￥{{discountPrice}}</em></span>
          <span class="save" style="margin-right: 0"><em style="color:#ff4242;font-size: 0.3733rem;">￥{{confirmOrder.total_price-discountPrice}}</em></span>
        </li>
        <li class="amount">
          <i class="amountName">尾款</i>
          <span class="totlePrice" style="flex: 0;"><em style="color:#ff4242">￥{{confirmOrder.left_price}}</em></span>
        </li>
      </ul>
      <div class="tel">
        <span>手机号：</span><b class="telNumber" style="margin-left: 5.35rem;color:#999999">{{tel}}</b>
      </div>

      <!-- 三大承诺 -->
      <div class="threePromiseWrap" style="padding-top: 0">
        <div class="threePromise">
          <div class="duiHao"><span class="noHidePrice">闪电/过期退</span></div>
          <div class="duiHao"><span class="noHidePrice">无隐形消费</span></div>
          <div class="duiHao"><span class="qualityGood">正品保障</span></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="statistics" style=" padding-top: 0.26rem;padding-left: 0.26rem;font-size: 0.3733rem;color:#999999;display: block;">
        <div class="totle" style="margin-bottom: 0.2rem;">预约金：<em style="color:#ff4242">￥{{confirmOrder.total_price-discountPrice}}</em></div>
        <div class="totlePrice">到店再付： <em style="color:#999999">￥{{confirmOrder.left_price}}</em></div>
      </div>

      <button class="ClearingButton" @click="submitOrder">确认订单</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import "common/css/confirmorder.css";
  import imgPath from "../../common/api/imgConfig";
  import utils from "../../common/js/utils";
 // import Return from '../../components/base/return-component.vue'

  export default {
    name: "confirmorder",
    data() {
      return {
          user_id: this.$route.query.user_id,
          goods: this.$route.query.goods,
          standard:this.$route.query.standard,
          brand:'',
          discountPrice:0,
          imgPath,
          goodsTemp: [],
          tel:""//电话号码
    };
    },
    components: {
      //Return
    },
    methods: {
      init() {
        let self = this, query = this.$route.query;
        this.$store.dispatch({
          type: "confirmOrder",
          user_id: this.user_id = this.$route.query.user_id,
          goods: this.goods = this.$route.query.goods
        })
        query.discountPrice && (this.discountPrice = query.discountPrice);
        this.tel = JSON.parse(localStorage.getItem('personInfo')).telphone;
        this.brand = query.brand? query.brand.substr(query.brand.indexOf(">")+1): '';
      },
      submitOrder() {
        let self = this;
        this.goodsTemp = [];
        Array.isArray(this.confirmGoods) && this.confirmGoods.forEach(item => {
          let goodTemp = {};
          goodTemp.id = item.id;
          goodTemp.nums = item.nums;
          goodTemp.cart_id = item.cart_id;
          self.goodsTemp.push(goodTemp);
        });
        this.$store.dispatch({
          type: "order",
          goods: JSON.stringify(self.goodsTemp),
          telphone: self.confirmOrder.telphone,
          envelopeOrder:JSON.parse(localStorage.getItem("envelopeOrder")),
          appoint_price:self.confirmOrder.total_price-self.discountPrice
        }).then(res => {
          self.$router.push({
            name: "payment",
            query: {
              user_id: self.user_id,
              order_sn: res.data.order_sn,
              telphone: self.tel
            }
          })
        })
      }
    },
    created() {
      let self = this;
      //   u = navigator.userAgent,
      //   isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('android') > -1, //android终端
      //   isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iOS') > -1; //ios终端
      // try {
      //   if(isAndroid) {
      //     gwc.show('2')
      //   } else if(isiOS) {
      //     window.webkit.messageHandlers.showShoppingcart.postMessage('0');
      //   }
      // } catch(err) {
      //   console.log(err)
      // }
      // 
      try{
        wb_ShowShoppingcart("0")
      }catch(err) {
        console.log(err)
      } 
            
      utils.setTitle("确认订单");
      this.init();
    },
    computed: {
      ...mapState({
        confirmOrder: state => state.confirmorder.confirmOrder,
        confirmGoods: state => state.confirmorder.goods,
        order: state => state.payment.order
      }),
      totleNum() {
        let totleNum = 0;
        this.confirmGoods.forEach(element => {
          totleNum += element.nums;
        });
        return totleNum;
      },
      totleDiscount() {
        let totleDiscount = 0;
        this.confirmGoods.forEach(element => {
          totleDiscount += (element.hos_price - element.qzd_price) * element.nums;
        });
        return totleDiscount;
      }
    }
  };
</script>
