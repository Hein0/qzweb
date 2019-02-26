/**
 * Created by hp on 2018/1/16.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//配置路由
const router = new VueRouter({
  routes: [
    {
    path: '/dairyDetail',
    name: 'dairyDetail',
    component: function (resolve) {
      require.ensure([], function (require) {
        resolve(require('./../view/dairyDetail.vue'))
      }, './../view/dairyDetail.vue')
    }
  },{
      path: '/dairySubDetail',
      name: 'dairySubDetail',
      component: function (resolve) {
        require.ensure([], function (require) {
          resolve(require('./../view/dairySubDetail.vue'))
        }, './../view/dairySubDetail.vue')
      }
    },{
          path: '/login',
          name: 'login',
          component: function (resolve) {
              require.ensure([], function (require) {
                  resolve(require('./../view/login.vue'))
              }, './../view/login.vue')
          }
      },{
      path: '/myFine',
      name: 'myFine',
      component: function (resolve) {
        require.ensure([], function (require) {
          resolve(require('./../view/myFine.vue'))
        }, './../view/myFine.vue')
      }
    },{
      path: '/myAttention',
      name: 'myAttention',
      component: function (resolve) {
        require.ensure([], function (require) {
          resolve(require('./../view/myAttention.vue'))
        }, './../view/myAttention.vue')
      }
    },{
      path: '/privacyPolicy',
      name: 'privacyPolicy',
      component: function (resolve) {
        require.ensure([], function (require) {
          resolve(require('./../view/privacyPolicy.vue'))
        }, './../view/privacyPolicy.vue')
      }
    },
  
  ]
});
export default router;
