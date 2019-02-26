<template>
  <div class="page-index" style="margin-top: 44px;">
    <div class="padding"></div>
    <div class="container">
      <ul>
        <li class="list">
          <span>手术时间<i>*</i></span>
          <input type="text" readonly placeholder="请选择手术时间" v-model="mytimegood">
          <!--开始时间-->
          <input type="date" ref="date" v-model="operTime"  @change="setOperStartTime()">
        </li>
        <li class="list">
          <span>选择医院</span>
          <input type="text" readonly placeholder="请选择医院" v-model="hos_name" @click="showPullDown" style="width: 7.0rem">
        </li>
        <li class="list" @click="xiangmu">
          <span>项目类别<i>*</i></span>
          <input type="text" readonly placeholder="请选择项目类别"  v-model="xiangmuleibie" style="width: 7.0rem">
        </li>
        <li class="list" v-if="!isShow">
          <span>评&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价</span>
          <span class="all">
                              <input type="radio" name="scoreNum" value="0" v-model="inputdata"/><span>★</span>
          <input type="radio" name="scoreNum" value="1" id="star1" v-model="inputdata" @change="Checked"
                 @click="cancelChecked"/><span for="star1">★</span>
          <input type="radio" name="scoreNum" value="2" id="star2" v-model="inputdata" @change="Checked"
                 @click="cancelChecked"/><span for="star2">★</span>
          <input type="radio" name="scoreNum" value="3" id="star3" v-model="inputdata" @change="Checked"
                 @click="cancelChecked"/><span for="star3">★</span>
          <input type="radio" name="scoreNum" value="4" id="star4" v-model="inputdata" @change="Checked"
                 @click="cancelChecked"/><span for="star4">★</span>
          <input type="radio" name="scoreNum" value="5" id="star5" v-model="inputdata" @change="Checked"
                 @click="cancelChecked"/><span for="star5">★</span>
          </span>
        </li>

        <!--本地存储中含有视频信息则显示-->
        <li class="list" v-if="isShowVideo">
          <span>视频时间</span>
          <span class="spanright" @click="shclick">
            <span data-id="1">
              <i data-id="1" :class="shcolorflag?'':'shcolor'"></i><span data-id="1" :class="shcolorflag?'':'shcolor1'">术前</span>
            </span>
            <span data-id="2">
              <i data-id="2" :class="shcolorflag?'shcolor':''"></i><span data-id="2" :class="shcolorflag?'shcolor1':''">术后</span>

            </span>
          </span>
        </li>
      </ul>
      <h1 class="htxt" v-if="isShowVideo">温馨提示：完整的视频日记应该同时具有术前视频和术后视频哦</h1>
      <div class="buttons" v-if="!isShow">
        <span class="btn" @click="brforeSubmit()">下一步</span>
      </div>
      <div v-if="isShow" class="keyWord">
        <div class="keyWords">
          <ul>
            <li @click="select1(index,$event,item.id)" v-for="(item,index) in allCategory">{{item.name}}</li>
          </ul>
          <ul v-if="allCategory_1" class="keyword2">
            <li @click="select2(index,$event,item.id)" v-for="(item,index) in allCategory_1List" >{{item.name}}</li>
          </ul>
          <ul v-if="allCategory_2" class="keyword3">
            <li v-for="(item,index) in allCategory_2List" @click="select3(index,$event,item.id)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="Confirm" v-if="isShow">
      <mt-button class="newDiary" @click.native="toggle()">确定</mt-button>
    </div>

    <!--医院-->
    <pullDown ref="pullDown" v-model="hos_name" :list="hospList"></pullDown>
  </div>
</template>

