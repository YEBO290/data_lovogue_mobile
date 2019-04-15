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
  }],
  colorList: [
    {
      value: '1',
      label: '红色'
    }, {
      value: '2',
      label: '蓝色'
    }, {
      value: '3',
      label: '白色'
    }, {
      value: '4',
      label: '彩色'
    }, {
      value: '5',
      label: '紫色'
    }
  ],
  sizeLists:[{
    name: 'S',
    title: '预售7个工作日'
  },
  {
    name: 'M',
    title: '预售15个工作日'
  },
  {
    name: 'L',
    title: ''
  }],
  detailInfo: ''

}
const actions = {
  // 查询详情
  queryDetail (context, param) {
    return new Promise((resolve, reject) => {
      post(api.getDetails, param).then((res) => {
        context.commit('detailInfo', res.data)
        resolve(res.product)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 查询轮播图
  queryImg (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.getDetails, param).then((res) => {
          context.commit('queryImg', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 颜色的下拉值
  queryColorList (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('colorList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 立即加购
  toBuy (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          // context.commit('colorList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 加入购物车
  toBag (context, param) {
    return new Promise((resolve, reject) => {
      post(api.insertCar, param).then((res) => {
        // 
        // context.commit('colorList', res.data)
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 补货通知
  toNotice (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          // context.commit('colorList', res.data)
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
  colorList (state, data) {
    state.colorList = data
  },
  detailInfo (state, data) {
    state.detailInfo = data
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