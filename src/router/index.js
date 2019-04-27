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
import workspace from '../common.js'
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
            beforeEnter: (to, from, next) => {
                let status = workspace.getCookie().name
                if(status !== '' && status !== null && status !== undefined) {
                    next()
                } else {
                    next('/login')
                }
            }
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
                fontColor: true
            }
        },
        {
            // 地址注册
            path: "/address",
            name: "address",
            component: address,
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
                flag: "list"
            },
            beforeEnter: (to, from, next) => {
                let status = workspace.getCookie().name
                if(status !== '' && status !== null && status !== undefined) {
                    next()
                } else {
                    next('/login')
                }
            }
        },
        {
            // 产品种类
            path: "/productList/:id?",
            name: "productList",
            component: productList,
            meta: {
                flag: "list"
            },
            beforeEnter: (to, from, next) => {
                let status = workspace.getCookie().name
                if(status !== '' && status !== null && status !== undefined) {
                    next()
                } else {
                    next('/login')
                }
            }
        },
        {
            // 类别列表
            path: "/categoryList/:id?",
            name: "categoryList",
            component: categoryList,
            meta: {
                flag: "list"
            },
            beforeEnter: (to, from, next) => {
                let status = workspace.getCookie().name
                if(status !== '' && status !== null && status !== undefined) {
                    next()
                } else {
                    next('/login')
                }
            }
        },
        {
            // 喜爱物品
            path: "/loved",
            name: "loved",
            component: loved,
            meta: {
                fontColor: true
            }
        },
        {
            // 购物袋
            path: "/bag",
            name: "bag",
            component: bag,
            meta: {
                fontColor: true
            }
        },
        {
            // 收货地址列表
            path: "/selectAddress",
            name: "selectAddress",
            component: selectAddress,
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
        }
    ]
});
// 全局路由守卫
router.beforeEach((to, from, next) => {
    //     const nextRoute = ['User', 'Cart', 'GoodsDetail'] // 需要登录的页面
    //     let isLogin = localTake('userMsg')  // 判断是否登录，本地存储有用户数据则视为已经登录
    //     // 未登录状态；当路由到 nextRoute 指定页时，跳转至 UserLogIn
    //     if (nextRoute.indexOf(to.name) >= 0) { // 检测是否登录的页面
    //       if (!isLogin) { // 如果未登录（本地存储无用户数据），并且要跳到登录页面
    //         if (from.name === 'UserLogIn') {
    //           next('/')
    //           return
    //         }
    //   　　　　// 登录后，跳到到当前页面
    //         router.push({
    //           name: 'UserLogIn',
    //           params: {redirect: to.fullPath}
    //         })
    //       }
    //     }
    //     // 已登录状态；当路由到 UserLogIn 时，跳转至 Home
    //     if (to.name === 'UserLogIn') {
    //       if (isLogin) {
    //         next('/')
    //         return
    //       }
    //     }
    if (to.meta.showToTop) {
        store.commit("showToTop", true);
        store.commit("fontColor", false);
    } else {
        store.commit("showToTop", false);
        store.commit("fontColor", true);
    }
    if (to.meta.flag) {
        store.commit("bgr", true);
    } else {
        store.commit("bgr", false);
    }
    if (to.path === "/about") {
        store.commit("active_color", true);
    } else {
        store.commit("active_color", false);
    }
    if (to.path.indexOf("/contact") > -1) {
        store.commit("active_color_contact", true);
        store.commit("showContact", false);
    } else {
        store.commit("active_color_contact", false);
        store.commit("showContact", true);
    }
    if (to.meta.fontColor) {
        store.commit("fontColor", true);
    } else {
        store.commit("fontColor", false);
    }
    if (to.fullPath.indexOf("/search") > -1) {
        store.commit("showFooter", false);
    } else {
        store.commit("showFooter", true);
    }
    next(); // 必须使用 next ,执行效果依赖 next 方法的调用参数
});
export default router;