<style scoped>
  .page-index {
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
    /* margin-bottom: 1.4667rem; */
    display: -webkit-box;
    /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;
    /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;
    /* TWEENER - IE 10 */
    display: -webkit-flex;
    /* NEW - Chrome */
    display: flex;
    /* NEW, Spec - Opera 12.1, Firefox 20+ */
    flex-direction: column;
    overflow: hidden;
    flex-wrap: nowrap;
  }

  .container {
    -webkit-box-flex: 1;
    /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1;
    /* OLD - Firefox 19- */
    /* width: 20%; For old syntax, otherwise collapses. */
    -webkit-flex: 1;
    /* Chrome */
    -ms-flex: 1;
    /* IE 10 */
    /*flex: 1;*/
    /* NEW, Spec - Opera 12.1, Firefox 20+ */
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    /*解决ios上滑动不流畅*/
    /* height: 100%; */
  }

  .padding {
    height: 0.2667rem;
    background-color: rgba(255, 131, 199, 0.2);
    font-size: 0.3733rem;
    color: #282828;
  }

  .list {
    /* width: 749px; */
    height: 1.08rem;
    line-height: 1.08rem;
    background-color: #ffffff;
    text-align: right;
    background-image: url(../images/arrow.png);
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 5px 10px;
    border-bottom: 1px solid #e3e3e3;
  }

  .container .list:last-child {
    border-bottom: none;
  }

  .list::before {
    clear: both;
    height: 0px;
    width: 100%;
    font-size: 1px;
    line-height: 0px;
    visibility: hidden;
    overflow: hidden;
  }

  .list span:first-child {
    float: left;
  }
  .container > ul{
    padding: 0 0.36rem;
    background-color: white;
  }
  .container {
    background-color: #f8f8f8;
  }
  .list span:nth-child(2) {
    float: right;
  }

  .list span i {
    color: #ff65b1;
  }

  .list input {
    float: right;
    height: 100%;
    text-align: right;
    margin-right: 0.53rem;
  }

  .all {
    position: relative;
    margin-right: 0.16rem;
  }

  .all > input {
    opacity: 0;
    position: absolute;
    width: 0.4rem;

    height: 0.4rem;
    margin: 0;
    margin-top: 0.25335rem;
  }

  .spanright {
    margin-right: 0.3333rem;
  }

  .spanright span:first-child {
    margin-right: 1.0667rem;
  }

  .spanright i {
    /* opacity: 0; */
    /* position: absolute; */
    display: inline-block;
    /* line-height: 0.4rem; */
    width: 0.32rem;
    height: 0.32rem;
    margin: 0;
    margin-top: 0.39rem;
    margin-right: 0.2533rem;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    background-color: #c2c2c2;
  }

  .shcolor {
    background-color: #ff65b1 !important;
    border: solid 1px #eeeeee !important;
  }

  .shcolor1 {
    color: #ff65b1;
  }

  .all > input:nth-of-type(1),
  .all > span:nth-of-type(1) {
    display: none;
  }

  .all > span {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0.0667rem;
    font-size: 0.3733rem;
    line-height: 0.39rem;
    color: #fff;
    background-color: #ff5c7e;
    text-align: center;
    -webkit-transition: color 0.2s;
    transition: color 0.2s;
    font-weight: bold;
    /* margin-left: 0.2667rem; */
    margin-right: 0.1333rem;
  }

  .all > input:checked ~ span {
    color: #fff;
    background-color: #d3d3d3;
  }

  .all > input:checked + span {
    color: #fff;
    background-color: #ff5c7e;
  }

  .mint-popup-4 {
    width: 100%;
  }

  .mint-popup-4 .picker-slot-wrapper,
  .page-popup .mint-popup-4 .picker-item {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .keyWord {
    flex: 1;
    overflow: hidden;
  }

  .keyWords {
    display: -webkit-box;
    /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;
    /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;
    /* TWEENER - IE 10 */
    display: -webkit-flex;
    /* NEW - Chrome */
    display: flex;
    /* NEW, Spec - Opera 12.1, Firefox 20+ */
    height: 100%;
    flex: 1;
  }

  .keyWords ul {
    width: 33.33%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
    padding: 0 0.4rem;
  }

  .keyWords ul li {
    color: #777;
    font-size: 0.32rem;
    width: 1.6rem;
    height: 1.0667rem;
    line-height: 1.0667rem;
    border-bottom: 0.0267rem solid #e2e2e2;
    word-break: keep-all;
    /* 不换行 */
    white-space: nowrap;
    /* 不换行 */
    position: relative;
  }

  .keyWords ul li.active::before {
    content: "";
    display: block;
    width: 0.08rem;
    height: 0.8rem;
    background-color: #ff65b1;
    position: absolute;
    left: -0.4rem;
    top: 50%;
    margin-top: -0.4rem;
  }

  .keyWords ul.keyword2 li.active::before {
    height: 0.5333rem;
    margin-top: -0.2667rem;
  }

  .keyWords ul.keyword3 li.active::before {
    height: 0.2667rem;
    margin-top: -0.1333rem;
  }

  .Confirm {
    width: 100%;
    height: 1.3333rem;
    /* overflow: hidden; */
  }

  .newDiary {
    background-color: #ff65b1;
    color: #fff;
    height: 1.3333rem;
    font-size: 0.4133rem;
    width: 10rem;
  }

  .buttons {
    width: 100%;
    text-align: center;
    margin-top: 1.04rem;
  }

  .buttons .btn {
    display: block;
    font-size: 0.45rem;
    background: #ff65b1;
    color: #fff;
    height: 1.17rem;
    line-height: 1.17rem;
    border-radius: 1.5rem;
    text-align: center;
    margin: 0 0.72rem;
  }

  .picker-toolbar1 {
    height: 8.7067rem;
  }

  .picker-toolbar1 h1 {
    text-align: center;
    font-size: 0.3733rem;
    color: rgb(160, 160, 160);
    margin: 0.3467rem 0;
  }

  .picker-toolbar1 li {
    height: 1.0667rem;
    border-bottom: 1px solid #f3f3f3;
    line-height: 1.0667rem;
    margin: 0 0.44rem;
  }

  .picker-toolbar1 li span:nth-child(2) {
    float: right;
  }

  .htxt {
    color: #a0a0a0;
    font-size: 0.32rem;
    text-align: center;
    margin-top: 0.32rem;
  }
  .list input[type='date'] {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    /*left: 1000px;*/
  }
  .list {
    position: relative;
  }
  .list select {
    position: absolute;
    width: 100%;
    right: 0;
    height: 100%;
    opacity: 0;
    z-index: 100;
  }
</style>



<script>
  import {DatetimePicker} from "mint-ui";
  import Api from "../../../common/api/api.js";
  import {
    Toast
  } from 'mint-ui';

  // 下拉
  import pullDown from '../../../components/base/hospal-component.vue'

  export default {
    data() {
      return {
        objData: {},
        shcolorflag: false,
        popupVisible: false,
        inputdata: "0",
        shtimemodel: "",
        scoreNumFirst: "",
        pickerValue: new Date('2008'),
        startDate: new Date('2008'),
        endDate: new Date('2008'),
        imgUnStar: require("../images/unactStar.png"),
        imgStar: require("../images/good.png"),
        mytime: "",
        mytimegood: "",
        list: [],
        slots: [
          {
            flex: 1,
            values: [],
            className: "slot1",
            textAlign: "center"
          }
        ],
        value: "",
        hosp: "",
        popupVisible1: false,
        isShow: false,
        allCategory: null,
        allCategory_1: false,
        allCategory_1List: [],
        allCategory_2List: [],
        allCategory_2: false,
        project: "",
        xiangmuleibie: "",
        shqh: "",
        diarybody: "",
        hospData: {},
        hospList: '',
        his_id: '',
        project_id: '',
        hos_name: '', // 医院
        scanNum: '',
        before:'1',
        operTime: '', // 手术开始时间
        oper_after_time: '', // 术后时间
        isShowVideo: false // 是否显示视频时间条目
      };
    },
    components: {
      pullDown: pullDown
    },
    created() {
			// 是否显示视频时间
			localStorage.getItem('formAppMessage') && (this.isShowVideo = true);
			
      let tempDate = new Date();
      const y = tempDate.getFullYear();
      let m = tempDate.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = tempDate.getDate();
      d = d < 10 ? "0" + d : d;
      this.mytime = y + "-" + m + "-" + d;
      if (this.$route.query.order_sn) {
        this.init()
      }
      // 获取医院
      this.getHospData();
    },
    methods: {
      init() {

        let params = {
          order_sn: this.$route.query.order_sn
        }

        Api.orderCase(params).then(res => {
          this.diarybody = res.data;
          this.mytimegood = this.diarybody.operTime;
          this.shtimemodel = this.diarybody.oper_after_day;
          this.hos_name = this.diarybody.hospital_name;
          this.his_id = this.diarybody.hospital_id;
          this.xiangmuleibie = this.diarybody.project_name;
          this.project_id = this.diarybody.project;

        })
      },
      select1(index, event,id) {
        var el = event.currentTarget;
        // 兼容低版本安卓
        Array.prototype.forEach.call(el.parentElement.childNodes, function (element) {
          element.setAttribute("class", "");
        });
        el.className = "active";
        this.allCategory_1List = this.allCategory[index].hdGoodsCategory;
        this.project = this.allCategory[index].name;
        this.allCategory_1 = true;
        this.project_id = id;
      },
      select2(index, event,id) {
        var el = event.currentTarget;

        // 兼容低版本安卓
        Array.prototype.forEach.call(el.parentElement.childNodes, function (element) {
          element.setAttribute("class", "");
        });
        el.className = "active";
        this.allCategory_2List = this.allCategory_1List[index].hdGoodsCategory;
        this.project = this.allCategory_1List[index].name;
        this.allCategory_2 = true;
        this.project_id = id;
      },
      select3(index, event, id) {
        var el = event.currentTarget;
        // 兼容低版本安卓
        Array.prototype.forEach.call(el.parentElement.childNodes, function (element) {
          element.setAttribute("class", "");
        });
        el.className = "active";
        this.project = this.allCategory_2List[index].name;
        this.project_id = id;
      },
      shclick(e) {
        if (e.target.dataset.id == "1") {
          this.shqh = 1;
          this.shcolorflag = false;
        } else {
          this.shqh = 2
          this.shcolorflag = true;
        }
      },
      Checked() {
        console.log(this.inputdata);
      },
      popupVisiblefalse(index) {

        this.shtimemodel = index;
        this.oper_after_time = index;
        this.popupVisible1 = false
      },
      xiangmu() {
        let params = {
          parentId: 0
        };
        Api.allCategory(params).then(res => {
          this.allCategory = res.data;
        });
        this.isShow = !this.isShow;
      },

      // 选择项目类别
      toggle() {
        this.isShow = !this.isShow;
        this.xiangmuleibie = this.project;
      },

      // 下一步 提交表单
      submitinfo() {
        let obj = {};
        obj.operationTime = this.mytimegood;
        obj.project = this.project_id;
        obj.hospital_id = this.hospData[this.hos_name];
        obj.scanNum = this.scoreNumFirst;
        obj.order_sn = this.$route.query.order_sn;
        obj.before = this.shqh || 1;
        obj.goods_key_word = this.xiangmuleibie;

        console.log(obj)
        this.$router.push({
          path: 'courseview',
          query: obj
        })
      },

      // 必填项验证 数据存储
      brforeSubmit() {
        let arr_str = ['mytimegood', 'xiangmuleibie'];
        let arr_tip = ['请选择手术时间',  '请选择项目类别'];

        for (let v = 0; v < arr_str.length; v++) {
          if (!this[arr_str[v]]) {
            this.$toast(arr_tip[v]);
            return false;
          }
        }
        this.submitinfo()
      },

      shtime() {
        alert('选择时间')
        this.$refs.date.click()
//        this.$refs.picker.open();
      },
      shday() {
        if (this.list.length == 0) {
          Toast({
            message: "请先选择手术时间",
            position: "bottom",
            duration: 2000
          });
        } else {
          this.popupVisible1 = true;
        }
      },
      getHospData() {
        let name;
        let id;
        let obj = {};
        Api.getHospital().then(res => {
          this.hospList= res.data;
          for (let i = 0; i < res.data.length; i++) {
            name = res.data[i].name;
            id = res.data[i].id;

            obj[name] = id;
            this.hospData = Object.assign({}, this.hospData, obj)
          }

          console.log(this.hospData)
        })
      },
      cancleaddress() {
        this.popupVisible = false;
      },
      selectaddress() {
        this.hosp = this.value;
        this.popupVisible = false;
        this.his_id = this.hospData[this.value]
      },
      onValuesChange(picker, values) {
        this.value = values[0];
      },

      handleConfirm() {
        const y = this.pickerValue.getFullYear();
        let m = this.pickerValue.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        let d = this.pickerValue.getDate();
        d = d < 10 ? "0" + d : d;
        this.mytime = y + "-" + m + "-" + d;
        this.mytimegood = this.mytime;
        console.log(this.mytimegood)
      },
      cancelChecked(e) {
        if (this.scoreNumFirst == e.target.value) {
          this.inputdata = "0";
          this.scoreNumFirst = "";
        } else {
          this.scoreNumFirst = e.target.value;
        }
      },

      // 设置手术开始时间
      setOperStartTime () {
        this.mytimegood = this.operTime;
      },

      // 显示
      showPullDown () {
        this.$refs.pullDown.toggle();
      }
    }
  };
</script>

