<template>
    <div class="category_home">
      <!--<div class="menu_filter" @click.stop="expand" v-if="!showSubMenu">
        <span class="menu_del"><i class="icon_f_btn"></i>筛选</span>
      </div>  
      <div class="menu_filter" @click.stop="expand" v-else>
        <span class="menu_del">清除</span>
      </div>-->
      <menuList class="menu_list" v-if="showSubMenu"/>
      <el-row :gutter="10" style="margin-top:17px;">
        <el-col :span="12" v-for="(item, index) in productList" :key="index">
          <div  class="category_list">
            <img :src="item.imgpath" class="category_img"  @click="toDetail(item)"/>
            <img src="../../assets/image/loved.png" style="width: 0.2rem;" title="取消收藏" class="loved" v-if="item.love != 0" @click.stop="delLove(item)">
            <img src="../../assets/image/toLove.png" style="width: 0.2rem;" title="收藏" class="toLove" v-else @click.stop="addLove(item)">
            <p class="category_list_name">{{item.productname}}</p>
            <span class="category_list_price">RMB {{item.tagprice}}</span>
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
      showMore: true
    }
  },
  computed: mapState({
      productList: function(state){
        state.home.productTypeList.forEach(item => {
          item.tagprice = workspace.thousandBitSeparator(item.tagprice)
        })
        return state.home.productTypeList
      },
      showSubMenu: state => state.showSubMenu,
      productTotal: state => state.home.productTotal
    }),
  created() {
    let param = this.searchParam(30, 1)
    this.$store.dispatch('home/queryProductList', param)
    this.$store.commit('showSubMenu', false)
  },
  methods: {
    searchParam(size, page) {
      let id = this.$router.history.current.params.id
      let param = {
        language: 'cn',
        series: id || '',
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
        if(res.msg == 1) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
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
        if(res.msg == 1) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
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
        userid: workspace.getCookie().name,
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
</style>