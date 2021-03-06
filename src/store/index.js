import vue from 'vue'
import vuex from 'vuex'
import demo1 from './module/demo1'
import login from './module/login'
import list from './module/list'
import detailList from './module/detailList' 
import detail from './module/detail' 
import address from './module/address' 
import home from './module/home' // 首页
import specialEdition from './module/specialEdition'
import {get, post} from '../axios/index'
import api from '../axios/api.js'
vue.use(vuex)

/**
 * 公共模块
 */
const state = {
  showToTop: false, // 返回顶部按钮
  bgr: false, // 脚部背景色
  showMenu: false, // 主菜单
  showFooter: true,
  aboutDetail: { // 关于我们
    url: require('../assets/image/about.png'),
    txt: '  中国广东省深圳市尚盟文化发展有限公司（简称尚盟文化）；以珠宝为主业务的全方位零售营运平台；尚盟文化认为现时传统零售珠宝行业的两大核心是注重婚庆及材质投资属性；而消费者需求点已从材质转移到款式设计上；雷同旧式设计款式依旧泛滥市场；珠宝回归时装搭配的属性正在兴起；尚盟文化诣在传播珠宝与服装搭配的时尚文化；坚持多品类搭配风格与多元场景应用属性为经营核心；同时以高性价比满足女性不同场景服装搭配需求；通过珠宝与服装专业搭配应用，令女性更显独立自信的价值。',
    // text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
  },
  contactDetail: { // 联系我们
    phone: '+86 136 3105 7040 / +86 755 8217 4455',
    address: '中国广东省深圳市罗湖区南湖路3005号国贸商住大厦16F 518001',
    time: '9:00~18:00',
    privacyPolicy: '本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。 您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。1. 适用范围(a) 在您注册本应用帐号时，您根据本应用要求提供的个人注册信息(b) 在您使用本应用网络服务',
    termsConditions: '该部分文案待提供完善...',
    returnRefund: '',
    resetPassWord: '',
    orderSend: '我们的商品由优质物流公司进行全球配送；会在周一至周五 10：00-17：00之间（国定假日除外）直接送达您府上。请注意，根据每个订单包裹的大小、重量和配送地的不同，运费及时间会有所区别；若你希望了解订单商品的物流状态，可根据我们订单物流信息，及时查询订单商品最新动态，谢谢您的惠购，祝您生活美好！',
    advisoryCategory: [{label:'产品体验',value:'Product Usage'},{label:'服务体验',value:'Service Experience'},{label:'购买问题',value:'Purchasing'}, {label:'退款/退货',value:' Refund/Return'},{label:'售后问题',value:'After Sales'},{label:'发票业务',value:'invoice Sales'},{label:'其他问题',value:'Others'}],
    invoice: '尊敬的阁下，感谢您的惠购；若您购买商品需要开据发票业务；请您点击--客户服务内容--联系客服--咨询类别--发票业务--问题反馈--将商品订单号、公司名称、公司税号、公司地址相关信息填写发送；我们客服将会联系您完善相关服务，感谢您的配合，祝生活愉快！'
  },
  active_color: false, // 选中的颜色
  active_color_contact: false, // 选中的颜色
  showContact: true, // 显示客服和关于我们
  fontColor: false,
  writeBgr: false,
  showSubMenu: false,
  showLoved: false,
  showbag: false,
  showLoading: false
  
}
const actions = {
  // 关于我们
  queryAboutDetail (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        post(api.getAboutUs, {}).then((res) => {
          context.commit('aboutDetail', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 联系我们
  queryContactDetail (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(api)
        get(api.querySituationList, '123').then((res) => {
          context.commit('contactDetail', res.data)
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 提交重置密码
  savePassWord (context, param) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(api)
        get(api.querySituationList, '123').then((res) => {
          resolve(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }, 1000)
    })
  },
  // 收藏
  toLoved (context, param) {
    return new Promise((resolve, reject) => {
      post(api.insertLove, param).then((res) => {         
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 取消收藏
  cancelLove (context, param) {
    return new Promise((resolve, reject) => {
      post(api.updateLove, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 微信
  wechatPay (context, param) {
    return new Promise((resolve, reject) => {
      get(api.wechatPay, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  // 查库存
  getOrderInventory (context, param) {
    return new Promise((resolve, reject) => {
      post(api.getOrderInventory, param).then((res) => {
        resolve(res)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
}

const mutations = {
  lovedNumber (state, data) {
    state.lovedNumber = data
  },
  showToTop (state, data) {
    state.showToTop = data
  },
  bgr (state, data) {
    state.bgr = data
  },
  showMenu(state, data) { 
    state.showMenu = data
  },
  aboutDetail(state, data) { 
    state.aboutDetail = data
  },
  active_color(state, data) { 
    state.active_color = data
  },
  active_color_contact(state, data) { 
    state.active_color_contact = data
  },
  contactDetail(state, data) { 
    state.contactDetail = data
  },
  showContact(state, data) { 
    state.showContact = data
  },
  fontColor(state, data) { 
    state.fontColor = data
  },
  writeBgr(state, data) { 
    state.writeBgr = data
  },
  showFooter(state, data) { 
    state.showFooter = data
  },
  showSubMenu(state, data) { 
    state.showSubMenu = data
  },
  showLoved(state, data) { 
    state.showLoved = data
  },
  showbag(state, data) { 
    state.showbag = data
  },
  showLoading(state, data) { 
    state.showLoading = data
  },
}
const getters = {}
export default new vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    demo1,
    login,
    list,
    detailList,
    detail,
    address,
    home,
    specialEdition
  }
})