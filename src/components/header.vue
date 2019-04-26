<template>
    <div class="header">
        <el-row :gutter="20">
            <el-col :span="3">
                <div class="grid-content bg-purple">
                    <img src="../assets/image/menu.png" class="header_menu" @click.stop="showMenu"/>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple">
                    <img src="../assets/image/search.png" class="header_search" @click="$router.push('/search')"/>
                </div>
                </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <img src="../assets/image/logo_home.png" class="header_logo" @click="toHome"/>
                </div>
                </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple"  @click="toLoved">
                    <el-badge :value="lovedNumber" class="item header_loved" size="small" :hidden="lovedNumber < 1">
                        <img src="../assets/image/love.png" class=""/>
                    </el-badge>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple" @click="toBag">
                    <el-badge :value="shopBagNumber" class="item header_shop_bag" size="small" :hidden="shopBagNumber < 1">
                        <img src="../assets/image/shopBag.png" class=""/>
                    </el-badge>
                </div>
            </el-col>
        </el-row> 
    </div>
</template>

<script>
import store from '../store'
import { mapState } from 'vuex'
import workspace from '../common.js'
document.onclick=function(){
    store.commit('showMenu', false)
    store.commit('showSubMenu', false)
//   let child = document.getElementById("menu") 
//   let parent = document.getElementById("home") 
//   document.getElementById("menu") && (parent.removeChild(child))
}
export default {
  components: {

  },
  data() {
    return {
        search: false
    }
  },
  computed: mapState({
      lovedNumber: state => state.login.lovedNumber,
      shopBagNumber: state => state.login.shopBagNumber
    }),
  created() {
  },
  methods: {
      toHome() { //点击logo 跳至首页
        let status = workspace.getCookie().name
        if(status !== '' && status !== null && status !== undefined) {
            this.$router.push('/home')
        } else {
            this.$router.push('/login')
        }   
      },
      showMenu() {
        this.$store.commit('showMenu', true)
        this.$store.commit('showSubMenu', false)
      },
      hideMenu() {
        this.$store.commit('showMenu', false)
      },
      toLoved() {
        this.$router.push('/loved')
      },
      toBag() {
        this.$router.push('/bag')
      }
  }
}
</script>

<style scoped>
    .header{
        width:100%;
        height:0.5rem;
        line-height:0.18rem;
        background: #C5A480;
        padding:0.16rem 0.18rem;
        position: relative;
    }
    /* .header_menu{
        position: absolute;
        left: 0.18rem;
    } */
    /* .header_search{
        position: absolute;
        left: 0.61rem;
    } */
    /* .header_logo{
        width: 1.28rem;
        height:0.18rem;
    } */
    /* .header_loved{
        position: absolute;
        right: 0.18rem;
    } */
    /* .header_shop_bag{
        position: absolute;
        right: 0.59rem;
    } */
    .lovedNumber{
        height: 0.14rem;
        /* padding: 2px; */
        padding-left: 0.03rem;
        padding-right: 0.03rem;
        padding-bottom: 0.02rem;
        display: inline-block;
        border-radius: 50%;
        border: 0.01rem solid red;
        font-size: 10px;
    }
    /* .el-badge /deep/ .el-badge__content{
         border-radius: 50%/50%;
        color: #FFF;
        display: inline-block;
        font-size: 10px;
        height: 13px;
        line-height: 2px;
        padding: 7px 2px;
        text-align: center;
        white-space: nowrap;
        background-color: red;
    } */
    .el-badge /deep/ .is-fixed{
        position: absolute;
        top: -4px;
        right: 5px;
    }
</style>