import Api from "../../api/api"
import * as types from "../mutation-types"
import setSessionKey from '../../js/setSessionKey.js';
import sliceArray from '../../util/sliceArray.js';
import filterContet from '../../util/filter.js';
const state = {
    confirmOrderParam: {
        user_id: 0,
        goods: ""
    },
    confirmOrder: {},
    goods: []
}

const actions = {
    confirmOrder({ commit }, payload) {
        return new Promise((resolve, reject) => {
            state.confirmOrderParam.user_id = payload.user_id
            state.confirmOrderParam.goods = payload.goods
            setSessionKey(state.confirmOrderParam);
            Api.confirmOrder(state.confirmOrderParam)
                .then(res => {
                    commit({
                        type: "CONFIRM_ORDER",
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
    [types.CONFIRM_ORDER](state, payload) {
        state.confirmOrder = payload.res.data;
        state.goods = payload.res.data.goods
        state.goods.forEach(element => {
            element.name = filterContet(element.name, 35)
        })
    }
}

export default {
    state,
    actions,
    mutations,
}
