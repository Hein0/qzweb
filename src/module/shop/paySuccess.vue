<template>
  <div id="paySuccess">
    <div id="header">
      <div class="center">
        <img src="./images/tb_@2x.png" alt="">
        <p>&nbsp;支付成功！</p>
      </div>
    </div>
    <div class="footer">
      <div class="attention">
        <p><span v-if="telphoneShow">友情提示： </span>仟姿客服将发送支付凭证码到您 <b>{{telphoneShow}}</b> 的手机号。手术时需要您出示此凭证，请妥善保管。</p>
      </div>
      <div class="code">
        <p>凭证码：<span>{{order_sn}}</span></p>
      </div>
      <button @click="toShop">确认</button>
    </div>
  </div>
</template>
<style>
  .footer{
    position: static;
  }

</style>
<script>
import "common/css/paysuccess.css";
import { mapState } from "vuex";
import imgPath from "../../common/api/imgConfig";
import { Toast } from "mint-ui";
import utils from "../../common/js/utils";
export default {
  name: "paysuccess",
  data() {
    return {
      user_id: this.$route.query.user_id,
      telphone: this.$route.query.telphone,
      order_sn: this.$route.query.order_sn
    };
  },
  methods: {
    init() {
      try {
        window.webkit.messageHandlers.hideBackButton.postMessage("");
      }catch (e) {
        android.hideBackButton("");
      }
    },
    toShop() {
      // console.log(this.user_id);
      // this.$router.push("/shop/" + this.user_id);
      // let baseUrl= window.location.href.slice(0,window.location.href.indexOf('shop.html'))
      // window.location.href= baseUrl+'shopIndex.html#/'+this.user_id
      let self=this,
      u = navigator.userAgent,
      isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1|| u.indexOf('android') > -1, //android终端
      isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)|| u.indexOf('iOS') > -1; //ios终端
      try{
          if(isAndroid){
          androidclose.closepage()
          // android.closepage()
        }else if(isiOS){
          window.webkit.messageHandlers.closeWindow.postMessage('');
        }
      }
      catch(res){
        console.log(res)
      }
    }
  },
  created() {
      let self=this;
      // u = navigator.userAgent,
      // isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1|| u.indexOf('android') > -1, //android终端
      // isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)|| u.indexOf('iOS') > -1; //ios终端
      // try{
      //     if(isAndroid){
      //     gwc.show('2')
      //   }else if(isiOS){
      //     window.webkit.messageHandlers.showShoppingcart.postMessage('0');
      //   }
      // }
      // catch(res){
      //   console.log(res)
      // }

      try{
         wb_ShowShoppingcart("0")
      }catch(err) {
        console.log(err)
      }
    utils.setTitle("支付详情");
    this.init();
  },
  computed: {
    telphoneShow() {
      if (this.telphone) {
        return this.telphone.slice(0, 3) + "****" + this.telphone.slice(6);
      }
    }
  }
};
</script>
