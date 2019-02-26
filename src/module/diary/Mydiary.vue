<template>
  <div id="Mydiary">
      <div class="container">
        <ul class="BuyList">
            <li class="commodity" v-for="(item,index) in MyLogList">
                <div class="header">
                    <span class="name">{{item.addTime}}</span>
                    <span class="edit"><img src="./images/zhangkai_tb_@2.png" alt=""></span>
                </div>
                <div class="bottom">
                    <div class="imgs"><img src="./images/my_01.png" alt=""></div>
                    <div class="commodityInfo">
                        <h4>{{item.project}}</h4>
                        <span class="specification" v-for="tip in item.evaluate_label">{{tip}}</span>
                    </div>
                    <div class="purchaseInfo">
                       <mt-button class="butt" size="small" @click="toContinue(index)">续写</mt-button>
                        <span class="number"></span>
                    </div>
                </div>
            </li>
        </ul>
      </div>
      <div class="footer">  
           <router-link to="/createDiary">
              <mt-button class="newDiary" @click.prevent="toCreate">创建新日记</mt-button>
          </router-link>
      </div>
  </div>
</template>
<script>
import "common/css/Mydiary.css";
import { mapState } from "vuex";
import imgPath from "../../common/api/imgConfig";
import utils from "../../common/js/utils";
import { Toast } from "mint-ui";
export default {
  name: "Mydiary",
  props: ["user_id"],
  data() {
    return {
      imgPath
    };
  },
  components: {},
  methods: {
    init() {
      this.$store.dispatch({
        type: "MyLogList",
        // user_id: this.user_id,
        //   token:JSON.parse(localStorage.getItem("personInfo")).token
        
      })
      .then(res=>{
        if(res.data.length==0){
          Toast({
            message: "您还未创建日记哦，赶紧创建吧。",
            position: "middle",
            duration: 3000
          });
        }
      })
    },
    toContinue(index) { 
      // console.log( this.MyLogList[index].addTime)
      this.$router.push({
        name: "Continue",
        query: {
          user_id: this.user_id,
          addTime: this.MyLogList[index].addTime.slice(0,10),
          project: this.MyLogList[index].project,
          id: this.MyLogList[index].id
        }
      });
    },
    toCreate(e) {
      
      this.$router.push({
        name: "createDiary",
        query: {
          user_id: this.user_id
        }
      });
    }
  },
  computed: {
    ...mapState({
      MyLogList: state => state.Mydiary.MyLogList
    })
  },
  created() {
    utils.setTitle("我的日记");
    this.init();
  }
};
</script>