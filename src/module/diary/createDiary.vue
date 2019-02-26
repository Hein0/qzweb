<template>
  <div id="detail">
      <div class="container">   
        <ul class="discounts">
          <li class="discount" @click="openPicker">
            <span class="discount-text">时间</span>
            <span class="time">{{mytime}}</span>
          </li>
        </ul>
               <mt-button type="danger" class="Next" @click="next">下一步</mt-button>   
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
import "common/css/createDiary.css";
import utils from "../../common/js/utils";
export default {
  name: "createDiary",
  data() {
    return {
      pickerValue: new Date(),
      mytime: "",
      user_id: this.$route.query.user_id,
      order_sn:"system2018020815271762951557",
      goods_key_word: this.$route.query.goods_key_word,
      project: this.$route.query.project,
      ableToNext: true
    };
  },
  methods: {
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
    next() {
      this.$router.push({
        name: "Logwriter",
        query: {
          user_id: this.user_id,
          order_sn: this.order_sn,
          addTime: this.mytime,
          goods_key_word: this.goods_key_word,
          project:this.project
        }
      });
    }
  },
  created: function() {
    utils.setTitle("创建日记");
    let tempDate = new Date();
    const y = tempDate.getFullYear();
    let m = tempDate.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = tempDate.getDate();
    d = d < 10 ? "0" + d : d;
    this.mytime = y + "-" + m + "-" + d;
    if (this.order_sn) {
      this.ableToNext = false;
    } else {
      this.ableToNext = true;
    }
  }
};
</script>