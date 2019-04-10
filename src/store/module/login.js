import {get, post} from '../../axios/index'
import api from '../../axios/api.js'
const state = {
  userName: 'admin',
  phone: 'admin',
  lovesList: [{
    url: require('../../assets/logo.png'),
    code: 12345,
    txt: '女神耳环',
    price: 230,
    color: '银色'
  },
  {
    url: require('../../assets/logo.png'),
    code: 12345,
    txt: '女神耳环',
    price: 230,
    color: '银色'
  },
  {
    url: require('../../assets/logo.png'),
    code: 12345,
    txt: '女神耳环',
    price: 230,
    color: '银色'
  },{
    url: require('../../assets/logo.png'),
    code: 12345,
    txt: '女神耳环',
    price: 230,
    color: '银色'
  }],
  searchList: [{
    url: require('../../assets/logo.png'),
    code: 12345,
    txt: '女神耳环',
    price: 230,
    color: '银色'
  },
  {
    url: require('../../assets/logo.png'),
    code: 12345,
    txt: '女神耳环',
    price: 230,
    color: '银色'
  },
  {
    url: require('../../assets/logo.png'),
    code: 12345,
    txt: '女神耳环',
    price: 230,
    color: '银色'
  },{
    url: require('../../assets/logo.png'),
    code: 12345,
    txt: '女神耳环',
    price: 230,
    color: '银色'
  }],
  bagList: [],
  // bagList: [{
  //   id: 1,
  //   url: require('../../assets/logo.png'),
  //   code: 1234344345,
  //   txt: '女神耳环',
  //   price: 230,
  //   color: '银色',
  //   size: 'M',
  //   pay: 0,
  //   num: 2
  // },
  // {
  //   id: 2,
  //   url: require('../../assets/logo.png'),
  //   code: 1233333335,
  //   txt: '女神耳环',
  //   price: 230,
  //   color: '银色',
  //   size: 'M',
  //   pay: 10,
  //   num:5
  // },
  // {
  //   id: 3,
  //   url: require('../../assets/logo.png'),
  //   code: 12333333345,
  //   txt: '女神耳环',
  //   price: 230,
  //   color: '银色',
  //   size: 'M',
  //   pay: 0,
  //   num:1
  // },{
  //   id: 4,
  //   url: require('../../assets/logo.png'),
  //   code: 1234333335,
  //   txt: '女神耳环',
  //   price: 230,
  //   color: '银色',
  //   size: 'M',
  //   pay: 8,
  //   num: 2
  // }],
  recommendList: [{
    url: require('../../assets/logo.png'),
    code: 12345,
    name: '女神耳环',
    price: 230,
    color: '银色'
  },
  {
    url: require('../../assets/logo.png'),
    code: 12345,
    name: '女神耳环',
    price: 230,
    color: '银色'
  },{
    url: require('../../assets/logo.png'),
    code: 12345,
    name: '女神耳环',
    price: 230,
    color: '银色'
  }]

}
const actions = {
  // 登录
  toLogin (context, param) {
    return new Promise((resolve, reject) => {
      post(api.login, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  // 喜爱的列表
  queryLovedList (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, '123').then((res) => {
          context.commit('lovesList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 购物车的列表
  queryBagList (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, '123').then((res) => {
          context.commit('bagList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 推荐列表
  queryRecommendList (context, param) {
    debugger
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
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, '123').then((res) => {
          // context.dispatch('queryLovedList')
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 喜爱物品加入购物袋
  addBag (context, param) {
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
  // 删除购物袋物品
  delBag (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, '123').then((res) => {
          // context.dispatch('queryLovedList')
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 购物袋立即支付
  toPay (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, '123').then((res) => {
          // context.dispatch('queryLovedList')
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 搜索的列表
  querySearchList (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, '123').then((res) => {
          context.commit('searchList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
}

const mutations = {
  userName (state, data) {
      state.userName = data
  },
  lovesList (state, data) {
    state.lovesList = data
  },
  bagList (state, data) {
    state.bagList = data
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