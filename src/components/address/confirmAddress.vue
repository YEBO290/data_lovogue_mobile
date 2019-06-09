<template>
    <div class="confirm"> 
        <div class="confirm_content">
            <div class="addAddress_title">
                <span class="adress_txt">收件地址</span>
                <i class="el-icon-arrow-right" @click="selectAddress" v-if="addressList.length > 0"></i>
                <el-button class="addAddressBtn" @click="addNewAddress" v-else>新建收货地址</el-button>
            </div>
            <div class="addNewAddress" v-if="addressList.length == 0">
                <p>暂无收货地址</p>                
                <div class="divider--horizontal divider"></div>
            </div>
            <div class="confirm_message" v-else>
                <span class="confirm_name">{{addressList[0].name}}</span>
                <span class="confirm_phone">{{addressList[0].phone}}</span>
                <p  class="confirm_address" style="word-break: break-all;">{{addressList[0].addressprovince}}{{addressList[0].addresscity}}{{addressList[0].addressdistrict}}{{addressList[0].address}}</p>
            </div>
            <div style="margin-top: 0.45rem;">
                <div class="confirm_info"  v-for="(item, index) in confirmData.data" :key="index">
                    <div class="confirm_img">
                        <img :src="item.imgpath" style="width:0.8rem;height:0.9rem;"/>
                    </div>
                    <div class="confirm_base_info">
                        <p class="confirm_title">{{item.name}}</p>
                        <p class="confirm_desc">编号- {{item.productid}}</p>
                        <p><span class="price">RMB {{item.price}}</span><span class="number">x {{item.amount}}</span></p>
                    </div>
                </div>   
            </div>
            <div class="confirm_way_price">
                <p class="confirm_way">配送方式： <span>免邮</span></p>
                <p>共 {{confirmData.amount}} 件商品  总计： <span class="price_total">RMB {{confirmData.price}}</span></p>
            </div>
            <el-button class="btn ok_btn" type="primary" @click="toBuy">立即支付</el-button>
        </div> 
        <el-dialog
            title="请选择支付方式"
            :visible.sync="dialogVisible"
            width="80%" class="payDialog"
            :before-close="handleClose">
            <div>
                <p><span class="glyphicon glyphicon-hand-right"></span>应付金额：<span class="price_total">RMB {{confirmData.price}}</span></p>
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
          dialogVisible: false,
          id: this.$route.query.id,
          orderid: this.$route.query.orderid
      }
    },
    components: {},
    computed: mapState({
      // 箭头函数可使代码更简练
        confirmData: function(state){
          let list = state.address.confirmData.data
          state.address.confirmData.data.length > 0 && (list.forEach(el => {
              el.price = workspace.thousandBitSeparator(el.price)
          }))
          state.address.confirmData.price = workspace.thousandBitSeparator(state.address.confirmData.price)
          return state.address.confirmData
        },
        addressList: state => state.address.addressList
    }),
    created() {
        // 商品详情
        let param = {
            userid: workspace.getCookie().name,
            orderid: this.orderid
        }
        this.$store.dispatch('address/detailConfirmInfo', param)
        // 默认收货地址
        let params = {
        userid: workspace.getCookie().name,
        status: 2
      }
      this.$store.dispatch('address/queryAddressList', params)
    },
    methods: {
        toBuy() {
            this.dialogVisible = true            
        },
        toPay(val) { //支付方式
            let me = this
            if (process.env.NODE_ENV === 'development' || window.location.port == '8093' || window.location.port == '8081') {
                var baseUrl = 'http://lovogue.net:8093'
            } else if (process.env.NODE_ENV === 'production'|| window.location.port == '8091') {
                var baseUrl = 'http://lovogue.net:8091'
            }
            if (val === 'aliPay') {
                // 支付宝
                // this.$store.dispatch('address/toBuy')  
                var alipayUrl = `${baseUrl}/api/ali_pay/pay2?orderid=`+ me.orderid +'&price='+ me.confirmData.price.replace(',', '')
                window.location.href = alipayUrl
            } else if (val === 'weChat'){
                // 微信
                let param = {
                    orderid:me.orderid,
                    price: (me.confirmData.price.replace(',', ''))*100   // 微信金额根据后端协商 *100
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
        toAddress() {
            this.$router.push('/address')
        },
        selectAddress() {
            this.$router.push('/selectAddress')
        },
        handleClose(val) {
            this.dialogVisible = false
            console.log(val)
        },
        addNewAddress() {
            this.$router.push('/address')
        }
    }
  }
</script>

<style scoped>
@import "./css/index.less";
.confirm /deep/ .el-icon-arrow-right{
  position: absolute;
  right: 0.34rem;
  margin-top: 0.02rem;
}
.confirm /deep/ .el-icon-arrow-right:hover{
  transform: scale(1.2);
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
.addNewAddress{
    text-align: center;
}
.addNewAddress p{
    margin-top: 0.45rem;
    margin-bottom: 0.2rem;
    color: #999999;
}
.addAddressBtn{
    position: relative;
    left: 100%;
    margin-left: -1.7rem;
    padding: 5px 10px;
    color: #999;
}

</style>