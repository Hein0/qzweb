<template>
  <div class="red-packet" style="overflow: auto;">
    <div class="top" >
      <h1>预约现金红包</h1>
      <p>
        可使用
      </p>
    </div>
    <div class="list">
      <template v-for="item in redPacket">

        <!--满减-->
        <div class="item" v-if="item.type == 2">
          <div class="left">
            <h5>{{item.amount}}<small>元</small></h5>
            <p>满{{item.condition}}减{{item.amount}}</p>
          </div>
          <div class="right">
            <h5>满减红包</h5>
            <p>每个商品限用一张</p>
          </div>
        </div>
        <!--现金-->
        <div class="item" v-else>
          <div class="left">
            <h5>{{item.amount}}<small>元</small></h5>
          </div>
          <div class="right">
            <h5>现金红包</h5>
            <p>每个商品限用一张</p>
            <p>新人第一单活动内可用多张</p>
          </div>
        </div>
      </template>
    </div>

  </div>
</template>
<script>
import API from '../../common/api/api'
export default {
  name: 'RedPacket',
  data () {
    return {
      userId: '',
      redPacket:'',
    }
  },
  created () {
    this.userId = JSON.parse(localStorage.getItem('personInfo')).user_id;
    this.init();
  },
  methods:{
    init () {
      this.getMineRedpacket()
    },
    getMineRedpacket () {
      API.getMyRedpacket({userId: this.userId}).then((res) => {
        res.status == 0?(this.redPacket = res.data):(this.$toast(res.message))
      })
    }
  }
}
</script>
<style scoped>
  .red-packet{
    width: 100%;
    background: #f6f8fa;
    height: 100%;
  }
  .top {
    height: 3.60rem;
    padding: 0 4%;
    background-color: white;
    padding-top:44px;
  }
  .top h1{
    font-size: 24px;
    color: #333333;
    font-weight: normal;
    margin-bottom: .74rem;
  }
  .top p {
    position: relative;
    font-size: 15px;
    color: #333333;
  }
  .top p::after{
    position: absolute;
    display: block;
    content: '';
    width: .74rem;
    height: 3px;
    background-color: #ff67b2;
    border-radius: 2px;
    bottom: -.30rem;
    left: .186rem
  }
  .list {
    padding: 22px 4%;
  }
  .item {
    width: 100%;
    height: 2.26rem;
    display: flex;
    flex-flow: row;
    margin-bottom: 15px;
    background-color: white;
    border-radius: 2px;
  }
  .left{
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 3.066rem;
    background-color: pink;
    text-align: center;
    color: white;
    background-color: #f6f8fa;
    background-image: url(./images/redPacket.png);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .left h5{
    font-size: 35px;
    font-weight: normal;
  }
  .left small {
    font-size: 11px;
  }
  .left p {
    margin-top: 10px;
    font-size: 12px;
  }
  .right{
    padding-left: 15px;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
  .right h5 {
    font-size: 14px;
    color: #333333;
    margin-bottom: 10px;
  }
  .right p{
    font-size: 12px;
    color: #999999;
    margin-bottom: 3px;
  }
</style>
