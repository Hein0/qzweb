<template>
  <div id="indent">
      <div class="container">
        <ul class="BuyList">
            <li class="commodity" v-for="(item,index) in orderList" @click="backCreateDiary(index)">
                <div class="header">
                    <span class="name">订单编号：{{item.order_sn}}</span>
                    <span class="edit">交易成功</span>
                </div>
                    <div class="bottom" v-for="(goodItem,goodIndex) in item.goods">
                    <label :for="(item.order_sn+goodIndex)">
                        <div class="checkbox">
                            <input type="radio" :name="'selectOrder'+goodIndex" :id="(item.order_sn+goodIndex)" v-model="edit" :value="item.order_sn"/><span></span>
                        </div>
                        <img :src="(imgPath+goodItem.goods_url)" alt="">
                        <div class="commodityInfo">
                            <h4>{{goodItem.name}}</h4>
                            <span class="specification" v-if="goodItem.keyword">{{goodItem.keyword}}</span>
                        </div>
                        <div class="purchaseInfo">
                            <span class="price">￥{{goodItem.appo_price}}</span>
                            <span class="number">×{{goodItem.nums}}</span>
                        </div>
                    </label>
                    </div>
                 <div class="money">        
                   <div>商品共{{item.totalNum}}件&nbsp合计：￥<span>{{item.total_price}}</span></div>              
                </div> 
            </li>
        </ul>
      </div>
  </div>
</template>
<script>
import "common/css/indent.css";
import { mapState } from "vuex";
import imgPath from "../../common/api/imgConfig";
import { Toast } from "mint-ui";
import utils from "../../common/js/utils";
export default {
  name: "indent",
  data() {
    return {
      edit: ["1", "2"],
      imgPath,
      user_id:this.$route.query.user_id,
      order_status:this.$route.query.order_status
    };
  },
  components: {},
  methods: {
    init() {
      this.$store.dispatch({
        type: "orderList",
        user_id: this.user_id,
        order_status: this.order_status
      })
        .then(res=>{
          let self=this
          if(res.data.length==0){
            Toast({
              message: "创建日记需关联已消费订单，您还没有已消费的订单。",
              position: "middle",
              duration: 3000
            });
            setTimeout(function(){
              self.$router.push("/Mydiary/" + self.user_id);
            },4000)
          }
        })
    },
    backCreateDiary(index) {
      let goods_key_word = [];
      this.orderList[index].goods.forEach(element => {
        goods_key_word.push(element.keyword);
      });
      let project = this.orderList[index].goods[0].catid
      this.$router.push({
        name: "createDiary",
        query: {
          user_id: this.user_id,
          order_sn: this.orderList[index].order_sn,
          goods_key_word: goods_key_word.join(","),
          project:project
        }
      });
    }
  },
  computed: {
    ...mapState({
      orderList: state => state.Mydiary.orderList
    })
  },
  created() {
    utils.setTitle("选择订单");
    this.init();
  }
};
</script>