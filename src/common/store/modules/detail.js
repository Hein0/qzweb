import Api from "../../api/api";
import * as types from "../mutation-types";
import setSessionKey from "../../js/setSessionKey.js";
import sliceArray from "../../util/sliceArray.js";
import baseUrl from "../../api/config";
import filterContet from "../../util/filter.js";
import imgPath from "../../api/imgConfig";
const state = {
  goodDetail: {},
  getGoodDetailParam: {
    id: 0
  },
  goodCaseDetailInfo: [],
  getGoodCaseDetailInfoParam: {
    id: 0,
    pageSize: 10,
    pageNum: 0
  },
  goodCaseDetailInfoDataCount: 0,
  addCartParam: {
//  user_id: 1,
    token:JSON.parse(localStorage.getItem("personInfo")) ? JSON.parse(localStorage.getItem("personInfo")).token :"",
    goods_id: 0,
    nums: 1
  },
  addCartStatus: "",
  userInfo: {},
  userInfoParam: {
    user_id: 0
  }
};

const actions = {
  goodDetail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      state.getGoodDetailParam.id = payload.goodsId;
      // state.getGoodDetailParam.city = payload.city;
      setSessionKey(state.getGoodDetailParam);
      Api.goodDetail(state.getGoodDetailParam)
        .then(
          res => {
            commit({
              type: "GOOD_DETAIL",
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
  getUserInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      state.userInfoParam.user_id = payload.user_id;
      setSessionKey(state.userInfoParam);
      Api.getUserInfo(state.userInfoParam)
        .then(
          res => {
            commit({
              type: "GET_USER_INFO",
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
  goodCaseDetailInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      state.getGoodCaseDetailInfoParam.id = payload.goodsId;
      var append = payload.hasOwnProperty("append") ? payload.append : false;
      state.getGoodCaseDetailInfoParam.pageNum = payload.hasOwnProperty(
        "pageNum"
      )
        ? payload.pageNum
        : 1;
      setSessionKey(state.getGoodCaseDetailInfoParam);
      Api.goodCaseDetailInfo(state.getGoodCaseDetailInfoParam)
        .then(
          res => {
            commit({
              type: "GOOD_CASE_DETAIL_INFO",
              append: append,
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
  addCart({ commit }, payload) {
    return new Promise((resolve, reject) => {
      state.addCartParam.user_id = payload.hasOwnProperty("user_id")
        ? payload.user_id
        : JSON.parse(localStorage.getItem("personInfo")).user_id;
      state.addCartParam.goods_id = payload.hasOwnProperty("goodsId")
        ? payload.goodsId
        : 0;
      state.addCartParam.nums = payload.hasOwnProperty("nums")
        ? payload.nums
        : 1;
      setSessionKey(state.addCartParam);
      Api.addCart(state.addCartParam)
        .then(
          res => {
            commit({
              type: "ADD_CART",
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
  [types.GOOD_DETAIL](state, payload) {
    state.goodDetail = payload.res.data;
    state.goodDetail.goods_url.forEach((element, index) => {
      state.goodDetail.goods_url[index] = {
        src: imgPath + element,
        w: 400,
        h: 600
      };
    });
    state.goodDetail.grade = Math.round(state.goodDetail.scoreNum) % 6;
    state.goodDetail.name = filterContet(state.goodDetail.name, 50);
  },
  [types.ADD_CART](state, payload) {
    state.addCartStatus = payload.res;
  },
  [types.GET_USER_INFO](state, payload) {
    state.userInfo = payload.res.data;
  },
  [types.GOOD_CASE_DETAIL_INFO](state, payload) {
    state.goodCaseDetailInfoDataCount = payload.res.dataCount;
    if (
      !payload.append &&
      (payload.res.dataCount <= state.getGoodCaseDetailInfoParam.pageSize &&
        payload.res.data.length < 1)
    ) {
      state.goodCaseDetailInfo = payload.res.data;
    } else {
      state.goodCaseDetailInfo = state.goodCaseDetailInfo.concat(
        payload.res.data
      );
    }
    state.goodCaseDetailInfo.forEach(element => {
      element.month = element.addTime.split("-")[1];
      element.day = element.addTime.split("-")[2];
      element.grade = Math.round(element.scoreNum) % 6;
      element.content = filterContet(element.content, 40);
			if(!element.before_url){ 
				element.before_url=element.before_video_pic
			}
			
			if(!element.after_url){
				element.after_url=element.after_video_pic
			}
			
			if(element.before_url.indexOf("http")>-1){//app上传的视频和图片自带域名,无需加上域名
				element.imgHttp=""
			}else{
				element.imgHttp=imgPath
			}
			
			if(element.after_url.indexOf("http")>-1){
				element.imgHttp=""
			}else{
				element.imgHttp=imgPath
			}
			
			element.imgs = [
				{ src: element.imgHttp + element.before_url, w: 400, h: 600 },
				{ src: element.imgHttp + element.after_url, w: 400, h: 600 }
			];
			
    });
  }
};

export default {
  state,
  actions,
  mutations
};
