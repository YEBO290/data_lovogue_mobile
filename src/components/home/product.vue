<template>
    <div class="category_home" style="min-height:4rem;">
      <!-- <div class="menu_filter" @click.stop="expand" v-if="!showSubMenu">
        <span class="menu_del"><i class="icon_f_btn"></i>筛选</span>
      </div>  
      <div class="menu_filter" @click.stop="expand" v-else>
        <span class="menu_del">清除</span>
      </div>
      <menuList class="menu_list" v-if="showSubMenu"/> -->
      <!-- <img src="~@/assets/image/timg.png" style="width:100%" v-if="productTotal == 0"/> -->
      <div v-if="productTotal == 0" style="padding-bottom:0.5rem;padding-top:0.6rem;">
        <!-- <img src="~@/assets/image/noData.png" style="width:100%" > -->
        <span style="font-size:15px;color:#6a6968;">暂无产品</span>
      </div>
      <div v-else>
        <el-row :gutter="10" style="padding-top:17px;">
          <el-col :span="24" v-for="(item, index) in productList" :key="index">
            <div  class="category_list"   @click="toDetail(item)">
              <img :src="item.imgpath" class=""/>
              <transition name="el-zoom-in-center">
                <img src="../../assets/image/loved.png" style="width: 0.2rem;" title="取消收藏" class="loved" v-if="(item.love != 0) && isShow" @click.stop="delLove(item)">
                <img src="../../assets/image/toLove.png" style="width: 0.2rem;" title="收藏" class="toLove" v-if="(item.love == 0) && isShow"  @click.stop="addLove(item)">
              </transition>
              <div  class="img_opeation">
                <h1 class="list_h1">{{item.productname}}</h1>
                <el-button class="img_list_btn">立即选购</el-button>
              </div>
              <!--<p class="category_list_name">{{item.productname}}</p>-->
              <!--<span class="category_list_price">RMB {{item.tagprice}}</span>-->
            </div>
            </el-col>
        </el-row>
        <el-row v-if="productTotal > 30">
          <el-col :span="24">
            <p class="showTip list_more_tip"  v-if="showMore">显示{{productTotal}}中的30件</p>
            <el-button class="btn ok_btn" type="primary" @click="toMore" v-if="showMore">载入更多</el-button>   
          </el-col>
        </el-row> 
      </div>
        
    </div>
</template>
<script>
import { mapState } from 'vuex'
import menuList from '../specialEdition/menu'
import workspace from '../../common.js'
export default {
  components: {
    menuList
  },
  data() {
    return {
      showMore: true,
      isShow:false
    }
  },
  watch: {
  '$route':{
     handler(to, from) {   //监听路由是否变化
      let param = this.searchParam(30, 1)
      this.$store.dispatch('home/queryProductList', param)
      this.$store.commit('showSubMenu', false)
      },
      immediate: true
    }
  },
  computed: mapState({
      productList: function(state){
        return state.home.productTypeList
      },
      showSubMenu: state => state.showSubMenu,
      productTotal: state => state.home.productTotal
    }),
  created() {
    if(workspace.getCookie().name){
      this.isShow = true;
    }else {
      this.isShow = false;
    }   
  },
  methods: {
    searchParam(size, page) {
      let id = this.$router.history.current.params.id
      let param = {      
        data: {
          language: 'cn',
          series: id || ''
        },
        userid: workspace.getCookie().name,
        
        listQuery: {
          pageSize: size,
          pageNum: page
        }
      }
      return param
    },
    expand() {
      if(this.showSubMenu){
        this.$store.commit('showSubMenu', false)
      }else {
        this.$store.commit('showSubMenu', true)
      }
    },
    // 载入更多
    toMore() {
      this.showMore = false
      let param = this.searchParam(this.productTotal, 1)
      this.$store.dispatch('home/queryProductList', param)
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
          this.searchLoveList()
        } else {
          this.$message({
            message: '操作失败，请重试',
            type: 'error'
          })
        }   
      })
    },
    delLove(item) {
      // 发送请求
      let param = {
        userid: workspace.getCookie().name,
        status: "0",
        id: item.love
      }
      this.$store.dispatch('cancelLove', param).then(res => {
        if(res.msg > 0) {
          this.searchLoveList()
        } else {
          this.$message({
            message: '操作失败，请重试',
            type: 'error'
          })
        }   
      })
    },
    searchLoveList() {
      let queryParam = {
        // userid: workspace.getCookie().name,
        status: "1"
      }
      this.$store.dispatch('login/queryLovedList', queryParam)
      let param = this.searchParam(30, 1)
      this.$store.dispatch('home/queryProductList', param)
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
@import "./css/index.less";
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
.list_h1{
  font-size:14px;
  color:#EFDED1;
  font-weight: Bold;
  margin-bottom: 0.1rem;
  font-family: "Helvetica";
}
.img_opeation{
  position: absolute;
  z-index: 100;
  bottom: 0.25rem;
  margin: 0 auto;
  width: 100%;
}
</style>