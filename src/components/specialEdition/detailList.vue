<template>
    <div class="detail_list">    
      <el-carousel :interval="5000" arrow="always" height="3.75rem">
        <el-carousel-item v-for="item in queryImg" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <span class="toLove" title="收藏" @click="toLoveFunc" v-if="love"></span>
      <span class="Loved" title="取消收藏" @click="cancelLove" v-else></span>
      <!--<p class="loveTip">{{loveTip}}</p>-->
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
              
              <img :src="item.url" style="width:1.1rem;height:1.47rem;display:block;background:#fff;">
              <div class="recommend_line"></div>
              <p class="recommend_text">{{item.text}}</p>
            </div>
            </el-col>
        </el-row>
      </div>
      <div>
        <el-row  justify="center" :style="{backgroundImage: 'url(' + specialBackImg + ')', backgroundSize:'100%'}">
          <el-col :span="8" v-for="item in specialImg" :key="item.id" class="subImg" :style="{top: (item.row-1)*195/100+'rem', left:(item.col - 1)*33+'%'}">
            <div class="grid-content bg-purple showImg" @click="showImg(item)">
              <transition name="el-zoom-in-center">    
                <div v-if="showList[item.col*item.row]" class="selectList" :class="selectItem(item)">         
                  <div class="select_btn"></div>
                  <div class="select_line"></div>
                  <div class="select_img">
                    <i class="el-icon-close icon" @click.stop="hideImg(item)"></i>
                    <img :src="item.imgpath" class="backImg" style="width:100%">
                  </div>
                </div>
              </transition>
            </div>
            </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {

  },
  props: ['id'],
  data() {
    return {
      showMenu:false,
      toLove: true,
      loveTip: '收藏',
      flags:[{text: '职场刚需'},{text: '约会必备'}],
      showList: []
    }
  },
  computed: mapState({
      queryImg: state => state.detailList.queryImg,
      recommendList: state => state.detailList.recommendList,
      specialImg: state => state.detailList.specialImg,
      specialBackImg: state => {
        if (state.detailList.specialImg.length > 0) {
          return state.detailList.specialImg[0].backpng
        } else {
          return ''
        }
      }
    }),
  created() {
    debugger
    // this.$store.dispatch('detailList/queryImg') // 获取轮播图列表
    let param = {
      prodname: this.id
    }
    this.$store.dispatch('detailList/querySpecialImg', param) // 获取特辑图片
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
      let param = {
        userid: localStorage.getItem('userName'),
        status: "1",
        prodid: item.productid,
        amount: "1"
      }
      this.$store.dispatch('toLoved', param).then(res => {
        if(res == 1) {
          let queryParam = {
            userid: localStorage.getItem('userName'),
            status: "1"
          }
          this.$store.dispatch('login/queryLovedList', queryParam)
          let param = this.searchParam(30, 1)
          this.$store.dispatch('home/queryProductList', param)
        } else {
          this.$message({
            message: '添加挚爱失败，请重试',
            type: 'error'
          })
        }   
      })
    },
    // 取消收藏
    cancelLove() {
      this.toLove = true
      this.loveTip = '收藏'
      let param = {
        userid: localStorage.getItem('userName'),
        status: "0",
        prodid: item.productid,
        amount: "1"
      }
      this.$store.dispatch('cancelLove', param).then(res => {
        if(res == 1) {
          let queryParam = {
            userid: localStorage.getItem('userName'),
            status: "1"
          }
          this.$store.dispatch('login/queryLovedList', queryParam)
          let param = this.searchParam(30, 1)
          this.$store.dispatch('home/queryProductList', param)
        } else {
          this.$message({
            message: '移除挚爱失败，请重试',
            type: 'error'
          })
        }   
      })
    },
    showImg(val) {
      this.showList = []
      this.$set(this.showList, val.col * val.row, true)
      // if(this.showList[val.col * val.row]) {
      //   this.$set(this.showList, val.col * val.row, false)
      // } else {
      //   this.$set(this.showList, val.col * val.row, true)
      // }
    },
    hideImg(val) {
      this.$set(this.showList, val.col * val.row, false)
    },
    selectItem(val) {
      if(val.row == 1 && val.col == 1 || val.row == 1 && val.col == 2 || val.row == 2 && val.col == 1 || val.row == 2 && val.col == 2) {
        return 'selectRight'
      } else if(val.row == 3 && val.col == 1 || val.row == 3 && val.col == 2) {
        return 'selectTop'
      } else if(val.row == 1 && val.col == 3 || val.row == 2 && val.col == 3) {
        return 'selectLeft'
      } else {
        return 'selectLeftTop'
      }
    }
  }
}
</script>

<style scoped>
@import "./css/detailList.less";
.detail_list /deep/ .el-row{
  background-repeat: no-repeat;
  width: 100%;
  height: 5.83rem;
  position: relative;
    /* height: 400px; */
    /*background-image: url(../../assets/logo.png); */
}
.subImg{
  height:1.95rem;
  position: absolute;
}
.showImg{
  width:100%;
  height:1.95rem;
}
.icon{
  right: 0.1rem;
  top: 0.1rem;
  color: #000;
  left: 85%;
}
.select_btn{
  width: 0.21rem;
  height: 0.21rem;
  background: #fff;
  border-radius: 50%;
  top:50%;
  margin-top: -0.105rem;
  left: 50%;
  margin-left: -0.105rem;
  position: relative;
}
.selectRight .select_line{
  position: relative;
  width: 1.1rem;
  height: 0.25rem;
  border-top: 0.01rem solid #fff;
  border-right: 0.01rem solid #fff;
  left:50%;
  margin-top: -0.105rem;
  
}
.selectRight .select_img{
    width: 100%;
    left: 100%;
    margin-left: -0.2rem;
    position: relative;
    box-shadow: 0.05rem 0.05rem 0.05rem #888888;
    transition: all 1s;
}
.select_img{
  width: 1.37ewm;
  height: 1.5rem;
  padding: 0.05rem;
  border: 0.01rem solid #fff;
  /* background: #fff; */
}
.select_img img {
  width: 100%;
  height: 1.4rem;
}
.selectRight{
  position: relative;
  top: 50%;
}
.selectTop .select_line{
  position: relative;
  width: 1.1rem;
  height: 0.25rem;
  border-bottom: 0.01rem solid #fff;
  border-right: 0.01rem solid #fff;
  left: 50%;
}
.selectTop .select_img{
  width: 100%;
  left: 100%;
  margin-left: -0.2rem;
  position: absolute;
  box-shadow: 0.05rem 0.05rem 0.05rem #888888;
  transition: all 1s;
  margin-top:-1.71rem;
}
</style>