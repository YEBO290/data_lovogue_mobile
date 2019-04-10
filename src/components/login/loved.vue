<template>
  <div class="loved">
    <div class="loved_lists" v-if="!showToLogin && lovesList.length > 0">
      <el-row :gutter="20" class="loved_list" v-for="(item, index) in lovesList" :key="index">
        <el-col :span="7"><img :src="item.url" class="loved_img"/></el-col>
        <el-col :span="17">
          <div>
            <span class="loved_text">{{item.txt}}</span>
            <i class="el-icon-close" @click="delLove"></i>
          </div>
          <div>
            <span class="loved_color">{{item.color}} - <span  class="loved_code">编号  {{item.code}}</span></span>
          </div>
          <div class="loved_country">
            <span class="loved_price">RMB {{item.price}}</span>
            <i class="icon_bag" @click="addBag"></i>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--<div class="loved_list" v-for="(item, index) in lovesList" :key="index" v-if="!showToLogin && lovesList.length > 0">
      <img :src="item.url" class="loved_img"/>
      <div class="loved_txt">
        <div>
          <span class="loved_text">{{item.txt}}<span>{{item.code}}</span></span>
          <i class="el-icon-close"></i>
        </div>
        <div>
          <span class="loved_price">RMB {{item.price}}</span>
          <i class="icon_bag"></i>
        </div>
      </div>
    </div>-->
    <div class="love_none" v-if="!showToLogin && lovesList.length === 0">
      <p>您的挚爱清单暂无单品</p>
      <el-button class="btn login_btns" type="primary" @click="toHome">前往选购</el-button>
    </div>
    <div class="login_none" v-if="showToLogin">
      <p>创建您的挚爱清单</p>
      <el-button class="btn ok_btn" type="primary" @click="toLogin">登录</el-button>
      <el-button class="btn cancel_btn" type="primary" @click="toRegister">注册</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
      }
    },
    watch: {
      lovesList: {
        handler(val){
          if(val.length > 0 && !(this.showToLogin)){
            this.$store.commit('writeBgr', true)
          } else {
            this.$store.commit('writeBgr', false)
          }
        },
        immediate: true
      }
    },
    computed: mapState({
      // 箭头函数可使代码更简练
      lovesList: state => state.login.lovesList
      // 传字符串参数 'count' 等同于 `state => state.count`
      // countAlias: 'count',

      // // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      // countPlusLocalState (state) {
      //   return state.count + this.localCount
      // }
    }),
    created() {
      let status = localStorage.getItem('userName')
      if(status !== '' && status !== null && status !== undefined) {
        this.showToLogin = false
      } else {
        this.showToLogin = true
      }
      // this.$store.dispatch('login/queryLovedList') // 喜爱的列表查询
    },
    methods: {
      toHome() {
        this.$router.push('/home')
      },
      toLogin() {
        this.$router.push('/login')        
      },
      toRegister() {
        this.$router.push('/login/register')        
      },
      delLove(){
        this.$store.dispatch('login/delLove').then(() => {
          this.$store.dispatch('login/queryLovedList')
        })

      },
      addBag(){
        this.$store.dispatch('login/addBag')
      }
    }
  }
</script>

<style scoped>
@import "./css/index.less";
</style>