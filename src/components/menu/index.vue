<template>
  <div class="menu_home">
    <div class="menu_index">  
      <img src="../../assets/image/menulogo.png" style="width: 0.6rem;height: 0.54rem;margin: 0 auto;display: inherit;margin-bottom: 0.36rem;"/>
      <p class="menu_title login" @click="toLogin"><span class="glyphicon glyphicon-user" style="margin-right:0.12rem;"></span>登录</p>   
      <i class="el-icon-close" @click="hideMenu" style="top:0.1rem;"></i>
      <div style="background:#EFDED1;height:0.01rem;margin-bottom:0.25rem;width:100%;"></div>
      <p class="menu_title login" @click="toHome">首页</p>  
      <p class="menu_title" @click.stop="expandSpecialEditionFunc">特辑</p>  
      <span class="el-icon-plus" @click.stop="expandSpecialEditionFunc" v-if="!expandSpecialEdition"></span>
      <span class="el-icon-minus" @click.stop="expandSpecialEditionFunc" v-if="expandSpecialEdition"></span>
      <ul  v-if="expandSpecialEdition">
        <li v-for="(item, index) in specialEditionList" :key="index" class="menu_txt">{{item.name}}
        </li>
      </ul>
      <p class="menu_title" @click.stop="expandProductFunc">产品系列</p>  
      <span class="el-icon-plus" @click.stop="expandProductFunc" v-if="!expandProduct"></span>
      <span class="el-icon-minus" @click.stop="expandProductFunc" v-if="expandProduct"></span>
      <ul v-if="expandProduct">
        <li v-for="(item, index) in productList" :key="index" class="menu_txt">{{item.name}}
        </li>
      </ul>
      <p class="menu_title" @click.stop="expandCategoryFunc">类别</p>  
      <span class="el-icon-plus" @click.stop="expandCategoryFunc" v-if="!expandCategory"></span>
      <span class="el-icon-minus" @click.stop="expandCategoryFunc" v-if="expandCategory"></span>
      <ul v-if="expandCategory">
        <li v-for="(item, index) in categoryList" :key="index" class="menu_txt">{{item.name}}
        </li>
      </ul>
      <p class="menu_title" @click.stop="expandBrandFunc">品牌</p>
      <span class="el-icon-plus" @click.stop="expandBrandFunc" v-if="!expandBrand"></span>
      <span class="el-icon-minus" @click.stop="expandBrandFunc" v-if="expandBrand"></span>
      <ul v-if="expandBrand">
        <li v-for="(item, index) in brandList" :key="index" class="menu_txt">{{item.name}}
        </li>
      </ul>
      <p class="menu_title" @click.stop="expandAboutFunc">关于我们</p>
      <span class="el-icon-plus" @click.stop="expandAboutFunc" v-if="!expandAbout"></span>
      <span class="el-icon-minus" @click.stop="expandAboutFunc" v-if="expandAbout"></span>
      <ul v-if="expandAbout">
        <li v-for="(item, index) in aboutList" :key="item.id" class="menu_txt"
         @click="checkColorList(index, item)">{{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      expandSpecialEdition: false,
      expandProduct: false,
      expandCategory: false,
      expandBrand: false,
      expandAbout: false
    }
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    specialEditionList: state => state.home.specialEditionList, // 特辑
    productList: state => state.home.productList, // 产品系列
    categoryList: state => state.home.categoryList, // 类别
    brandList: state => state.home.brandList, // 品牌
    aboutList: state => state.home.aboutList // 关于我们
    // 传字符串参数 'count' 等同于 `state => state.count`
    // countAlias: 'count',

    // // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    // countPlusLocalState (state) {
    //   return state.count + this.localCount
    // }
  }),
  created() {
    // this.$store.dispatch('list/querySituationList', '123')
  },
  methods: {
    expandSpecialEditionFunc() {
      this.expandSpecialEdition = !this.expandSpecialEdition
    },
    expandProductFunc() {
      this.expandProduct = !this.expandProduct
    },
    expandCategoryFunc() {
      this.expandCategory = !this.expandCategory
    },
    expandBrandFunc() {
      this.expandBrand = !this.expandBrand
    },
    expandAboutFunc() {
      this.expandAbout = !this.expandAbout
    },
    hideMenu() {
      this.$store.commit('showMenu', false)
    },
    toHome() {
      this.$router.push('/home')
    },
    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import "./css/index.less";
</style>