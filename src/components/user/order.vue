<template>
  <div class="order">
        <el-row :gutter="20" class="order_noPay_list" v-for="(item, index) in orderList" :key="index">
        <el-col :span="6"><img :src="item.imgpath" class="loved_img" style="width:100%;" /></el-col>
        <el-col :span="18">
            <div>
                <div>
                    <span class="bag_text">{{item.name}} </span>
                    <span class="txt_right">RMB {{item.price}}</span>
                </div>
                <div>
                    <span class="bag_color"> <span  class="bag_code">编号  {{item.productid}}</span></span>
                </div>
                <div>
                    <div><span>{{ item.createtime | workspace}}</span></div>
                </div>
                <div style="height: 0.2rem; margin-top: 0.05rem;">
                    <div class="bag_size">
                        <span class="txt_right">共 {{item.amount}}件商品  合计 RMB {{total(item)}}</span>
                    </div>
                </div>
            </div>       
            <slot name="footer"></slot>
        </el-col>
        <el-col :span="24">
            <div style="margin-top: 0.10rem;width: 100%;text-align: right;" v-if="status==='1'">
                    <el-button round style="margin-right:15px;" @click="cancelOrder(item)">取消订单</el-button><el-button round type="primary" @click="toBuy(item)">付款</el-button>
            </div>
            <div style="margin-top: 0.10rem;width: 100%;text-align: right;" v-if="status==='2'">
                <el-button round style="margin-right:5px;" type="primary" @click="viewStatus(item)">物流状态</el-button>
                <!-- <el-button round style="margin-right:5px;" @click="rejectOrder(item)">退货/退款</el-button> -->
            </div>
            <div style="margin-top: 0.10rem;width: 100%;text-align: right;" v-if="status==='3'">
                <el-button round style="margin-right:5px;" @click="rejectOrder(item)">退货/退款</el-button>
                <!-- <el-button round type="primary" @click="confirm(item)">确认收货</el-button> -->
            </div>
            <div style="margin-top: 0.10rem;width: 100%;text-align: right;" v-if="status==='4'">
                <el-button round style="margin-right:5px;" @click="returnOrder(item)">退货详情</el-button>
            </div>
        </el-col>  
            <slot name="footer"></slot>       
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
        <el-dialog v-if="dialogPro == 2" title="物流状态" :visible.sync="dialogTableVisible" class="logistics-status">
            <el-steps :active="0" align-center  direction="vertical">
                <el-step title="待发货" finish description="请您耐心等待，我们将尽快给您安排发货！"></el-step>
                <el-step title="已发货" wait></el-step>
                <el-step title="已收货" wait  ></el-step>
            </el-steps>
        </el-dialog>
        <el-dialog v-if="dialogPro == 3" title="物流状态" :visible.sync="dialogTableVisible" class="logistics-status">
            <el-steps :active="1" align-center  direction="vertical">
                <el-step title="待发货" finish description=""></el-step>
                <el-step title="已发货" v-if="couriernumber" process v-bind:description="'快递单号：'+couriernumber"></el-step>
                <el-step title="已发货" v-if="!couriernumber" process description="快递单号：待录入..."></el-step>
                <el-step title="已收货" wait  ></el-step>
            </el-steps>
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
        selectedData: '',
        dialogTableVisible:false,
        couriernumber:'',
        dialogPro:'',

      }
    },
    props: {
        orderList: {
            type: Array,
            default: function() {
                return []
            },
        },
        status: {
            type: String,
            default: '1'
        }},
    created() {
    },
    filters: {
         workspace(val) {
            return workspace.timeFormat(val)
        },
    },
    methods: {
        // workspace(val) {
        //     return workspace.timeFormat(val)
        // },
        total(val) {
            let data = parseInt(val.amount) * parseFloat(val.price)
            return workspace.thousandBitSeparator(data)
        },
        cancelOrder(val) {
            val.shipstatus = '1'
            this.$emit('editOrder', val)
        },
        toBuy(val) {
            debugger
            this.dialogVisible = true   
            this.orderid = val.orderid     
            this.selectedData = val    
        },
        toPay(val) {
            let me = this
            if (process.env.NODE_ENV === 'development' || window.location.port == '8093') {
                var baseUrl = 'http://lovogue.net:8091'
            } else if (process.env.NODE_ENV === 'production'|| window.location.port == '8091') {
                var baseUrl = 'http://lovogue.net:8091'
            }
            //支付前库存判断
            let param = {
                orderid:me.orderid
            }
            me.$store.dispatch('getOrderInventory',param).then(res => {
                if (res.err === 200) {
                    // 有库存 无需处理
                } else if(res.err == 500) {
                    me.$message({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
            if (val === 'aliPay') {
                // 支付宝支付
                // this.$store.dispatch('address/toBuy')  
                var alipayUrl = `${baseUrl}/api/ali_pay/pay2?orderid=`+ me.orderid +'&price='+ me.selectedData.price
                window.location.href = alipayUrl
            } else if (val === 'weChat'){
                // 微信支付
                let param = {
                    orderid:me.orderid,
                    price: (me.selectedData.tagprice.replace(',', ''))*100   // 微信金额根据后端协商 *100
                }
                me.$store.dispatch('wechatPay',param).then(res => {
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
        rejectOrder(val) {
            this.$router.push(`/reject/${val.orderid}`)
        },
         //跳转退货详情
        returnOrder(val){
            this.$router.push(`/cancelOrder/${val.id}`)
        },
        confirm(val) {
            let me = this
            val.shipstatus = '4'
            me.$emit('editOrder', val)
            // this.$confirm('请确认是否已收到货?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     val.shipstatus = '4'
            //     me.$emit('cancelOrder', val)
            // }).catch(() => {      
            // })
        },
        viewStatus(item){
            let self = this;
            self.dialogTableVisible = true;
            self.couriernumber = item.couriernumber;
            self.dialogPro = item.shipstatus;
            
        }
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
.bag_size /deep/ .txt_right{
    position: absolute;
    right: 20px;
    font-weight: bold;
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
.logistics-status /deep/ .el-dialog {
    width:90%!important;
}
.logistics-status /deep/ .el-dialog__headerbtn {
    position: absolute;
    top: .15rem!important;
    right: 0.3rem!important;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
}
.logistics-status /deep/ .el-dialog__body {
    height: 2.5rem;
}
.logistics-status /deep/ .el-dialog__body .el-step__title {
   font-size:14px;
}
.logistics-status /deep/ .el-dialog__title {
   font-size:15px;
}
.logistics-status /deep/ .el-dialog__body {
  margin-left: .4rem
}
.order /deep/ .el-step__title.is-finish,.order /deep/ .el-step__head.is-finish,.order /deep/ .el-step__description.is-finish {
    color: #EFDED1;
    border-color: #EFDED1;
}
.order /deep/ .el-step__title.is-process,.order /deep/ .el-step__description.is-process,.order /deep/ .el-step__head.is-process{
    color:#c5a480;
    border-color: #c5a480;
}
</style>