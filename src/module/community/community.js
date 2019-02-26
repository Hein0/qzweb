import Vue from "vue";
import store from "../../common/store";
import App from "./App";
import Router from "vue-router";
// import routers from '../../common/shop/router.js';
import routers from "./router/router.js";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import imgPath from "../../common/api/imgConfig";
import Api from "../../common/api/api";
import VuePreview from "vue-preview";
// import Distpicker from 'v-distpicker';

Vue.use(VuePreview);

Vue.use(Router);
Vue.use(Mint);
Vue.prototype.Api = Api;

const router = new Router({
// mode: 'history',npm
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
