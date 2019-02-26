<template>
  <!-- 医生证件 -->
  <div class="doctorCard doctorInfor" v-if="docotorCardList">
    <h1 class="doctorCardTitle">医生证件</h1>
    <ul class="doctorCardContent">
      <li class="doctorCard_photo" id="doctorCard_photo" v-for="(item,index) in docotorCardList">
        <img :src="(imgPath+item.src)" :style="'background: url('+imgPath + item.src+') no-repeat center;background-size:cover;'" alt="" class="preview-img" @click="expandImg(index,goodImg)">
      </li>
    </ul>
  </div>
</template>

<style type="text/css">
  .doctorCardTitle{
    color: #333333;
    font-size: 0.4rem
  }

  .doctorCardContent{
    padding-top: 0.3733rem;
    margin-top: 0.2933rem;
    border-bottom: 1px solid #f6f8fa;
    border-top: 1px solid #f6f8fa;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    align-items: center
  }

  .doctorCard_photo{
    width:9.2rem;
    height: 6.133rem;
    margin-bottom: 0.4rem
  }

  #doctorCard_photo img{
   width:9.2rem;
   height: 6.133rem; 
   border-radius: 0.4rem
  }

</style>
<script>
    import imgPath from "../../../common/api/imgConfig.js";
    export default {
      props: ["docotorMsg"],
      data(){
        return{
          docotorCardList:[],
          imgPath,
          goodImg:[]
        }
      },

      created(){
        let cardImgAll=[{"src":this.docotorMsg.zige},{"src":this.docotorMsg.congye},{"src":this.docotorMsg.zhuzhen}]
        let cardImg=[{"src":this.docotorMsg.zige},{"src":this.docotorMsg.congye}]
        if(this.docotorMsg.zhuzhen){
          this.docotorCardList=cardImgAll
        }else{
          this.docotorCardList=cardImg
        }
        this.docotorCardList.forEach(element => {
          this.goodImg.push({
            src: imgPath+element.src 
          })
        })

        try{
          wb_ShowShoppingcart("0")
        }catch(err) {
          console.log(err)
        }
      },

      methods:{
        expandImg(index,goodImg){
          this.$preview.open(index,goodImg)
          try{
            hideBackButton()
          }catch(err) {
            console.log(err)
          }
        }
        
      },

      watch:{
        goodImg(value){
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
      }
    }
</script>
