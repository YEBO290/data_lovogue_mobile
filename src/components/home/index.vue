<template>
    <div class="home" id="home">   
      <div>
        <el-carousel :interval="4000" arrow="always" height="500px">
          <el-carousel-item v-for="item in queryImg" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel> 
        <div class="img_opeation">
          <h1 class="list_h1">Lorem ipsum dolor</h1>
          <p class="img_list_p">Style 01</p>
          <el-button class="img_list_btn" @click="toSpecialEditionList">立即选购</el-button>
        </div> 
      </div>

      <div class="img_list">
        <el-row :gutter="10">
          <el-col :span="12" v-for="(item, index) in lists" :key="index">
            <div class="grid-content bg-purple">
              <img :src="item.url"/>
              <h1 class="list__sub_h1">{{item.title}}</h1>
              <p class="img_list_sub_p">{{item.style}}</p>
              <el-button class="img_list_sub_btn" @click="toBrandList">立即选购</el-button>
            </div>
            </el-col>
        </el-row>
       <!-- <div class="img_style"  v-for="(item, index) in lists" :key="index">

          
        </div>    -->  
      </div>
      <div class="product_list">
        <p class="product_list_titile">产品系列</p>
        <!--<div v-for="(item, index) in productList" :key="index" class="productList">
          <img :src="item.url"/>
          <div class="productList_txt">
            <p class="productList_txt_series">{{item.series}}</p>
            <p class="productList_txt_style">{{item.style}}</p>
          </div>
        </div>-->
        <el-carousel  type="card" height="150px" :interval="400000" class="productList">
          <el-carousel-item v-for="(item, index) in productList" :key="index" :name="item.style">
            <h3 @click="toProduct">{{ item.series }}</h3>
            <span @click="toProduct">{{ item.style }}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="category_list">
        <p class="category_list_titile">类别</p>
        <el-row>
          <el-col v-for="(item, index) in categoryList" :key="index" class="category_list_img">
            <div class="grid-content bg-purple" @click="toCategoryList">
              <img :src="item.url" style="height:339px;"/>
              <p class="category_list_img_name text-center">{{item.name}}</p>
            </div>
            </el-col>
        </el-row>
        <!--<div v-for="(item, index) in categoryList" :key="index" class="category_list_img">
          <img :src="item.url" style="height:339px;"/>
          <p class="category_list_img_name">{{item.name}}</p>
        </div>-->
      </div>
      
    </div>
</template>

<script>
import menuList from '../menu'
import { mapState } from 'vuex'

export default {
  components: {
    menuList
  },
  data() {
    return {
    }
  },
  computed: mapState({
      queryImg: state => state.home.queryImg,
      lists: state => state.home.lists,
      productList: state => state.home.productList,
      categoryList: state => state.home.categoryList,
      showMenu: state => state.showMenu
    }),
  created () {
    // this.$store.dispatch('home/queryImg')  // 轮播图
    // this.$store.dispatch('home/queryProductList')  // 产品系列
    // this.$store.dispatch('home/queryLists')  // 列表
    // this.$store.dispatch('home/queryCategoryList')  // 类别
     // this.$store.dispatch('home/querySpecialEditionList')  // 特辑
    // this.$store.dispatch('home/queryBrandList')  // 品牌
    // this.$store.dispatch('home/queryAboutList')  // 关于我们
  },
  methods: {
    del() {
      this.showMenu = false
    },
    expand() {
      this.showMenu = true
    },
    toSpecialEdition() {
      // 跳转至特辑列表页
      this.$router.push('/specialEditionList')
    },
    toProduct() {
      // 跳转至产品列表页
      this.$router.push('/productList')
    },
    toSpecialEditionList() {
      // 跳转至特辑列表页
      this.$router.push('/specialEditionList')
    },
    toCategoryList() {
      // 跳转至类别列表页
      this.$router.push('/categoryList')
    },
    toBrandList() {
      // 跳转至品牌列表页
      this.$router.push('/brandList')
    }
  }
}
</script>

<style scoped>
@import "./css/index.less";
</style>