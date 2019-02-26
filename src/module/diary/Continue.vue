<template>
  <div id="Continue">
    <div class="container">
      <ul class="BuyList">
        <li class="commodity">
          <div class="header discount">
            <span class="discount-text">手术天数</span>
            <span class="time">
                    <span v-show="showText" class="show-text">第</span>
                    <input type="number" v-model="oper_after_day" :placeholder="placeholder" @focus="focus" :class="{'show-text': showText}">
                    <span v-show="showText" class="show-text">天</span>
            </span>
          </div>
        </li>
      </ul>
      <div class="preoperative">
        <div class="picture">添加照片<span>(术后照片或视频)</span></div>
        <div class="afterImgList">
          <div class="fileInputContainer" v-for="(item,index) in after_pics">
            <img :src="item | filterImgSrc" alt="">
          </div>
          <div class="fileInputContainer" v-if="ableUpAfter_pics" @click="selectUploadType">

          </div>
          <input class="file file-img" name="file" type="file"  ref="img" accept="image/png,image/gif,image/jpeg"
          @change="after_picsUpdate"/>
        </div>
      </div>
      <textarea style="overflow:hidden; resize:none;outline:none;" class="box" type="text" placeholder="写日记分享变美经历，还有机会获得日记奖励哦！" v-model="content"
                @focus="fisrtWrite"/>
      <mt-button type="danger" class="Next" @click="toContinue">发表日记</mt-button>
    </div>
    <img :src="imgTemp" v-show="imgTempShow" style="width:0;height:0;opacity:0" alt="">

    <!--选择图片还是视频-->
    <mt-popup v-model="popupVisible3" position="bottom" class="mint-popup-4">
      <div class="picker-toolbar picker-toolbar2">
        <div class="mint-datetime-action mint-datetime-action2" @click="selectImg"> 图片
        </div>
        <div class="mint-datetime-action mint-datetime-action2" @click="selectVideo">视频
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<style scoped>
  input {
    border: none;
    padding-left: 20px;
  }
  .show-text {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    color: black;
    width: 30px; 
    padding-left: 0;
    text-align: center;
  }
  .mint-datetime-action2 {
    display: block;
    width: 100%;
  }
  .mint-popup-4{
    width: 100%;
  }
  .picker-toolbar {
    height: auto;
  }
  .file-img{
    display: none;
  }
</style>

