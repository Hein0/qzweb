import Vue from "vue";
import store from "../../common/store";
import App from "./App";
import Router from "vue-router";
// import routers from '../../common/shop/router.js'
// import routers from "./router/router.js";
import routers from "./router/router.js";

import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import imgPath from "../../common/api/imgConfig";
import Api from "../../common/api/api";

// import imgPath from "../../common/api/imgConfig";
// import FastClick from "fastclick";
import Distpicker from 'v-distpicker';
import VuePreview from "vue-preview";//图片查看插件
import AMap from 'vue-amap';//高德地图插件
// FastClick.attach(document.body);
Vue.use(VuePreview);//查看图片放大
Vue.use(Router);
Vue.use(Mint);
Vue.use(Distpicker);
Vue.use(AMap);
Vue.prototype.Api = Api;



const router = new Router({
  // mode: 'history',
  routes: routers
});

/* eslint-disable no-new */
window.APP = new Vue({
  el: "#app",
  template: "<App/>",
  router,
  store,
  components: { App },
  render: h => h(App)
});
