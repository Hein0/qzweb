import Api from "../../api/api"
import * as types from "../mutation-types"
import setSessionKey from '../../js/setSessionKey.js';
import sliceArray from '../../util/sliceArray.js';
import filterContet from '../../util/filter.js';
const state = {
    cartList: [],
    cartListParam: {
        user_id:JSON.parse(localStorage.getItem("personInfo")) ? JSON.parse(localStorage.getItem("personInfo")).user_id : "",
    }
}

const actions = {
    cartList({ commit }, payload) {
        return new Promise((resolve, reject) => {
            state.cartListParam.user_id = payload.user_id
            setSessionKey(state.cartListParam)
            Api.cartList(state.cartListParam)
                .then(res => {
                    commit({
                        type: "CART_LIST",
                        res
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
    [types.CART_LIST](state, payload) {
        state.cartList = payload.res.data;
        state.cartList.forEach(element => {
            element.name = filterContet(element.name, 30)
        })
    }
}

export default {
    state,
    actions,
    mutations,
}
