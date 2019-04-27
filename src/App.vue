<template>
    <div id="app">
        <header-tab/>
        <div class="content">
            <router-view></router-view>   
        </div>
        <menuList class="menuList" id="menu" v-if="showMenu"/>
        <div class="content-footer" :class="{'bgr': bgr}" v-if="showFooter"> 
            <footer-tab/>
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
        showFooter: state => state.showFooter
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
    
}
.content-footer{
    bottom: 0;
    position: relative;
}
#app{
    max-width: 500rem;
    margin:0 auto;
    position: relative;
}
</style>
<style scoped>
@import "./assets/css/base.css";
</style>