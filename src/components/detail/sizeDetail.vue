<template>
    <div class="size_detail">    
      <span class="toLove" title="收藏" @click="toLoveFunc" v-if="toLove"></span>
      <span class="Loved" title="取消收藏" @click="cancelLove" v-else></span>     
      <el-button class="btn ok_btn" type="primary" @click="toBuy">立即选购</el-button>
      <el-button class="btn addBag_btn" @click="toBag">加入购物袋</el-button>    
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
    }
  },
  computed: mapState({
      queryImg: state => state.detail.queryImg,
      colorList: state => state.detail.colorList,
      recommendList: state => state.detailList.recommendList
    }),
  created() {

  },
  methods: {
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
    },
    // 立即选购
    toBuy() {
      this.$store.dispatch('detail/toBuy')
    },
    // 加入购物袋
    toBag() {
      this.$store.dispatch('detail/toBag').then(res => {
        this.$store.commit('shopBagNumber', 1)
      })
    }
  }
}
</script>

<style scoped>
@import "./css/sizeDetail.less";
</style>