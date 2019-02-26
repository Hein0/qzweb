import * as types from './mutation-types';

const mutations = {
  [types.GET_APP_VERSION](state, payload) {
    state.appVersion = paylaod
  },
  [types.GET_DEVICE_INFO](state, payload) {
    state.deviceInfo = payload.data
  },
  [types.GET_VIDEO_INFO](state, payload) {
    state.nativeToH5Json = payload.data
  },
	[types.GET_VIDEO_DATA](state, payload) {
		state.nativeToH5Video = payload.data
	},
	
  [types.GET_VIDEO_OBJ](state, payload) {
    state.H5Json = payload.data
  },
  [types.CLEAR_VIDEO_INFO](state, payload) {
    state.nativeToH5Json = '';
  },
  [types.PAY_MES] (state, payload) {
    state.payMes = payload;
  }

}

export default mutations
