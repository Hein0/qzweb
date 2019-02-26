import Api from "../../api/api";
import * as types from "../mutation-types";
import setSessionKey from "../../js/setSessionKey.js";
import sliceArray from "../../util/sliceArray.js";
import baseUrl from "../../api/config";
import filterContet from "../../util/filter.js";
const state = {
  MyLogList: [],
  MyLogListParam: {
    pageNum: 0,
    pageSize: 10,
    // user_id: 0
  },
  MylogDataCount: 0,
  orderList: [],
  orderListParam: {
    // user_id: "",
    order_status: ""
  },
  insertCaseOrLogParam: {
    addTime: "",
    project: 0,
    user_id: "",
    content: "",
    before_main: "",
    before_two: "",
    before_three: "",
    case_main_id: 0,
    after_pics: "",
    scoreNum: "",
    goods_key_word: "",
    user_key_word: "",
    order_sn: "",
    token:JSON.parse(localStorage.getItem("personInfo")) ? JSON.parse(localStorage.getItem("personInfo")).token : "",
  },
  AllCategory: [],
  selectAllCategoryParam: {
    parentId: 0
  }
};

const actions = {
  AllCategory({ commit }, payload) {
    return new Promise((resolve, reject) => {
      setSessionKey(state.selectAllCategoryParam);
      Api.allCategory(state.selectAllCategoryParam)
        .then(
          res => {
            commit({
              type: "ALL_CATEGORY",
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
  MyLogList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // state.MyLogListParam.user_id = payload.hasOwnProperty("user_id")
      //   ? payload.user_id
      //   : 0;
      state.MyLogListParam.pageNum = payload.hasOwnProperty("pageNum")
        ? payload.pageNum
        : 1;
      setSessionKey(state.MyLogListParam);
      Api.getMyLogList(state.MyLogListParam)
        .then(
          res => {
            commit({
              type: "MY_LOG_LIST",
              res
            });
            console.log(res)
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
  orderList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // state.orderListParam.user_id = payload.hasOwnProperty("user_id")
      //   ? payload.user_id
      //   : 0;
      state.orderListParam.order_status = payload.hasOwnProperty("order_status")
        ? payload.order_status
        : 2;
      setSessionKey(state.orderListParam);
      Api.orderList(state.orderListParam)
        .then(
          res => {
            commit({
              type: "ORDER_LIST",
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
  insertCaseOrLogParam({ commit }, payload) {
    return new Promise((resolve, reject) => {
      if (payload.hasOwnProperty("continue") && payload.continue) {
        delete state.insertCaseOrLogParam.addTime;
        delete state.insertCaseOrLogParam.project;
        delete state.insertCaseOrLogParam.before_main;
        delete state.insertCaseOrLogParam.before_two;
        delete state.insertCaseOrLogParam.before_three;
        delete state.insertCaseOrLogParam.scoreNum;
        delete state.insertCaseOrLogParam.goods_key_word;
        delete state.insertCaseOrLogParam.user_key_word;
        delete state.insertCaseOrLogParam.order_sn;
      } else {
        state.insertCaseOrLogParam.addTime = payload.hasOwnProperty("addTime")
          ? payload.addTime + " 00:00:00"
          : "";
        state.insertCaseOrLogParam.project = payload.hasOwnProperty("project")
          ? payload.project
          : 0;
        state.insertCaseOrLogParam.before_main = payload.hasOwnProperty(
          "before_main"
        )
          ? payload.before_main
          : "";
        state.insertCaseOrLogParam.before_two = payload.hasOwnProperty(
          "before_two"
        )
          ? payload.before_two
          : "";
        state.insertCaseOrLogParam.before_three = payload.hasOwnProperty(
          "before_three"
        )
          ? payload.before_three
          : "";
        state.insertCaseOrLogParam.scoreNum = payload.hasOwnProperty("scoreNum")
          ? payload.scoreNum
          : "";
        state.insertCaseOrLogParam.goods_key_word = payload.hasOwnProperty(
          "goods_key_word"
        )
          ? payload.goods_key_word
          : "";
        state.insertCaseOrLogParam.user_key_word = payload.hasOwnProperty(
          "user_key_word"
        )
          ? payload.user_key_word
          : "";
        state.insertCaseOrLogParam.order_sn = payload.hasOwnProperty("order_sn")
          ? payload.order_sn
          : "";
      }
      state.insertCaseOrLogParam.user_id = payload.hasOwnProperty("user_id")
        ? payload.user_id
        : "";
      state.insertCaseOrLogParam.content = payload.hasOwnProperty("content")
        ? payload.content
        : "";
      state.insertCaseOrLogParam.after_pics = payload.hasOwnProperty(
        "after_pics"
      )
        ? payload.after_pics
        : "";
      state.insertCaseOrLogParam.case_main_id = payload.hasOwnProperty(
        "case_main_id"
      )
        ? payload.case_main_id
        : 0;
      setSessionKey(state.insertCaseOrLogParam);
      Api.insertCaseOrLog(state.insertCaseOrLogParam)
        .then(
          res => {
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

  // 续写日记 6/13
  async addCaseSlave ({ commit }, payload) {
    return await Api.addCaseSlave(payload.params)
  }
};

const mutations = {
  [types.ALL_CATEGORY](state, payload) {
    state.AllCategory = payload.res.data;
  },
  [types.MY_LOG_LIST](state, payload) {
    state.MylogDataCount = payload.res.dataCount;
    payload.res.data.forEach(element => {
      if (element.evaluate_label) {
        element.evaluate_label = element.evaluate_label.split(",");
      }
    });
    state.MyLogList = payload.res.data;
  },
  [types.ORDER_LIST](state, payload) {
    payload.res.data.forEach(element => {
      let totalNum = 0;
      element.goods.forEach(goodElement => {
        totalNum += goodElement.nums;
        if (goodElement.cat) {
          goodElement.tip = goodElement.cat.split(">");
          goodElement.tip = goodElement.tip[goodElement.tip.length - 1];
        }
      });
      element.totalNum = totalNum;
    });
    state.orderList = payload.res.data;
  }
};

export default {
  state,
  actions,
  mutations
};
