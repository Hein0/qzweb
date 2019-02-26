<template>
  <!-- 热门活动 -->
  <div>
    <div class="hotHead titleColor">热门活动</div>
    <ul class="hotActivity">
      <li style="width:50%;height: 48%" @click='toNext("FirstOrder")' onclick="_czc.push(['_trackEvent', 'app商城热门活动', '活动列表', '新人第一单']);">
        <img src="./../images/firstorder.png" alt="新人第一单" style="opacity: 1;width:4.71rem">
      </li>

      <li style="width:50%;height: 48%" @click='toNext("BaiFuMei")'  onclick="_czc.push(['_trackEvent', 'app商城热门活动', '活动列表', '白富美城堡']);">
        <img src="./../images/baiFuMei.png" alt="白富美城堡" style="opacity: 1;width:4.71rem">
      </li>

      <li style="margin-top: 0.3337rem;width:50%;height: 48%" @click='toNext("StarStyle")'  onclick="_czc.push(['_trackEvent', 'app商城热门活动', '活动列表', '明星同款']);">
        <img src="./../images/starStaly.png" alt="明星同款" style="opacity: 1;width:4.71rem">
      </li>

      <li style="margin-top: 0.3337rem;width:50%;height: 48%" @click='toNext("DoctorAndHospital")'  onclick="_czc.push(['_trackEvent', 'app商城热门活动', '活动列表', '名医名院']);">
          <img src="./../images/hospitalDoc.png" alt="名医名院" style="opacity: 1;width:4.71rem">
      </li>
    </ul> 
  </div>
</template>
<script>
  export default{
    props: ['cityName'],
    methods:{
      toNext(flag) {
        // this.$router.push({path:'./'+flag+'/', query: {city:this.cityName}})
        // let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
        // let data ={web_url:baseUrl+'shop.html#/'+flag+'/'+'?city='+encodeURI(this.city)};
        // let JsonObjStr =JSON.stringify(data);
        // try{
        //   openWebView(JsonObjStr)
        // } 
        // catch(err){
        //   window.location.href =baseUrl+'shop.html#/'+flag+'/'+'?city='+encodeURI(this.city);
        //  }
        let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
      
        window.location.href =baseUrl + "shop.html#/"+flag+"/"+"?city="+this.cityName;
      },
    }
  }
   
</script>

<style type="text/css">
    .titleColor{
      color: #444444
    }

    .hotActivity{
      padding: 0 .2667rem;
      overflow: hidden;
      padding-bottom: .5333rem;
      padding-top: .5333rem;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    }
    .hotHead {
      font-size: .4rem;
      margin-left: .4rem;
      font-weight: bolder;
  }
</style>
