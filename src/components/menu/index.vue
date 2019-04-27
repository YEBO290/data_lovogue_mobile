<template>
  <div class="menu_home">
    <div class="menu_index">  
      <img src="../../assets/image/menulogo.png" style="width: 0.6rem;height: 0.54rem;margin: 0 auto;display: inherit;margin-bottom: 0.36rem;"/>
      <p class="menu_title login" @click="toLogin"><span class="glyphicon glyphicon-user" style="margin-right:0.12rem;"></span>登录</p>   
      <i class="el-icon-close" @click="hideMenu" style="top:0.1rem;"></i>
      <div style="background:#EFDED1;height:0.01rem;margin-bottom:0.25rem;width:100%;"></div>
      <p class="menu_title login" @click="toHome">首页</p>  
      <div v-for="(item, index) in menuList" :key="index">
        <p class="menu_title" @click.stop="toMenu(item)">{{item.name}}</p>  
        <div v-if="item.next">
          <span class="el-icon-plus" @click.stop="expandFunc(item, index)" v-if="!expand[index]"></span>
          <span class="el-icon-minus" @click.stop="expandFunc(item, index)" v-if="expand[index]"></span>
          <ul v-if="expand[index]">
            <li v-for="(el, index) in item.next" :key="index" class="menu_txt" @click.stop="toSubMenu(el)">{{el.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      expand: []
    }
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    menuList: state => state.home.menuList
  }),
  created() {
    this.$store.dispatch('home/queryMenuList')
  },
  methods: {
    expandFunc(val, index) {
      if (this.expand[index]) {
        this.$set(this.expand, index, false)
      } else {
        this.$set(this.expand, index, true)
      }
    },
    hideMenu() {
      this.$store.commit('showMenu', false)
    },
    toHome() {
      this.$router.push('/home')
    },
    toLogin() {
      this.$router.push('/login')
    },
    toMenu(val) {
      this.hideMenu()
      this.$router.push(val.prodlink)
    },
    toSubMenu(val) {
      this.hideMenu()
      this.$router.push(val.prodlink)
    }
  }
}
</script>

<style scoped>
@import "./css/index.less";
</style>