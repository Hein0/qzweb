<template>
  <div id="shop">
      <div class="container">
          <div class="header">
            <div class="header_top">
                <div class="firstView">首页</div>
            </div>
          </div>

          <div class="content" style="padding-bottom: 0.2667rem">

            <div class="doctorInfo">
              <div class="doctorInfoWrap">

                <div class="appointCount">
                  <div class="count">预约数</div>
                  <div class="number">230</div>
                </div>

                <div class="doctorImg">
                  <div class="imgInfo"><img src="./images/doctor.png"></div>
                  <div class="renZhen" id="hasDetity">已认证</div>
                </div>

                <div class="consultCount">
                  <div class="count">粉丝数</div>
                  <div class="number">519</div>
                </div>
              </div>

              <div class="doctorTitleWrap">
                <p class="doctorTitle">颜小兰<span class="doctorName">主治医生</span></p>
                <p  class="doctorGoodAt doctorGoodAt_detail">擅长：<span>鼻部整形，鼻部整形，鼻部整形</span></p>
                <p class="doctorGoodAt">从业年限：<span>10年</span></p>
              </div>
            </div> 

            <div class="header_bottom">
              <div class="header_bottom_wrap">
                <div class="header_bottom_img">
                  <img src="./images/doctor.png" style="width: 100%">
                </div>

                <div>
                  <h4 class="hosName">韩国美莱整形医院</h4>
                  <p class="hosAnother">综合整形医院</p>
                </div>
              </div>

              <div class="addressCont">
                <span class="addressImg_wrap"><img src="./images/locationImg.png"></span>
                <span class="address">广东省深圳市福田区彩田路2015好新浩E都16楼</span>
              </div>
            </div>
          </div>

          <div class="doctorDetail" style="height: 100%">
            <ul>
              <li class="doctorItem">医生资料</li>
              <li class="doctorItem">医生证件</li>
              <li class="doctorItem">成功案例</li>
              <li class="doctorItem">推荐商品</li>
            </ul>
          </div>

          <!-- <compent></compent> -->

          <div class="footer" style="height: 1.6rem;display: flex;display: -webkit-flex;flex-direction: row;align-items: center;position: fixed;bottom: 0;">
            <div style="margin-left: 0.4rem;display: flex;flex-direction: column;align-items: center;margin-right: 0.4533rem;">
              <div class="focusDoctor"></div>
              <div style="margin-top: 0.24rem;color: #78869e;font-size: 0.14666">关注医生</div>
            </div>

            <div style="width: 6.8rem;height: 1.2rem;background:#1699ff;font-size: 0.48rem;color: #fff;border-radius: 0.6rem;text-align: center;    text-align: center;line-height: 1.2rem;">立即咨询</div>
          </div>

      </div>
  </div>
</template>

<style type="text/css">
  .header_top{
    background: #468be2;
    height: 4.3733rem;
    width:100%;
    overflow: hidden
  }

  .content{
    background: #f6f8fa;
    overflow:hidden;
  }

  .firstView{
    color: #fff;
    font-family: "宋体";
    font-size: 0.4rem;
    font-weight: normal;
    margin-top:0.58667rem;
    margin-left:8.8267rem;
    line-height:1.04rem;
    height: 1.04rem;
  }

  .doctorInfoWrap{
    padding-top: 0.5333rem;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
  }

  .doctorInfo{
    width: 9.4667rem;
    height: 4.3733rem;
    margin:0 auto;
    border-radius: 0.6rem;
    background: #ffffff;
    margin-top: -2.2133rem;
    box-shadow: 0 0.026rem #edf2f8;
    position: absolute;
    margin-left: 0.26665rem;
  }

  .appointCount{
    margin-left: 1.2533rem;
  }

  .count{
    color:#959aaa;
    font-size: 0.32rem;
    font-family: "宋体";
    margin-bottom:0.24rem;
  }

  .number{
    color: #35465f;
    font-size: 0.5067rem;
    font-family: "Arial";
  }

  .doctorImg{
    margin-left: 1.36rem;
    margin-right:1.36rem;
    margin-top: -1.413rem;
  }

  .imgInfo{
    width: 2.5067rem;
    height:2.5067rem;
    background: #c9e0ff;
    border-radius: 1.3rem;
    border: 0.08rem solid #fff;
  }

  .imgInfo img{
    width: 100%;
  }

  #hasDetity{
    top:28%;
    right: 42%
  }

  .doctorTitleWrap{
    width: 9.4667rem;
    height: 2.2933rem;
    background:url("./images/yinHao.png") no-repeat 50% 45%;
    background-size: 90%;
    margin-top: 0.48rem
  }

  .doctorTitle{
    color: #333333;
    font-size: 0.48rem;
    font-family: "[PingFang]";
    margin-left: 3.28rem;
  }

  .doctorName{
    font-family: "宋体";
    font-size:0.32rem;
    color: #999999;
    margin-left: 0.2133rem
  }

  .doctorGoodAt{
    color: #666;
    font-size: 0.3733rem;
    text-align: center;
  }

  .doctorGoodAt_detail{
    margin-bottom: 0.2667rem;
    margin-top: 0.4rem;
  }

 
  .header_bottom{
    height: 2.8rem;
    margin-top:2.48rem;
    flex-direction: row;
    padding-left: 0.4rem;
    padding-top: 0.4rem;
    background: #fff
  }

  .header_bottom_wrap{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.2933rem
  }

  .header_bottom_img{
    width:1.333rem;
    height: 1.333rem;
    border: 1px solid rgb(225, 226, 227);
    border-radius: 0.8rem;
    margin-right: 0.32rem
  }

  .hosName{
  color: #333;
  font-size: 0.42667rem;
  margin-bottom: 0.2133rem
  }

  .hosAnother{
    color: #999;
    font-size:0.32rem
  }

  .addressCont{
    background:url("./images/jianTouRight.png") no-repeat 94% 50%;;
    background-size: .15rem .3rem;
  }

  .addressImg_wrap{
   width: .26rem; 
   height: .36rem;

  }

  .addressImg_wrap img{
   width: .26rem; 
   height: .36rem;
  }

  .address{
    color: #999;
    font-size: 0.32rem;
    font-family: "宋体";
    margin-left:0.2133rem;
  }

  .doctorDetail{
    padding-top: 0.5333rem;padding-left: 0.4rem;
  }

  .doctorDetail ul{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
  }

  .doctorDetail ul li:first-child{
    margin-left:0
  }
  
  .doctorItem{
    color: #555555;
    font-size: 0.3733rem;
    border:1px solid #ecf0f4;
    border-radius: 0.4rem;
    padding: 0.16rem 0.24rem;
    margin-left: 0.32rem
  }

  .focusDoctor{
    width: 0.533rem;
    height: 0.533rem;
    background:url("./images/focus.png") no-repeat 100% 100%;
    background-size: 0.533rem 0.5333rem
  }
  

</style>
<script>
    import "common/css/doctordetail.css";
    export default {
        name: "doctordetail",
        data(){
            return{

            }
        }
    }
</script>
