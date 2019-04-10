<template>
    <div class="special_edition_list">    
      <div class="menu_filter" v-if="!showMenu">
        <span class="menu_del" @click="expand"><i class="icon_f_btn"></i>筛选</span>
      </div>  
      <div class="menu_filter" @click="del" v-else>
        <!--<span class="menu_filter_btn"><i class="icon_f_btn"></i>筛选</span>-->
        <span class="menu_del">清除</span>
      </div>
      <menuList class="menu_list" v-if="showMenu"/>
      <div class="img_list">
        <div class="img_opeation">
          <h1 class="list_h1">Lorem ipsum dolor</h1>
          <p class="img_list_p">Style 01</p>
          <el-button class="img_list_btn">立即选购</el-button>
        </div>      
      </div>
      <div class="img_list">
        <div class="img_opeation">
          <h1 class="list_h1">Lorem ipsum dolor</h1>
          <p class="img_list_p">Style 01</p>
          <el-button class="img_list_btn">立即选购</el-button>
        </div>  
      </div>
      <div class="img_list">
        <div class="img_opeation">
          <h1 class="list_h1">Lorem ipsum dolor</h1>
          <p class="img_list_p">Style 01</p>
          <el-button class="img_list_btn">立即选购</el-button>
        </div>  
      </div>
      
    </div>
</template>

<script>
import menuList from './menu'
export default {
  components: {
    menuList
  },
  data() {
    return {
      showMenu:false
    }
  },
  mounted() {
  },
  methods: {
    del() {
      this.showMenu = false
    },
    expand() {
      this.showMenu = true
    }
  }
}
</script>

<style scoped>
@import "./css/index.less";
</style>