<template>
  <div class="bag">
    <div class="bag_lists" v-if="!showToLogin && bagList.length > 0">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="allCheck">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>    
        <el-row :gutter="20" class="bag_list" v-for="(item, index) in bagList" :key="index">
          <el-col :span="2">
            <el-checkbox-group v-model="checkedLists" @change="handleCheckedListsChange">          
              <el-checkbox :label="item.id">
              </el-checkbox>
            </el-checkbox-group> 
          </el-col>        
          <el-col :span="8"><img :src="item.url" class="loved_img"/></el-col>
          <el-col :span="14">
            <div>
              <span class="bag_text">{{item.txt}}</span>
              <i class="el-icon-close" @click="delBag"></i>
            </div>
            <div>
              <span class="bag_color">{{item.color}} - <span  class="bag_code">编号  {{item.code}}</span></span>
            </div>
            <div class="number">
              <el-input-number v-model="item.num" :min="1" label="数量"></el-input-number>
            </div>
            <div style="height: 20px; margin-top: 50px;">
              <div class="bag_size">
                <span>size： {{item.size}}; {{item.color}}</span>
              </div>
              <div class="bag_country">
                <span class="bag_price">RMB {{item.price}}</span>
              </div>
            </div>
          </el-col>         
      </el-row> 
      <div class="total_div">
        <p class="total_number">数量<span>{{totalNmubel}}</span></p>
        <p class="total_pay">运费<span>RMB  {{totalPay}}</span></p> 
        <p class="total">总计<span>RMB  {{totalCost}}</span></p>       
      </div>
      <el-button class="btn login_btns" type="primary" @click="toPay" style="margin-top:63px;">立即支付</el-button>
    </div>
    <div class="bag_none" v-if="!showToLogin && bagList.length === 0">
      <span>再也不会找不到购物袋内的风格单品-立即</span>
      <a @click="toLogin">登录</a> / <a @click="toRegister">注册</a>
      <span>保留单品至您的账户</span>
      <p>您的购物袋暂无单品</p>
      <el-button class="login_btn pay_btn" type="primary" @click="toHome">前往选购</el-button>    
    </div>
    <div class="recommend" v-if="!showToLogin && bagList.length === 0">
        <p class="titlt">为您推荐的搭配</p>
        <el-row>
          <el-col :span="8"  v-for="(item, index) in recommendList" :key="index">
            <img :src="item.url">
            <div class="recommend_line"></div>
            <p class="recommend_name">{{item.name}}</p>
          </el-col>
        </el-row>
      </div>
    <div class="login_none" v-if="showToLogin">
      <p>创建您的购物清单</p>
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
        checkAll: false, // 全选
        checkedLists: [], // 选中列表
        isIndeterminate: true,
        totalNmubel: 0,
        totalPay: 0,
        totalCost: 0
      }
    },
    watch: {
      bagList: {
        handler(val){
          if(!(this.showToLogin)){
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
      bagList: state => state.login.bagList,
      recommendList: state => state.login.recommendList
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
      let param = {"userid":"admin","status":"1"}
      this.$store.dispatch('login/queryBagList', param) // 购物袋的列表查询
      // this.$store.dispatch('login/queryRecommendList') // 推荐的列表查询 
      
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
      delBag() {
        let param = {}
        this.$store.dispatch('login/delBag', param).then(res => {
          this.$store.dispatch('login/queryBagList')
        })
      },
      toPay() {
        this.$store.dispatch('login/toPay', this.checkedLists)
      },
      handleCheckAllChange(val) {
        let me = this
        let list = []
        this.bagList.forEach(el => {
          list.push(el.id)
        })
        this.checkedLists = val ? list : []
        this.isIndeterminate = false
        this.bagList.forEach(item => {
          me.totalPay = me.totalPay + parseFloat(item.pay)
          me.totalNmubel = me.totalNmubel + parseInt(item.num)
          me.totalCost = me.totalCost + (parseInt(item.num) * parseFloat(item.price)) + parseFloat(item.pay)
        })
        me.totalCost = me.thousandBitSeparator(me.totalCost)
      },
      handleCheckedListsChange(value) {
        let me = this
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.bagList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.bagList.length;
        this.totalCost = 0
        this.totalPay = 0
        this.totalNmubel = 0
        let newList = [] // 选中的数组
        value.forEach(el => {
          newList = newList.concat(this.bagList.filter(item => item.id === el ))
        })
        console.log(newList)
        newList.forEach(item => {
          me.totalPay = me.totalPay + parseFloat(item.pay)
          me.totalNmubel = me.totalNmubel + parseInt(item.num)
          me.totalCost = me.totalCost + (parseInt(item.num) * parseFloat(item.price)) + parseFloat(item.pay)
        })
        me.totalCost = me.thousandBitSeparator(me.totalCost)
        me.checkedLists = newList
      },
      // 千位分割
      thousandBitSeparator(num) {
          return num && (num
            .toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
              return $1 + ","
            }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
              return $1 + ",";
            }))
        }
    }
  }
</script>

<style scoped>
@import "./css/index.less";
.bag_list /deep/ .el-checkbox__inner{
  margin-top:50px;
}
.bag /deep/ .el-checkbox{
    display: inline-block;
    width: 100%;
}
.bag_list /deep/ .el-input-number{
  width: 80px;
  height: 25px;
  line-height: 23px;
}
.bag_list /deep/ .el-input-number__decrease,.bag_list /deep/ .el-input-number__increase{
  width: 20px!important;
}
.bag_list /deep/ .el-input-number__decrease i,.bag_list /deep/ .el-input-number__increase i {
    color:#333;
    top: 6px;
    font-weight: normal;
    position: initial;
}
.bag_list /deep/ .el-input-number .el-input__inner {
    padding-left: 5px;
    padding-right: 5px;
    height: 25px;
}
.bag_list /deep/ .el-input-number__decrease:hover,.bag_list /deep/ .el-input-number__increase:hover {
    color: #C5A480;
}
.bag_list /deep/ .el-checkbox__label{
  display: none;
}
.number{
  position: absolute;
  top: 70px;
}
.allCheck .el-checkbox__label{
  display: inline-block;
}
</style>