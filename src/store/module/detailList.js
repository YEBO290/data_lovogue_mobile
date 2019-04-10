import {get, post} from '../../axios/index'
import api from '../../axios/api.js'
const state = {
  // 轮播图
  queryImg: 6, // 后期改成 []
  recommendList: [{
    url: require('../../assets/logo.png'),
    text: 'Consectetur'
  },
  {
    url: require('../../assets/logo.png'),
    text: 'Consectetur'
  },
  {
    url: require('../../assets/logo.png'),
    text: 'Consectetur'
  },
  {
    url: require('../../assets/logo.png'),
    text: 'Consectetur'
  }]

}
const actions = {
  // 收藏
  toLoved (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, '123').then((res) => {
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 取消收藏
  cancelLove (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 查询轮播图
  queryImg (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('queryImg', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  }
}

const mutations = {
  queryImg (state, data) {
    state.queryImg = data
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