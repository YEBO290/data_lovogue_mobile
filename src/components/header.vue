<template>
    <div class="header">
        <el-row :gutter="20" style=" margin-bottom: 14px;">
            <el-col :span="3">
                <div class="grid-content bg-purple" @click="headerOver()">
                    <!--<img src="../assets/image/menu.png" class="header_menu" @click.stop="showMenu"/>-->
                    <img src="../assets/image/menu.png" class="header_menu" />
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
            <!--<el-col :span="3">
                <div class="grid-content bg-purple"  @click="toLoved">
                    <el-badge :value="lovedNumber" class="item header_loved" size="small" :hidden="lovedNumber < 1">
                        <img src="../assets/image/love.png" class="" v-if="!showLoved"/>
                        <img src="../assets/image/lovedlist.png" class="" v-else/>
                    </el-badge>
                </div>
            </el-col>-->
            <el-col :span="3">
                <div class="grid-content bg-purple" @click="toBag">
                    <el-badge :value="shopBagNumber" class="item header_shop_bag" size="small" :hidden="shopBagNumber < 1">
                        <img src="../assets/image/shopBag.png" class="" v-if="!showbag"/>
                        <img src="../assets/image/shopBaged.png" class="" v-else/>
                    </el-badge>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple"  @click="$router.push('/user')">
                    <span class="glyphicon glyphicon-user" style="color:#EFDED1;margin-top: 1px;margin-right:0.18rem;"></span>
                </div>
            </el-col>
        </el-row> 
        <menuList class="menuList" id="menu" v-if="user"/>
    </div>
</template>

<script>
import store from '../store'
import { mapState } from 'vuex'
import workspace from '../common.js'
import menuList from './menu'
document.onclick=function(){
    store.commit('showMenu', false)
    store.commit('showSubMenu', false)
//   let child = document.getElementById("menu") 
//   let parent = document.getElementById("home") 
//   document.getElementById("menu") && (parent.removeChild(child))
}
export default {
  components: {
      menuList
  },
  data() {
    return {
        search: false,
        // showLoved: false
    }
  },
  computed: mapState({
      showLoved: state => state.showLoved,
      showbag: state => state.showbag,
      lovedNumber: state => state.login.lovedNumber,
      shopBagNumber: state => state.login.shopBagNumber,
      user(){
        return workspace.getCookie().name
        }
    }),
  created() {
  },
  methods: {
      headerOver(){
            // document.getElementById('menu').style.display = 'block'
            document.getElementById('menu').style.cssText = 'display:block;'
        },
      toHome() { //点击logo 跳至首页
        this.$router.push('/home')
        // let status = workspace.getCookie().name
        // if(status !== '' && status !== null && status !== undefined) {
        //     this.$router.push('/home')
        // } else {
        //     this.$router.push('/login')
        // }   
      },
      showMenu() {
        this.$store.commit('showMenu', true)
        this.$store.commit('showSubMenu', false)
      },
      hideMenu() {
        this.$store.commit('showMenu', false)
      },
      toLoved() {
        this.$store.commit("showLoved", true)
        this.$router.push('/loved')
      },
      toBag() {
        this.$store.commit("showbag", true)
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
        padding:0.16rem 0;
        position: fixed;
        top: 0px;
        z-index: 9999999;
    }
    .header_menu{
        /* position: absolute; */
        margin-left: 0.18rem;
    }
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
    .el-badge {    /* 临时，需删除*/
        position: relative;
        top: -3px;
    }
    .menuList{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 60%;
    background: #EFDED1;
    display: none;
    
}
</style>