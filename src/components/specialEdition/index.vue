<template>
    <div class="special_edition_list">   
      <!-- <div class="menu_filter" v-if="!showSubMenu">
        <span class="menu_del" @click.stop="expand"><i class="icon_f_btn"></i>筛选</span>
      </div>  
      <div class="menu_filter" @click.stop="expand" v-else>
        <span class="menu_filter_btn"><i class="icon_f_btn"></i>筛选</span>
        <span class="menu_del">清除</span>
      </div>
      <menuList class="menu_list" v-if="showSubMenu"/> -->
      <div class="img_list" v-for="(item, index) in specialList" :key="index">
       <img :src="item.backpng" @click="$router.push(`/detailList/${item.prodname}`)">
        <div  class="img_opeation">
          <h1 class="list_h1">{{item.prodname}}</h1>
          <el-button class="img_list_btn" @click="$router.push(`/detailList/${item.prodname}`)">立即选购</el-button>
        </div>   
      </div>
      
    </div>
</template>

<script>
import menuList from '../subMenu/menu'
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
    specialList: state => state.specialEdition.specialList,
    showSubMenu: state => state.showSubMenu
  }),
  created() {
    let id = this.$router.history.current.params.id
    let param =  {
        occasion: id ||""
      }
      this.$store.dispatch('specialEdition/querySpecialList',param)  // 轮播图
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
img{
  width:100%;
  /* height: 5rem; */
  background: #fff;
}
.img_list{
  /* height:5rem; */
  
}
.img_opeation{
  position: absolute;
  z-index: 100;
  bottom: 0.15rem;
  margin: 0 auto;
  width: 100%;
}
.list_h1{
  font-size:14px;
  color:#EFDED1;
  font-weight: Bold;
  margin-bottom: 0.1rem;
  font-family: "Helvetica";
}
</style>