<template>
  <div class="menu_home">
    <div class="menu_index">  
      <img src="../../assets/image/menulogo.png" style="width: 0.6rem;height: 0.54rem;margin: 0 auto;display: inherit;margin-bottom: 0.36rem;"/>
      <el-row style="margin-bottom:20px;">
        <el-col :span="3" :class="{'userImg': showLogin}">
          <div class="grid-content bg-purple-dark"><span class="glyphicon glyphicon-user" style="margin-right:0.12rem;"></span></div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">
            <p style="font-size: 15px;font-weight: bold;" v-if="user">{{user}}</p>
            <p style="font-size: 15px;font-weight: bold;" v-else @click="toLogin">登录</p>
            <!--<p @click="toLogin" style="font-size: 12px;text-decoration: underline;color:#666;" v-if="showLogin">切换账号</p>-->
          </div>
        </el-col>
      </el-row>
      <!--<p class="menu_title login" @click="toLogin">
        <span class="glyphicon glyphicon-user" style="margin-right:0.12rem;">{{user}}</span>
        <span>切换账号</span>
      </p>  --> 
      <i class="el-icon-close" @click="hideMenu" style="top:0.1rem;"></i>
      <div style="background:#EFDED1;height:0.01rem;margin-bottom:0.25rem;width:100%;"></div>
      <p class="menu_title login" @click="toHome">首页</p>  
      <div v-for="(item, index) in menuList" :key="index">
        <p class="menu_title"  @click.stop="expandFunc(item, index)">{{item.name}}</p>  
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
import workspace from '../../common.js'

export default {
  data() {
    return {
      expand: [],
      user: workspace.getCookie().name,
      showLogin: workspace.getCookie().name ? true: false,
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
      workspace.clearCookie()
      console.log(workspace.getCookie().name)
      this.$router.push('/login')
    },
    toMenu(val) {
      this.hideMenu()
      // this.$router.push(val.prodlink)
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
.userImg{
  /* margin-top: 0.1rem; */
}
.el-icon-plus, .el-icon-minus, .el-icon-close{
    left: auto;
}
</style>