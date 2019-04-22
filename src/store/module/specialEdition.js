import {get, post} from '../../axios/index'
import api from '../../axios/api.js'
const state = {
  // 特辑列表
  specialList: []


}
const actions = {
  // 特辑列表
  querySpecialList (context, param) {
    return new Promise((resolve, reject) => {
        let params = param || {}
        post(api.getScreenFeatureList, params).then((res) => {
          context.commit('specialList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
    })
  }
}

const mutations = {
    specialList (state, data) {
        state.specialList = data
    }
  
}
const getters = {
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}