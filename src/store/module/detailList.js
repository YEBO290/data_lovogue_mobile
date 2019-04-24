import {get, post} from '../../axios/index'
import api from '../../axios/api.js'
const state = {
  // 轮播图
  imgList: 6, // 后期改成 []
  recommendList: [{
    url: require('../../assets/logo.png'),
    text: 'Consectetur'
  },
  {
    url: require('../../assets/logo.png'),
    text: 'Consectetur'
  },
  {
    url: require('../../assets/logo.png'),
    text: 'Consectetur'
  },
  {
    url: require('../../assets/logo.png'),
    text: 'Consectetur'
  }],
  specialImg:  [{
		"id": 1,
		"maxrow": 3,
		"row": 1,
		"maxcol": 3,
		"col": 1,
		"typeno": "1",
		"occasion": "商务宴会",
		"color": "红",
		"old": "中",
		"pricesection": null,
		"prodname": "时尚主题",
		"backpng": "http://lovogue.net:8080/static/img/1.png",
		"imgpath": "http://lovogue.net:8080/static/img/1.png",
		"rotatingimgpath": "http://lovogue.net:8080/static/img/1.png"
	}, {
		"id": 2,
		"maxrow": 3,
		"row":1,
		"maxcol": 3,
		"col": 2,
		"typeno": "1",
		"occasion": "1",
		"color": "1",
		"old": "1",
		"pricesection": "1",
		"prodname": "时尚主题",
		"backpng": "http://lovogue.net:8080/static/img/1.png",
		"imgpath": "http://lovogue.net:8080/static/img/1.png",
		"rotatingimgpath": "http://lovogue.net:8080/static/img/1553091184291.png"
	},
			{
		"id": 3,
		"maxrow": 3,
		"row": 1,
		"maxcol": 3,
		"col": 3,
		"typeno": "1",
		"occasion": "商务宴会",
		"color": "红",
		"old": "中",
		"pricesection": null,
		"prodname": "时尚主题",
		"backpng": "http://lovogue.net:8080/static/img/1.png",
		"imgpath": "http://lovogue.net:8080/static/img/1.png",
		"rotatingimgpath": "http://lovogue.net:8080/static/img/1.png"
	},
			{
		"id": 4,
		"maxrow": 3,
		"row": 2,
		"maxcol": 3,
		"col": 1,
		"typeno": "1",
		"occasion": "商务宴会",
		"color": "红",
		"old": "中",
		"pricesection": null,
		"prodname": "时尚主题",
		"backpng": "http://lovogue.net:8080/static/img/1.png",
		"imgpath": "http://lovogue.net:8080/static/img/1.png",
		"rotatingimgpath": "http://lovogue.net:8080/static/img/1.png"
	},
			{
		"id": 5,
		"maxrow": 3,
		"row": 2,
		"maxcol": 3,
		"col": 2,
		"typeno": "1",
		"occasion": "商务宴会",
		"color": "红",
		"old": "中",
		"pricesection": null,
		"prodname": "时尚主题",
		"backpng": "http://lovogue.net:8080/static/img/1.png",
		"imgpath": "http://lovogue.net:8080/static/img/1.png",
		"rotatingimgpath": "http://lovogue.net:8080/static/img/1.png"
	},
			{
		"id": 6,
		"maxrow": 3,
		"row": 2,
		"maxcol": 3,
		"col": 3,
		"typeno": "1",
		"occasion": "商务宴会",
		"color": "红",
		"old": "中",
		"pricesection": null,
		"prodname": "时尚主题",
		"backpng": "http://lovogue.net:8080/static/img/1.png",
		"imgpath": "http://lovogue.net:8080/static/img/1.png",
		"rotatingimgpath": "http://lovogue.net:8080/static/img/1.png"
	},
			{
		"id": 7,
		"maxrow": 3,
		"row":3,
		"maxcol": 3,
		"col": 1,
		"typeno": "1",
		"occasion": "商务宴会",
		"color": "红",
		"old": "中",
		"pricesection": null,
		"prodname": "时尚主题",
		"backpng": "http://lovogue.net:8080/static/img/1.png",
		"imgpath": "http://lovogue.net:8080/static/img/1.png",
		"rotatingimgpath": "http://lovogue.net:8080/static/img/1.png"
	},
			{
		"id": 8,
		"maxrow": 3,
		"row": 3,
		"maxcol": 3,
		"col": 2,
		"typeno": "1",
		"occasion": "商务宴会",
		"color": "红",
		"old": "中",
		"pricesection": null,
		"prodname": "时尚主题",
		"backpng": "http://lovogue.net:8080/static/img/1.png",
		"imgpath": "http://lovogue.net:8080/static/img/1.png",
		"rotatingimgpath": "http://lovogue.net:8080/static/img/1.png"
	},
			{
		"id": 9,
		"maxrow": 3,
		"row": 3,
		"maxcol": 3,
		"col": 3,
		"typeno": "1",
		"occasion": "商务宴会",
		"color": "红",
		"old": "中",
		"pricesection": null,
		"prodname": "时尚主题",
		"backpng": "http://lovogue.net:8080/static/img/1.png",
		"imgpath": "http://lovogue.net:8080/static/img/1.png",
		"rotatingimgpath": "http://lovogue.net:8080/static/img/1.png"
	}]

}
const actions = {
  // 查询轮播图
  imgList (context, param) {
    return new Promise((resolve, reject) => {
      let params = param || {}
      post(api.getScreenFeature, params).then((res) => {
        // 
        context.commit('imgList', res.data)
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  querySpecialImg (context, param) {
    return new Promise((resolve, reject) => {
      let params = param || {}
      post(api.getScreenFeature, params).then((res) => {
        // 
        context.commit('specialImg', res.data)
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
      })
    })
  }
}

const mutations = {
  imgList (state, data) {
    state.imgList = data
  },
  specialImg (state, data) {
    state.specialImg = data
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