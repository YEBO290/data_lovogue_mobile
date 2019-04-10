// import * as axios from './axios/index.js'
// import Vue from 'vue'
export function fetch(url, params, $vue) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}