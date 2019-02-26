<template>
  <div id="All">
      <div class="container">
        <ul class="BuyList">
            <li class="commodity" v-for="(item,index) in orderList" @click="toPayment(item)">
                <div class="header">
                    <span class="name">订单编号： {{item.order_sn}}</span>
                    <span class="edit" v-if="(item.order_status==0)">待付款</span>
                    <span class="edit" v-if="(item.order_status==1)">未使用</span>
                    <span class="edit" v-if="(item.order_status==2)">已消费</span>
                    <span class="edit" v-if="(item.order_status==3)">已过期</span>
                </div>
                <div class="bottom" v-for="(goodItem,goodIndex) in item.goods">
                    <img :src="(imgPath+goodItem.goods_url)" alt="">
                    <div class="commodityInfo">
                        <h4>{{goodItem.name}}</h4>
                        <span class="specification">{{goodItem.keyword}}</span>
                    </div>
                    <div class="purchaseInfo">
                        <span class="price">￥{{goodItem.appo_price}}</span>
                        <span class="number">×{{goodItem.nums}}</span>
                    </div>
                </div>
                <div class="price">
                   <span>商品总共{{item.totalNum}}件 合计： ￥{{item.total_price}}</span>
                </div>
            </li>
        </ul>
      </div>
  </div>
</template>
<script>

import "common/css/All.css";
import { mapState } from "vuex";
import imgPath from "../../common/api/imgConfig";
import { Toast } from "mint-ui";
import utils from "../../common/js/utils";

export default {
  name: "All",
  props: ["user_id", "order_status"],
  data() {
    return {
      imgPath
    };
  },
  methods: {
    init() {
      if (this.order_status) {
        let self = this;
        this.$store.dispatch({
          type: "ALLorderList",
          // user_id: this.user_id,
          order_status: this.order_status

        })
          .then(res=>{
            if(res.dataCount==0){
              Toast({
                message: "暂无相关订单",
                position: "middle",
                duration: 3000
              });
            }
          })
      } else {
        this.$store.dispatch({
          type: "ALLorderList",
          // user_id: this.user_id
        })
          .then(res=>{
            if(res.dataCount==0){
              Toast({
                message: "暂无相关订单",
                position: "middle",
                duration: 3000
              });
            }
          })
      }
    },
    toPayment(item){
      if(item.order_status==0){
        let baseUrl= window.location.href.slice(0,window.location.href.indexOf('diary.html'))
        let goodsTemp=[];
        item.goods.forEach(element => {
          let goodTemp={};
          goodTemp.id=element.id;
          goodTemp.nums=element.nums;
          goodsTemp.push(goodTemp)
        });
        console.log(goodsTemp)
        let queryTemp= 'user_id='+this.user_id+'&order_sn='+item.order_sn+'&telphone='+item.telphone
        window.location.href= baseUrl+'shop.html#/payment?'+queryTemp
      }else{
        return;
      }
    }
  },
  computed: {
    ...mapState({
      orderList: state => state.orderList.orderList
    })
  },
  created() {
    if(this.order_status){
      if(this.order_status==0){
        utils.setTitle("待付款订单");
      }else if(this.order_status==1){
        utils.setTitle("未使用订单");
      }else if(this.order_status==2){
        utils.setTitle("已消费订单");
      }else if(this.order_status==3){
        utils.setTitle("已过期订单");
      }
    }else{
      utils.setTitle("全部订单");
    }
    this.init();
  }
};
</script>
