<template>
  <div id="Logwriter">
      <div class="container">
         <div class="form">  
            <ul class="BuyList">         
                <li class="commodity">
                    <div class="header discount" @click="openPicker">
                        <span class="discount-text">时间</span>
                        <span class="time" >{{mytime}}</span>
                    </div>
                    <div class="bottom">
                        <div class="commodityInfo">
                            <span class="title">关键词</span>
                            <span class="keywords" v-if="goods_key_word">{{goods_key_word}}</span>
                            <span class="keywords">{{project}}</span>
                            <i v-on:click="toggle()"></i>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="!isShow">
                <div class="comment"> 
                <div class="commentHead">
                    <span>评分</span>
                    <span class="all">
                    <input type="radio" name="scoreNum" value="0" v-model="inputdata" /><span>★</span>
                    <input type="radio" name="scoreNum" value="1" id="star1" v-model="inputdata" @change="Checked" @click="cancelChecked"/><span for="star1">★</span>
                    <input type="radio" name="scoreNum" value="2" id="star2" v-model="inputdata" @change="Checked" @click="cancelChecked"/><span for="star2">★</span>
                    <input type="radio" name="scoreNum" value="3" id="star3" v-model="inputdata" @change="Checked" @click="cancelChecked"/><span for="star3">★</span>
                    <input type="radio" name="scoreNum" value="4" id="star4" v-model="inputdata" @change="Checked" @click="cancelChecked"/><span for="star4">★</span>
                    <input type="radio" name="scoreNum" value="5" id="star5" v-model="inputdata" @change="Checked" @click="cancelChecked"/><span for="star5">★</span>
                    </span>
                </div>
                </div>     
                <div class="preoperative">
                    <div class="picture">添加照片<span>(术前照片)</span></div>
                    <div class="imgList">
                        <div class="fileInputContainer">
                            <input v-if="!before_mainShow" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="before_mainUpdate"/>
                            <input v-if="before_mainShow" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="before_mainUpdate" style="z-index:1"/>
                            <img :src="imgPath+before_main" alt="" v-if="before_mainShow">
                            <span>封面</span>
                            <!-- <i class="deleteImg" v-if="before_mainShow">X</i> -->
                        </div>
                        <div class="fileInputContainer" v-if="before_twoUp">
                            <input v-if="before_twoUp" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="before_twoUpdate" style="z-index:1"/>
                            <img :src="imgPath+before_two" alt="" v-if="before_twoShow">
                            <!-- <i class="deleteImg" v-if="before_twoShow">X</i> -->
                        </div>
                        <div class="fileInputContainer" v-if="before_threeUp">
                            <input v-if="before_threeUp" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="before_threeUpdate" style="z-index:1"/>
                            <img :src="imgPath+before_three" alt="" v-if="before_threeShow">
                            <!-- <i class="deleteImg" v-if="before_threeShow">X</i> -->
                        </div>
                    </div>
                    
                </div>
                <div class="preoperative">
                    <div class="picture">添加照片<span>(术后照片)</span></div>
                    <div class="afterImgList">
                        <div class="fileInputContainer" v-for="(item,index) in after_pics" :key="index">
                          <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="ChangeAfter_picsUpdate(index,$event)" style="z-index:1"/>
                          <img :src="imgPath+item" alt="">
                        </div>
                        <div class="fileInputContainer" v-if="ableUpAfter_pics">
                            <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="after_picsUpdate"/>
                        </div>
                    </div>
                </div>
                <textarea style= "overflow:hidden; resize:none;outline:none;"  class="box" type="text" v-model="content" @focus="fisrtWrite"/>
                <mt-button  type="danger" class="Next" @click="danger">发表日记</mt-button>
            </div>
            <div v-if="isShow" class="keyWord">
                <div class="keyWords">
                    <ul><li v-for="(item,index) in allCategory" @click="select1(index,$event)">{{item.name}}</li></ul>
                    <ul v-if="allCategory_1" class="keyword2"><li v-for="(item,index) in allCategory_1List" @click="select2(index,$event)">{{item.name}}</li></ul>
                    <ul v-if="allCategory_2" class="keyword3"><li v-for="(item,index) in allCategory_2List" @click="select3(index,$event)">{{item.name}}</li></ul>
                </div>
            </div>
            <div class="Confirm" v-if="isShow">
               <mt-button class="newDiary" @click="toggle()">确定</mt-button>
            </div>
        </div>  
      </div> 
      <mt-datetime-picker
          ref="picker"
          type="date"
          @confirm="handleConfirm" 
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          v-model="pickerValue">
       </mt-datetime-picker>
  </div>
