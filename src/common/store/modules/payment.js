import Api from "../../api/api";
import * as types from "../mutation-types";
import setSessionKey from "../../js/setSessionKey.js";
import sliceArray from "../../util/sliceArray.js";
import baseUrl from "../../api/config";
import api from "../../api/api";
const state = {
  order: {},
  orderParam: {
    user_id:JSON.parse(localStorage.getItem("personInfo")) ? JSON.parse(localStorage.getItem("personInfo")).user_id : "",
    goods: "",
    telphone: 0,
    token:JSON.parse(localStorage.getItem("personInfo")) ? JSON.parse(localStorage.getItem("personInfo")).token : "",
  },
  payOrderParam: {
    order_sn: "",
    user_id:JSON.parse(localStorage.getItem("personInfo")) ? JSON.parse(localStorage.getItem("personInfo")).user_id : "",
    token:JSON.parse(localStorage.getItem("personInfo")) ? JSON.parse(localStorage.getItem("personInfo")).token : "",
  },
  payOrder: {},
  orderOneParam: {
    order_sn: "",
    // user_id: ""
  },
  orderInfo: {}
};

const actions = {
  order({ commit }, payload) {
    // state.orderParam.user_id = payload.user_id;
    state.orderParam.goods = payload.goods;
    state.orderParam.telphone = payload.telphone;
    state.orderParam.envelopeOrder=JSON.parse(localStorage.getItem("envelopeOrder"))
    state.orderParam.appoint_price = payload.appoint_price

    return new Promise((resolve, reject) => {
      setSessionKey(state.orderParam);
      // console.log(state.orderParam)
      Api.order(state.orderParam)
        .then(
          res => {
            commit({
              type: "SUBMIT_ORDER",
              res
            });
            resolve(res);
          },
          err => {
            reject(err);
          }
        )
        .catch(err => {
          reject(err);
        });
    });
  },
  payOrder({ commit }, payload) {
    return new Promise((resolve, reject) => {
      state.payOrderParam.order_sn = payload.order_sn;
      setSessionKey(state.payOrderParam);
      Api.payOrder(state.payOrderParam)
        .then(
          res => {
            commit({
              type: "PAY_ORDER",
              res
            });
            resolve(res);
          },
          err => {
            reject(err);
          }
        )
        .catch(err => {
          reject(err);
        });
    });
  },
  orderOne({ commit }, payload) {
    return new Promise((resolve, reject) => {
      state.orderOneParam.order_sn = payload.order_sn;
      // state.orderOneParam.user_id = payload.user_id;
      setSessionKey(state.orderOneParam);
      Api.orderOne(state.orderOneParam)
        .then(
          res => {
            // console.log(res);
            commit({
              type: "ORDER_ONE",
              res
            });
            resolve(res);
          },
          err => {
            reject(err);
          }
        )
        .catch(err => {
          reject(err);
        });
    });
  }
};

const mutations = {
  [types.SUBMIT_ORDER](state, payload) {
    state.order = payload.res.data;
  },
  [types.PAY_ORDER](state, payload) {
    state.payOrder = payload.res;
  },
  [types.ORDER_ONE](state, payload) {
    state.orderInfo = payload.res.data;
  }
};

export default {
  state,
  actions,
  mutations
};
