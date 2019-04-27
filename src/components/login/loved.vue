<template>
  <div class="loved">
    <div class="loved_lists" v-if="!showToLogin && lovesList.length > 0">
      <el-row :gutter="20" class="loved_list" v-for="(item, index) in lovesList" :key="index">
        <el-col :span="8"><img :src="item.imgpath" class="loved_img" style="width:100%;"  @click="toDetail(item)"/></el-col>
        <el-col :span="16">
          <div  @click="toDetail(item)">
            <div>
              <span class="loved_text">{{item.name}}</span>
              <i class="el-icon-close" @click.stop="delLove(item)"></i>
            </div>
            <div>
              <span class="loved_color">{{item.color}} - <span  class="loved_code">编号  {{item.prodid}}</span></span>
            </div>
            <div class="loved_country">
              <span class="loved_price">RMB {{item.tagprice}}</span>
              <i class="icon_bag" @click.stop="addBag"></i>
            </div>
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
import workspace from '../../common.js'
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
      lovesList: function(state){
        state.login.lovesList.forEach(item => {
          item.tagprice = workspace.thousandBitSeparator(item.tagprice)
        })
        return state.login.lovesList
      }
      // 传字符串参数 'count' 等同于 `state => state.count`
      // countAlias: 'count',

      // // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      // countPlusLocalState (state) {
      //   return state.count + this.localCount
      // }
    }),
    created() {
      let status = workspace.getCookie().name
      if(status !== '' && status !== null && status !== undefined) {
        this.showToLogin = false
      } else {
        this.showToLogin = true
      }
      let param = {
        userid: workspace.getCookie().name,
        status: "1"
      }
      this.$store.dispatch('login/queryLovedList', param) // 喜爱的列表查询
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
      delLove(val){
        let delParam = {
          id: val.id,
          status: "0"
        }
        this.$store.dispatch('login/delLove', delParam).then(() => {
          let param = {
            userid: workspace.getCookie().name,
            status: "1"
          }
          this.$store.dispatch('login/queryLovedList', param)
        })

      },
      addBag(){
        // this.$store.dispatch('login/addBag')
        this.$router.push('/bag')
      },
       // 详情
      toDetail(val) {
        this.$router.push(`/detail/${val.prodid}`)
      }
    }
  }
</script>

<style scoped>
@import "./css/index.less";
.el-icon-plus, .el-icon-minus, .el-icon-close{
  left:auto;
}
</style>