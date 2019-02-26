import Vue from "vue";
import store from "../../common/store";
import App from "./App";
import Router from "vue-router";
// import routers from '../../common/shop/router.js'
import routers from "./router/router.js";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
//import imgPath from "../../common/api/imgConfig";
// import FastClick from "fastclick";

// FastClick.attach(document.body);
Vue.use(Router);
Vue.use(Mint);

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
