const base = 'admin'
var service = {
    login: '/CrmUser/getScreenUser', // 登录接口
    // 内容管理
    getScreenCmsManager: '/Cms/getScreenCmsManager', // 获取首页数据和导航数据
    getScreenFeature: '/Cms/getScreenFeature', // 获取特辑图片和埋点位置
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
    getScreen: '/pms/getScreen', // 根据类别获取商品
    getDetails: '/pms/getDetails' ,// 获取商品详情（有库存）

    addInsertLove: '/pmsShop/insertLove',  // 添加挚爱
    getUserInsertLove: '/pmsShop/getScreenLove',  // 获取客户挚爱
    searchProduct: '/pms/searchProduct', // 搜索

    //密码修改
    resetPassword: '/CrmUser/insertPassword', //邮箱重置密码
    resetPasswordMessage: '/CrmUser/updateUser', // 短信重置密码
    // 特辑
    getScreenFeatureList: '/Cms/getScreenFeatureList', // 特辑列表
    // 菜单导航栏
    getNavigation: 'Cms/getNavigation',
    //关于我们
    getAboutUs:'/Cms/getAboutUs',
    // 旧密码改新密码
    setPassRe: 'CrmUser/setPassRe',
    insertComments: '/CrmUser/insertComments', // 客服
    getAddress: 'CrmUser/getAddress', // 省级
    payMessage: 'api/ali_pay/pay2', //支付
    insertorder: 'pms/insertorder', // 购物车立即支付-创建订单
    getScreenorder: 'pms/getScreenorder', // 获取订单
    wechatPay: 'api/wechat/pay2', // 微信支付
    recommend: 'pms/recommend', // 推荐列表
    updataorder: '/pms/updataorder', // 修改订单状态
    insertReturn: '/pms/insertReturn',  //提交退货信息
    getScreenReturn: '/pms/getScreenReturn',  //退货查询
    updataReturn: '/pms/updataReturn',  //退货修改
    getOrderInventory: '/pms/orderInventory',  //获取商品相应库存
    getScreenSelect:  'pms/getScreenSelect'  //商品筛选

}
export default service