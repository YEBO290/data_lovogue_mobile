import {get, post} from '../../axios/index'
import api from '../../axios/api.js'
const state = {
  // 轮播图
  queryImg: 6, // 后期改成 []
  productList: [{
    url: require('../../assets/logo.png'),
    series: '水系列',
    style: 'style01',
    name: '耳环',
    loved: true
  },
  {
    url: require('../../assets/logo.png'),
    series: '水系列',
    style: 'style01',
    name: '耳环',
    loved: true
  },
  {
    url: require('../../assets/logo.png'),
    series: '水系列',
    style: 'style01',
    name: '耳环',
    loved: false
  },
  {
    url: require('../../assets/logo.png'),
    series: '水系列',
    style: 'style01',
    name: '耳环',
    loved: false
  }],
  lists: [{
    title: 'Lorem ipsum dolor',
    style: 'style01',
    url: require('../../assets/logo.png')
  },{
    title: 'Lorem ipsum dolor',
    style: 'style01',
    url: require('../../assets/logo.png')
  }],
  specialEditionList: [{  // 特辑
    name: '耳环',
    url: require('../../assets/logo.png')
  },
  {
    name: '戒指',
    url: require('../../assets/logo.png')
  },
  {
    name: '项链',
    url: require('../../assets/logo.png')
  },
  {
    name: '鞋包',
    url: require('../../assets/logo.png')
  }],
  categoryList: [{  // 类别
    name: '耳环',
    url: require('../../assets/logo.png'),
    price: 30,
    loved: true
  },
  {
    name: '戒指',
    url: require('../../assets/logo.png'),
    price: 51,
    loved: true
  },
  {
    name: '项链',
    url: require('../../assets/logo.png'),
    price: 30,
    loved: true
  },
  {
    name: '鞋包',
    url: require('../../assets/logo.png'),
    price: 30,
    loved: false
  }],
  brandList: [{  // 品牌
    name: '耳环',
    url: require('../../assets/logo.png')
  },
  {
    name: '戒指',
    url: require('../../assets/logo.png')
  },
  {
    name: '项链',
    url: require('../../assets/logo.png')
  },
  {
    name: '鞋包',
    url: require('../../assets/logo.png')
  }], 
  aboutList: [{  // 关于我们
    name: '耳环',
    url: require('../../assets/logo.png')
  },
  {
    name: '戒指',
    url: require('../../assets/logo.png')
  },
  {
    name: '项链',
    url: require('../../assets/logo.png')
  },
  {
    name: '鞋包',
    url: require('../../assets/logo.png')
  }] 

}
const actions = {
  // 查询轮播图
  queryImg (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, param).then((res) => {
          // 
          context.commit('queryImg', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 产品系列
  queryProductList (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('productList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 列表
  queryLists (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('lists', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 类别
  queryCategoryList (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('categoryList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 关于我们
  queryAboutList (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('aboutList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 品牌
  queryBrandList (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('brandList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 特辑
  querySpecialEditionList (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('specialEditionList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 品牌列表载入更多
  queryMoreBrandList (context, param) {
    debugger
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('brandList', res.data)
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
  },
  // 产品系列
  productList (state, data) {
    state.productList = data
  },
  lists (state, data) {
    state.lists = data
  },
  // 类别
  categoryList (state, data) {
    state.categoryList = data
  },
  // 品牌
  brandList (state, data) {
    state.brandList = data
  },
  // 关于我们
  aboutList (state, data) {
    state.aboutList = data
  },
  // 特辑
  specialEditionList (state, data) {
    state.specialEditionList = data
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