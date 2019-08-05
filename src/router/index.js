import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import login from "./../components/login"; // 登录 注册
import resetPassEmail from "./../components/login/resetPassEmail"; // 重置密码
import resetPassMessage from "./../components/login/resetPassMessage"; // 重置密码
import specialEdition from "./../components/specialEdition"; // 特辑列表
import detailList from "./../components/specialEdition/detailList"; // 特辑列表详情
import detail from "./../components/detail"; // 特辑列表详情
import address from "./../components/address"; // 收货地址
import confirmAddress from "./../components/address/confirmAddress"; // 收货确认
import selectAddress from "./../components/address/selectAddress"; // 收货地址列表 
import editAddress from "./../components/address/editAddress"; // 修改收货地址
import home from "./../components/home"; // 收货确认
import about from "./../components/static/about"; // 关于我们
import contact from "./../components/static/contact"; // 联系我们
import brandList from "./../components/home/brand"; // 品牌种类
import productList from "./../components/home/product"; // 产品系列列表
import categoryList from "./../components/home/category"; // 类别列表
import loved from "./../components/login/loved"; // 喜爱
import bag from "./../components/login/bag"; // 购物袋
import search from "./../components/login/search"; // 搜索界面
import user from "./../components/user"; // 用户界面
import workspace from '../common.js';
import order from "./../components/order/orderdetail"; // 用户界面
import reject from "./../components/user/reject"; // 退货退款界面
import cancelOrder from  "./../components/user/cancelOrder"; //退货订单详情
import demoCom from "./../components/user/demo"
import paySuccess from "./../components/order/paySuccess"
Vue.use(Router);

const router = new Router({
    routes: [{
            // 登录 注册
            path: "/",
            redirect: "/home"
        },
        {
            // 登录 注册
            path: "/login/:id?",
            name: "login",
            component: login,
            props: true,
            meta: {
                fontColor: true
            }
        },
        {
            // 重置密码
            path: "/resetPassEmail",
            name: "resetPassEmail",
            component: resetPassEmail,
            meta: {
                fontColor: true
            }
        },
        {
            // 重置密码
            path: "/resetPassMessage",
            name: "resetPassMessage",
            component: resetPassMessage,
            meta: {
                fontColor: true
            }
        },
        {
            // 特辑列表
            path: "/specialEdition/:id?",
            name: "specialEdition",
            component: specialEdition,
            meta: {
                flag: "list",
                showToTop: true
            },
            // beforeEnter: (to, from, next) => {
            //     let status = workspace.getCookie().name
            //     if(status !== '' && status !== null && status !== undefined) {
            //         next()
            //     } else {
            //         next('/login')
            //     }
            // }
        },
        {
            // 特辑列表详情
            path: "/detailList/:id?",
            name: "detailList",
            component: detailList,
            meta: {
                flag: "list",
                showToTop: true
            },
            props: true
        },
        {
            // 详情
            path: "/detail/:id?",
            name: "detail",
            component: detail,
            props: true,
            meta: {
                fontColor: true,
                userId: false
            }
        },
        {
            // 地址注册
            path: "/address/:id?",
            name: "address",
            component: address,
            props: true,
            meta: {
                fontColor: true
            }
        },
        {
            // 地址确认
            path: "/confirmAddress",
            name: "confirmAddress",
            component: confirmAddress
        },
        {
            // 首页
            path: "/home",
            name: "home",
            component: home,
            meta: {
                flag: "list",
                showToTop: true
            }
        },
        {
            // 关于我们
            path: "/about",
            name: "about",
            component: about,
            meta: {
                showToTop: true,
                flag: "list"
            }
        },
        {
            // 联系我们
            path: "/contact/:id?",
            name: "contact",
            component: contact,
            props: true,
            meta: {
                showToTop: true
            }
        },
        {
            // 品牌种类
            path: "/brandList",
            name: "brandList",
            component: brandList,
            meta: {
                flag: "list",
                userId: false
            },
            // beforeEnter: (to, from, next) => {
            //     let status = workspace.getCookie().name
            //     if(status !== '' && status !== null && status !== undefined) {
            //         next()
            //     } else {
            //         next('/login')
            //     }
            // }
        },
        {
            // 产品种类
            path: "/productList/:id?",
            name: "productList",
            component: productList,
            meta: {
                flag: "list",
                userId: false
            },
            // beforeEnter: (to, from, next) => {
            //     let status = workspace.getCookie().name
            //     if(status !== '' && status !== null && status !== undefined) {
            //         next()
            //     } else {
            //         next('/login')
            //     }
            // }
        },
        {
            // 类别列表
            path: "/categoryList/:id?",
            name: "categoryList",
            component: categoryList,
            meta: {
                flag: "list",
                userId: false
            },
            // beforeEnter: (to, from, next) => {
            //     let status = workspace.getCookie().name
            //     if(status !== '' && status !== null && status !== undefined) {
            //         next()
            //     } else {
            //         next('/login')
            //     }
            // }
        },
        {
            // 喜爱物品
            path: "/loved",
            name: "loved",
            component: loved,
            meta: {
                fontColor: true,
                userId: true
            }
        },
        {
            // 购物袋
            path: "/bag",
            name: "bag",
            component: bag,
            meta: {
                fontColor: true,
                userId: true
            }
        },
        {
            // 收货地址列表
            path: "/selectAddress/:id?",
            name: "selectAddress",
            component: selectAddress,
            props: true,
            meta: {
                fontColor: true
            }
        },
        {
            // 收货地址列表
            path: "/search",
            name: "search",
            component: search
        },
        { // 修改收货地址 
            path: "/editAddress",
            name: "editAddress",
            component: editAddress
        },
        { // 用户
            path: "/user/:id?",
            name: "user",
            component: user,
            props:true
        },
        {
            // 订单详情
            path: "/orderdetail",
            name: "order",
            component: order,
            props: true,
            // meta: {
            //     fontColor: true
            // }
        },
        {
            // 退货退款
            path: "/reject/:id?/:status?",
            name: "reject",
            component: reject,
            props: true,
            // meta: {
            //     fontColor: true
            // }
        },
        {
            // 退货退款详情
            path: "/cancelOrder/:id?",
            name: "cancelOrder",
            component: cancelOrder,
            props: true
        },
        {
            path:'/demo',
            name:'demo',
            component: demoCom,
            props: true
        },
        {
            path:'/paySuccess/:id?',
            name:'paySuccess',
            component: paySuccess,
            props: true
        }
    ]
});
// 全局路由守卫
router.beforeEach((to, from, next) => {
    const showFooter = ['/search', '/loved', '/bag']
    let needFooter = showFooter.some(item => to.fullPath.indexOf(item) > -1)
    store.commit("showFooter", !needFooter)
    store.commit("active_color_contact", to.path.indexOf("/contact") > -1 || false)
    store.commit("showContact", !to.path.indexOf("/contact") > -1)
    store.commit("showToTop", to.meta.showToTop? true: false)
    store.commit("fontColor", to.meta.showToTop? false: true);
    store.commit("bgr", to.meta.flag? true: false)
    store.commit("active_color", to.path === "/about" || false)
    store.commit("fontColor", to.meta.fontColor? true: false)
    store.commit("writeBgr", to.meta.writeBgr? true: false)
    store.commit("showLoved", to.fullPath.indexOf("/loved") > -1? true: false)
    store.commit("showLoved", to.fullPath.indexOf("/bag") > -1?true: false)
    next(); // 必须使用 next ,执行效果依赖 next 方法的调用参数
});
export default router;