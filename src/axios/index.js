/* 引入Vue框架 */
// import Vue from 'vue'
/* 引入资源请求插件 */
import axios from 'axios'
// import QS from 'qs'
import router from '../router/index.js'
import store from '../store/index.js'
import workspace from '../common.js'
import load from '../components/common/loading'
import userRequired from './userRequired'
import {
  Message,
  Loading
} from 'element-ui'

// axios 配置
axios.defaults.timeout = 10000
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.headers['Access-Control-Allow-Origin'] = 'http://129.204.202.240:8080'

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = 'http://129.204.202.240:8090'
  // axios.defaults.baseURL = 'http://lovogue.net:8091'
  axios.defaults.baseURL = 'https://lovogue.net:8443'
  } else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'http://lovogue.net:8091'
  } else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://lovogue.net:8091'
  }

// 请求拦截器
axios.interceptors.request.use(
  config => {
    store.commit('showLoading', true)
  // 用户没有登录，跳转登录界面
  let key = config.data
  let param = true
  for(let item in userRequired){
    if(userRequired[item] == config.url) {
      // 校验必填userId 没传跳login
      for(let i in key) {
        if(i === 'userid' && (key[i] === '' || key[i] === null || key[i] === undefined )) { 
          router.replace({      
            path: '/login'
          })
          param = false
        }
      }
    }
  }
  if(!param) {
    return
  }
  
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    }
    return config
  },
  error => {
    return Promise.reject(error.response)
  })
// 响应拦截器
axios.interceptors.response.use(
  response => {
    debugger
    store.commit('showLoading', false)
    return response
  },
  // 服务器状态码不是200的情况 
  error => {  
    // error.response.data.msg && Message.error(error.response.data.msg) || Message.error(error.message)
    store.commit('showLoading', false)
    if (error.response.status) {   
        switch (error.response.status) {    
          // 401: 未登录    
          // 未登录则跳转登录页面，并携带当前页面的路径    
          // 在登录成功后返回当前页面，这一步需要在登录页操作。    
          case 401:     
            router.replace({      
            path: '/login'
            });
            break;
          // 403 token过期    
          // 登录过期对用户进行提示    
          // 清除本地token和清空vuex中token对象    
          // 跳转登录页面    
          case 403:    
            Message.error('登录过期，请重新登录')
            // 清除token     
            // localStorage.removeItem('token')   
            store.commit('userName', null)     
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            setTimeout(() => {      
            router.replace({       
              path: '/login'   
            });     
            }, 1000);     
            break; 
          // 404请求不存在    
          case 404:  
            Message.error('网络请求不存在')    
          break;    
          // 其他错误，直接抛出错误提示    
          default:  
            Message.error(error.response.data.msg)  
          }  
          debugger
          return Promise.reject(error.response)
          // return error.response.data
      }  
    }
 );
 /** 
  * get方法，对应get请求 
  * @param {String} url [请求的url地址] 
  * @param {Object} params [请求时携带的参数] 
  */
 export function get(url, params){ 
  return new Promise((resolve, reject) =>{  
   axios.get(url, {   
    params: params  
   })  
   .then(res => {   
    resolve(res.data) 
   })  
   .catch(err => {   
    reject(err.data)  
   }) 
  });
 }
 /** 
  * post方法，对应post请求 
  * @param {String} url [请求的url地址] 
  * @param {Object} params [请求时携带的参数] 
  */
 export function post(url, params) { 
  return new Promise((resolve, reject) => {   
   axios.post(url, params)  
   .then(res => {   
    resolve(res.data)
   })  
   .catch(err => {   
    reject(err.data)  
   }) 
  })
 }