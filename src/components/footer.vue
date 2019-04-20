<template>
    <div class="footer" :class="{'bgr': bgr, 'fontColor': fontColor, 'writeBgr': writeBgr}">
        <div>
            <div class="toTop"  v-if="showTop">
                <el-button class="toTop_btn" @click="toTop">返回顶部</el-button>
            </div>
            <div class="foot_line" v-if="showTop"></div>
            <div class="footer_txt footer_txt_one" v-if="showContact"><span>客户服务</span>
                <span class="el-icon-plus" @click="expandService" v-if="!expandSer"></span>
                <span class="el-icon-minus" @click="expandService" v-if="expandSer"></span>
                <div class="expand" v-if="expandSer">
                    <p @click="toContact('customerService')">客服</p>
                    <p @click="toContact('orderSend')">订单与配送</p>
                    <p @click="toContact('termsConditions')">条款与条件</p>
                    <p @click="toContact('privacyPolicy')">隐私政策</p>
                </div>
            </div>
            <!--<div style="background:#C5A480;height:1px;margin-bottom:18px;width:100%;"  v-if="showContact && expandSer"></div>-->
            <div class="footer_txt" v-if="showContact"><span>关于LOVOGUE</span>
            <span class="el-icon-plus" @click="expandMine" v-if="!expandMe"></span>
            <span class="el-icon-minus" @click="expandMine" v-if="expandMe"></span>
                <div class="expand" v-if="expandMe">
                    <p @click="toAbout" :class="{'active_color': active_color}">关于我们</p>
                    <p @click="toContact('contact')" :class="{'active_color': active_color_contact}">联系我们</p>
                </div>
            </div>
            <div class="footer_remark">Copyright © 2019 LOVOGUE有限公司 保留所有权利 
    粤ICP备15050324号</div>
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
        expandSer: false,
        expandMe: false,
    }
  },
  computed: mapState({
        // 箭头函数可使代码更简练
        showTop: state => state.showToTop,
        bgr: state => state.bgr,
        active_color: state => state.active_color,
        active_color_contact: state => state.active_color_contact,
        showContact:  state => state.showContact,
        fontColor: state => state.fontColor,
        writeBgr: state => state.writeBgr,
    }),
  created() {  
  },
  methods: {
    toTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    },
    expandService() {
        this.expandSer = !this.expandSer
    },
    expandMine() {
        this.expandMe = !this.expandMe        
    },
    toAbout() {
        this.$router.push('/about')
    },
    toContact(param) {      
        this.$router.push(`/contact/${param}`)
    }
  }
}
</script>
<style scoped>
    .footer{
        text-align: left;
        /* padding:0 18px; */
        width:100%;
        background-color: #f6f6f6;
        
    }
    .footer {
        background-color: #f6f6f6;
    }
    .footer_remark{
        height: 1.2rem;
        word-wrap: break-word;
        text-align: center;
        /* color: #654E30; */
        color:#C5A480;
        font-size: 10px!important;
        /* margin-bottom: 10px; */
        padding-top: 0.8rem;
        width: 2.8rem;
        margin: 0 auto;
        padding-bottom: 0.1rem;
    }
    .footer_txt_one{
    }
    .el-icon-plus,.el-icon-minus{
        position: absolute;
        right: 0.18rem;
        font-weight: bolder;
        color:#C5A480;
    }
    .toTop_btn{
        background: #C5A480;
        color:#EFDED1;
        width:100%;
        height:0.4rem;
        border-radius: 0.03rem;
    }
    .toTop{
        padding:0.25rem 0.18rem 0.3rem 0.18rem;
    }
    .bgr{
        background: #EFDED1!important;
    }
    .expand p{
        color:#C5A480;
        font-size:12px;
        line-height:0.13rem;
        text-align:left;
        margin-left:0.18rem;
        margin-top:0.13rem;
    }
    .active_color{
        color:#c0c4cc!important;
    }
    .foot_line{
        background:#C5A480;
        width: 100%;
        height:0.01rem;
    }
    .footer_txt {
        padding-left:0.18rem;
        padding-right:0.18rem;
        padding-top:0.25rem;
        color: #C5A480;
        font-weight: bold;
        font-size: 13px;
        font-family: 'PingFangSC';
    }
    .fontColor .footer_txt{
        color:#654E30!important;
    }
    .fontColor .footer_remark, .fontColor .el-icon-plus,.fontColor .el-icon-minus,.fontColor p{
        color:#654E30!important;    
    }
    .fontColor{
        padding-top: 0.75rem!important;
    }
    .writeBgr{
        /* background: #fff!important; */
    }
    .el-icon-plus, .el-icon-minus, .el-icon-close {
        left: auto;
    }
   
</style>