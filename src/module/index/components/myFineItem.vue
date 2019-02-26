<template>
  <div class="myFineItem">
    <div class="header">
      <img :src="item.logo | imgFullUrl" alt="头像">
      <span>V1.12</span>
    </div>
    <div class="headerText">
      <div class="headerName">
        <div class="headerTextInfo">
          <h2>{{item.name}}</h2>
          <p class="dateTime">
            <!--<span>2017-12-05</span>-->
            <span>共2篇日记</span>
          </p>
        </div>
        <div class="shanchu">
          删除
        </div>
      </div>
      <div class="userdProduct">
        <span>超立体嘟嘟唇</span>
        <span>微双眼皮</span>
        <span>韩式玻璃尿</span>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
      props:["fItem"],
        data(){
            return {
              headImg:require('../images/header-other.png')
            }
        },
        methods: {}
    }
</script>
