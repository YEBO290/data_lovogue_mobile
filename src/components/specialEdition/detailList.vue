<template>
    <div class="detail_list">    
      <el-carousel :interval="5000" arrow="always" height="375px">
        <el-carousel-item v-for="item in queryImg" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <span class="toLove" title="收藏" @click="toLoveFunc" v-if="toLove"></span>
      <span class="Loved" title="取消收藏" @click="cancelLove" v-else></span>
      <p class="loveTip">{{loveTip}}</p>
      <div class="detail_list_content">
        <h1 class="detail_list_h1">Lorem ipsum dolor</h1>
        <div class="detail_list_p">
          <p class="detail_list_p_sub">Consectetur adipiscing elit.</p>       
          <p class="detail_list_p_sub">Vivamus arcu nisl, vulputate porttitor felis eget, tincidunt dignissim elit.</p>
          <p class="detail_list_p_sub">Praesent cursus, nisi vel feugiat vulputate</p>
        </div>
        <div class="detail_flag">
          <span class="position_btn" v-for="(item, index) in flags" :key="index">{{item.text}}</span>
          <!--<span class="date_btn">约会必备</span>-->
        </div>
        <!--<div>
          <span class="position_btn">职场刚需</span>
          <span class="date_btn">约会必备</span>
        </div>  -->
      </div>
      <div class="recommend_list">
        <p class="recommend">搭配单品推荐</p>
        <el-row :gutter="5"  justify="center">
          <el-col :span="8" v-for="(item, index) in recommendList" :key="index" class="recommend_list_div">
            <div class="grid-content bg-purple">
              <img :src="item.url" style="width:110px;height:147px;display:block;background:#fff;">
              <div class="recommend_line"></div>
              <p class="recommend_text">{{item.text}}</p>
            </div>
            </el-col>
        </el-row>
      </div>
      <div></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {

  },
  data() {
    return {
      showMenu:false,
      toLove: true,
      loveTip: '收藏',
      flags:[{text: '职场刚需'},{text: '约会必备'}]
    }
  },
  computed: mapState({
      queryImg: state => state.detailList.queryImg,
      recommendList: state => state.detailList.recommendList
    }),
  created() {
    // this.$store.dispatch('detailList/queryImg') // 获取轮播图列表
  },
  methods: {
    // 清除
    del() {
      this.showMenu = false
    },
    // 展开
    expand() {
      this.showMenu = true
    },
    // 收藏
    toLoveFunc() {
      this.toLove = false
      this.loveTip = '收藏成功'
      // 发送请求
      this.$store.dispatch('detailList/toLoved').then(res => {
        this.$store.commit('lovedNumber', 1)
      })
    },
    // 取消收藏
    cancelLove() {
      this.toLove = true
      this.loveTip = '收藏'
      // 发送请求
      this.$store.dispatch('detailList/cancelLove').then(res => {
        this.$store.commit('lovedNumber', 0)
      })
    }
  }
}
</script>

<style scoped>
@import "./css/detailList.less";
</style>detail_list