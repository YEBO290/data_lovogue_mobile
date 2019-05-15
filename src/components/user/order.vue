<template>
  <div class="order">
        <el-row :gutter="20" class="order_noPay_list" v-for="(item, index) in orderList" :key="index">
        <el-col :span="6"><img :src="item.imgpath" class="loved_img" style="width:100%;" /></el-col>
        <el-col :span="18">
            <div>
                <div>
                    <span class="bag_text">{{item.name}} </span>
                    <span class="txt_right">RMB {{item.tagprice}}</span>
                </div>
                <div>
                    <span class="bag_color"> <span  class="bag_code">编号  {{item.productid}}</span></span>
                </div>
            <div style="height: 0.2rem; margin-top: 0.05rem;">
                <div class="bag_size">
                    <span class="txt_right">共 {{item.amount}}件商品  合计 RMB {{total(item)}}</span>
                </div>
            </div>
            </div>
            <div style="margin-top: 0.10rem;width: 100%;text-align: center;" v-if="shipstatus==='1'">
<el-button round style="margin-right:15px;" @click="cancelOrder(item)">取消订单</el-button><el-button round type="primary" @click="toBuy(item)">付款</el-button></div>
            <slot name="footer"></slot>
        </el-col>         
        </el-row> 
        <el-dialog
            title="请选择支付方式"
            :visible.sync="dialogVisible"
            width="80%" class="payDialog"
            :before-close="handleClose">
            <div>
                <p><span class="glyphicon glyphicon-hand-right"></span>应付金额：<span class="price_total">RMB {{selectedData.price}}</span></p>
                <div class="divider--horizontal divider"></div>
                <div class="pay_img">
                    <span @click="toPay('aliPay')" class="payType" style="margin-right:0.15rem"><img src="~@/assets/image/alipay.png" style="width:100%;"/></span>
                    <span @click="toPay('weChat')" class="payType"><img src="~@/assets/image/wechatpay.png" style="width:100%;"></span>
                </div>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import workspace from '../../common.js'
export default {
    data() {
      return {
        orderid: '',
        dialogVisible: false,
        selectedData: ''
      }
    },
    props: ['orderList', 'shipstatus'],
    created() {
    },
    methods: {
        total(val) {
            let data = parseInt(val.amount) * parseFloat(val.price)
            return workspace.thousandBitSeparator(data)
        },
        cancelOrder(val) {
            this.$emit('cancelOrder', val)
        },
        toBuy(val) {
            this.dialogVisible = true   
            this.orderid = val.orderid     
            this.selectedData = val    
        },
        toPay(val) {
            let me = this
            if (process.env.NODE_ENV === 'development' || window.location.port == '8093') {
                var baseUrl = 'http://lovogue.net:8093'
            } else if (process.env.NODE_ENV === 'production'|| window.location.port == '8091') {
                var baseUrl = 'http://lovogue.net:8091'
            }
            if (val === 'aliPay') {
                // 走支付宝
                // this.$store.dispatch('address/toBuy')  
                var alipayUrl = `${baseUrl}/api/ali_pay/pay2?orderid=`+ me.orderid +'&price='+ me.selectedData.price
                window.location.href = alipayUrl
            } else if (val === 'weChat'){
                // 走微信
                me.$store.dispatch('wechatPay').then(res => {
                    if (res.code === 200) {
                        window.location.href = res.data
                        console.log(res.data)
                    } else {
                        me.$message({
                            message: '操作失败！',
                            type: 'error'
                        })
                    }
                })
            }
        },
        handleClose(val) {
            this.dialogVisible = false
            console.log(val)
        },
    }
}
</script>

<style scoped>
.order{
    height: 300px;
    font-size:12px;
}
.order /deep/ .is-round span{
    font-size:12px;
}
.order /deep/ .is-round{
    padding:3px 10px;
}
.order /deep/ .el-row{
    background: #fff;
    margin-left: 18px;
    margin-right: 18px;
    border-radius: 5px;
    border: 1px solid #ddd;
}
.order /deep/ .el-tabs__content, .user /deep/ .el-collapse-item__header{
    padding: 0 20px;
}
.order /deep/ .is-round span{
    font-size:12px;
}
.order /deep/ .is-round{
    padding:3px 10px;
}
.txt_right{
    position: absolute;
    right: 20px;
}
.order_noPay_list{
    margin-bottom:10px;
    padding: 10px 20px;
}
.payType{
    display: inline-block;
    border: 1px solid;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    width: 40%;
    text-align: center;
    height: 0.45rem;
    line-height: 0.45rem;
}
.pay_img{
    text-align: center;
}
.payDialog /deep/ .el-dialog__close{
    left: auto;
}
.payDialog /deep/ .el-dialog{
    top: 50%;
    margin-top: -0.96rem!important;
}
.payDialog /deep/ .el-dialog{
    text-align: left;
}
.payDialog /deep/ .el-dialog span{
    font-size: 16px;
    padding: 0 10px;
    cursor: pointer;
}
.payDialog /deep/ .el-dialog span:hover,.payDialog /deep/ .el-dialog span:focus{
    border-color: #C5A480;
}
 .payDialog /deep/ .el-dialog__body{
    padding: 10px 30px 30px 30px;
}
.divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 10px 0 20px 0;
}

.divider {
    background-color: #dcdfe6;
    position: relative;
}
</style>