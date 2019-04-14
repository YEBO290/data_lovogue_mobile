<template>
    <div class="special_edition_list">   
      <div class="menu_filter" v-if="!showSubMenu">
        <span class="menu_del" @click.stop="expand"><i class="icon_f_btn"></i>筛选</span>
      </div>  
      <div class="menu_filter" @click.stop="expand" v-else>
        <!--<span class="menu_filter_btn"><i class="icon_f_btn"></i>筛选</span>-->
        <span class="menu_del">清除</span>
      </div>
      <menuList class="menu_list" v-if="showSubMenu"/>
      <div class="img_list" v-for="item in queryImg" :key="item.id">
        <img :src="item.value">
        <div  class="img_opeation">
          <h1 class="list_h1">{{item.name}}</h1>
          <!--<p class="img_list_p">{{item.name}}</p>-->
          <el-button class="img_list_btn" @click="$router.push(`/detailList/${item.id}`)">立即选购</el-button>
        </div>   
      </div>
      
    </div>
</template>

<script>
import menuList from './menu'
import { mapState } from 'vuex'
export default {
  components: {
    menuList
  },
  data() {
    return {
      showMenu:false
    }
  },
  computed: mapState({
    queryImg: state => state.home.queryImg,
    showSubMenu: state => state.showSubMenu
  }),
  created() {
    this.$store.dispatch('home/queryImg')  // 轮播图
  },
  methods: {
    expand() {
      if(this.showSubMenu){
        this.$store.commit('showSubMenu', false)
      }else {
        this.$store.commit('showSubMenu', true)
      }  
    }
  }
}
</script>

<style scoped>
@import "./css/index.less";
</style>