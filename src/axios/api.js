const base = 'admin'
var service = {
  login: base + '/login', // 登录接口
  // 内容管理
  getScreenCmsManager: '/Cms/getScreenCmsManager',// 获取首页数据和导航数据
  getScreenFeature: '/Cms/getScreenFeature',// 获取特辑图片和埋点位置
  // 用户管理
  getScreenUser: '/CrmUser/getScreenUser', // 获取用户的数据
  getScreenAddress: '/CrmUser/getScreenAddress', // 获取收货地址
  insertUser: '/CrmUser/insertUser', // 添加用户数据
  insertAddress: '/CrmUser/insertAddress', // 添加收货地址
  updateUser: '/CrmUser/updateUser', // 修改用户数据
  updateAddress: '/CrmUser/updateAddress', // 修改收货地址
  // 购物管理
  getScreenLove: '/pmsShop/getScreenLove', // 获取挚爱数据
  getScreenCar: '/pmsShop/getScreenCar', // 获取购物车
  insertLove: '/pmsShop/insertLove', // 添加挚爱
  insertCar: '/pmsShop/insertCar', // 添加购物车
  updateLove: '/pmsShop/updateLove', // 修改挚爱数据（也是逻辑删除）
  updateCar: '/pmsShop/updateCar', // 修改购物车（也是逻辑删除）
  // 商品列表
  getScreen: '/pms/getScreen', // 获取商品信息
  getDetails: '/pms/getDetails', // 获取商品详情（有库存）

}
export default service