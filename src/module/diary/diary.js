import Vue from 'vue'
import store from "../../common/store"
import App from './App'
import Router from 'vue-router'
// import routers from '../../common/shop/router.js'
import routers from './router/router.js'
import Mint from 'mint-ui'
// import VDistpicker from 'v-distpicker';
import 'mint-ui/lib/style.css'
import imgPath from "../../common/api/imgConfig"
// import VueResource from 'vue-resource'
// Vue.component('v-distpicker', VDistpicker)

Vue.use(Router);
Vue.use(Mint);
// Vue.use(VueResource);

const router = new Router({
    // mode: 'history',
    routes: routers
})

/* eslint-disable no-new */
window.APP = new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App },
    render: h => h(App)
})
