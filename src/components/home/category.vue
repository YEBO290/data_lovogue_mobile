<template>
  <div>
    <subMenu @changeFilter="changeFilter" :selectedData="selectedData"/>
    <div class="category_home" style="min-height:4rem;">
      
      <!-- <menuList class="menu_list" id="menu_select" v-if="showSubMenu"></menuList> -->
      <!-- <screen-select class="menu_list"></screen-select> -->
      <!-- <img src="~@/assets/image/timg.png" style="width:100%" v-if="categoryTotal == 0"/> -->
      <div v-if="categoryTotal == 0" style="padding-top:0.5rem;">
        <!-- <img src="~@/assets/image/noData.png" style="width:100%" > -->
        <span style="font-size:15px;color:#6a6968;">暂无产品</span>
      </div>
      <div v-else>
        <el-row :gutter="10" style="padding-top:17px;">
          <el-col :span="12" v-for="(item, index) in categoryList" :key="index">
            <div  class="category_list" @click="toDetail(item)" :id="index">
              <img :src="item.imgpath" class="category_img"/>
              <transition name="el-zoom-in-center">
                <img src="../../assets/image/loved.png" style="width: 0.2rem;" class="loved" title="取消收藏" v-if="(item.love != 0) && isShow"  @click.stop="delLove(item)">
                <img src="../../assets/image/toLove.png" style="width: 0.2rem;" class="toLove" title="收藏"  @click.stop="addLove(item)" v-if="(item.love == 0) && isShow">  
              </transition>
              <p class="category_list_name">{{item.productname}}</p>
              <span class="category_list_price">RMB {{changePrice(item.tagprice)}}</span>
            </div>
            </el-col>
        </el-row>
        <el-row v-if="categoryTotal > 30">
          <el-col :span="24">
            <p class="showTip list_more_tip"  v-if="showMore">显示{{categoryTotal}}中的30件</p>
            <el-button class="btn ok_btn" type="primary" @click="toMore" v-if="showMore">载入更多</el-button>   
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import subMenu from '../subMenu/index'
import screenSelect from '../home/screenSelect'
import workspace from '../../common.js'
import api from '../../axios/api.js'
import {post} from '../../axios/index'
export default {
  components: {
    subMenu,
    'screen-select':screenSelect
  },
  data() {
    return {
      showMore: true,
      isShow:false,
      activeSeleted: [],
      filterParam: {},
      selectedData: []
    }
  },
  watch: {
  '$route': {
    handler(to, from) {   //监听路由是否变化
      let param =  this.searchParam(30, 1)
      this.$store.dispatch('home/queryCategoryList', param)
    },
    immediate: true
    } 
  },
  computed: mapState({
    categoryList: function(state) {
      return state.home.categoryTypeList
    },
    categoryTotal:  state => state.home.categoryTotal
  }),
  created() {
    this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
    })
    if(workspace.getCookie().name){
      this.isShow = true;
    }else {
       this.isShow = false;
    }
    // 需要选中的数据
    let list = [{
        name: '商品品类',
        type: "category",
        val: [{
          lable: "",
          value: this.$route.params.id
        }]
    }]
    this.selectedData = list || []
  },
  methods: {
    changeFilter(value){
      console.log(value)  // 过滤条件
      let type_ = Object.prototype.toString.call(value)
      let param = {}
      if(type_  === '[object Array]') { // 筛选
          let obj = {}
          value.forEach(item => {
            let {type, val} = item
            let lists = [] 
            val.forEach(e => lists.push(e.value)) // 取出所有指定属性集合
            obj[type] = lists.join(',')
            if(type === 'tagprice') { // 商品的价格
              let price = lists.join(',') && lists.join(',').indexOf('-') > -1 && lists.join(',').split('-') || ''
              obj.tagpricemin = price && price[0] && parseInt(price[0])
              || parseInt(lists.join(',')) >=8000 && parseInt(lists.join(',')) || ''
              obj.tagpricemax = price && price[1] && parseInt(price[1]) || parseInt(lists.join(',')) <= 1000 && 1000
              || ''
            }
          });
          let feld = ['category', 'tagpricemax', 'tagpricemin', 'theme', 'typegem', 'occasion']
          feld.forEach(item => {
            if(!obj[item]) {
              obj[item] = ''
            }
          })
          // let {category = '', tagpricemax = '', tagpricemin = '', theme = '', typegem = '', occasion = ''} = obj
          // let newObj = obj
          // category? (newObj = {category, tagpricemax, tagpricemin, theme, typegem, occasion}): (newObj = { tagpricemax, tagpricemin, theme, typegem, occasion})  
          this.filterParam = obj
          param = this.searchParam(30, 1, obj)
      } else if(type_  === '[object Object]'){
        this.filterParam = value
        param = this.searchParam(30, 1, value)
      }
      this.showMore = true
      this.$store.dispatch('home/filterSearch', param)
    },
    changePrice(val) {
      return workspace.thousandBitSeparator(val)
    },
    searchParam(size, page, value) {
      let id = this.$router.history.current.params.id
      let param =  {
        data: {
          language: 'cn',
          category: id || '',
          userid: workspace.getCookie().name,
          ...value
        },       
        listQuery: {
          pageSize: size,
          pageNum: page
        }      
      }
      return param
    },
    expand() {
        this.showSubMenu = true;
      // if(this.showSubMenu){
      //   this.$store.commit('showSubMenu', false)
      // }else {
      //   this.$store.commit('showSubMenu', true)
      // }

    },
    // 载入更多
    toMore() {
      this.showMore = false
      let param =  this.searchParam(this.categoryTotal, 1, this.filterParam)
      this.$store.dispatch('home/filterSearch', param)
    },
    toHide() {
      this.showMore = true
      let param =  this.searchParam(30, 1)
      this.$store.dispatch('home/queryCategoryList', param)
    },
    searchLove() {
      let queryParam = {
        userid: workspace.getCookie().name,
        status: "1"
      }
      this.$store.dispatch('login/queryLovedList', queryParam)
      let param =  this.searchParam(30, 1)
      this.$store.dispatch('home/queryCategoryList', param)
    },
    addLove(item) {
      let param = {
        userid: workspace.getCookie().name,
        status: "1",
        prodid: item.typeno,
        amount: "1"
      }
      this.$store.dispatch('toLoved', param).then(res => {
        if(res.msg > 0) {
          this.searchLove()
        } else {
          this.$message({
            message: '操作失败，请重试',
            type: 'error'
          })
        }   
      })
    },
    delLove(item) {
      let param = {
        userid: workspace.getCookie().name,
        status: "0",
        id: item.love,
        amount: "1"
      }
      this.$store.dispatch('cancelLove', param).then(res => {
        if(res.msg > 0) {
          this.searchLove()
        } else {
          this.$message({
            message: '操作失败，请重试',
            type: 'error'
          })
        }   
      })
    },
    // 详情
    toDetail(val) {
      this.$router.push(`/detail/${val.typeno}`)
    }
  }
}
</script>
<style scoped>
@import "./css/category.less";
.about_txt{
  background:#EFDED1;
  padding-left:0.18rem;
  padding-right:0.18rem;
}
.about_img img{
    width: 100%;
    height: 2.6rem;
}
.about_static p {
  font-size: 15px;
  color:#666666;
}
.showTip{
  color: #C5A480;
}
.box-card ul{
  text-align:left;
}
.box-card ul>li{
    position: relative;
    left: 0;
    right: 0;
    z-index: 2;
    white-space: nowrap;
    background: #fff;
    line-height: 39px;
    border-bottom: solid 1px #c8c7cc;
}
.box-card /deep/ .el-card__body{
  padding-top:0;
}
.box-card{
  position: absolute;
  z-index: 10;
  width: 100%;
}
</style>