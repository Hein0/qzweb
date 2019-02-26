import axios from "axios"
import baseUrl from "./config"
import store from "../store"

axios.defaults.timeout = 50000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.transformRequest = [function (data) {
//     let ret = ''
//     for (let it in data) {
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     console.log(ret)
//     console.log(ret.substr(ret.length - 1, 1))
//     return ret
// }]

//http request 头部添加token

// axios.interceptors.request.use(
//   config => {
//     const token = JSON.parse(localStorage.getItem("personInfo")).token;
//     const user_id = JSON.parse(localStorage.getItem("personInfo")).user_id
//     if (token) {
//       config.headers.token = token
//       config.headers.user_id = user_id
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )

axios.interceptors.request.use(
  config => {
    let token, current, AppInfo;
    if (localStorage.getItem("personInfo")) {
      token = JSON.parse(localStorage.getItem("personInfo")).token;
      current = JSON.parse(localStorage.getItem("personInfo")).user_id;
    }

    // app 信息
    if (AppInfo = localStorage.getItem('AppInfo')) {
      AppInfo = JSON.parse(AppInfo);
    }
    if (token || current) {
      config.headers.current = current;
      config.headers.token = token;
    }

    if (AppInfo) {
      config.headers.system = AppInfo.system;
      config.headers.appversion = AppInfo.appVersion;
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

//http response
// axios.interceptors.response.use((res) => {
//
//   return res;
// }, err => {
//   if (err && err.response) {
//     const data = err.response.data;
//     // if (data.status_code == "401") {
//     //     store.commit("LOGIN_OUT");
//     // } else if (data.status_code == 400) {
//     //     store.commit("APP_MESSAGE", data.message);
//     // } else {
//     //     store.commit("APP_MESSAGE", "网络异常");
//     // }
//     return Promise.reject(data)
//   }
//   return Promise.reject(err)
// })

export default function fetch(method = "get", url, params, Url = baseUrl) {
  //baseUrl
  axios.defaults.baseURL = Url;
  return new Promise((resolve, reject) => {
    if (method == "get") {
      axios.get(url, {
        params: params
      })
        .then(response => {

          resolve(response.data)
          if (response.data.status == "9999") {
            var JsonObjStr = '{"viewName":"0"}';
            window.webkit.messageHandlers.gotoView.postMessage(JsonObjStr);
          }
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      axios.post(url, params)
        .then(response => {

          resolve(response.data);

          if (response.data.status == "9999") {
            var JsonObjStr = '{"viewName":"0"}';
            window.webkit.messageHandlers.gotoView.postMessage(JsonObjStr);
          }

        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    }
  })
}
