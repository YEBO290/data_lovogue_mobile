import {get, post} from '../../axios/index'
import api from '../../axios/api.js'
const state = {
  userName: '',
  phone: '',
  lovesList: [],
  searchList: {
    data: [],
    total: 0
  },
  bagList: [],
  recommendList: [],
  lovedNumber: 0, // 成功收藏的数量
  shopBagNumber: 0, // 购物袋数量

}
const actions = {
  // 登录
  toLogin (context, param) {
    return new Promise((resolve, reject) => {
      post(api.login, param).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  // 注册
  toRegister (context, param) {
    return new Promise((resolve, reject) => {
      post(api.insertUser, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  // 修改用户信息
  updateUser (context, param) {
    return new Promise((resolve, reject) => {
      post(api.updateUser, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
   // 邮箱重置密码
   resetPwEmail (context, param) {
    return new Promise((resolve, reject) => {
      post(api.resetPassword, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
   // 短信重置密码
   resetPwMessage (context, param) {
    return new Promise((resolve, reject) => {
      post(api.resetPasswordMessage, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  // 获取用户登陆信息
  queryUseLogin(context, param) {
    return new Promise((resolve, reject) => {
      post(api.getScreenUser, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  // 旧密码重置新密码
  changePass (context, param) {
    return new Promise((resolve, reject) => {
      post(api.setPassRe, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  // 喜爱的列表
  queryLovedList (context, param) {
    return new Promise((resolve, reject) => {
      post(api.getScreenLove, param).then((res) => {
        context.commit('lovesList', res.data)
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 购物车的列表
  queryBagList (context, param) {
    return new Promise((resolve, reject) => {
        post(api.getScreenCar, param).then((res) => {
          context.commit('bagList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  // 推荐列表
  queryRecommendList (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, '123').then((res) => {
          context.commit('recommendList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 删除喜爱物品
  delLove (context, param) {
    return new Promise((resolve, reject) => {
        post(api.updateLove, param).then((res) => {
          // context.dispatch('queryLovedList')
          resolve(res)
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  // 喜爱物品加入购物袋
  addBag (context, param) {
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
  // 删除购物袋物品
  delBag (context, param) {
    return new Promise((resolve, reject) => {
      post(api.updateCar, param).then((res) => {
        // context.dispatch('queryLovedList')
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 购物袋立即支付
  toPay (context, param) {
    return new Promise((resolve, reject) => {
      post(api.insertorder, param).then((res) => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 搜索的列表
  querySearchList (context, param) {
    return new Promise((resolve, reject) => {
      post(api.searchProduct, param).then((res) => {
        context.commit('searchList', res)
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 客服
  saveCusService (context, param) {
    return new Promise((resolve, reject) => {
      post(api.insertComments, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
}

const mutations = {
  userName (state, data) {
      state.userName = data
  },
  lovesList (state, data) {
    state.lovesList = data
    state.lovedNumber = data.length
  },
  bagList (state, data) {
    state.bagList = data
    state.shopBagNumber = data.length
  },
  recommendList (state, data) {
    state.recommendList = data
  },
  searchList (state, data) {
    state.searchList = data
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