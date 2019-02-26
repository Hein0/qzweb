import Api from "../../api/api"
import * as types from "../mutation-types"
import setSessionKey from '../../js/setSessionKey.js';
import sliceArray from '../../util/sliceArray.js';
import baseUrl from "../../api/config";
import filterContet from '../../util/filter.js';
const state = {
    orderList: [],
    orderListParam: {
        // user_id: '',
        order_status: null,
    }
}

const actions = {
    ALLorderList({ commit }, payload) {
        return new Promise((resolve, reject) => {
            // state.orderListParam.user_id = payload.hasOwnProperty("user_id") ? payload.user_id : 0
            state.orderListParam.order_status = payload.hasOwnProperty("order_status") ? payload.order_status : null
            if (state.orderListParam.order_status == null) {
                delete state.orderListParam.order_status
            }
            setSessionKey(state.orderListParam);
            Api.orderList(state.orderListParam)
                .then(res => {
                    commit({
                        type: "ORDER_LIST",
                        res,
                    })
                    resolve(res)
                }, err => {
                    reject(err)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

const mutations = {
    [types.ORDER_LIST](state, payload) {
        payload.res.data.forEach(element => {
            let totalNum = 0;
            element.goods.forEach(goodElement => {
                totalNum += goodElement.nums
                if (goodElement.cat) {
                    goodElement.tip = goodElement.cat.split('>')
                    goodElement.tip = goodElement.tip[goodElement.tip.length - 1]
                }
            })
            element.totalNum = totalNum;
        })
        state.orderList = payload.res.data;
    }
}

export default {
    state,
    actions,
    mutations
}
