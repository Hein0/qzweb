 <template>
  <!-- 真实案例 -->
  <scroller v-on:load="loadMore" ref="scroller" v-if="!no_data" :auto-fill="false">
    <div class="doctorInfor" v-if="realCaseList">
      <ul  class="caseContent">
        <li class="case_photo" id="case_photo" v-for="(item,index) in realCaseList"  @click="downimgclick(item.user_id,item.hospital_id,item.goods_key_word,index,realCaseList[0].id)">
          <img :src="(item.after_main_pic)" alt="">
          <div >{{item.goods_key_word}}</div>
        </li>
      </ul>
    </div>
  </scroller>
</template>

<style type="text/css">
	.doctorInfor {
    padding-top: .4rem;
    padding-left: .4rem;
    padding-right: .4rem;
	}
	
  .caseContent{
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;
    column-gap: 1em;
  }

  .case_photo{
    margin-bottom: 0.4rem;
    /*width: 4.4476rem;*/
    border: 0.02rem solid #fff;
    border-radius: .21rem;
    /*height: 5.12rem;*/
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
		background: #fff;
  }

  #case_photo img{
    width:4.4267rem;
    /*height:4.3733rem; */
    border-radius: 0.21rem .21rem 0 0;
  }

  #case_photo div{
    line-height: 0.7467rem;
    text-align: center;
    color: #444;font-size: 0.3467rem;
  }


</style>
<script>
  import scroller from "../../../components/public/scoller.vue";
  import imgPath from "../../../common/api/imgConfig.js";
  import Api from "../../../common/api/api.js";
  import { Toast } from "mint-ui";

  export default {
      data(){
        return{
          imgPath,
          pageNum:1,
					pageCount:2,
          pageSize:10,
          goods_key_word:"",
          realCaseList:[]
        }
      },

      //获取成功案例
      created(){
        let userInfo = JSON.parse(localStorage.getItem("personInfo"));
        if (userInfo) {
          this.user_id = userInfo.user_id;
        }
				
        if(this.$route.query.goods_key_word){
          this.goods_key_word=this.$route.query.goods_key_word
        }
				let self=this
        let params = {goods_key_word:this.goods_key_word,pageNum:this.pageNum,pageSize:10};
          Api.case(params)
          .then(data=>{
            if(data.status == '0'){
              this.realCaseList=data.data
              this.realCaseList.forEach((item,i)=>{
                if(item.goods_key_word && item.goods_key_word.indexOf(">")>-1){
                  item.goods_key_word=item.goods_key_word.slice(0,item.goods_key_word.indexOf(">"))
                }
                if(!item.after_main_pic && item.after_main_video_pic){
                  self.realCaseList[i].after_main_pic=item.after_main_video_pic
                }
								
								if(item.after_main_pic.indexOf("http")>-1){//视频或者图片自带域名
									self.realCaseList[i].after_main_pic=item.after_main_pic
								}else{
									self.realCaseList[i].after_main_pic=imgPath+item.after_main_pic
								}
              })
            }else{
              Toast({
                message: "系统错误，请稍后再试",
                position: "middle",
                duration: 2000
              });
            }

            try{
              wb_ShowShoppingcart("0")
            }catch(err) {
              console.log(err)
            }
          })
      },

      methods:{
       downimgclick(user_id,hospital_id,goods_key_word,index,id) {
       	let pageIndex = index + 1;
       	let parms = {
       		pageIndex,
       		user_id,
       		id,
       		hospital_id,
       		goods_key_word,
       		pageNum: this.pageNum,
       		pageSize: this.pageSize,
       		down: 0,
       		type: "3"
       	};
       	let jsonData = JSON.stringify(parms);
       	
       	try {
       		wb_OpenCaseWind(jsonData)
       	} catch (err) {
       		console.log(err)
       	}
       },

        loadMore(){
          let self=this
          let params = {goods_key_word:this.goods_key_word,pageNum:this.pageCount,pageSize:10};
          Api.case(params)
            .then(data=>{
              if(data.status == '0'){
                if(data.data.length){
									this.pageCount++
                  this.pageNum++
                  this.realCaseList=this.realCaseList.concat(data.data)
                  this.realCaseList.forEach((item,i)=>{
                    if(item.goods_key_word && item.goods_key_word.indexOf(">")>-1){
                      item.goods_key_word=item.goods_key_word.slice(0,item.goods_key_word.indexOf(">"))
                    }
                      
                    if(!item.after_main_pic){
                    	self.realCaseList[i].after_main_pic=item.after_main_video_pic
                    }
                    
                    if(item.after_main_pic.indexOf("http")>-1){//视频或者图片自带域名
                    	self.realCaseList[i].after_main_pic=item.after_main_pic
                    }else{
                    	self.realCaseList[i].after_main_pic=imgPath+item.after_main_pic
                    }
                  })
                }
                else{
                  Toast({
                    message: "已加载完毕",
                    position: "middle",
                    duration: 2000
                  });
                }
                if (typeof self.$refs.scroller !== "undefined") {
                  self.$refs.scroller.removeLoading();
                }
                
              }else{
                Toast({
                  message: "系统错误，请稍后再试",
                  position: "middle",
                  duration: 2000
                });
              }
            })
        }
      },

      components: {
        scroller
      },
    
    }
</script>
