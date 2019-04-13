<template>
    <div class="category_home">
      <div class="menu_filter" @click="expand" v-if="!showSubMenu">
        <span class="menu_del"><i class="icon_f_btn"></i>筛选</span>
      </div>  
      <div class="menu_filter" @click="expand" v-else>
        <!--<span class="menu_filter_btn"><i class="icon_f_btn"></i>筛选</span>-->
        <span class="menu_del">清除</span>
      </div>
      <menuList class="menu_list" v-if="showSubMenu"/>
      <el-row :gutter="10">
        <el-col :span="12" v-for="(item, index) in productList" :key="index">
          <div  class="category_list">
            <img :src="item.imgpath" class="category_img"/>
            <img src="../../assets/image/loved.png" style="width: 20px;" class="loved" v-if="item.status =='1'">
            <img src="../../assets/image/toLove.png" style="width: 20px;" class="toLove" v-else>
            <p class="category_list_name">{{item.prodname}}</p>
            <span class="category_list_price">RMB {{item.tagprice}}</span>
          </div>
          </el-col>
      </el-row>
      <p class="showTip list_more_tip"  v-if="showMore">显示{{productTotal}}中的30件</p>
      <el-button class="btn ok_btn" type="primary" @click="toMore" v-if="showMore">载入更多</el-button>   
      <p class="showTip"  v-if="!showMore"  @click="toHide"><i class="el-icon-arrow-up"></i>收起</p>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import menuList from '../specialEdition/menu'
export default {
  components: {
    menuList
  },
  data() {
    return {
      showMore: true
    }
  },
  // watch: {
  //   productLists: {
  //     handler(val) {
  //       this.productList = val.slice(0, 30)
  //     },
  //     immediate: true
  //   }
  // },
  computed: mapState({
      productList: state => state.home.productTypeList,
      showSubMenu: state => state.showSubMenu,
      productTotal: state => state.home.productTotal
      // brandList() {
      //   return this.brandLists.slice(0, 30)
      // }
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
        series: id,
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
    toHide() {
      this.showMore = true
      let param = this.searchParam(30, 1)
      this.$store.dispatch('home/queryProductList', param)
    }
  }
}
</script>
<style scoped>
@import "./css/category.less";
.about_txt{
  background:#EFDED1;
  padding-left:18px;
  padding-right:18px;
}
.about_img img{
    width: 100%;
    height: 260px;
}
.about_static p {
  font-size: 15px;
  color:#666666;
}
</style>