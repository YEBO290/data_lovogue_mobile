<template>
    <div id="app">
        <header-tab/>      
        <div class="content">
            <keep-alive>
                <router-view :key="key"></router-view>
            </keep-alive>
            <!-- <router-view></router-view>    -->
        </div>
        <!--<menuList class="menuList" id="menu" v-if="showMenu"/>-->
        <div class="content-footer" :class="{'bgr': bgr}" v-if="showFooter"> 
            <footer-tab/>
        </div>
        <div class='loading' v-if='showLoading'> <!-- v-if='showLoading'-->
            <img src='~@/assets/image/loading.gif'>
        </div>
        <to-top/>
        </div>
</template>

<script>
import HeaderTab from './components/header.vue'
import FooterTab from './components/footer.vue'
import { mapState } from 'vuex'
import menuList from './components/menu'
import toTop from './components/common/toTop'
import workspace from './common.js'
let data = () => {
    return {
    }
}
export default {
    name: 'app',
    data:data,
    components:{
        HeaderTab,
        FooterTab,
        menuList,
        toTop
    },
    computed: mapState({
        bgr: state => state.bgr,
        showMenu: state => state.showMenu,
        showFooter: state => state.showFooter,
        key(){
	        return this.$route.path + Math.random();
        },
        showLoading: state => state.showLoading
    }),
    created() {
        let me = this
        let useName = workspace.getCookie().name
        if(useName) {       
            let loveParam = {
                userid: useName,
                status: "1"
            }
            me.$store.dispatch('login/queryLovedList', loveParam) // 喜爱的列表查询
            let queryParam = {
                userid: useName,
                status: "1"
            }
            me.$store.dispatch('login/queryBagList', queryParam)// 购物袋的列表查询
        }
        this.$router.afterEach((to, from, next) => {
            window.scrollTo(0, 0)
        })
    },
    methods: {
       
    }
}

</script>

<style>
#app {
    text-align: center;
    color: #2c3e50;
}
.bgr{
    background:#EFDED1;
}
.menuList{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 60%;
    background: #EFDED1;
    /* display: none; */
    
}
.content-footer{
    /* position: absolute; */
    bottom: 0;
    width: 100%;
}
#app{
    max-width: 500rem;
    margin:0 auto;
    position: relative;
    min-height:700px;
}
html{height:100%;}
#app{min-height:100%;margin:0;padding:0;position:relative;}
.content{
    /* padding-bottom: 3.5rem; */
    min-height: 4rem;
    margin-top: 0.5rem;
}
.loading{
    position: fixed;
    top: 0px;
    width: 100%;
    height: 700px;
    background: #fbfbfb;
    z-index:100
}
.loading img{
    width:50%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto!important;
    z-index:1000;
}
</style>
<style scoped>
@import "./assets/css/base.css";
</style>