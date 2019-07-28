<template>
  <div>
    <div class="menu_filter" @click.stop="expand">
      <!-- <span class="menu_del"><i class="icon_f_btn"></i>筛选</span>
      <span class="">价格排序</span>
      <span class="">上市时间</span> -->
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple"><span class="">上市时间</span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light"></div> <span class="">价格排序</span></el-col>
        <el-col :span="8"><div class="grid-content bg-purple" @click="drawer = true"><span class="menu_del"><i class="icon_f_btn"></i>筛选</span></div></el-col>
      </el-row>
    </div>
    <div class="category_home" style="min-height:4rem;">
      
      <!-- <div class="menu_filter" @click.stop="expand" v-else>
        <span class="menu_del">清除</span>
      </div> -->
      <el-drawer
        title="筛选"
        :visible.sync="drawer"
        direction="rtl"
        size="80%">
        <menuList class="menu_list" id="menu_select" @handlerMenu="handlerMenu"></menuList>
      </el-drawer>
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
import menuList from '../subMenu/menu'
import screenSelect from '../home/screenSelect'
import workspace from '../../common.js'
export default {
  components: {
    menuList,
    'screen-select':screenSelect
  },
  data() {
    return {
      showMore: true,
      isShow:false,
      drawer: false
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
  },
  methods: {
    handlerMenu(val) {
      debugger
      this.drawer = false
    },
    changePrice(val) {
      return workspace.thousandBitSeparator(val)
    },
    searchParam(size, page) {
      let id = this.$router.history.current.params.id
      let param =  {
        data: {
          language: 'cn',
          category: id || '',
           userid: workspace.getCookie().name,
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
      let param =  this.searchParam(this.categoryTotal, 1)
      this.$store.dispatch('home/queryCategoryList', param)
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
</style>