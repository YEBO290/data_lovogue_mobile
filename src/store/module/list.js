import {get, post} from '../../axios/index'
import api from '../../axios/api.js'
const state = {
  // 穿着列表
  situationList: [],
  // 颜色列表
  colorList: [],
  // 查看更多
  moreList: []


}
const actions = {
  actionA (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, param).then((res) => {
          context.commit('increment', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 按穿着场合列表
  querySituationList (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, '123').then((res) => {
          context.commit('situationList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 按颜色列表
  queryColorList (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          context.commit('colorList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 更多列表
  queryMoreList ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      commit('moreList')
      resolve()
      }, 1000)
    })
  }
}

const mutations = {
  increment (state, data) {
    state.phone = data
  },
  colorList (state, data) {
    state.colorList = data
  },
  situationList (state, data) {
    state.situationList = data
  },
  moreList (state, data) {
    state.moreList = data
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