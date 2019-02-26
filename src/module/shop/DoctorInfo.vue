<template>
  <div id="doctorInfo">
      <div class="container">
          <ul class="base">
              <li>
                  <span id="title">基本资料</span>
              </li>
              <li>
                  <span>姓名</span>
                  <span>山本.新之助</span>
              </li>
              <li>
                  <span>担任职务</span>
                  <span>主治医师</span>
              </li>
              <li>
                  <span>擅长项目</span>
                  <span>操作双眼皮</span>
              </li>
          </ul>
          <div class="introduce">
              <h4 id="title">医师简介</h4>
              <p>王浩，男，医学整形美容专业硕士，毕业于第二军医院大学，从事整形美容20余年；先后师从于我国著名整形专家鲁开化教授、林子豪教授等。</p>
          </div>
          <div class="Photo">
              <h4 id="title">医生照片</h4>
              <ul class="photoList">
                  <li>
                      <img src="./images/doctor1.jpg" alt="" srcset="">
                  </li>
                  <li>
                      <img src="./images/doctor2.jpg" alt="" srcset="">
                  </li>
                  <li>
                      <img src="./images/doctor3.jpg" alt="" srcset="">
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>
<script>
    import "common/css/doctorinfo.css";
    export default {
        name: "doctorinfo",
        data(){
            return{

            }
        }
    }
</script>
