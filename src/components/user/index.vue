<template>
  <div class="user">
    <el-row class="userMessage" >
        <el-col :span="4"><span class="userImg"><img src="~@/assets/image/user.png" style="width:100%;"/></span></el-col>
        <el-col :span="6"><p style="font-size: 15px;font-weight: bold;    height: 40px;
    line-height: 40px;">{{user}}</p></el-col>
    </el-row>
    <div class="listMessageOne">
        <div class="list love" @click="$router.push('/loved')">
            <span>收藏</span><i class="el-icon-arrow-right"></i>
        </div>
        <div class="list addressList" @click="$router.push('/selectAddress')">
            <span>收货地址</span><i class="el-icon-arrow-right"></i>
        </div>
    </div>
    <!--<div class="listMessageTwo">
        <div class="list">
            <span>我的订单</span><i class="el-icon-arrow-right"></i>
        </div>-->
        <el-collapse v-model="activeNames">
        <el-collapse-item title="我的订单" name="3">
        <div style="width:100%;height:1px;background:#ddd;"></div>
        <div class="orderList">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="'待支付 ' + '(' + orderList.data.length + ')'" name="first" >
                    <p class="noData" v-if="orderList.data.length == 0">暂无数据</p>
                    <div v-else>
                        <order :orderList="orderList.data" :shipstatus="'1'" @cancelOrder="cancelOrder">    
                        </order>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="'待发货' + '(' + shippedOrderList.data.length + ')'" name="second" >
                    <p class="noData" v-if="shippedOrderList.data.length == 0">暂无数据</p>
                    <div v-else>
                        <order :orderList="shippedOrderList.data"  :shipstatus="'2'"/>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="'待收货' + '(' + toReceivedOrderList.data.length + ')'" name="third">
                    <p class="noData" v-if="toReceivedOrderList.data.length == 0">暂无数据</p>
                    <div v-else>
                        <order :orderList="toReceivedOrderList.data"  :shipstatus="'3'"/>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="'已收货' + '(' + receivedOrderList.data.length + ')'" name="four">
                    <p class="noData" v-if="receivedOrderList.data.length == 0">暂无数据</p>
                    <div v-else>
                        <order :orderList="receivedOrderList.data"  :shipstatus="'4'"/>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        </el-collapse-item>
        </el-collapse>
    <el-collapse>
        <el-collapse-item title="设置" name="1">
            <div @click="$router.push('/login')" class="toLogin">退出登录</div>
        </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import workspace from '../../common.js'
