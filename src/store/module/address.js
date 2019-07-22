import {get, post} from '../../axios/index'
import api from '../../axios/api.js'
const state = {
  country: [],
  provinceList: [],
  cityList: [],
  areaList: [],
  // 确认订单详情
  confirmData: {
    data: [],
    price: 0,
    amount: 0
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
      let params = param || {}
      post(api.getAddress, params).then((res) => {
        context.commit('queryProvince', res.data)
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 城市
  queryCity (context, param) {
    return new Promise((resolve, reject) => {
      let params = param || {}
      post(api.getAddress, params).then((res) => {
        context.commit('queryCity', res.data)
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 行政区
  queryArea (context, param) {
    return new Promise((resolve, reject) => {
      let params = param || {}
      post(api.getAddress, params).then((res) => {
        context.commit('queryArea', res.data)
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
      })
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
      post(api.getScreenorder, param).then((res) => {
        // 
        context.commit('confirmDetailData', res)
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 取消订单
  cancelOrder (context, param) {
    return new Promise((resolve, reject) => {
      post(api.updataorder, param).then((res) => {
        // 
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 立即支付
  toBuy (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        get('api/v1/users/my_address/address_edit_before', param).then((res) => {
          // 
          context.commit('confirmDetailData', res)
          resolve(res)
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
  },
   // 提交退货信息
   insertReturn(context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        post(api.insertReturn, param).then((res) => {
          // context.commit('backData', res)
          resolve(res)
        }).catch((err) => {
          console.log(error)
        })
      }, 1000)
    })
  },
  // 获取订单信息
  getOrderDetail (context, param) {
    return new Promise((resolve, reject) => {
      post(api.getScreenorder, param).then((res) => {
        // 
        context.commit('orderDetailData', res)
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 退货订单查询
  getReturnOrderDetail (context, param) {
    return new Promise((resolve, reject) => {
      post(api.getScreenReturn, param).then((res) => {
        // 
        context.commit('returnOrderData', res)
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 退货修改
  updataReturnOrder (context, param) {
    return new Promise((resolve, reject) => {
      post(api.updataReturn, param).then((res) => {
        // context.commit('returnOrderData', res)
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },


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
  orderDetailData (state, data){
     state.orderData = data
  },
  returnOrderData (state, data){
    state.returnOrderData = data
  },
  addressList (state, data) {
    state.addressList = data
  },
  // backData (state, data) {
  //   state.backDataList = data
  // }
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