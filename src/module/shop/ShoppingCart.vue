<template>
  <div id="shoppingCart">
      <div class="container mat04">
        <ul class="BuyList">
            <li class="commodity" v-for="(item,index) in cartList" :data-id="item.id" :for="item.cart_id">
                <div class="header">
                    <span class="name">{{item.cat}}</span>
                    <!-- <span class="edit" v-if="!ableEdit" @click="editToggle">编辑</span> -->
                    <!-- <span class="edit" v-if="ableEdit" @click="editToggle">确定</span> -->
                </div>
                <ul class="bottom">
                  <li>
                    <label :for="item.cart_id">
                      <div class="checkbox">
                        <input type="checkbox" :id="item.cart_id" name="selectGoods" v-model="edit" :value="item.cart_id"/><span></span>
                      </div>
                      <img :src="(imgPath+item.goods_url)" alt="">
                      <div class="commodityInfo">
                        <h4>{{item.name}}</h4>
                        <span class="specification">{{item.specs}}</span>
                      </div>
                      <div class="purchaseInfo">
                        <span class="price">￥{{item.appo_price * item.nums}}</span>
                        <!-- <span class="number" v-if="!ableEdit">×{{item.nums}}</span> -->
                        <span class="number editing" v-if="ableEdit"><i class="subtraction" v-if="ableEdit" @click.prevent="subtraction(index)">-</i><input type="number" v-model="item.nums"><i class="add" v-if="ableEdit" @click.prevent="add(index)">+</i></span>
                      </div>
                    </label>
                  </li>
                </ul>
            </li>
        </ul>
      </div>
      <div class="footer">
        <div class="statistics">
            <div class="checkbox">
                <input type="checkbox" v-model="checked" id="selectAll" v-on:change='checkedAll'/><span></span>
                <label for="selectAll">全选</label>
            </div>
            <span class="totlePrice">合计： <em>￥{{total}}</em></span>
        </div>
        <button class="ClearingButton" @click="toPay">结算</button>
      </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import "common/css/shoppingcart.css";
import imgPath from "../../common/api/imgConfig";
import utils from "../../common/js/utils";
import { Toast } from "mint-ui";
export default {
  name: "shoppingcart",
  props: ["user_id"],
  data() {
    return {
      edit: ["1"],
      checked: false,
      imgPath,
      goodsTemp: [],
      ableEdit:true
    };
  },
  methods: {
    init() {
      this.$store.dispatch({
        type: "cartList",
      });
    },
    checkedAll() {
      let _this = this;
      if (!this.checked) {
        //实现反选
        _this.edit = [];
      } else {
        //实现全选
        _this.edit = [];
        _this.cartList.forEach(function(item) {
          _this.edit.push(item.cart_id);
        });
      }
    },
    toPay() {
      this.goodsTemp = [];
      let self = this;
      if(this.cartList.length>0){
        this.cartList.forEach((item, index) => {
          this.edit.forEach(editItem => {
            if (item.cart_id == editItem) {
              let goodTemp = {};
              goodTemp.id = item.id;
              goodTemp.nums = item.nums;
              goodTemp.cart_id = item.cart_id;
              self.goodsTemp.push(goodTemp);
            }
          });
        });
        if(this.goodsTemp.length>0){
          // console.log(JSON.stringify(this.goodsTemp));
          self.$router.push({
          name: "confirmorder",
          query: {
            user_id: this.user_id,
            goods: JSON.stringify(self.goodsTemp)
          }
        });
        }else{
          Toast({
            message: "请选择需要结算的商品",
            position: "middle",
            duration: 2000
          });
        }
      }else{
        Toast({
          message: "购物车内还未添加商品。",
          position: "middle",
          duration: 2000
        });
        setTimeout(function(){
          let baseUrl= window.location.href.slice(0,window.location.href.indexOf('shop.html'))
          window.location.href= baseUrl+'shopIndex.html#/'+self.user_id
        },2000)
      }
    },
    subtraction(index){
      if(this.cartList[index].nums==0){
        return
      }
      this.cartList[index].nums--
    },
    add(index){
      this.cartList[index].nums++
    },
    editToggle(){
      this.ableEdit=!this.ableEdit
    }
  },
  watch: {
    //深度 watcher
    edit: {
      handler: function(val, oldVal) {
        if (this.edit.length === this.cartList.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      cartList: state => state.shoppingcart.cartList
    }),
    total: function() {
      let temp = 0;
      this.cartList.forEach((item, index) => {
        let i = parseInt(item.appo_price);
        let j = parseInt(item.nums);
        this.edit.forEach(editItem => {
          if (item.cart_id == editItem) {
            if (isNaN(i) || isNaN(j)) {
            } else {
              temp += i * j;
            }
          }
        });
      });
      return temp;
    }
  },
  created: function() {
    this.init();
    utils.setTitle("购物车");
  }
};
</script>
