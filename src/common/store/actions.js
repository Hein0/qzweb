import APi from '../api/api'

export const  getAppVersion = async ({commit}) => {
  await APi.getAppVersion().then(res => {
    commit('GET_APP_VERSION')
  })
}