<script>
  import "common/css/Continue.css";
  import axios from "axios";
  import {mapState} from "vuex";
  import {Toast} from "mint-ui";
  import imgPath from "../../common/api/imgConfig";
  import baseUrl from "../../common/api/config";
  import lrz from "lrz";
  import utils from "../../common/js/utils";
  import {Indicator} from 'mint-ui';

  export default {
    name: "Continue",
    data() {
      return {
        pickerValue: new Date(),
        mytime: "",
        user_id: this.$route.query.user_id,
        addTime: this.$route.query.addTime,
        project: this.$route.query.project,
        case_main_id: this.$route.query.id,
        oper_after_day: '',
        after_pics: [],
        imgPath,
        fisrt: true,
        content: "",
        imgData: {
          accept: "image/gif, image/jpeg, image/png, image/jpg"
        },
        axios,
        baseUrl,
        config: {
          width: 828,
          // height: 1104,
          quality: 0.8
        },
        imgs: [],
        imgTemp: "",
        imgTempShow: false,
        ableUpAfter_pics: true,
        after_pics_form: [],
        popupVisible3: false,
        signImgOrVideo:'',
        showText: false,
        placeholder: '请填写术后天数(数字)'
      };
    },
    filters: {
      filterImgSrc(value) {
        value = value || '';
        if (value.includes('http')) {
          return value
        } else {
          return imgPath + value
        }
      }
    },
    methods: {
      init() {
        let data = localStorage.getItem('formAppMessage');
        
        if (data) {
            data = JSON.parse(data);
            this.after_pics[0] = data.coverUrl;
            this.signImgOrVideo = 'vedio'
            this.after_pics_form.push({
              video_url: data.videoUrl,
              video_pic_url: data.coverUrl
            })
            this.ableUpAfter_pics = false;
         }
      },
      // openPicker() {
      //   this.$refs.picker.open();
      // }
      focus () {
        this.showText = true;
        this.placeholder = '';
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
          text: '上传中...',
          spinnerType: 'fading-circle'
        });
        lrz(file, self.config)
          .then(function (rst) {
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
            var obj = new Blob([u8arr], {type: mime});
            param.append("file", obj, file.name); //通过append向form对象添加数据
            param.append("chunk", "0"); //添加form表单中其他数据
            let config = {
              headers: {"Content-Type": "multipart/form-data"}
            }; //添加请求头
            self.axios
              .post(baseUrl + "/case/upload.do", param, config)
              .then(response => {
                self.imgs = [];
                self.imgTemp = "";
                callback(response.data);
                Indicator.close();
                self.signImgOrVideo = 'img';
              })
              .catch(error => {
                Toast({
                  message: "上传图片出错！",
                  position: "middle",
                  duration: 2000
                });
              });
          })
          .catch(function (err) {
            console.log(err);
            Indicator.close();
            alert("压缩失败");
          })
          .always(function () {
            // 清空文件上传控件的值
            e.target.value = null;
          });
      },
      selectUploadType () {
        this.popupVisible3 = true
      },
      after_picsUpdate(e) {
        let self = this;
        let callback = function (response) {
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
      selectImg () {
        if (this.after_pics.length>=7) {
          return Toast({
            message: '最多七张',
            position: "middle",
            duration: 2000
          });
        }
        this.$refs.img.click();
        this.popupVisible3 = false;
      },
      selectVideo () {
        this.popupVisible3 = false
        try {
          window.chooseVideo();
        } catch (e) {
          try {
            window.webkit.messageHandlers.chooseVideo.postMessage("");
          }catch (e) {
            android.chooseVideo("");
          }
        }
      },
      ChangeAfter_picsUpdate(index, $event) {
        let self = this;
        let callback = function (response) {
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
            imgTempDom.src = imgPath + response.data
            imgDomParent.appendChild(imgTempDom)
          }
        };
        this.update($event, callback);
      },
      fisrtWrite() {
        if (this.fisrt) {
          this.content = "";
          this.fisrt = false;
        } else {
          return;
        }
      },
      toContinue() {
        if (!this.oper_after_day) {
          return Toast({
            message: "请填写术后天数",
            position: "middle",
            duration: 2000
          });
        }

        if (this.oper_after_day && (!/^\d{1,10}$/g.test(this.oper_after_day))) {
          return Toast({
            message: "术后天数为数字",
            position: "middle",
            duration: 2000
          });
        }
        if (this.after_pics.length == 0) {
          return Toast({
            message: "请至少上传一张术后照片",
            position: "middle",
            duration: 2000
          });
        }
//        if (!(this.content.length >= 11 || this.content.length == 0)) {
//          Toast({
//            message: "输入文字必须超过10个字，提交失败",
//            position: "middle",
//            duration: 2000
//          });
//          return
//        }

        let data = this.after_pics.map((v) => {
          return {pic_url: v}
        });
        this.$store
          .dispatch({
            type: "addCaseSlave",
            params : {
              content: this.content,
              oper_after_day: this.oper_after_day,
              case_main_id: this.case_main_id,
              after_pic: this.signImgOrVideo == 'vedio'?this.after_pics_form:data,
              user_id: this.user_id
            }
          })
          .then(res => {
            let self = this;
            console.log(res)
            if (res.status == 0) {
              Toast({
                message: "续写日志成功！",
                position: "middle",
                duration: 2000
              });
              setTimeout(function () {
                try {
                  window.webkit.messageHandlers.closeWebView.postMessage("");
                }catch(e){
                  android.closeWebView("");
                }
              }, 2000);
            } else {
              Toast({
                message: res.message,
                position: "middle",
                duration: 2000
              });
            }
          });
      }
    },
    created: function () {
      utils.setTitle("日记历程");
      let tempDate = new Date();
      if (!this.addTime || this.addTime == undefined) {
      } else {
        let temp = this.addTime.split("-");
        tempDate = new Date(temp[0], temp[1] - 1, temp[2]);
      }
      const y = tempDate.getFullYear();
      let m = tempDate.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = tempDate.getDate();
      d = d < 10 ? "0" + d : d;
      this.addTime = y + "-" + m + "-" + d;
      this.init();
    },
    computed: {
      nativeToH5Json () {
        return this.$store.state.nativeToH5Json
      }
    },
    watch: {
      inputdata(value) {
        console.log(value);
      },
      after_pics() {
        if (this.after_pics.length >= 7) {
          this.ableUpAfter_pics = !this.after_pics
        }
      },
      nativeToH5Json (data) {
        data = JSON.parse(data);
        console.log(data)
        this.after_pics[0] = data.coverUrl;
        this.signImgOrVideo = 'vedio'
        this.after_pics_form.push({
          video_url: data.videoUrl,
          video_pic_url: data.coverUrl
        })
        this.ableUpAfter_pics = false;
      }
    }
  };
</script>
