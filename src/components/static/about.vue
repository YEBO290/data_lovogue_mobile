<template>
    <div class="about_static">
      <el-row class="about_img">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <img :src="aboutDetail.url" alt="">
          </div>
          </el-col>
      </el-row>
      <!--<div class="about_img"><img :src="aboutDetail.url" alt=""></div>-->
      <div class="about_txt">
         <p class="txt txt_one text-left">{{aboutDetail.txt}}</p>
        <p class="txt txt_last text-left">{{aboutDetail.text}}</p>
      </div>    
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  components: {

  },
  data() {
    return {
    }
  },
  computed: mapState({
      aboutDetail: state => state.aboutDetail
    }),
  created() {
    // this.$store.dispatch('queryAboutDetail') // 关于我们
  },
  methods: {
    
  }
}
</script>
<style scoped>
.about_static{
  background:#EFDED1;
}
.about_txt{ 
  padding-left:0.18rem;
  padding-right:0.18rem;
}
.about_img img{
    width: 100%;
    height: 2.6rem;
}
.about_static p {
    font-size: 15px;
    color: #C5A480;
    margin-top:0.2rem;
}
</style>