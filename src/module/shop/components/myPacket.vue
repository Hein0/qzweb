<template>
  <body>
  <!-- 展示红包 -->
  <mt-swipe  :auto="0" id="myPacketWrap" :continuous='false' class="myPacketWrap" v-if="myRedpacketList.length>0">
    <h1 class="hotHead myPacket titleColor">我的红包</h1>
    
    <p class="instruction" style="color: #999;margin-left: 5.2rem;margin-left: 5.2rem;width: 2.4rem;height: 0.6rem;line-height: 0.6rem;" @click="packtetIntroduct" onclick="_czc.push(['_trackEvent', 'app商城红包使用规则', '打开红包使用规则层']);">使用说明</p>
   
    <mt-swipe-item v-for="(item,index) in myRedpacketRound" :key="index">
      <ul class="projects" @click="redPacket">
        <li class="myPacketProject" :key="index.id+index.type+index.amount+i+index.numberType" style="width: 3.04rem;position: relative;" v-for="(index,i) in item">
          <img src="../images/packet.png" alt="" style="width: 100%">
          <span style="color: #fff;position: absolute;top: 10%;right: initial;"><b style="font-size: 0.66rem;">{{index.amount}}</b><b>元</b></span>
          <span v-if="index.type==2" style=" position: absolute;bottom: 16%;right: initial;color: #fff;">满<b style="font-weight: normal;">{{index.condition}}</b>可用</span>
          <span v-if="index.type==1" style=" position: absolute;bottom: 16%;right: initial;color: #fff;">全品类可用</span>
          <span class="packetNum">{{index.num || 1}}个</span>
        </li>
      </ul> 
    </mt-swipe-item>  
  </mt-swipe>
</body>
</template>

<script>
  import chunk from "lodash/chunk";
  import scroller from "../../../components/public/scoller.vue";
  import Api from "../../../common/api/api.js";
  import { Toast } from "mint-ui";
  import utils from "../../../common/js/utils";
  export default{
    data(){
      return{
        bannerList:[],
        user_id:"",
        myRedpacketList:[],
        myRedpacketRound:[],

      }
    },
  
    created:function(){
      let userInfo = JSON.parse(localStorage.getItem("personInfo"));
      if (userInfo) {
        this.user_id = userInfo.user_id;
      }
      this.myRedpacket();
    },

    methods:{
      // 我的红包
      myRedpacket(){
        let self=this
        let params = {userId:this.user_id};
          Api.myRedpacket(params)
          .then(data=>{ 
            if(data.status == '0'){
              self.myRedpacketList=data.data
              self.myRedpacketList.sort(utils.compare('amount'))  //按红包金额,大到小排序
              //根据对象的属性值去重
              var result = [];
              var obj = {};
              var objNum=[]
              for(var i =0; i<self.myRedpacketList.length; i++){
                if(!(obj[self.myRedpacketList[i].type.toString()+self.myRedpacketList[i].condition.toString()+self.myRedpacketList[i].amount.toString()])){
                  self.myRedpacketList[i].num=1 //当前红包没有重复，则数量记为1
                  result.push(self.myRedpacketList[i]);
                  // 通过type,type,type拼接来作为红包的唯一标示
                  obj[self.myRedpacketList[i].type.toString()+self.myRedpacketList[i].condition.toString()+self.myRedpacketList[i].amount.toString()] = true;

                }else{//把和本次重复的对象个数加1
                  for(var j =0; j<result.length; j++){
                    if((self.myRedpacketList[i].type==result[j].type) && (self.myRedpacketList[i].condition==result[j].condition) && (self.myRedpacketList[i].amount==result[j].amount)){
                      result[j].num+=1
                    }
                  }
                }
              }

              self.myRedpacketList=result

              if(self.myRedpacketList.length<=3){//红包小于等于三个直接作为一组
                self.myRedpacketRound.push(self.myRedpacketList)
              }
              else{
                 let i;
                for(i=0;i<self.myRedpacketList.length;i+=3){
                  self.myRedpacketRound.push(self.myRedpacketList.slice(i,i+3))                
                }
              }
            }else{
              Toast({
                message: "系统错误，请稍后再试",
                position: "middle",
                duration: 2000
              });
            }
          })
      },
      
      packtetIntroduct(){
        // let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shop.html"));
        // let data ={web_url:baseUrl+'shop.html#/redPacketTips'};
        // let JsonObjStr =JSON.stringify(data);
        // try{
        //   openWebView(JsonObjStr)
        // } 
        // catch(err){
        //   this.$router.push({path:'/redPacketTips'})
        // }
        let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
      
        window.location.href =baseUrl + "shop.html#/redPacketTips"
        
      },
			
			redPacket(){
				let baseUrl = window.location.href.slice(0,window.location.href.indexOf("shopIndex.html"));
				
				window.location.href =baseUrl + "shop.html#/redPacket"
			}

    },

    components:{

      scroller
    }
  };


</script>
<style type="text/css" scoped>
  #shop #myPacketWrap{
    height: 4.0rem !important
  }

  .titleColor{
    color: #444444
  }

  .myPacketProject{
      float: left;
      display: -ms-flexbox;
      display: flex;
      background-color: #fff;
      -ms-flex-direction: column;
      flex-direction: column;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin-right: 0.1rem;
      cursor: pointer;
  }

  .packetNum{
    position: absolute;
    color:#ff7f97;
    left: 0%;
    top: 4%;
    -moz-transform: rotate(-40deg);
    -webkit-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    -o-transform: rotate(-40deg);
  }

  .instruction{
    background: url("../images/right.png") no-repeat 72% 44%;
    background-size: 0.22rem;
    display: inline-block;
  }
  .hotHead{
    display: inline-block;
  }
  
  .projects{
    padding-bottom: 0.5333rem !important;
    padding-top: 0.48rem !important;
		padding: 0 !important;
		margin-top: 0.48rem;
		margin-bottom: 0.533rem;
		margin-left: 0.4rem;
		flex-wrap: nowrap !important;
  }
  
    

</style>  
