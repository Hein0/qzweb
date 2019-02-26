<template>
  <div id="hospitalDetail">
      <div class="container">
          <div class="header">
              <div class="attention">
                  <img src="./images/doctorLogo.png" alt="" class="hospitalIcon">
                  <span class="hospitalName">深圳老美啦美容医院</span>
                  <span class="hospitalType">综合门诊部</span>
                  <button class="hospitalAttention">+关注</button>
              </div>
              <div class="bottom">
                  <ul class="popularity">
                      <li class="order">
                          <span>预约</span>
                          <span class="orderNums">453</span>
                      </li>
                      <li class="case">
                          <span>案例</span>
                          <span class="caseNums">4562</span>
                      </li>
                      <li class="ranking">
                          <span>咨询排名</span>
                          <span class="rankingNums">879</span>
                      </li>
                  </ul>
              </div>
          </div>
          <ul class="ortherInfo">
              <li>
                  <img src="./images/koubei.png" alt="">
                  <span>医院口碑</span>
              </li>
          </ul>
          <div class="banner">
              <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <img src="./images/hospitalBanner.jpg" alt="">
                </mt-swipe-item>
              </mt-swipe>
          </div>
          <div class="hospitalInfo">
              <div class="location">
                  <img src="./images/dinwei_tb_@2.png" alt="">
                  <span>深圳市福田区彩田立交桥东南角</span>
              </div>
              <div class="photos">
                  <img src="./images/hospitalPhoto1.jpg" alt="">
                  <img src="./images/hospitalPhoto2.jpg" alt="">
                  <img src="./images/hospitalPhoto3.jpg" alt="">
              </div>
              <p>
                  雅美医疗美容医院成立中国最高规格的VIP客户服务中心；院庆盛典成为中南地区整形行业的年度盛会；集团化运作。特此感谢各位！
              </p>
          </div>
          <div class="Commodities">
              <div class="title"><h3>本院推荐</h3></div>
              <ul>
                  <li>
                      <img src="./images/Commodity1.jpg" alt="">
                      <div class="commodityInfo">
                          <h4>【破尿酸隆鼻】 玲珑东方美 韩国进口艾莉薇大分子 精塑完美面部轮廓</h4>
                          <div class="price">
                              <span class="sale">￥399</span>
                              <span class="discount">￥540</span>
                              <span class="book">预约数：200</span>
                          </div>
                      </div>
                  </li>
                  <li>
                      <img src="./images/Commodity2.jpg" alt="">
                      <div class="commodityInfo">
                          <h4>【破尿酸隆鼻】 玲珑东方美 韩国进口艾莉薇大分子 精塑完美面部轮廓</h4>
                          <div class="price">
                              <span class="sale">￥399</span>
                              <span class="discount">￥540</span>
                              <span class="book">预约数：200</span>
                          </div>
                      </div>
                  </li>
                  <li>
                      <img src="./images/Commodity3.jpg" alt="">
                      <div class="commodityInfo">
                          <h4>【破尿酸隆鼻】 玲珑东方美 韩国进口艾莉薇大分子 精塑完美面部轮廓</h4>
                          <div class="price">
                              <span class="sale">￥399</span>
                              <span class="discount">￥540</span>
                              <span class="book">预约数：200</span>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
          <div class="doctor">
              <div class="title"><h3>本院医生</h3></div>
              <div class="doctorInfo">
                  <img src="./images/doctorAvatar.jpg" alt="">
                  <div class="doctorDetail">
                      <h4>主治医生： 小小新</h4>
                      <span class="adress">深圳市爱美丽医疗美容医院</span>
                      <div class="book">
                          <span>案例： 200</span>
                          <span>预约数： 200</span>
                      </div>
                  </div>
              </div>
              <ul class="ortherInfo">
                <li>
                    <img src="./images/hotSale.png" alt="">
                    <span>热卖</span>
                    <ul class="product">
                        <li>超立体唇&nbsp;88预约</li>
                        <li>双眼皮&nbsp;6预约</li>
                        <li>填充&nbsp;6预约</li>
                        <li>超立体唇&nbsp;88预约</li>
                        <li>双眼皮&nbsp;6预约</li>
                    </ul>
                </li>
                <li>
                    <img src="./images/comment.png" alt="">
                    <span>用户评价</span>
                </li>
            </ul>
          </div>
          <div class="mainCase">
              <div class="title"><h3>本院精华帖</h3></div>
              <div class="case">
                  <img src="./images/mainCase1.jpg" alt="">
                  <div class="caseInfo">
                      <div class="caseName">
                          <h4>深圳华美医疗美容医院</h4>
                          <span>认证</span>
                      </div>
                      <div class="score">
                          <span>评价：</span>
                          <span class="scoreNum">5.0</span>
                          <span class="all">
                            <input type="radio" name="grade" value="0" disabled/><span>★</span><input type="radio" name="grade" value="1" disabled/><span>★</span><input type="radio" name="grade" value="2" disabled/><span>★</span><input type="radio" name="grade" value="3" disabled/><span>★</span><input type="radio" name="grade" value="4" disabled/><span>★</span><input type="radio" name="grade" value="5" disabled/><span>★</span>
                          </span>
                      </div>
                      <span class="data">
                          发布日期： 2012-5-12
                      </span>
                  </div>
              </div>
          </div>
          <div class="bottomBanner">
              <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <img src="./images/bottomBanner1.jpg" alt="">
                </mt-swipe-item>
              </mt-swipe>
          </div>
      </div>
      <div class="footer">
          <button class="call">
              <img src="./images/call.png" alt="">
              <span>电话咨询</span>
          </button>
          <button class="online">
              <img src="./images/online.png" alt="">
              <span>在线咨询</span>
          </button>
      </div>
  </div>
</template>
<script>
    import "common/css/hospitaldetail.css";
    export default {
        name: "hospitaldetail",
        data(){
            return{
                
            }
        }
    }
</script>
