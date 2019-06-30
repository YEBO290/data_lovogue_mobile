import {get, post } from "../../axios/index";
import api from "../../axios/api.js";
const state = {
    queryImg: [], // 轮播图
    productList: [], // 产品系列
    categoryList: [], // 类别   
    specialImg: [], //首页特辑双图  
    productTypeList: [], // 产品某系列表     
    categoryTypeList: [], // 某个类别列表
    brandList: [{
            // 品牌
            name: "耳环",
            url: require("../../assets/logo.png")
        },
        {
            name: "戒指",
            url: require("../../assets/logo.png")
        },
        {
            name: "项链",
            url: require("../../assets/logo.png")
        },
        {
            name: "鞋包",
            url: require("../../assets/logo.png")
        }
    ],
    aboutList: [{
            // 关于我们
            name: "耳环",
            url: require("../../assets/logo.png")
        },
        {
            name: "戒指",
            url: require("../../assets/logo.png")
        },
        {
            name: "项链",
            url: require("../../assets/logo.png")
        },
        {
            name: "鞋包",
            url: require("../../assets/logo.png")
        }
    ],
    categoryTotal: 0,
    productTotal: 0,
    menuList: []
};
const actions = {
    // 查询轮播图
    queryImg(context, param) {
        param = param || {}
        return new Promise((resolve, reject) => {
            post(api.getScreenCmsManager, param)
            .then(res => {
                let list = res.data.SpecialRotation // 首页轮播
                let lists = res.data.SpecialBigraph // 首页特辑双图
                let listProduct = res.data.PageProductSeries // 首页产品系列
                let listCategory = res.data.PageCategory // 首页类别                       
                context.commit("queryImg", list)
                context.commit("productList", listProduct)
                context.commit("categoryList", listCategory)   
                context.commit("specialImg", lists)      
                resolve(res);
            })
            .catch(err => {
                console.log(err)
            })
        })
    },
    // 产品系列
    queryProductList(context, param) {
        return new Promise((resolve, reject) => {
            post(api.getScreen, param)
            .then(res => {
                context.commit("productTotal", res.total)
                context.commit("productTypeList", res.data)
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        })
    },
    // 列表
    queryLists(context, param) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                get("api/v1/users/my_address/address_edit_before", param)
                    .then(res => {
                        //
                        context.commit("lists", res.data);
                        resolve(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }, 1000);
        });
    },
    // 类别
    queryCategoryList(context, param) {
        return new Promise((resolve, reject) => {
            post(api.getScreen, param)
            .then(res => {
                context.commit("categoryTotal", res.total)
                context.commit("categoryTypeList", res.data)
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        })
    },
    // 关于我们
    queryAboutList(context, param) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                get("api/v1/users/my_address/address_edit_before", param)
                    .then(res => {
                        //
                        context.commit("aboutList", res.data);
                        resolve(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }, 1000);
        });
    },
    // 品牌
    queryBrandList(context, param) {
        return new Promise((resolve, reject) => {
            post(api.getScreen, param)
            .then(res => {
                //
                context.commit("brandList", res);
                resolve(res)
            })
            .catch(err => {
                console.log(err)
            })
        })
    },
    // 品牌列表载入更多
    queryMoreBrandList(context, param) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                get("api/v1/users/my_address/address_edit_before", param)
                    .then(res => {
                        //
                        context.commit("brandList", res.data);
                        resolve(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }, 1000);
        })
    },
    // 菜单
    queryMenuList(context, param) {
        return new Promise((resolve, reject) => {
            let params = param || {}
            post(api.getNavigation, params)
            .then(res => {
                //
                context.commit("menuList", res.data);
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        })
    }
};

const mutations = {
    queryImg(state, data) {
        state.queryImg = data;
    },
    // 产品系列
    productList(state, data) {
        state.productList = data
    },
    specialImg(state, data) {
        state.specialImg = data
    },
    // 类别
    categoryList(state, data) {
        state.categoryList = data
    },
    // 品牌
    brandList(state, data) {
        state.brandList = data
    },
    // 关于我们
    aboutList(state, data) {
        state.aboutList = data
    },
    categoryTypeList(state, data) {
        state.categoryTypeList = data
    },
    // 类别数量
    categoryTotal(state, data) {
        state.categoryTotal = data;
    },
    productTypeList(state, data) {
        state.productTypeList = data
    },
    // 产品列表数量
    productTotal(state, data) {
        state.productTotal = data
    },
    // 菜单栏列表
    menuList(state, data) {
        state.menuList = data
    },
};
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};