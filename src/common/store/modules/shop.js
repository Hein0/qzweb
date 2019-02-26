import Api from "../../api/api";
import * as types from "../mutation-types";
import setSessionKey from "../../js/setSessionKey.js";
import sliceArray from "../../util/sliceArray.js";
import filterContet from "../../util/filter.js";

const state = {
	allCategory: [],
	projectParam: {
		parentId: 0
	},
	regionList: [],
	regionParam: {
		id: 0
	},
	hospitalSortList: [],
	hospitalSortListParam: {
		user_id: 0
	},
	goodsList: [],
	goodsListParam: {
		pageNum: 0,
		pageSize: 10,
		type: 1,
		catId: 0,
		code: ""
	},
	AttentionParam: {
		attention_id: "",
		attentioned_id: "",
		attention_type: 1,
		attentioned_type: 2
	},
	cancelAttentionParam: {
		attention_id: "",
		attentioned_id: "",
		status: 2
	}
};

const actions = {
	project({commit}, payload) {
		return new Promise((resolve, reject) => {
			setSessionKey(state.projectParam);
			Api.allCategory(state.projectParam)
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
	region({commit}, payload) {
		return new Promise((resolve, reject) => {
			setSessionKey(state.regionParam);
			Api.getRegionList(state.projectParam)
				.then(
					res => {
						commit({
							type: "REGION_LIST",
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
	hospitalSortList({commit}, payload) {
		return new Promise((resolve, reject) => {
			state.hospitalSortListParam.user_id = payload.hasOwnProperty("user_id") ?
				payload.user_id :
				0;
			setSessionKey(state.hospitalSortListParam);
			Api.getHospitalSortList(state.hospitalSortListParam)
				.then(
					res => {
						commit({
							type: "HOSPITAL_SORT_LIST",
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
	goodsList({commit}, payload) {
		return new Promise((resolve, reject) => {
			let type = payload.hasOwnProperty("searchType") ? payload.searchType : "";
			var append = payload.hasOwnProperty("append") ? payload.append : false;
			if(type == 1) {
				state.goodsListParam.type = type;
				delete state.goodsListParam.catId;
				state.goodsListParam.pageNum = 1;
				if(payload.code) {
					state.goodsListParam.code = payload.code;
				} else {
					delete state.goodsListParam.code;
					delete state.goodsListParam.type;
				}
			} else if(type == 2) {
				state.goodsListParam.type = type;
				delete state.goodsListParam.code;
				state.goodsListParam.catId = payload.catId;
				state.goodsListParam.pageNum = 1;
			} else if(type == 3) {
				state.goodsListParam.pageNum = payload.hasOwnProperty("pageNum") ?
					payload.pageNum :
					1;
			} else {
				delete state.goodsListParam.catId;
				delete state.goodsListParam.code;
				delete state.goodsListParam.type;
				state.goodsListParam.pageNum = 1;
			}
			setSessionKey(state.goodsListParam);
			Api.getGoodsList(state.goodsListParam)
				.then(
					res => {
						commit({
							type: "GOODS_LIST",
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
	insertAttentionRecord({commit}, payload) {
		return new Promise((resolve, reject) => {
			state.AttentionParam.attention_id = payload.hasOwnProperty("attention_id") ?
				payload.attention_id :
				"";
			state.AttentionParam.attentioned_id = payload.hasOwnProperty(
					"attentioned_id"
				) ?
				payload.attentioned_id :
				"";
			setSessionKey(state.AttentionParam);
			Api.insertAttentionRecord(state.AttentionParam)
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
	cancleOrDeleteAttention({commit}, payload) {
		return new Promise((resolve, reject) => {
			state.cancelAttentionParam.attention_id = payload.hasOwnProperty(
					"attention_id"
				) ?
				payload.attention_id :
				"";
			state.cancelAttentionParam.attentioned_id = payload.hasOwnProperty(
					"attentioned_id"
				) ?
				payload.attentioned_id :
				"";
			setSessionKey(state.cancelAttentionParam);
			Api.cancleOrDeleteAttention(state.cancelAttentionParam)
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
	}
};

const mutations = {
	resetParam(state) {
		state.projectParam = {
			parentId: 0
		};
		state.regionParam = {
			id: 0
		};
		state.hospitalSortListParam = {};
		state.goodsListParam = {
			pageNum: 1,
			pageSize: 10,
			type: 1,
			catId: 0,
			code: ""
		};
		state.allCategory = [];
		state.regionList = [];
		state.hospitalSortList = [];
		state.goodsList = [];
	},
	resetGoodsList(state) {
		state.goodsList = [];
	},
	[types.ALL_CATEGORY](state, payload) {
		state.allCategory = sliceArray(payload.res.data, 6);
	},
	[types.REGION_LIST](state, payload) {
		state.regionList = payload.res.data;
	},
	[types.HOSPITAL_SORT_LIST](state, payload) {
		state.hospitalSortList = sliceArray(payload.res.data, 3);
		state.hospitalSortList.forEach(item => {
			item.forEach(childItem => {
				childItem.name = filterContet(childItem.name, 11);
				childItem.is_attention = parseInt(childItem.is_attention);
			});
		});
	},
	[types.GOODS_LIST](state, payload) {
		if(payload.res.data) {
			payload.res.data.forEach(element => {
				if(element.keyword) {
					element.keyword = element.keyword.split(",");
				}
				element.name = filterContet(element.name, 30);
			});
		}
		if(!payload.append &&
			payload.res.dataCount <= state.goodsListParam.pageSize
		) {
			state.goodsList = payload.res.data;
		} else if(!payload.res.data) {
			state.goodsList = [];
		} else {
			state.goodsList = state.goodsList.concat(payload.res.data);
		}
	}
};

export default {
	state,
	actions,
	mutations
};