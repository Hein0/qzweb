<template>
  <div id="detail">

    <div class="container" :data-id="goodDetail.id" style="margin-bottom: 1.3333rem;">
      <!-- <canvas id="myCanvas" width="1000" height="500" ></canvas> -->
      <ul class="header">
        <li @click="toActive('.container')">宝贝</li>
        <li @click="toActive('#detailImg')">详情</li>
        <li @click="toActive('#notice')">购买须知</li>
        <li @click="toActive('.comment')">评论</li>
      </ul>

      <!--<mt-swipe class="swipe" :show-indicators="false" :auto="autoTime" >-->
        <!--<mt-swipe-item v-for="(n,index) in goodDetail.goods_url">-->
          <!--<img v-if="n.src" src="./images/default.png" alt="" class="preview-img" :style="'background: url('+n.src+') no-repeat center;background-size:cover;'" @click="$preview.open(index,goodImg)">-->
          <!--<div v-else class="video-wrap" >-->
            <!--<img :src="imgPath + n" alt=""  v-show="!showVideo">-->
            <!--<p @click='play' v-show="!showVideo"></p>-->
            <!--<div class="shade" v-show="!showVideo"></div>-->
            <!--<video :src="goodDetail.goods_video_url" webkit-playsinline="" preload="auto" width="100px" height="100px" playsinline="" x5-playsinline="" x-webkit-airplay="" v-show="showVideo" alt="" ref='video' @ended = "end" @click="pause"></video>-->
          <!--</div>-->
        <!--</mt-swipe-item>-->
      <!--</mt-swipe>-->

      <div class="swiper-container swiper-container-horizontal" style="cursor:pointer;min-height: 200px">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(n,index) in goodDetail.goods_url" :key="index">
            <img v-if="n.src" src="./images/default.png" alt="" class="preview-img" :style="'background: url('+n.src+') no-repeat center;background-size:cover;'" @click="$preview.open(index,goodImg)">
            <div v-else class="video-wrap" style="min-height: 200px">
              <img :src="imgPath + n" alt=""  v-show="!showVideo">
              <p @click='play' v-show="!showVideo"></p>
              <div class="shade" v-show="!showVideo"></div>
              <video :src="goodDetail.goods_video_url" webkit-playsinline="" preload="auto" width="100px" height="100px" playsinline="" x5-playsinline="" x-webkit-airplay="" v-show="showVideo" alt="" ref='video' @ended = "end" @click="pause"></video>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="shopCar" style="position: absolute;right: 6%;top: 2%;z-index:999999" v-if='!goodDetail.firstTag'>
        <img src="./images/shopCar.png"  @click="gotoShopCart">
      </div>

      <div class="shopCar" style="position: absolute;left:6%;top: 2%;z-index:999999">
        <img src="./images/back.png"  @click="$router.back(-1)">
      </div> -->

      <!-- 新人专享 -->
      <div class="newInfo">
        <div class="newPriceInfo">
          <span class="newSpecial" v-if='goodDetail.firstTag==1'>新人专享</span>
          <span class="newScale" v-if="hongBaoNum">您有<b>{{discountPrice}}</b>元红包可用,购买<span style="color: red">立减<b>{{discountPrice}}</b>元</span></span>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="info">
        <div class="goodName"><span v-if="goodDetail.catName">【{{goodDetail.catName}}】</span>{{goodDetail.name}}</div>
        <div class="bookInfo">
          <span class="newShoppe">￥{{goodDetail.qzd_price}}</span>
          <span class="newPrice" style="text-decoration:line-through;">￥{{goodDetail.hos_price}}</span>
          <span class="book"><b>{{goodDetail.discount}}</b>折</span>
        </div>

        <div class="otherInfo">
          <span class="appoint">已预约:{{goodDetail.appoint_count ||0}}</span>
          <img src="./images/locationImg.png">
          <span class="location">{{goodDetail.hos_city}}</span>
        </div>
      </div>

      <!-- 三大承诺 -->
      <div class="threePromiseWrap">
        <div class="threePromise">
          <div class="duiHao"><span class="noHidePrice">闪电/过期退</span></div>
          <div class="duiHao"><span class="noHidePrice">无隐形消费</span></div>
          <div class="duiHao"><span class="qualityGood">正品保障</em></span></div>
        </div>
      </div>

      <!-- 规格剂量 -->
      <ul class="discounts">
        <li class="discount" @click="isSpecification=true" v-if="goodDetail.standard || goodDetail.brand">
          <span class="fuLi">参数</span>
          <span class="discount-text">品牌规格剂量</span>
        </li>
        <li class="discount">
          <span class="fuLi">福利</span>
          <span class="discount-text">写日记仟姿<b style="color: #ff90c7">返现100元</b></span>
          <span v-if="goodDetail.rebate" style='color:#787878'>{{goodDetail.anotherName}}<b style="color: #ff90c7">返现</b><b style="color: #ff90c7">{{goodDetail.rebate}}元</b></span>
        </li>

        <li class="discount" style="margin-left: 0.88rem" v-if="hongBaoNum" @click="orderPacket=true">
          <span class="discount-text"><span>{{totalIndex}}</span>个红包已选，共计<b style="color: #ff90c7">减<b>{{discountPrice | money}}元</b></b></span>
        </li>
      </ul>

      <div class="hospital" :data-hospital="goodDetail.hos_id">
        <div class="hospitalInfo" @click="toDetail(goodDetail.hos_id)">
          <img :src="(imgPath+goodDetail.hos_logo)" alt="" class="hospital-icon">
          <div class="hospital-text">
            <h4>{{goodDetail.hos_name}}&nbsp;<i></i></h4>
            <p>资质： {{goodDetail.hos_hospital_type | hospitalType}}</p>
            <p>地址： {{goodDetail.hos_city+goodDetail.hos_address}}</p>
          </div>
        </div>
        <div class="buttons">
          <a class="tel" :href="'tel:0755-84379544'">
            <i></i>电话咨询</a>
          <a class="online" @click="onlineService">
            <i></i>在线咨询
          </a>
        </div>
      </div>

      <div class="comment">
        <div class="commentHead">
          <span>闺蜜们这样评价</span>
          <b v-if="goodDetail.scoreNum">{{goodDetail.scoreNum.toFixed(2)}}</b>
          <span class="all">
          <input type="radio" name="scoreNum" value="0" v-model="goodDetail.grade" disabled/><span>★</span>
					<input type="radio" name="scoreNum" value="1" v-model="goodDetail.grade" disabled/><span>★</span>
					<input type="radio" name="scoreNum" value="2" v-model="goodDetail.grade" disabled/><span>★</span>
					<input type="radio" name="scoreNum" value="3" v-model="goodDetail.grade" disabled/><span>★</span>
					<input type="radio" name="scoreNum" value="4" v-model="goodDetail.grade" disabled/><span>★</span>
					<input type="radio" name="scoreNum" value="5" v-model="goodDetail.grade" disabled/><span>★</span>
					</span>
        </div>
        <div class="tips">
          <!-- <ul>
              <li>厉害了</li>
              <li>医生技术好</li>
              <li>效果棒棒哒&nbsp;<span>18</span></li>
              <li>产品真实可靠&nbsp;<span>18</span></li>
              <li>医院干净整洁&nbsp;<span>18</span></li>
              <li>服务很贴心&nbsp;<span>19</span></li>
            </ul> -->
        </div>
      </div>
      <scroller v-if="!no_data" v-on:load="loadMore" ref="scroller" :auto-fill="false">
        <ul class="diaryList">
          <li class="diaryInfo" v-for="(item,index) in goodCaseDetailInfo" :key="item.id+item.user_name+index">
            <div class="diary-img">

              <img src="./images/default.png" alt="" class="preview-img" v-for="(obj,objIndex) in goodCaseDetailInfo[index].imgs" :style="'background: url('+obj.src+') no-repeat center;background-size:cover;'" :key="objIndex" @click="$preview.open(objIndex,goodCaseImgs[index])">
            </div>
            <div class="authorInfo">
              <img :src="(imgPath+item.user_logo)" alt="">
              <div class="author">
                <h4 class="name" :data-id="item.user_id">{{item.user_name}}<span class="time">{{item.month}}月{{item.day}}日</span></h4>
                <div class="authorComment">
                  <span>评价：</span>
                  <b>{{item.scoreNum}}</b>
                  <span class="all">
                  <input type="radio" :name="'grade'+index" value="0" v-model="goodCaseDetailInfo[index].grade" disabled/><span>★</span>
									<input type="radio" :name="'grade'+index" value="1" v-model="goodCaseDetailInfo[index].grade" disabled/><span>★</span>
									<input type="radio" :name="'grade'+index" value="2" v-model="goodCaseDetailInfo[index].grade" disabled/><span>★</span>
									<input type="radio" :name="'grade'+index" value="3" v-model="goodCaseDetailInfo[index].grade" disabled/><span>★</span>
									<input type="radio" :name="'grade'+index" value="4" v-model="goodCaseDetailInfo[index].grade" disabled/><span>★</span>
									<input type="radio" :name="'grade'+index" value="5" v-model="goodCaseDetailInfo[index].grade" disabled/><span>★</span>
									</span>
                </div>
              </div>
            </div>
            <p class="content" @click="toDairyDetail(index)">{{item.content}}</p>
          </li>
        </ul>
      </scroller>
      <div id="detailImg" >
        <h4>商品详情</h4>
        <div v-html="goodDetail.detail_page" v-if="goodDetail.detail_page" class="txt"></div>
        <div v-else><img :src="imgPath + goodDetail.goods_detail_url" alt=""></div>

      </div>
      <div id="notice">
        <h4>购买须知</h4>
        <div class="main_pay_box">
          <ul style="padding-top: 0;">
            <h3>【消费流程】</h3>
            <li>1. 下订单并支付预约金</li>
            <li>2. 咨询客服，客服会帮您完成咨询预约面诊</li>
            <li>3. 手术前将支付凭证给医生进行验证，并支付余下手术费用</li>
          </ul>
          <ul>
            <h3>【如何预约】</h3>
            <li>点击页面上方的咨询或电话，和仟姿客服人员预约面诊时间。</li>
          </ul>
          <ul>
            <h3>【如何退款】</h3>
            <li>点击APP右下角“我的”，在我的-我的订单-点击“售后/退款”，即可拨打客服电话，仟姿客服人员将尽快协助您完成退款。</li>
          </ul>

          <ul>
            <h3>【消费须知】</h3>
            <li>1. 下单后，可点击本页面“在线咨询”或者下方导航栏“咨询”与医院预约到院时间。</li>
            <li>2. 请在确定手术后，再将支付凭证交给医生，支付凭证交给医生后，视为已经手术您将无法完成退款。</li>
            <li>3. 该商品在线支付预约金成功后，请于支付之日起三个月内与医院协调沟通具体到院时间。</li>
            <li>4. 在线支付成功后，您还需到院缴纳剩余尾款（仟姿平台价-预约金）。</li>
            <li>5. 若您仍有疑问请在线联系客服或拨打仟姿客服热线4008058889咨询。</li>
          </ul>
        </div>

      </div>
    </div>
    <div class="footer fixed">
      <div class="payInfo">
        <p>预约金：<span>￥{{goodDetail.appo_price}}</span></p>
        <p>到院再付：￥{{goodDetail.left_price}}</p>
      </div>
      <div class="consult" @click="onlineService">
        <a>
          <i></i>
          <span>咨询</span>
        </a>
      </div>
      <div class="newFirstClass" v-if="goodDetail.firstTag==1"> <!-- 新人第一单商品 -->
        <div class="payNow" @click="payNow" v-if="goodDetail.firstUserTag==1">立即购买</div>  <!-- 新人第一单商品，是新客户 -->
        <div class="newPayNow" v-else>新人专享</div> <!-- 新人第一单商品,非新客户 -->
      </div>
      <div class="newFirstClass" v-else>
        <!--<div class="toShoppingCart" @click="toShoppingCart">加入购物车</div>-->
        <div class="payNow" @click="payNow">立即购买</div>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div class="opticy" v-if="isSpecification || orderPacket"></div>

    <!-- 商品规格弹窗 -->
    <div class="specifity" v-if="isSpecification">
      <div>
				<img src="./images/close.png" @click="isSpecification=false">
        <div v-if="goodDetail.brand">
          <span class="brand">品牌</span>
					<div class="shopName">{{goodDetail.brand}}</div>
					<div style="border: 1px solid #f6f8fa;"></div>
				</div>
      </div>

      <div v-if="goodDetail.standard">
        <div class="ruleWrap">规格</div>
        <div class="rule">
          <span class="volume">{{goodDetail.standard}}</span>
        </div>
        <div style="border: 1px solid #f6f8fa;"></div>
      </div>

      <div class="nextBuyWrap" v-if="goodDetail.firstTag==1"><!-- 新人第一单商品 -->
        <div class="nextBuy" v-if="goodDetail.firstUserTag==1" @click="payNow">立即购买</div><!-- 新人第一单商品，是新客户 -->
         <div class="newPayNow" v-else>新人专享</div> <!-- 新人第一单商品,非新客户 -->
      </div>

      <div class="nextBuyWrap" v-else>
        <!-- <div class="nextBuy" @click="toShoppingCart">加入购物车</div> -->
        <div class="nextBuy" @click="payNow" style="margin-left:0.2267rem">立即购买</div>
      </div>
    </div>

    <!-- 红包弹窗 -->
    <div class="orderPacket" v-show="orderPacket">

      <div>
        <span>预约金红包</span>
        <span>共计减了<b style="color: #ff4242">{{discountPrice}}元</b></span>
        <img class="close" src="./images/close.png" @click="closeHongBaoTip">
      </div>
      <div class="pocket-list">
        <ul class="commodityList" style="margin-top: 0.4rem">
          <!-- 满减红包 -->
          <li class="commodityHong" v-for="(item,idx) in manJianPacket" :key="item.id+item.type+item.condition+item.amount+idx" style=" margin-bottom: 0.4rem;display: flex;flex: 1;    border: 0.02rem solid #efefef;border-radius: 0.2rem;">
            <img class="commodity-icon orderPacketImg" src="./images/orderPacket.png" alt="">
            <div class="infoHong" style="position: relative;">
              <h4 style="margin-top: 0.38rem;margin-bottom: 0.28rem;font-size: 0.4rem;color: #000">满减红包</h4>
              <span style="left: -50%;position: absolute;color: #fff;top: 34%;"><b style="font-size: 0.66rem;margin-left: 0.12rem">{{item.amount}}</b><b>元</b></span>
              <span style="left: -57%;position: absolute;color: #fff;top: 72%;"><b style="margin-left: 0.12rem">满{{item.condition}}</b>减<b>{{item.amount}}元</b></span>

              <div class="price" style="font-size: 0.34rem;width: 4.08rem">
                <span :data-hospitalId="item.hospital_id" style="display: inherit;margin-bottom: 0.2rem;">每个商品限用一张</span>
              </div>
            </div>
            <div class="selectedHongbao"  :class='manJianPacketFlag===idx?"selectedHongbaoImg":"cancelHongbaoImg"' @click="chooseManJianPacket(idx)"></div>
          </li>
        </ul>

        <ul>
          <!-- 现金红包 -->
          <li class="commodityHong" v-for="(item,index) in cashPacket" :key="item.id+item.type+item.condition+item.amount+index" style=" margin-bottom: 0.4rem;display: flex;flex: 1;    border: 0.02rem solid #efefef;border-radius: 0.2rem;">
            <img class="commodity-icon orderPacketImg" src="./images/orderPacket.png" alt="">
            <div class="infoHong" style="position: relative;">
              <h4 style="margin-top: 0.4rem;margin-bottom: 0.28rem;font-size: 0.4rem;color: #000">现金红包</h4>
              <span style="left: -50%;position: absolute;color: #fff;top: 36%;"><b style="font-size: 0.66rem;margin-left: 0.12rem">{{item.amount}}</b><b>元</b></span>

              <div class="price" style="font-size: 0.34rem;width: 4.08rem">
                <span :data-hospitalId="item.hospital_id" style="display: inherit;margin-bottom: 0.2rem;">每个商品限用一张</span>
                <span class="goodBook" style="margin-top: 0.28rem">新人第一单活动内可用多张</span>
              </div>
            </div>

            <div class="selectedHongbao"  :class='cashPacket[index].newCashPacketFlag?"selectedHongbaoImg":"cancelHongbaoImg"' @click="chooseCashPacket(index)" v-if='goodDetail.firstTag && goodDetail.firstUserTag'></div><!-- 新人第一单 -->

            <div class="selectedHongbao"  :class='cashPacketFlag==index?"selectedHongbaoImg":"cancelHongbaoImg"' @click="chooseCashPacket(index)" v-else></div>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>
