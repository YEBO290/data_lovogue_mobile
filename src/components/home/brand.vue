<template>
    <div class="brand_home">
      <div class="menu_filter" @click.stop="expand" v-if="!showSubMenu">
        <span class="menu_del"><i class="icon_f_btn"></i>筛选</span>
      </div>  
      <div class="menu_filter" @click.stop="expand" v-else>
        <!--<span class="menu_filter_btn"><i class="icon_f_btn"></i>筛选</span>-->
        <span class="menu_del">清除</span>
      </div>
      <menuList class="menu_list" v-if="showSubMenu"/>
      <el-row :gutter="10">
        <el-col :span="12" v-for="(item, index) in brandList" :key="index">
          <div class="brand_list">
            <img :src="item.url" class="brand_img"/>
            <p class="brand_name">{{item.name}}</p>
          </div>
          </el-col>
      </el-row>
      <p class="showTip list_more_tip"  v-if="showMore">显示120中的30件</p>
      <el-button class="btn ok_btn" type="primary" @click="toMore" v-if="showMore">载入更多</el-button>   
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
      showMore: true,
    }
  },
  computed: mapState({
      brandList: state => {
        return state.home.brandList
      },
      showSubMenu: state => state.showSubMenu
      // brandList() {
      //   return this.brandLists.slice(0, 30)
      // }
    }),
  created() {
    let param = this.searchParam(30, 1)
    this.$store.dispatch('home/queryBrandList', param)
    this.$store.commit('showSubMenu', false)
  },
  methods: {
    searchParam(size, page) {
      let id = this.$router.history.current.params.id
      let param = {
        language: 'cn',
        brand: 'lovogue',
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
      this.brandList = this.brandLists
      // this.$store.dispatch('home/queryMoreBrandList')
    },
    toHide() {
      this.showMore = true
      this.brandList = this.brandLists.slice(0, 30)
    }
  }
}
</script>
<style scoped>
@import "./css/brand.less";
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