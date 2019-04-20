<template>
    <div class="home" id="home">   
      <div>
        <el-carousel :interval="4000" arrow="always" height="5rem">
          <el-carousel-item v-for="item in queryImg" :key="item.id">
            <div @click="toSpecialEditionList(item)">
              <img :src="item.value" style="width:100%;">
              <div class="img_opeation">
                <h1 class="list_h1">{{item.name}}</h1>
                <!--<p class="img_list_p">{{item.name}}</p>-->
                <el-button class="img_list_btn" @click="toSpecialEditionList(item)">立即选购</el-button>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel> 
         
      </div>

      <!--<div class="img_list">
        <el-row :gutter="10">
          <el-col :span="12" v-for="(item, index) in lists" :key="index">
            <div class="grid-content bg-purple">
              <img :src="item.url"/>
              <h1 class="list__sub_h1">{{item.title}}</h1>
              <p class="img_list_sub_p">{{item.style}}</p>
              <el-button class="img_list_sub_btn" @click="toBrandList(item)">立即选购</el-button>
            </div>
            </el-col>
        </el-row>
        </div>-->
       <!-- <div class="img_style"  v-for="(item, index) in lists" :key="index">

          
        </div>    -->  
      
      <div class="product_list">
        <p class="product_list_titile">产品系列</p>
        <!--<div v-for="(item, index) in productList" :key="index" class="productList">
          <img :src="item.url"/>
          <div class="productList_txt">
            <p class="productList_txt_series">{{item.series}}</p>
            <p class="productList_txt_style">{{item.style}}</p>
          </div>
        </div>-->
        
          <el-carousel  type="card" height="1.5rem" :interval="4000" class="productList">
            <el-carousel-item v-for="item in productList" :key="item.id">
              <div @click="toProduct(item)">
                <img :src="item.value"/>
                <h3>{{ item.name }}</h3>
                <!--<span>{{ item.name }}</span>-->
              </div>
            </el-carousel-item>
          </el-carousel>
      </div>
      <div class="category_list">
        <p class="category_list_titile">类别</p>
        <el-row>
          <el-col v-for="item in categoryList" :key="item.id" class="category_list_img">
            <div class="grid-content bg-purple" @click="toCategoryList(item)">
              <img :src="item.value" style="height:3.39rem;"/>
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
      queryImg: state => state.home.queryImg, // 轮播图
      lists: state => state.home.lists,
      productList: state => state.home.productList, // 产品系列
      categoryList: state => state.home.categoryList, // 类别
      showMenu: state => state.showMenu // 菜单
    }),
  created () {
    this.$store.dispatch('home/queryImg')  // 轮播图
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
    toProduct(val) {
      // 跳转至产品列表页
      let name = val.name
      this.$router.push(`/productList/${name}`)
    },
    toSpecialEditionList(val) {
      // 跳转至特辑列表页
      this.$router.push(`/specialEdition/${val.id}`)
    },
    toCategoryList(val) {
      // 跳转至类别列表页
      let name = val.name
      this.$router.push(`/categoryList/${name}`)
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
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 2rem;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>