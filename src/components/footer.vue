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
        height: 120px;
        word-wrap: break-word;
        text-align: center;
        /* color: #654E30; */
        color:#C5A480;
        font-size: 10px!important;
        /* margin-bottom: 10px; */
        padding-top: 80px;
        width: 280px;
        margin: 0 auto;
        padding-bottom: 10px;
    }
    .footer_txt_one{
    }
    .el-icon-plus,.el-icon-minus{
        position: absolute;
        right: 18px;
        font-weight: bolder;
        color:#C5A480;
    }
    .toTop_btn{
        background: #C5A480;
        color:#EFDED1;
        width:100%;
        height:40px;
        border-radius: 3px;
    }
    .toTop{
        padding:25px 18px 30px 18px;
    }
    .bgr{
        background: #EFDED1!important;
    }
    .expand p{
        color:#C5A480;
        font-size:12px;
        line-height:13px;
        text-align:left;
        margin-left:18px;
        margin-top:13px;
    }
    .active_color{
        color:#c0c4cc!important;
    }
    .foot_line{
        background:#C5A480;
        width: 100%;
        height:1px;
    }
    .footer_txt {
        padding-left:18px;
        padding-right:18px;
        padding-top:25px;
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
        padding-top: 75px!important;
    }
    .writeBgr{
        background: #fff!important;
    }
   
</style>