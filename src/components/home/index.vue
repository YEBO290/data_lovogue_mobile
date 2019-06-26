<template>
    <div class="home" id="home">   
      <div class="carousel_img">
        <el-carousel :interval="4000" arrow="always" height="4.25rem">
          <el-carousel-item v-for="item in queryImg" :key="item.id">
            <div @click="toSpecialEditionList(item)">
              <img :src="item.value" style="width:100%;">
              <div class="img_opeation">
                <h1 class="list_h1">{{item.name}}</h1>
                <!-- <el-button class="img_list_btn" @click="toSpecialEditionList2(item.prodlink)">{{item.name}}</el-button> -->
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>          
      </div>
     <!--<div class="img_list">
        <el-row :gutter="10">
          <el-col :span="12" v-for="item in specialImg" :key="item.id">
            <div class="grid-content bg-purple">
              <img :src="item.value"/>
              <h1 class="list__sub_h1">{{item.name}}</h1>-->
              <!-- <el-button class="img_list_sub_btn" @click="toSpecialEditionList(item)">立即选购</el-button> -->
            <!--</div>
            </el-col>
        </el-row>
      </div> -->
      <div class="product_list">
        <!-- <p class="product_list_titile">产品系列</p> -->
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div v-for="item in productList" class="swiper-slide" :key="item.id"  @click="toProduct(item)">
                <img :src="item.value" />
                <h5>{{ item.name }}</h5>
              </div>
             </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="category_list">
        <!-- <p class="category_list_titile">类别</p> -->
        <!-- <el-row>
          <el-col v-for="item in categoryList" :key="item.id" class="category_list_img">
            <div class="grid-content bg-purple category_content" @click="toCategoryList(item)">
              <img :src="item.value" style="width:100%;min-height:3.39rem;"/>
              <p class="category_list_img_name text-center">{{item.name}}</p>
            </div>
            </el-col>
        </el-row> -->
        <el-row :gutter="10">
            <el-col :span="8"  v-for="item in categoryList" :key="item.id">
              <div class="grid-content bg-purple" style="margin-bottom: 0.2rem;"  @click="toCategoryList(item)">
                <img :src="item.value" style="width:100%;min-height:1.07rem;display:block;background:#fff;">
                <p class="recommend_text" style="margin-top:0.1rem;">{{item.name}}</p>
              </div>
            </el-col>
          </el-row>
      </div>
    </div>
</template>

<script>
import menuList from '../menu'
import { mapState } from 'vuex'
import Swiper from 'swiper'

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
      specialImg: state => state.home.specialImg,
      productList: state => state.home.productList, // 产品系列
      categoryList: state => state.home.categoryList, // 类别
      showMenu: state => state.showMenu // 菜单
    }),
  created () {
    this.$store.dispatch('home/queryImg')  // 轮播图
    this._intSwiper()
    // this.$store.dispatch('home/queryProductList')  // 产品系列
    // this.$store.dispatch('home/queryLists')  // 列表
    // this.$store.dispatch('home/queryCategoryList')  // 类别
     // this.$store.dispatch('home/querySpecialEditionList')  // 特辑
    // this.$store.dispatch('home/queryBrandList')  // 品牌
    // this.$store.dispatch('home/queryAboutList')  // 关于我们
  },
  mounted() {
    var swiper = new Swiper('.swiper-container', {
      // slidesPerView: 2,
      spaceBetween: 20,
      slidesPerGroup: 2,
      slidesPerView: "auto",
      centeredSlides:true,
      loop: true,
      loopFillGroupWithBlank: true,
      paginationType : 'custom',//自定义-分页器样式类型（前提）
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true,//修改swiper的父元素时，自动初始化swiper
      // pagination: {
      // el: '.swiper-pagination',
      // clickable: true,
      // },
      pagination:'.swiper-pagination'
    })
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
      let name = val.prodlink
      this.$router.push(`/productList/${name}`)
    },
    toSpecialEditionList(val) {
      // 跳转至特辑列表页
      this.$router.push(`/specialEdition/${val.id}`)
    },
    toSpecialEditionList2(val) {
      // 跳转至特辑列表页
      this.$router.push(`/detailList/${val}`)
    },
    toCategoryList(val) {
      // 跳转至类别列表页
      let name = val.prodlink
      this.$router.push(`/categoryList/${name}`)
    },
    toBrandList() {
      // 跳转至品牌列表页
      this.$router.push('/brandList')
    },
    _intSwiper() {
      var mySwiper = new Swiper ('.swiper-container', {
        autoplay : 5000,//可选选项，自动滑动
        loop : true,//可选选项，开启循环
        // direction: 'vertical', // 垂直切换选项
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        slidesPerView : 2,
        slidesPerGroup : 2,
        centeredSlides : false,
        offsetSlidesBefore : 0,
        offsetPxBefore: 0,
        
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        hide : false,
        dragSize: 300,
        
        // 如果需要滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      })
      
    }
  }
}
</script>

<style scoped>
@import "./css/index.less";
/* @import '../../node_modules/swiper/dist/css/swiper.min.css'; */
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 2rem;
    margin: 0;
  }
  #home /deep/ .el-carousel__item{
    min-height:3.75rem;
  }
   #home /deep/ .swiper-slide{
    width: 1.65rem!important;
    margin-right:10px!important;

  } 
     /*#home /deep/ .swiper-slide img{
    width: 1.65rem!important;
    height: 1.65rem!important;

  } */
  #home /deep/ .swiper-slide h5{
    position: absolute;
    margin-top: -0.2rem;
    color: #EFDED1;
    width: 100%;
    text-align: center;
  }
  .carousel_img{
    position: relative;
  }
  .carousel_img .img_opeation{
    position: absolute;
    bottom: 0.50rem;
  }
  /* .product_list /deep/ .swiper-container .swiper-slide-prev{
    display:none; 
  }
  .product_list /deep/ .swiper-container .swiper-button-next{
     display: none;
  } */
</style>