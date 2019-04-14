<template>
    <div class="header">
        <!--<img src="../assets/image/menu.png" class="header_menu" @click.stop="showMenu"/>   
        <img src="../assets/image/search.png" class="header_search"/>
        <img src="../assets/image/logo_home.png" class="header_logo" @click="toHome"/>-->
        <!--<img src="../assets/image/love.png" class="header_logo"/>-->
        <!--<el-badge :value="lovedNumber" class="item header_loved"  size="small">
            <img src="../assets/image/love.png" class="" @click="toLoved"/>
        </el-badge>        
        <el-badge :value="shopBagNumber" class="item header_shop_bag"  size="small" >
        <img src="../assets/image/shopBag.png" class="" @click="toBag"/>
        </el-badge>-->    
        <img src="../assets/image/menu.png" class="header_menu" @click.stop="showMenu"/>   
        <img src="../assets/image/search.png" class="header_search" @click="$router.push('/search')"/>
        <img src="../assets/image/logo_home.png" class="header_logo" @click="toHome"/>  
        <span @click="toLoved">
            <el-badge :value="lovedNumber" class="item header_loved" size="small">
                <img src="../assets/image/love.png" class=""/>
                <!--<span class="header_loved"></span>-->
            </el-badge>
        </span>
        <span @click="toBag">   
            <el-badge :value="shopBagNumber" class="item header_shop_bag" size="small">
                <img src="../assets/image/shopBag.png" class=""/>
            </el-badge>
        </span>   
    </div>
</template>

<script>
import store from '../store'
import { mapState } from 'vuex'
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
      lovedNumber: state => state.lovedNumber,
      shopBagNumber: state => state.shopBagNumber
    }),
  created() {
  },
  methods: {
      toHome: function() { //点击logo 跳至首页
        let status = localStorage.getItem('userName')
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
        height:50px;
        line-height:18px;
        background: #C5A480;
        padding:16px 18px;
    }
    .header_menu{
        /* display: inline-block;
        background-image:url('../assets/image/menu.png');
        background-repeat: no-repeat;
        background-position: center center;
        width: 18px;
        height:18px; */
        position: absolute;
        left: 18px;
    }
    .header_search{
        /* display: inline-block;
        background-image:url('../assets/image/search.png');
        background-repeat: no-repeat;
        background-position: center center;
        width: 18px;
        height:18px; */
        position: absolute;
        left: 61px;
    }
    .header_logo{
        display: inline-block;
        /* background-image:url('../assets/image/menu.png');
        background-repeat: no-repeat;
        background-position: center center; */
        width: 128px;
        height:18px;
        /* background: red; */
        position: absolute;
        left: 124px;

    }
    .header_loved{
        /* display: inline-block;
        background-image:url('../assets/image/love.png');
        background-repeat: no-repeat;
        background-position: center center;
        width: 18px;
        height:18px; */
        position: absolute;
        left: 302px;

    }
    .header_shop_bag{
        /* display: inline-block;
        background-image:url('../assets/image/shopBag.png');
        background-repeat: no-repeat;
        background-position: center center;
        width: 18px;
        height:18px; */
        position: absolute;
        right: 18px;

    }
    .lovedNumber{
        height: 14px;
        /* padding: 2px; */
        padding-left: 3px;
        padding-right: 3px;
        padding-bottom: 2px;
        display: inline-block;
        border-radius: 50%;
        border: 1px solid red;
        font-size: 10px;
    }
</style>