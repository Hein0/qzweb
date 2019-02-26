<template>
  <div>
     <!-- 遮罩层 -->
      <div id="opticy" style="z-index: 999999"></div>

      <div class="tanChuangInstruction" style="z-index: 9999999">
        <!-- <img src="./images/close.png" style="width:0.55rem; margin-left: 6.4rem;" @click="$router.back(-1)"> -->
        <h2 class="sizeTittle">红包规则：</h2>
        <p class="size">1.使用预约金红包抵扣的金额最大不可超过预约金全额（即在平台支付的金额）。</p>
        <p class="size">2.红包不设找零，若红包大于预约金应付金额时，差额不予退回。</p>
        <p class="size">3.新人第一单中，每个商品不限现金红包的使用个数，满减红包只能使用一个。</p>
        <p class="size">4.非新人第一单中的商品，现金红包每个商品限用一个，满减红包每个商品限用一个。</p>
        <p class="size">5.红包按照注明的使用范围使用，仅限满足条件的品类、专场或特定产品使用。</p>
        <p class="size">6.红包如有注明有效期，则必须在红包有效期内才可使用。</p>
        <p class="size">7.订单提交成功后若发生退款，只退还实际支付金额，红包金额不予退还。</p>
        <p class="size">*活动解释权归仟姿所有</p>
        
      </div>
  </div>
</template>

<style type="text/css">
	.tanChuangInstruction{
	  /*background-image:url("./images/close.png");
	  background-position: 96% 3%;
	  background-repeat: no-repeat;
	  background-size: 0.55rem;*/
	  position: absolute;
	  bottom: 0;
	  background-color: #fff;
	  padding:0.3rem;
	  width: 7.5rem;
	  height: 13.5rem;
	  left: 0;
	  top:0;
	  right:0;
	  margin:auto;
	}

  .size{
    font-size: 0.3rem;
    margin-bottom: 0.3rem;
    line-height: 0.66rem;
  }
  .sizeTittle{
    margin-bottom: 0.3rem;
    margin-top: 0.3rem;
  }
</style>

