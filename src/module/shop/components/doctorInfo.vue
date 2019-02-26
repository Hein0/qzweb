<template>
  <!-- 医生资料 -->
  <div class="doctorInfor" v-if="docotorMsg">
    <h1 class="doctorInforTitle">医生简介</h1>
    <p  class="doctorInforContent">{{docotorMsg.introduce}}</p> 
    <h1 class="doctorInforImg">医生相册</h1>
    <ul class="doctorInforWrap">
      <li class="doctor_photo" id="doctor_photo" v-for="(item,index) in doctorPicList" :key="item+index">
        <img :src="(imgPath+item)" class="preview-img" alt="" @click="$preview.open(index,goodImg)">
      </li>
    </ul>
  </div>

</template>

<style type="text/css">
  .doctorInfor{
    padding-top: 0.4rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem

  }

  .doctorInforTitle{
   color: #333333;
   font-size: 0.4rem;
   padding-bottom: 0.3467rem;
   border-bottom: 1px solid #f6f8fa;
  }

  .doctorInforContent{
    padding-top: 0.3733rem;
    padding-bottom: 0.667rem;
    color: #666666;
    font-size: 0.3467rem;
    line-height: 0.48rem
  }

  .doctorInforImg{
    color: #333333;
    font-size: 0.4rem
  }

  .doctorInforWrap{
    padding-top: 0.3733rem;
    margin-top: 0.2933rem;
    border-bottom: 1px solid #f6f8fa;
    border-top: 1px solid #f6f8fa;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:space-between
  }

  .doctor_photo{
    width: 2.667rem;
    height: 2.667rem;
    margin-bottom: 0.4rem
  }

  #doctor_photo img{
    width: 2.667rem;
    height: 2.667rem;    
    border-radius: 0.4rem
  }
</style>
<script>
  import imgPath from "../../../common/api/imgConfig.js";
  export default {
    props: ["docotorMsg"],
    data(){
      return{
        imgPath,
        doctorPicList:[],
        goodImg:[]
      }
    },

    created(){
      this.doctorPicList=this.docotorMsg.doctorPics

      if(this.doctorPicList){
        this.doctorPicList.forEach(element => {
          this.goodImg.push({
            src:imgPath+element
          })
        })
      }
      
      try{
        wb_ShowShoppingcart("0")
      }catch(err) {
        console.log(err)
      }
    },

    //获取医生资料
    watch:{
      docotorMsg(){
        let self=this
        this.doctorPicList=this.docotorMsg.doctorPics
        this.doctorPicList.forEach(element => {
          self.goodImg.push({
            src:imgPath+element
          })
        })
      },

      goodImg(value){
        value.forEach(element => {
          let imgTemp = new Image();
          imgTemp.src= element.src
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
    },
  }
</script>
