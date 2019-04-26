import {get, post} from '../../axios/index'
import api from '../../axios/api.js'
const state = {
  // 轮播图
  imgList: 6, // 后期改成 []
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
  }],
  specialImg:  []

}
const actions = {
  // 查询轮播图
  imgList (context, param) {
    return new Promise((resolve, reject) => {
      let params = param || {}
      post(api.getScreenFeature, params).then((res) => {
        // 
        context.commit('imgList', res.data)
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  querySpecialImg (context, param) {
    return new Promise((resolve, reject) => {
      let params = param || {}
      post(api.getScreenFeature, params).then((res) => {
        // 
        context.commit('specialImg', res.data)
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
      })
    })
  }
}

const mutations = {
  imgList (state, data) {
    state.imgList = data
  },
  specialImg (state, data) {
    state.specialImg = data
  },
  
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