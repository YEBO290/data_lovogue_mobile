import {get, post} from '../../axios/index'
import api from '../../axios/api.js'
const state = {
  country: [
    {
      value: '1',
      label: '中国'
    }, {
      value: '2',
      label: '美国'
    }
  ],
  provinceList: [
    {
      value: '1',
      label: '广东'
    }, {
      value: '2',
      label: '江西'
    }, {
      value: '3',
      label: '湖南'
    }
  ],
  cityList: [
    {
      value: '1',
      label: '广州'
    }, {
      value: '2',
      label: '深圳'
    }, {
      value: '3',
      label: '东莞'
    }
  ],
  areaList: [
    {
      value: '1',
      label: '福田区'
    }, {
      value: '2',
      label: '龙华区'
    }, {
      value: '3',
      label: '罗湖区'
    }
  ],
  // 确认订单详情
  confirmData: {
    baseInfo: [{
      url: require('../../assets/logo.png'),
      title: 'Consectetur',
      desc: 'Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.',
      number: 1,
      price: 'xxx',
    },
    {
      
      url: require('../../assets/logo.png'),
      title: 'Consectetur',
      desc: 'Consectetur adipiscing elit.',
      number: 1,
      price: 'xxx',
    }], 
    name: '张三',
    phone: '13800138000',
    address: '中国 xxxxxx省 xxxxxx市 xxxxxx区 xxxxxx路 xxxxx号',             
    totalNumber: 2,
    totalPrice: 120,
    way: '免邮'
},
// 收货地址列表
addressList: []

}
const actions = {
  // 国家
  queryCountry (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get(api.querySituationList, '123').then((res) => {
          context.commit('country', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 省份
  queryProvince (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          context.commit('queryProvince', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 城市
  queryCity (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          context.commit('queryCity', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 行政区
  queryArea (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          context.commit('queryArea', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  }, 
  // save address
  toSave (context, param) {
    return new Promise((resolve, reject) => {
        post(api.insertAddress, param).then((res) => {
          // context.commit('colorList', res.data)
          resolve(res)
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  // 编辑地址
  editAddress (context, param) {
    return new Promise((resolve, reject) => {
        post(api.updateAddress, param).then((res) => {
          // context.commit('colorList', res.data)
          resolve(res)
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  // 确认订单详情
  detailConfirmInfo (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('confirmDetailData', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 立即支付
  toBuy (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('confirmDetailData', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 收货地址列表查询
  queryAddressList(context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        post(api.getScreenAddress, param).then((res) => {
          context.commit('addressList', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  }
}

const mutations = {
  country (state, data) {
    state.country = data
  },
  queryProvince (state, data) {
    state.provinceList = data
  },
  queryCity (state, data) {
    state.cityList = data
  },
  queryArea (state, data) {
    state.areaList = data
  },
  confirmDetailData (state, data) {
    state.confirmData = data
  },
  addressList (state, data) {
    state.addressList = data
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