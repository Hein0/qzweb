import Vue from 'vue';
import Router from 'vue-router';
import  router from "./router/router";
import Zepto from './../../common/js/zepto';
import CommonMethod from './../../common/js/utils';
import setSessionKey from './../../common/js/setSessionKey.js';
import Api from './../../common/api/api';
import imgPath from './../../common/api/imgConfig';
import filters from './../../common/api/filter';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import store from '../../common/store'

import VuePreview from 'vue-preview';
Vue.use(VuePreview);


Vue.use(Router);
Vue.use(Mint);
Vue.prototype.Api=Api;
Vue.prototype.setSessionKey=setSessionKey;
window.imgPath=imgPath;
window.$=Zepto;

window.CM=CommonMethod;

window.APP = new Vue({
  el: '#App',
  router,
  store
});
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
