<template>
  <div class="search">
    <img src="../../assets/image/back.png" @click="$router.push('/home')">
    <el-input
    placeholder="搜索..." class="productname"
    v-model.trim="productname" @change="search">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
  <div class="login_none" v-if="showToLogin">
    <el-button class="btn ok_btn" type="primary" @click="toLogin">登录</el-button>
    <el-button class="btn cancel_btn" type="primary" @click="toRegister">注册</el-button>
  </div>
  <div v-else>
    <div class="tip_searchList" v-if="showTip">
      <div v-for="(item, index) in tipList" :key="index">
        <p class="menu_title" @click.stop="toMenu(item, index)">{{item.name}}</p>  
        <div v-if="item.next">
          <ul v-if="expand[index]">
            <li v-for="(el, index) in item.next" :key="index" class="menu_txt" @click.stop="toSubMenu(el)">{{el.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search_lists" v-if="!showTip && searchList.data.length > 0">
        <el-row :gutter="20" class="search_list" v-for="(item, index) in searchList.data" :key="index">
          <el-col :span="8"><img :src="item.imgpath" class="search_img" @click="$router.push(`/detail/${item.typeno}`)"/></el-col>
          <el-col :span="16">
            <div @click="$router.push(`/detail/${item.typeno}`)">
              <div>
                <span class="search_text">{{item.productname}}</span>
              </div>
              <div>
                <span class="search_color">{{item.color}} - <span  class="search_code">编号  {{item.typeno}}</span></span>
              </div>
              <div class="search_country">
                <span class="search_price">RMB {{item.tagprice}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="!showTip && searchList.data.total > 30">
          <el-col :span="24">
            <p class="showTip list_more_tip"  v-if="showMore">显示{{searchList.data.total}}中的30件</p>
            <el-button class="btn ok_btn" type="primary" @click="toMore" v-if="showMore">载入更多</el-button>            
          </el-col>
        </el-row>
      </div>
      <div class="search_none" v-if="!showTip && searchList.data.length === 0">
        <p>暂时没找到相关的产品</p>
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
        productname: '',
        showMore: true,
        expand: [],
        showTip: true
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
      tipList: state => state.home.menuList
    }),
    created() {
      this.$store.dispatch('home/queryMenuList')
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
        me.showTip = false
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
      expandFunc(val, index) {
        if (this.expand[index]) {
          this.$set(this.expand, index, false)
        } else {
          this.$set(this.expand, index, true)
        }
      },
      toMenu(val, index) {
        if (val.next && !this.expand[index]) {
          this.expandFunc(val, index)
        } else {
          this.$router.push(val.prodlink)
        }  
      },
      toSubMenu(val) {
        this.$router.push(val.prodlink)
      }
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
.tip_searchList{
  text-align: center;
  padding-top: 45px;
}
.tip_searchList .menu_title{
  font-size:15px;
  color:#111;
  font-weight: 600;
  margin-bottom: 15px;
}
ul>li {
  margin-bottom: 10px;
}
</style>