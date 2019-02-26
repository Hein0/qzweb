import vue from "vue"
import vuex from "vuex"

import shop from "./modules/shop"
import detail from "./modules/detail"
import shoppingcart from "./modules/shoppingcart"
import confirmorder from "./modules/confirmorder"
import payment from "./modules/payment"
import Mydiary from "./modules/Mydiary"
import orderList from "./modules/orderList"
import actions from './actions'
import mutations from './mutations'

vue.use(vuex);

export default new vuex.Store({
  modules: {
    shop,
    detail,
    shoppingcart,
    confirmorder,
    payment,
    Mydiary,
    orderList
  },
  state: {
    nativeToH5Json: '',
    H5Json: '',
    deviceInfo: '',
    appVersion: '',
    payMes: '',
		nativeToH5Video:'',
  },
  mutations,
  actions,
})