</template>
<script>
import "common/css/Logwriter.css";
import axios from "axios";
import { Toast } from "mint-ui";
import { mapState } from "vuex";
import imgPath from "../../common/api/imgConfig";
import baseUrl from "../../common/api/config";
import utils from "../../common/js/utils";
import { Indicator } from "mint-ui";
export default {
  name: "Logwriter",
  data() {
    return {
      inputdata: "0",
      pickerValue: new Date(),
      mytime: "",
      isShow: false,
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
      imgPath,
      addTime: this.$route.query.addTime,
      user_id: this.$route.query.user_id,
      order_sn: this.$route.query.order_sn,
      goods_key_word: this.$route.query.goods_key_word,
      projectId: this.$route.query.project,
      axios,
      before_mainShow: false,
      before_twoUp: false,
      before_two: "",
      before_twoShow: false,
      before_threeUp: false,
      before_three: "",
      before_threeShow: false,
      before_main: "",
      after_pics: [],
      content: "写日记分享变美经历，还有机会获得日记奖励哦！",
      fisrt: true,
      baseUrl,
      allCategory_1: false,
      allCategory_1List: [],
      allCategory_2List: [],
      allCategory_2: false,
      project: "",
      config: {
        width: 828,
        // height: 1104,
        quality: 0.8
      },
      imgs: [],
      imgTemp: "",
      imgTempShow: false,
      ableUpAfter_pics: true,
      scoreNumFirst: ""
    };
  },
  methods: {
    select1(index, event) {
      var el = event.currentTarget;
      el.parentElement.childNodes.forEach(element => {
        element.setAttribute("class", "");
      });
      el.className = "active";
      this.allCategory_1List = this.allCategory[index].hdGoodsCategory;
      this.project = this.allCategory[index].name;
      this.allCategory_1 = true;
    },
    select2(index, event) {
      var el = event.currentTarget;
      el.parentElement.childNodes.forEach(element => {
        element.setAttribute("class", "");
      });
      el.className = "active";
      this.allCategory_2List = this.allCategory_1List[index].hdGoodsCategory;
      this.project = this.allCategory_1List[index].name;
      this.allCategory_2 = true;
    },
    select3(index, event) {
      var el = event.currentTarget;
      el.parentElement.childNodes.forEach(element => {
        element.setAttribute("class", "");
      });
      el.className = "active";
      this.project = this.allCategory_2List[index].name;
    },
    init() {
      this.$store.dispatch({
        type: "AllCategory"
      });
    },
    toggle: function() {
      this.isShow = !this.isShow;
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm() {
      const y = this.pickerValue.getFullYear();
      let m = this.pickerValue.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = this.pickerValue.getDate();
      d = d < 10 ? "0" + d : d;
      this.mytime = y + "-" + m + "-" + d;
    },
    danger: function() {
      if (this.inputdata == "0") {
        this.inputdata = "5";
      }
      if (!this.before_main) {
        Toast({
          message: "请至少上传一张术前照片",
          position: "middle",
          duration: 2000
        });
        return;
      }
      if (this.after_pics.length == 0) {
        Toast({
          message: "请至少上传一张术后照片",
          position: "middle",
          duration: 2000
        });
        return;
      }
      if (!(this.content.length >= 11 || this.content.length == 0)) {
        Toast({
          message: "输入文字必须超过10个字，提交失败",
          position: "middle",
          duration: 2000
        });
        return;
      }
      this.$store
        .dispatch({
          type: "insertCaseOrLogParam",
          addTime: this.mytime,
          project: this.projectId,
          user_id: this.user_id,
          content: this.content,
          before_main: this.before_main,
          before_two: this.before_two,
          before_three: this.before_three,
          case_main_id: 0,
          after_pics: this.after_pics,
          scoreNum: this.inputdata,
          goods_key_word: this.goods_key_word,
          
          user_key_word: this.project,
          order_sn: this.order_sn,
        })
        .then(res => {
          let self = this;
          if (res.status == 0) {
            Toast({
              message: "新增日志成功！",
              position: "middle",
              duration: 2000
            });
            setTimeout(function() {
              self.$router.push("/Mydiary/" + self.user_id);
            }, 2000);
          } else {
            Toast({
              message: res.message,
              position: "middle",
              duration: 2000
            });
          }
        });
    },
    update(e, callback) {
      let self = this;
      let file = e.target.files[0];
      let type = file.type; //文件的类型，判断是否是图片
      // let size = file.size; //文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) == -1) {
        Toast({
          message: "请选择正确的图片格式！",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      Indicator.open({
        text: "上传中...",
        spinnerType: "fading-circle"
      });
      // if (size > 10485760) {
      //   Toast({
      //     message: "请选择10M以内的图片！",
      //     position: "middle",
      //     duration: 2000
      //   });
      //   return false;
      // }
      // console.log(file);
      lrz(file, self.config)
        .then(function(rst) {
          self.imgs.push(rst.base64);
          let param = new FormData(); //创建form对象
          // console.log(file.name);
          self.imgTemp = self.imgs[0];
          var arr = self.imgTemp.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var obj = new Blob([u8arr], { type: mime });
          param.append("file", obj, file.name); //通过append向form对象添加数据
          param.append("chunk", "0"); //添加form表单中其他数据
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          }; //添加请求头
          self.axios
            .post(baseUrl + "/case/upload.do", param, config)
            .then(response => {
              self.imgs = [];
              self.imgTemp = "";
              callback(response.data);
              Indicator.close();
            });
          // .catch(error => {
          //   Indicator.close();
          //   Toast({
          //     message: "上传图片出错！",
          //     position: "middle",
          //     duration: 2000
          //   });
          // });
        })
        .catch(function(err) {
          console.log(err);
          Indicator.close();
          alert("压缩失败");
        })
        .always(function() {
          // 清空文件上传控件的值
          e.target.value = null;
        });
      e.target.value = null;
    },
    before_mainUpdate(e) {
      let self = this;
      let callback = function(response) {
        if (response.status != 0) {
          Toast({
            message: response.message,
            position: "middle",
            duration: 2000
          });
        } else {
          self.before_main = response.data;
          if (!self.before_mainShow) {
            self.before_mainShow = !self.before_mainShow;
            self.before_twoUp = !self.before_twoUp;
          }
        }
      };
      this.update(e, callback);
    },
    after_picsUpdate(e) {
      let self = this;
      let callback = function(response) {
        if (response.status != 0) {
          Toast({
            message: response.message,
            position: "middle",
            duration: 2000
          });
        } else {
          self.after_pics.push(response.data);
        }
      };
      this.update(e, callback);
    },
    ChangeAfter_picsUpdate(index, $event) {
      let self = this;
      let callback = function(response) {
        if (response.status != 0) {
          Toast({
            message: response.message,
            position: "middle",
            duration: 2000
          });
        } else {
          self.after_pics[index] = response.data;
          let imgDomParent = $event.target.parentNode;
          imgDomParent.removeChild($event.target.parentNode.lastChild);
          let imgTempDom = document.createElement("img");
          imgTempDom.src = imgPath + response.data;
          imgDomParent.appendChild(imgTempDom);
        }
      };
      this.update($event, callback);
    },
    before_twoUpdate(e) {
      let self = this;
      let callback = function(response) {
        if (response.status != 0) {
          Toast({
            message: response.message,
            position: "middle",
            duration: 2000
          });
        } else {
          self.before_two = response.data;
          if (!self.before_twoShow) {
            self.before_twoShow = !self.before_twoShow;
            self.before_threeUp = !self.before_threeUp;
          }
        }
      };
      this.update(e, callback);
    },
    before_threeUpdate(e) {
      let self = this;
      let callback = function(response) {
        if (response.status != 0) {
          Toast({
            message: response.message,
            position: "middle",
            duration: 2000
          });
        } else {
          self.before_three = response.data;
          if (!self.before_threeShow) {
            self.before_threeShow = !self.before_threeShow;
          }
        }
      };
      this.update(e, callback);
    },
    fisrtWrite() {
      if (this.fisrt) {
        this.content = "";
        this.fisrt = false;
      } else {
        return;
      }
    },
    Checked() {},
    cancelChecked(e) {
      // console.log('...')
      if (this.scoreNumFirst == e.target.value) {
        this.inputdata = "0";
        this.scoreNumFirst = "";
      } else {
        this.scoreNumFirst = e.target.value;
      }
    }
  },
  computed: {
    ...mapState({
      allCategory: state => state.Mydiary.AllCategory
    })
    // inputdata: {
    //   get:function(){
    //     return this.inputdataF
    //   },
    //   set:function(value=0){
    //     return this.inputdataF=value;
    //   }
    // }
  },
  watch: {
    inputdata(value) {},
    after_pics() {
      if (this.after_pics.length >= 7) {
        this.ableUpAfter_pics = !this.after_pics;
      }
    }
  },
  created: function() {
    utils.setTitle("日记历程");
    this.init();
    let tempDate = new Date();
    if (this.addTime) {
      let temp = this.addTime.split("-");
      tempDate = new Date(temp[0], temp[1] - 1, temp[2]);
    }
    const y = tempDate.getFullYear();
    let m = tempDate.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = tempDate.getDate();
    d = d < 10 ? "0" + d : d;
    this.mytime = y + "-" + m + "-" + d;
  }
};
</script>
