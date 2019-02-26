import Vue from "vue";
import store from "../../common/store";
import App from "./App";
import Router from "vue-router";
// import routers from '../../common/shop/router.js'
import routers from "./router/router.js";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import imgPath from "../../common/api/imgConfig";
import VuePreview from "vue-preview";
// import FastClick from "fastclick";
Vue.use(VuePreview);
// FastClick.attach(document.body);
Vue.use(Router);
Vue.use(Mint);

const router = new Router({
  // mode: 'history',
  routes: routers
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  template: "<App/>",
  router,
  store,
  components: { App },
  render: h => h(App)
});