import order from './order'
export default {
    data() {
      return {
          activeNames: [],
          user: workspace.getCookie().name,
          activeName: 'first',
          shipstatus: '1',
          orderList: {
              data: [],
          },
          shippedOrderList: {
              data: [],
          },
          toReceivedOrderList: {
              data: [],
          },
          receivedOrderList: {
              data: [],
          },
      }
    },
    components: {order},
    computed: mapState({
      tipList: state => state.home.menuList
    }),
    created() {
        // 商品详情
        let me = this
        let param = this.queryOrder('1')
        this.shipstatus = '1'
        this.$store.dispatch('address/detailConfirmInfo', param).then(res => {
            this.orderList = res
            this.orderList && (this.orderList.data.forEach(el => {
                el.tagprice =  workspace.thousandBitSeparator(el.price)
            }))
        })
        let param2 = this.queryOrder('2')
        this.shipstatus = '2'
        this.$store.dispatch('address/detailConfirmInfo', param2).then(res => {
            this.shippedOrderList = res
            this.shippedOrderList && (this.shippedOrderList.data.forEach(el => {
                el.tagprice =  workspace.thousandBitSeparator(el.price)
            }))
        })
        let param3 = this.queryOrder('3')
        this.shipstatus = '3'
        this.$store.dispatch('address/detailConfirmInfo', param3).then(res => {
            this.toReceivedOrderList = res
            this.toReceivedOrderList && (this.toReceivedOrderList.data.forEach(el => {
                el.tagprice =  workspace.thousandBitSeparator(el.price)
            }))
        })
        let param4 = this.queryOrder('4')
        this.shipstatus = '4'
        this.$store.dispatch('address/detailConfirmInfo', param4).then(res => {
            this.receivedOrderList = res
            this.receivedOrderList && (this.receivedOrderList.data.forEach(el => {
                el.tagprice =  workspace.thousandBitSeparator(el.price)
            }))
        })
    },
    methods: {
        queryOrder(val, status, id) { 
            // val 物流状态 status 订单状态
            // shipstatus
            // 1表示未付款
            // 2表示待發貨
            // 3表示已發貨
            // 4表示已收貨
            // 0表示預售 
            let param = {
                userid: workspace.getCookie().name,
                shipstatus: val || '',
                status: status || '1',
                // orderid: id || ''
            }
            return param
        },
        handleClick(tab, event) {
            // shipstatus
            // 1表示未付款
            // 2表示待發貨
            // 3表示已發貨
            // 4表示已收貨
            // 0表示預售 
            if ( tab.name == 'first') {
                let param = this.queryOrder('1')
                this.shipstatus = '1'
                this.$store.dispatch('address/detailConfirmInfo', param).then(res => {
                    this.orderList = res
                })
            } else if (tab.name == 'second') {
                let param = this.queryOrder('2')
                this.shipstatus = '2'
                this.$store.dispatch('address/detailConfirmInfo', param).then(res => {
                    this.shippedOrderList = res
                })
            }  else if (tab.name == 'third') {
                let param = this.queryOrder('3')
                this.shipstatus = '3'
                this.$store.dispatch('address/detailConfirmInfo', param).then(res => {
                    this.toReceivedOrderList = res
                })
            }  else if (tab.name == 'four') {
                let param = this.queryOrder('4')
                this.shipstatus = '4'
                this.$store.dispatch('address/detailConfirmInfo', param).then(res => {
                    this.receivedOrderList = res
                })
            }
        },
        cancelOrder(val) {
            let param = {
                status: 0,
                orderid: val.orderid
            }
            this.shipstatus = '1'
            this.$store.dispatch('address/cancelOrder', param).then(res => {
                if(res.msg > 0) {
                    let params = this.queryOrder('1')
                    this.$store.dispatch('address/detailConfirmInfo', params).then(res => {
                        this.orderList = res
                    })
                } 
            })           
        }
    }
}
</script>

<style scoped>
.userImg{
    width: 70%;
    display: inline-block;
    border-radius: 50%;
}
.list{
    text-align: left;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
}
.list i{
    position: relative;
    left: 100%;
    margin-left: -68px;
}
.love i,.setting i{
    margin-left: -40px;
    
}
.user{
    
    text-align: left;
}
.userMessage{
    background: #fff;
    padding:20px 20px 30px 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
}
.listMessage{
    background: #fff;
}
.listMessageOne,.setting{
    background: #fff;
    padding:0px 18px 0px 18px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    margin-top: 10px;
}
.addressList{
    border:none;
}
.listMessageTwo .list{
    background: #fff;
    padding:0px 18px 0px 18px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    border:none;
}
.user /deep/ .el-tabs__item{
    width:25%;
    text-align:center;
}
.user /deep/ .el-tabs__nav{
    width:100%;
    background: #fff;
    padding:0px 18px 0px 18px;
}
.orderList{
    max-height: 300px;
    overflow-y: scroll;
    font-size:12px;
}

.orderList /deep/ .el-row{
    background: #fff;
    margin-left: 18px;
    margin-right: 18px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-bottom:10px;
}
.user /deep/ .el-tabs__content, .user /deep/ .el-collapse-item__header{
    padding: 0 20px;
}
.user /deep/ .el-tabs__content{
    padding: 0 20px;
    background: #f6f6f6;
}


.noData{
    text-align: center;
    position: relative;
    margin-top: 20%;
    color: #999;
    margin-bottom: 20%;
}
.user /deep/ .el-tabs__active-bar{
    width:25%!important;
}
.toLogin{
    font-size: 12px;
    text-decoration: underline;
    color: rgb(102, 102, 102);
    padding-left:30px;
}
</style>