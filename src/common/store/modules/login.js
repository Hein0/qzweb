import Api from "../../api/api"
import * as types from "../mutation-types"
import local from "../../util/local"

const state = {
    login_name: '',
    login_status: false,
    login_token: '',
    login_account: '',
    login_password: '',
    must_update_role: '0'
}

const getters = {
    currentUser: state => {
        return {
            name: state.login_name,
            token: state.login_token,
            status: state.login_status
        }
    }
}

const actions = {
    loginIn({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Api.Login({
                "username": payload.name,
                "password": payload.password
            }).then(function (res) {
                res = res.data;
                commit({
                    type: "LOGIN_IN",
                    name: res.username,
                    account: res.account,
                    token: res.token,
                    status: true,
                    password: payload.password
                });
                local.set("username", res.username);
                local.set("token", res.token);
                local.set("account", res.account)
                local.set("must_update_role", res.must_update_role)
                resolve(res)
            }, err => {
                reject(err)
            })
        })
    },
    smsLogin({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Api.smsLogin({
                "phone": payload.phone,
                "sms_code": payload.smsCode
            }).then(function (res) {
                res = res.data;
                commit({
                    type: "LOGIN_IN",
                    name: res.username,
                    account: res.account,
                    token: res.token,
                    status: true,
                    password: payload.password
                });
                local.set("username", res.username);
                local.set("token", res.token);
                local.set("account", res.account)
                local.set("must_update_role", res.must_update_role)
                resolve(res)
            }, err => {
                reject(err)
            })
        })
    },
    updateRole({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Api.updateRole({
                "role_type": payload.roleType,
            }).then(function (res) {
                resolve(res)
            }, err => {
                reject(err)
            })
        })
    },
    sendSms({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Api.sendSms({
                "phone": payload.phone,
            }).then(function (res) {
                resolve(res)
            }, err => {
                reject(err)
            })
        })
    },
}

const mutations = {
    [types.LOGIN_IN](state, payload) {
        state.login_name = payload.name;
        state.login_token = payload.token;
        state.login_status = payload.status;
        state.login_account = payload.account;
        state.login_password = payload.password
    },
    getLocalData(state) {
        state.login_account = local.get("account");
        state.login_name = local.get("username");
        state.login_token = local.get("token");
        state.must_update_role = local.get("must_update_role");
    },
    [types.LOGIN_OUT](state) {
        state.login_token = "";
        // router.push("/accountLogin/generalLogin")
        local.set("username", "");
        local.set("token", "");
        local.set("password", "");
        local.set("account", "")
        local.set("must_update_role", '0')
    }
}


export default {
    state,
    getters,
    mutations,
    actions,
}
