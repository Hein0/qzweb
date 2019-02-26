 <template>

  <!-- 成功案例 -->
  <scroller v-on:load="loadMore" ref="scroller" v-if="!no_data" :auto-fill="false">
    <div class="successCase doctorInfor" v-if="successCaseList">
      <h1 class="successCaseTitle doctorCardTitle">成功案例</h1>

      <ul  class="successCaseContent">
        <li class="successCase_photo" id="successCase_photo" v-for="(item,index) in successCaseList"  @click="downimgclick(item.user_id,item.hospital_id,item.goods_key_word,index,item.id)">
          <img :src="(item.after_main_pic)" alt="">
          <div >{{item.goods_key_word}}</div>
        </li>
      </ul>
    </div>
  </scroller>
</template>

<style type="text/css">
  .successCaseContent{
    padding-top: 0.3733rem;
    margin-top: 0.2933rem;
    border-bottom: 1px solid #f6f8fa;
    border-top: 1px solid #f6f8fa;
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;
    column-gap: 1em;
    /*display: flex;
    flex-direction: row; 
    flex-wrap: wrap;
    justify-content:space-between;
    align-items: center;*/
  }

  .successCase_photo{
    margin-bottom: 0.4rem;
    /*width: 4.4476rem;*/
    border: 0.02rem solid #f6f8fa;
    border-radius: .21rem;
    /*height: 5.12rem;*/
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
  }

  #successCase_photo img{
    width:4.4267rem;
    /*height:4.3733rem; */
    border-radius: 0.21rem .21rem 0 0;
  }

  #successCase_photo div{
    line-height: 0.7467rem;
    text-align: center;
    color: #444;font-size: 0.3467rem
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
          pageSize:10,
					pageCount:2,
          doctor_id:"",
          user_id:"",
          successCaseList:[]
        }
      },

      //获取成功案例
      created(){
        let userInfo = JSON.parse(localStorage.getItem("personInfo"));
        if (userInfo) {
          this.user_id = userInfo.user_id;
        }
        if(this.$route.query.doctor_id){
          this.doctor_id=this.$route.query.doctor_id
        }
				
				let self=this
        let params = {user_id:this.user_id,doctor_id:this.doctor_id,pageNum:this.pageNum,pageSize:10};
          Api.successCase(params)
          .then(data=>{
            if(data.status == '0'){
              this.successCaseList=data.data
              this.successCaseList.forEach((item,i)=>{
                if(item.goods_key_word && item.goods_key_word.indexOf(">")>-1){
                  item.goods_key_word=item.goods_key_word.slice(0,item.goods_key_word.indexOf(">"))
                }
                if(!item.after_main_pic){
									self.successCaseList[i].after_main_pic=item.after_main_video_pic
                }
								
								if(item.after_main_pic.indexOf("http")>-1){//视频或者图片自带域名
									self.successCaseList[i].after_main_pic=item.after_main_pic
								}else{
									self.successCaseList[i].after_main_pic=imgPath+item.after_main_pic
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
				// 查看案例
        downimgclick(user_id,hospital_id,goods_key_word,index,id) {
          let pageIndex = index + 1;
          let parms = {
            pageIndex,
            user_id,
            id,
						doctor_id: this.doctor_id,
            hospital_id,
            goods_key_word,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            down: 0,
            type: "5"
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
          let params = {user_id:this.user_id,doctor_id:this.doctor_id,pageNum:this.pageCount,pageSize:10};
          Api.successCase(params)
            .then(data=>{
              if(data.status == '0'){
                if(data.data.length){
                  this.pageCount++
									this.pageNum++
                  this.successCaseList=this.successCaseList.concat(data.data)
                  this.successCaseList.forEach((item,i)=>{
                    if(item.goods_key_word && item.goods_key_word.indexOf(">")>-1){
                      item.goods_key_word=item.goods_key_word.slice(0,item.goods_key_word.indexOf(">"))
                    }
                      
                    if(!item.after_main_pic){
                    	self.successCaseList[i].after_main_pic=item.after_main_video_pic
                    }
                    
                    if(item.after_main_pic.indexOf("http")>-1){//视频或者图片自带域名
                    	self.successCaseList[i].after_main_pic=item.after_main_pic
                    }else{
                    	self.successCaseList[i].after_main_pic=imgPath+item.after_main_pic
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
