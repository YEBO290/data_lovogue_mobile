<template>
  <div class="search">
    <img src="../../assets/image/back.png" @click="$router.push('/home')">
    <el-input
    placeholder="搜索" class="productname"
    v-model.trim="productname" @change="search">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
  <div>
    <p v-for="(item, index) in tipList" :key="index"></p>
  </div>
  <div class="search_lists" v-if="!showToLogin && searchList.data.length > 0">
      <el-row :gutter="20" class="search_list" v-for="(item, index) in searchList.data" :key="index">
        <el-col :span="7"><img :src="item.imgpath" class="search_img"/></el-col>
        <el-col :span="17">
          <div>
            <span class="search_text">{{item.productname}}</span>
          </div>
          <div>
            <span class="search_color">{{item.color}} - <span  class="search_code">编号  {{item.typeno}}</span></span>
          </div>
          <div class="search_country">
            <span class="search_price">RMB {{item.tagprice}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="searchList.data.total > 30">
        <el-col :span="24">
          <p class="showTip list_more_tip"  v-if="showMore">显示{{searchList.data.total}}中的30件</p>
          <el-button class="btn ok_btn" type="primary" @click="toMore" v-if="showMore">载入更多</el-button>            
        </el-col>
      </el-row>
    </div>
    <div class="search_none" v-if="!showToLogin && searchList.data.length === 0">
      <p>暂时没找到相关的产品</p>
    </div>
    <div class="login_none" v-if="showToLogin">
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
        productname: '',
        showMore: true
      }
    },
    computed: mapState({
      // 箭头函数可使代码更简练
      searchList: function(state){
        state.login.searchList.data.forEach(el => {
          el.tagprice = workspace.thousandBitSeparator(el.tagprice)
        })
        return state.login.searchList
      },
      tipList: state => state.home.specialEditionList,
      
      // phone: state => state.phone
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
      this.$store.commit('login/searchList', {
        data: [],
        total: 0
      })
    },
    methods: {
      search() {
        let me = this
        let param = {
          data: {
              language: "cn",
              productname: this.productname,
              category: '',
              subcategory: '' ,
              brand: '',
              series: '',
              style: ''
            },
            listQuery: {
              pageSize: 30,
              pageNum: 1
            }
        }
        setTimeout(() => {
          me.$store.dispatch('login/querySearchList', param)
        }, 500)   
      },
      toLogin() {
        this.$router.push('/login')        
      },
      toRegister() {
        this.$router.push('/login/register')        
      },
      // 载入更多
      toMore() {
        this.showMore = false
        let me = this
        let param = {
          data: {
              language: "cn",
              productname: this.productname,
              category: '',
              subcategory: '' ,
              brand: '',
              series: '',
              style: ''
            },
            listQuery: {
              pageSize: me.searchList.data.total,
              pageNum: 1
            }
        }
        me.$store.dispatch('login/querySearchList', param)
      },
    }
}
</script>

<style scoped>
@import "./css/index.less";
.search{
  text-align: left;
  padding:0.25rem 0.18rem;
}
.search /deep/ .el-input{
  display: inline-block;
  width: 90%;
  margin-left:0.1rem;
}
.search /deep/ .el-input input{
  height:0.3rem;
}
.search /deep/ .el-input .el-input__icon{
  height:0.3rem;
  line-height:0.3rem;
}
.search_list{
    text-align:left;
    border-bottom: 0.01rem solid #F6F6F6;
    padding-bottom: 0.1rem;
}
.search_lists{
    padding:0.17rem 0.18rem 0rem 0.18rem;
}
.search_list img{
    widht:0.8rem;
    height:1.07rem;
}
.search_list .search_text{
    color:#333333;
    font-size:15px;
    margin-bottom:0.06rem;
    
} 

.search_list .search_color{
    color:#333333;
    font-size:15px;
}
.search_list .search_code{
    color:#999;
    font-size:15px;
}
.search_list .search_country{
    margin-top:0.45rem;
    color:#C5A480;
    font-weight:'Helvetica';
    font-weight:Bold;
    font-size:12px;
}
.loved_list /deep/ .el-icon-close,.bag_list /deep/ .el-icon-close{
    position: absolute;
    right: 0.18rem;
    color: #999;
}
.loved_list /deep/ .el-icon-close{
    top: 0.2rem;
}
.search_btn{
  width: 0.5rem;
  text-align: center;
  height: 0.3rem;
  padding: 0.05rem;
  background: #c5a480;
  color: #fff;
  position: absolute;
  right: 0.18rem;
}
.productname /deep/ input{
  border: none;
  border-bottom: 1px solid #333;
  border-radius: inherit;
  background: #f6f6f6;
}
</style>