<style scope>
  .opticy{
    height: 100%;
    width: 100%;
    opacity: 0.7
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .pocket-list{
    height: 9rem;
    overflow: scroll;
  }
  video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .video-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .video-wrap img {
    position: absolute;
    left: 0;
    top: 0;
  }
  /*#detail .container ul.header {
    top: 44px;
  }
*/

  .video-wrap p {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 50px;
    height: 50px;
    z-index: 10;
    transform: translate(-50%, -50%);
    background-image: url(images/play.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50px;
  }
  .video-wrap .shade{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
  }
  #detailImg .txt {
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  #detailImg .txt, .txt li, .txt p {
    font-size: 14px;
    line-height: 1.5;
    margin-top: 4px;
    list-style-type: inherit;
  }
  .txt ol,.txt ul {
    padding-left: 20px;
  }
  .txt ol li {
    list-style-type: decimal;
  }
  .txt ul li {
    list-style-type: disc;
  }

  #detail .info{
    margin-bottom: 0 !important;
  }
  .newInfo{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    /* margin-bottom: 0.4rem;*/
  }

  .newPriceInfo{
    background: #fff1f1;
    padding-top: 0.2933rem;
    padding-bottom: 0.2133rem;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    padding-left: 0.3733rem;
  }

  .newSpecial{
    width: 1.6rem;
    height: 0.46rem;
    border-radius: 0.1rem;
    font-size: 0.34rem;
    color: #fff;
    background-color: #ff3a3a;
    text-align: center;
    line-height: 0.46rem;
    margin-right: 0.2rem;
  }

  .newScale{
    line-height: 0.4rem;
    font-size: 0.32rem;
  }

  .goodName{
    margin-top: 0.24rem;
    font-size: 0.4rem;
    line-height: 0.64rem;
  }

  .bookInfo{
    margin-top: 0.26rem;
  }

  .newShoppe{
    margin-right: 0.24rem;
    font-size: 0.46rem;
    color: #ff4242;
  }
  .book{
    height: 0.48rem;
    /*width: 1.4rem;*/
    background: #fff1f1;
    border-radius: 0.2rem;
    text-align: center;
    color: #ff7171;
    line-height: 0.48rem;
    font-size: 0.34rem;
    margin-left: 0.26rem;
  }


  #detail .info .otherInfo{
    justify-content: initial !important;
    border-bottom:0 !important;
    padding-bottom: 0.3867rem !important;
  }

  .location{
    margin-left: 0.1rem;
  }

  .threePromiseWrap{
    font-size: 0.36rem;
    background: #f6f8fa;
    padding-top: 0.3733rem;
    padding-bottom: 0.3733rem;
  }

  .threePromise{
    background: #fff;
    height: 1.2rem;
    line-height: 1.3rem;
    padding-left: 0.3733rem;
  }

  .noHidePrice{
    padding-right: 0.46rem;
    padding-left: 0.46rem;
  }

  .qualityGood{
    padding-left: 0.46rem;
  }

  .duiHao{
    background: url("./images/threePromise.png") no-repeat;
    display: inline-block;
    background-size: 0.35rem 0.35rem;
  }

  #detail .discounts .discount{
    border-bottom: 0 !important;
    background: url("./images/jianTouRight.png") no-repeat 97% 50%;
    background-size: 0.15rem 0.30rem
  }

  .fuLi{
    font-size: 0.4rem;
    color: #000
  }

  #detail .discounts .discount .discount-text{
    margin-left: 0.4rem;
  }

  #detail .discounts{
    padding-top: 0.1rem !important
  }

  .shopCar{
    width: 0.85rem;
    position: absolute;
    right: 6%;
    top: 2%;
  }
  .shopCar img{
    width:100%;
  }

  .newFirstClass{
    display: -webkit-flex;
    display: flex;
    flex: 1
  }
  .newPayNow{
    font-size: 0.4533rem;
    line-height: 1.3333rem;
    text-align: center;
    background-color: #ccc;
    flex: 1;
  }
  .otherInfo{
    margin-top: 0.2rem;
    font-size: 0.34rem !important;
  }
  .otherInfo img{
    margin-left: 6.0rem;
    width: 0.26rem;
    height: 0.36rem;
  }

  .specifity{
    width:10rem;
    color:#b6b6b6;
    font-size: 0.34rem;
    padding: 0.46rem;
    background: #fff;
    position:absolute;
    bottom: 0;
    z-index: 999
  }

  .specifity img{
    width: 0.3733rem ;
		height:0.3733rem;
		margin-left: 8.68rem;
  }

  .brand{
    color: #999;
    /*font-size: 0.28rem;*/
  }

  .shopName{
    margin-top: 0.427rem;
    margin-bottom: 0.427rem;
    width: 2.313rem;
    height: 0.747rem;
    line-height: 0.747rem;
    text-align:  center;
    background: #ff67b2;
    border-radius: 0.36rem;
    color:#fff;
    /*font-size: 0.3733rem;*/
  }

  .volume{
    margin-bottom: 0.427rem;
    width: 1.6rem;
    height: 0.747rem;
    line-height: 0.747rem;
    text-align: center;
    background: #ff67b2;
    border-radius: 0.36rem;
    /*font-size: 0.3733rem;*/
    color:#fff;
    display: inline-block;
  }

  .nextBuy{
    line-height: 1.173rem;
    text-align: center;
    background: #ff67b2;
    border-radius: 0.56rem;
    color: #fff;
    font-size: 0.3733rem;
    width: 4.48rem;
    height: 1.173rem;
    flex: 1;
  }
  .rule{
    margin-top: 0.4rem
  }
  .ruleWrap{
    margin-top: 0.4rem;
    color: #999
  }
  .nextBuyWrap{
    margin-top: 0.4rem;display: flex;flex: 1;
  }

  .opticy{
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0.3;
    background-color: #000;
  }

  .orderPacket{
    width:10rem;
    color:#b6b6b6;font-size: 0.34rem;padding: 0.46rem;background: #fff;
    position:absolute;
    bottom: 0;
    z-index: 999;
    overflow: auto;
    height: 11.5rem;
  }
  .close{
    width: 0.3733rem;
    height: 0.3733rem;
    position: absolute;
    right: 6%;
  }

  .orderPacketImg{
    width:3.0667rem;
    height:2.24rem;
  }

  .selectedHongbao{
    width: 0.5733rem;
    margin-top: 0.8rem;
    margin-left: 0.1rem;
  }

  .selectedHongbaoImg{
    background: url("./images/selectedHongbao.png") no-repeat;
    background-size: 0.5733rem 0.5733rem;
  }

  .cancelHongbaoImg{
    background: url("./images/cancelHongbao.png") no-repeat;
    background-size: 0.5733rem 0.5733rem;
  }

  .swiper-slide img{
    width: 100%;
    height: 100%;
  }
  .swiper-wrapper,  .swiper-wrapper img {
    height: 100%
  }
  .fixed {
    position: fixed!important;
  }

  .commodityHong{
    width: auto ;
    padding: .4rem;
    height: auto;
  }

  .infoHong{
    flex-direction: column;
    background-color: #fff;
    padding-left: .3733rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
  }
</style>

<script>
  import { mapState } from "vuex";
  import "common/css/detail.css";
  import imgPath from "../../common/api/imgConfig";
  import setSessionKey from "../../common/js/setSessionKey.js";
  import scroller from "../../components/public/scoller.vue";
  import { Toast } from "mint-ui";
  import utils from "../../common/js/utils";
	import Api from "../../common/api/api.js";

  export default {
    name: "detail",
    props: ["id", "user_id", "toTarget"],
    data() {
      return {
        inputdata: "5",
        no_data: false,
        imgPath,
        goodsTemp: [],
        goodImg: [],
        goodCaseImgs: [],
        kefUrl:"",
        showVideo: false,
        isSpecification:false,
        orderPacket:false,
        newCashPacketFlag:0,    //新人第一单现金红包是否选中
        cashPacketFlag:false,  //非新人第一单现金红包是否选中
        manJianPacketFlag:"",       //满减红包是否选中
        hongBaoNum:"",
        //discountPrice:-10,
        city:this.$router.currentRoute.query.city,
        cashPacketSelected:0, //所选现金红包的金额
        manJianPacketTatal:0, //所选满减红包的金额
        cashPacketTatal:0,  //现金红包总金额
        cashPacket:[],     //现金红包
        manJianPacket:[],     //满减红包
        manJianPacketCopy:[],
        cashPacketCopy:[],
        autoTime: 5000, // 播放时间
        totalIndex: 0,
        mySwiper: '',
				hospitalId:""
      };
    },
    filters: {
      hospitalType (id) {
        return utils.hospitalChange(id)
      },
      money (money) {
        if (money < 0) {
          return 0
        } else {
          return money
        }
      }
    },
    components: {
      scroller
    },
    beforeRouteLeave(to, from , next) {
      this.end()
      next()
    },
    methods: {
      init() {
        if(this.$route.query.city){ //用户选择了城市，则以用户选择为准
          this.city=this.$route.query.city
          if(this.$route.query.city.length>3){
            this.city=this.$route.query.city.slice(0,3)+"..."
          }
        }

        let self = this;
        this.$store.dispatch({
          type: "goodDetail",
          goodsId: this.id,
          city:self.city

        }).then(res => {
          this.hospitalId=res.data.hos_id;
          self.goodDetail.goods_url.forEach(element => {
            self.goodImg.push({
              src: element.src
            })
          });
          if (!!document.createElement('video').canPlayType) {
            self.goodDetail.goods_video_url_pic && self.goodDetail.goods_video_url && self.goodDetail.goods_url.push(self.goodDetail.goods_video_url_pic)
          }

          if(self.goodDetail.brand && self.goodDetail.brand.indexOf(">")>-1){
            self.goodDetail.brand=self.goodDetail.brand.replace(">","")
          }

          if(self.goodDetail.catName && self.goodDetail.catName.indexOf(">")>-1){
            let catNameList=self.goodDetail.catName.split(">")
            self.goodDetail.catName=catNameList[catNameList.length-1].trim()
          }

          // 按照类型把红包分为现金红包和满减红包
          if(!!self.goodDetail.redpacket){
            this.hongBaoNum=self.goodDetail.redpacket.length
            self.goodDetail.redpacket.forEach((item,i)=>{
              if(item.type==2){//满减红包
                self.manJianPacket.push(item)
                for(let i=0;i<self.manJianPacket.length;i++){// 排除不符合条件的满减红包,满减的条件大于预约金
                  if(self.manJianPacket[i].condition>self.goodDetail.appo_price){
                    self.manJianPacket.splice(i,1)
                    i--
                  }
                }
                self.manJianPacketCopy = self.manJianPacket.slice(0) //生成一个新的数组，相当于深拷贝self.manJianPacket
                self.manJianPacket.sort(utils.compare('amount'))  //剩下按红包金额，大到小排序
              }else if(item.type==1){//现金红包
                self.cashPacket.push(item)
                self.cashPacket.sort(utils.compare('amount'))  //按红包金额，大到小排序
                self.cashPacketCopy=self.cashPacket.slice(0)
              }
            })

            let isShow
            if(this.goodDetail.firstTag==1){//新人第一单商品不展示购物车
              isShow="0"
            }else{
              isShow="1"
            }

            this.showOrderPacket();

            this.setPocketNum(1000);

            this.initSwiper()
            try{
              wb_ShowShoppingcart(isShow)
            }catch(err) {
              console.log(err)
            }
          }

        });
        this.$store.dispatch({
          type: "goodCaseDetailInfo",
          goodsId: this.id
        }).then(res => {
          self.goodCaseDetailInfo.forEach(element => {
            let arryTemp = [{
              src: imgPath + element.before_url?element.before_url:element.before_video_pic
            }, {
              src: imgPath + element.after_url?element.after_url:element.after_video_pic
            }]
            self.goodCaseImgs.push(arryTemp);
          })
        })
        this.$store.dispatch({
          type: "getUserInfo",
        });

      },
      initSwiper () {
        setTimeout(() => {
          this.mySwiper = new Swiper('.swiper-container',{
            autoplay : true,
          })
          if(document.querySelector('.video-wrap')){
          	document.querySelector('.video-wrap').style.height = document.querySelector('.swiper-container').offsetHeight + 'px';
          }

        }, 1000)
      },
      gotoShopCart(){
        let baseUrl = window.location.href.slice(
          0,
          window.location.href.indexOf("shop.html")
        );
        window.location.href =
          baseUrl + "shop.html#/shoppingcart"+"/"+this.user_id
      },
			
      // 查看红包
      showOrderPacket(){
        if(this.goodDetail.redpacket && this.goodDetail.redpacket.length>0){
          let self=this


          if((!self.cashPacketSelected) && (!self.manJianPacketTatal)){ //只有第一次点击红包弹窗(没有选中任何红包才推荐最优方案)

            //选择最大的一个符合条件满减红包(能展示出来的满减红包，一定符合条件)
            this.manJianPacket.forEach((item,i)=>{
              if(i==0){
                if(self.manJianPacket[0].condition<=self.goodDetail.appo_price){ //所有的满减红包包都符合要求，则直接去最大的一个
                  self.manJianPacketFlag=0
                }
              }

              //如果不满足，那么说明第一个肯定不满足条件
              else{
                if(self.manJianPacket[i].condition<=self.goodDetail.appo_price && self.goodDetail.appo_price<self.manJianPacket[i-1].condition){
                  self.manJianPacketFlag=i;


                }
              }

              // 计算出默认推荐的满减红包金额
              if(self.manJianPacketFlag===i){
                self.manJianPacketTatal=this.manJianPacket[self.manJianPacketFlag].amount;
              }

            })

            // 预约金减去默认所选的满减红包(剩下的就选择现金红包)
            // this.leftPacketTatal=utils.formatPremium((self.goodDetail.appo_price-self.manJianPacket[0].amount),2)
            let leftPacket=utils.formatPremium((self.goodDetail.appo_price-self.manJianPacketTatal),2)

            if(leftPacket>0){
              self.cashPacket.forEach((item,i) =>{

                if(leftPacket<item.amount){ //所剩预约金比所有的现金红包都小,则不选现金红包
                  self.cashPacket[i].newCashPacketFlag=false
                  self.cashPacketFlag=-1
                }

                else{
                  if(self.goodDetail.firstTag && self.goodDetail.firstUserTag){//新人第一单可以选择多个现金红包

                    self.cashPacketTatal += self.cashPacket[i].amount  //0到i个现金红包的金额相加

                    if(self.cashPacketTatal<=leftPacket){  //如果所选现金红包小于预约金减去满减红包，则所有叠加的现金红包全部选中
                      self.cashPacket[i].newCashPacketFlag=true;

                    }

                    // 当现金红包叠加到地i个时，总和大于预约金减去满减红包，并且0到(i-1)的现金红包之和小于预约金减去满减，则0到(i-1)的现金红包全部选中
                    else{
                      if(i==self.cashPacket.length-1){
                        if(self.cashPacketTatal<=leftPacket){
                          self.cashPacket[i].newCashPacketFlag=true
                        }

                      }else{
                        if(self.cashPacketTatal+(self.cashPacket[i+1].amount)>leftPacket && leftPacket>=self.cashPacketTatal){
                          for(let j=0;j<i;j++){
                            self.cashPacket[j].newCashPacketFlag=true;

                          }
                        }
                      }

                    }

                    // 计算出新人第一单默认推荐的现金红包金额
                    if(self.cashPacket[i].newCashPacketFlag){
                      self.cashPacketSelected+=self.cashPacket[i].amount;
                    }

                  }

                  else{ //非新人第一单，只能选择一个现金红包，并且选择优惠最大红包，但不能超过所剩的预约金
                    if(i==0){
                      if(leftPacket>=self.cashPacket[0].amount){
                        self.cashPacketFlag=0;
                      }
                    }else{
                      if(self.cashPacket[i-1].amount>leftPacket && leftPacket>=self.cashPacket[i].amount){
                        self.cashPacketFlag=i;
                      }
                    }

                    // 计算出非新人第一单默认推荐的现金红包金额
                    if(self.cashPacketFlag===i){
                      self.cashPacketSelected=self.cashPacket[self.cashPacketFlag].amount;
                    }
                  }
                }

              })
            }

          }
        }

      },

      closeHongBaoTip(){
        this.orderPacket=false;
        this.setPocketNum(0)
      },
      setPocketNum (time) {
        setTimeout(() => {
          let arr1 = document.querySelectorAll('.selectedHongbaoImg').length
          this.totalIndex = arr1
        }, time)

      },
      isShowHidePacket(){
        let self=this
        let youhuiTotal=utils.formatPremium(self.manJianPacketTatal+self.cashPacketSelected)

        if(youhuiTotal>=self.goodDetail.appo_price){// 如果所选的红包金额大于预约金，则剩下的红包隐藏
          for(let i=0;i<self.manJianPacket.length;i++){
            if(self.manJianPacketFlag!==i){
              self.manJianPacket.splice(i,1)
              i--
            }
          }
          if (this.goodDetail.firstTag && this.goodDetail.firstUserTag) {
            for(let i=0;i<self.cashPacket.length;i++){
              if(!self.cashPacket[i].newCashPacketFlag){
                self.cashPacket.splice(i,1)
                i--

              }
            }
          } else {
            for(let i=0;i<self.cashPacket.length;i++){
              if(typeof(self.cashPacket[i].flag)!="number"){
                self.cashPacket.splice(i,1)
                i--
              }
            }
          }

        }

        else{//如果所选的红包金额小于预约金，则剩下的红包展示，则和初始化的时候展示的红包数量一样
          self.manJianPacket=self.manJianPacketCopy
          self.cashPacket=self.cashPacketCopy
        }
      },

      // 选择满减红包
      chooseManJianPacket(idx){
        let self=this
        if(this.manJianPacketFlag===idx){//所点击的满减红包已经选中
          this.manJianPacketTatal=utils.formatPremium(this.manJianPacketTatal-this.manJianPacket[idx].amount);
          this.manJianPacketFlag=-1
        } else{  //所点击的满减红包没有选中，则选中点击的红包，并且其它选中的红包取消
          this.manJianPacketFlag=idx
          self.manJianPacket[idx].flag=idx
          this.manJianPacketTatal=this.manJianPacket[this.manJianPacketFlag].amount;
        }
        self.isShowHidePacket()
      },
      // 选择现金红包
      chooseCashPacket(index){
        let self=this
        if(this.goodDetail.firstTag && this.goodDetail.firstUserTag){ //新人第一单

          if(self.cashPacket[index].newCashPacketFlag){//已经选中，再点击就取消选中和选中的金额
            self.cashPacketSelected=utils.formatPremium(self.cashPacketSelected-self.cashPacket[index].amount)
            let obj = self.cashPacket[index];
            obj.newCashPacketFlag=!obj.newCashPacketFlag;
            this.$set(this.cashPacket, index, obj)
          }
          else{
            self.cashPacketSelected=utils.formatPremium(self.cashPacketSelected+self.cashPacket[index].amount)
            let obj = self.cashPacket[index];
            obj.newCashPacketFlag=!obj.newCashPacketFlag;
            this.$set(this.cashPacket, index, obj)
          }
        }else{
          if(self.cashPacketFlag===index){//已经选中了，再点击就取消选中和选中的金额
            self.cashPacketSelected=(self.cashPacketSelected)-(self.cashPacket[self.cashPacketFlag].amount);
            self.cashPacketFlag=-1
          }else{
            self.cashPacketFlag=index
            self.cashPacket[index].flag=index
            self.cashPacketSelected=self.cashPacket[self.cashPacketFlag].amount;
            console.log(self.cashPacket)
          }
        }

        self.isShowHidePacket()
      },

      //在线咨询
      onlineService() {
				let params = {hospitalId:this.hospitalId};
        Api.getHospitalService(params)
				.then(res=>{
					if(res.status == '0'){
						let chatStr={
							"chatId"  : res.data.imUserId,
							"name"    : res.data.userName,
							"pic_url" : res.data.logoUrl
						}
						let chatInfo =JSON.stringify(chatStr);
						
						try{
							qz_gotoChatView(chatInfo)
						}catch(err) {
							console.log(err)
						}
						
					}else{
						Toast({
							message:  res.message,
							position: "middle",
							duration: 2000
						});
					}
				})
      },
			
			//加载更多
      loadMore() {
        var self = this;
        if(this.goodCaseDetailInfo.length >= this.goodCaseDetailInfoDataCount) {
          return this.$refs.scroller.isNoData();
        }
        this.$store
          .dispatch({
            type: "goodCaseDetailInfo",
            goodsId: this.id,
            append: true,
            pageNum: this.getGoodCaseDetailInfoParam.pageNum + 1
          })
          .then(function(res) {
            if(typeof self.$refs.scroller !== "undefined") {
              self.$refs.scroller.removeLoading();
            }
            self.goodCaseImgs = [];
            self.goodCaseDetailInfo.forEach(element => {
              let arryTemp = [{
              	src: imgPath + element.before_url?element.before_url:element.before_video_pic
              }, {
              	src: imgPath + element.after_url?element.after_url:element.after_video_pic
              }]
              self.goodCaseImgs.push(arryTemp);
            })
            if(res.data.length) {
              self.no_data = false;
            } else {
              !self.no_data ? self.$refs.scroller.isNoData() : null;
              // self.$store.commit({ type: "resetParam" });
            }
          });
      },
      // 播放
      play () {
        this.$refs.video[0].play();
        this.showVideo = true;
        this.mySwiper.autoplay.stop();
      },
      pause () {
        this.showVideo = false;
        this.$refs.video[0].pause();
        this.mySwiper.autoplay.start();
      },
      // 结束
      end() {
        this.showVideo = false;
        this.mySwiper.autoplay.start();
      },
      toShoppingCart() {
        let self = this;
        this.$store
          .dispatch({
            type: "addCart",
            user_id: this.user_id,
            goodsId: Number(this.id),
          })
          .then(function(res) {
            if(res.status == 0) {
              Toast({
                message: "已成功加入购物车",
                position: "middle",
                duration: 2000
              });
              // setTimeout(function() {
              //   self.$router.push("/shoppingcart/" + self.user_id);
              // }, 2000);
            } else {
              Toast({
                message: "加入购物车失败，请稍后重试。",
                position: "middle",
                duration: 2000
              });
            }
          });
      },
      payNow() {
        this.goodsTemp = [];
        let self = this;
        let goodtemp = {};
        goodtemp.id = this.goodDetail.id;
        goodtemp.nums = 1;
        self.goodsTemp.push(goodtemp);

        let envelopeOrder={}
        let redpacket=[]

        // 统计满最后提交的时候满减红包选了哪一个
        self.manJianPacket.forEach((item,i)=>{
          if(self.manJianPacketFlag===i){
            redpacket.push({id:item.id})
          }
        })

        //统计满最后提交的时候现金红包选了哪一个
        if(self.goodDetail.firstTag && self.goodDetail.firstUserTag){//新人第一单
          self.cashPacket.forEach((item,i)=>{
            if(item.newCashPacketFlag){
              redpacket.push({id:item.id})
            }
          })
        }else{
           self.cashPacket.forEach((item,i)=>{
            if(self.cashPacketFlag===i){
              redpacket.push({id:item.id})
            }
          })
        }
        envelopeOrder.redpacket=redpacket;

        localStorage.setItem("envelopeOrder",JSON.stringify(envelopeOrder));
        localStorage.setItem("discountPrice",JSON.stringify(self.discountPrice));
        var param = {
          user_id: this.user_id,
          standard:self.goodDetail.standard,
          brand:self.goodDetail.brand,
          // discountPrice:self.discountPrice,
          goods: JSON.stringify(self.goodsTemp)
        }
        console.log(param)

        self.$router.push({
          name: "confirmorder",
          query: {
            user_id: self.user_id,
            standard:self.goodDetail.standard,
            brand:self.goodDetail.brand,
            discountPrice:self.discountPrice,
            goods: JSON.stringify(self.goodsTemp)
          }
        });
      },
//			toAdvisory() {
//				let self = this;
//				utils.goToCustomer({
//					telphone: self.userInfo.telphone
//				})
//			},
      toActive(selector) {
        // console.log(event.currentTarget.parentNode.children)
        let liTemp = event.currentTarget.parentNode.children
        // console.log(liTemp.item[1])
        for(let i = 0; i < liTemp.length; i++) {
          liTemp[i].removeAttribute('class')
        }
        event.currentTarget.setAttribute('class', 'active');
        this.goAnchor(selector)
      },
      goAnchor(selector) {
        let anchor = this.$el.querySelector(selector)
        let scollerEl = this.$el.querySelector('.container')
        let headerHeight = this.$el.querySelector(".header").offsetHeight
        if(selector == '.container') {
          scollerEl.scrollTop = anchor.offsetTop;
        } else {
          scollerEl.scrollTop = anchor.offsetTop - headerHeight;
        }
//         document.documentElement.scrollTop = anchor.offsetTop; // firefox
//         window.pageYOffset=anchor.offsetTop;
      },
      //评价详情
      toDairyDetail(index) {
        let baseUrl = window.location.href.slice(0, window.location.href.indexOf('shop.html'))
        window.location.href = baseUrl + 'index.html#/dairyDetail/?case_main_id=' + this.goodCaseDetailInfo[index].id + '&user_id=' + this.user_id
      },
      //医院主页
      toDetail(hos_id){
      	let baseUrl = window.location.href.slice(0, window.location.href.indexOf('shop.html'))
        window.location.href = baseUrl + 'hosdetails.html#/hosdetails/?hospital_id=' + hos_id
      },
      
    },
    watch: {
      inputdata(value) {
        console.log(this.id);
        console.log(this.$route.params.id);
        console.log(value);
      },
      goodImg(value) {
        value.forEach(element => {
          let imgTemp = new Image();
          imgTemp.src = element.src;
          if(imgTemp.complete) {
            element.w = imgTemp.width;
            element.h = imgTemp.height;
          } else {
            imgTemp.onload = function() {
              element.w = this.width;
              element.h = this.height;
            };
          }
          imgTemp = null;
        })
      },
      goodCaseImgs(value) {
        value.forEach(element => {
          let imgTemp = new Image();
          imgTemp.src = element[1].src;
          if(imgTemp.complete) {
            element[1].w = imgTemp.width;
            element[1].h = imgTemp.height
          } else {
            imgTemp.onload = function() {
              element[1].w = this.width;
              element[1].h = this.height
            };
          }
          imgTemp = null;
          imgTemp = new Image();
          imgTemp.src = element[0].src;
          if(imgTemp.complete) {
            element[0].w = imgTemp.width;
            element[0].h = imgTemp.height;
          } else {
            imgTemp.onload = function() {
              element[0].w = this.width;
              element[0].h = this.height;
            };
          }
          imgTemp = null;
        })
      },

    },
    computed: {
      ...mapState({
        goodDetail: state => state.detail.goodDetail,
        userInfo: state => state.detail.userInfo,
        goodCaseDetailInfo: state => state.detail.goodCaseDetailInfo,
        goodCaseDetailInfoDataCount: state =>state.detail.goodCaseDetailInfoDataCount,
        getGoodCaseDetailInfoParam: state =>state.detail.getGoodCaseDetailInfoParam,
      }),

      discountPrice(){
        let self=this;
        let youhuiTotal=utils.formatPremium(this.manJianPacketTatal+this.cashPacketSelected)
        if(youhuiTotal>this.goodDetail.appo_price){
          return this.goodDetail.appo_price
        }

        else{
          return utils.formatPremium(this.manJianPacketTatal+this.cashPacketSelected)
        }

      }
    },

    created: function() {
      // this.request();
      let self = this;
      //   u = navigator.userAgent,
      //   isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('android') > -1, //android终端
      //   isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iOS') > -1; //ios终端
      // try {
      //   if(isAndroid) {
      //     gwc.show('1')
      //   } else if(isiOS) {
      //     window.webkit.messageHandlers.showShoppingcart.postMessage('1');
      //   }
      // } catch(err) {
      //   console.log(err)
      // }
      utils.setTitle("商品详情");
      this.init();
      if(!this.user_id) {
        this.user_id = JSON.parse(localStorage.getItem("personInfo")).id;
        if(this.user_id) {
          Toast({
            message: "请重新登录",
            position: "middle",
            duration: 2000
          });
        }
      }
    },
    mounted: function() {
      // console.log('...')
      let container = this.$el.querySelector(".container")
      let self = this;
      let header = self.$el.querySelector(".header")
      let info = self.$el.querySelector(".info")
			container.onscroll = function() {
				let scrollTop = container.scrollTop;
				header.style.opacity = scrollTop / info.offsetTop <= 1 ? scrollTop / info.offsetTop : 1;
			}
    },
    updated: function() {
      if(this.toTarget) {
        this.goAnchor('.comment')
      }
    }
  };
</script>
