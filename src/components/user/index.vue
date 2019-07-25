<template>
    <div class="user">
        <el-row class="userMessage" >
            <div class="userInfo" v-if="user">
                <span class="userImg"><img src="~@/assets/image/user1.png" style="width:100%;"/></span>
                    <!-- <p style="font-size:14px;height: 40px;line-height: 40px;margin-right:20px;">
                        <span class='say-hello'>您好，</span>
                        <span class='user-name'>{{user}}</span></p> -->
                    <!-- <p style=" width: 1px;height: 20px;background:#c6c0c0;margin-top: 10px;margin-right: 10px;"></p> -->
                    <span class='say-hello'>您好，</span>
                    <span class='user-name'>{{user}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <a @click="logOut()" style="font-size: 13px;color:red;">退出登录</a>
            </div>
            <div class="userInfo" v-else>
                <span class="userImg"><img src="~@/assets/image/user1.png" style="width:100%;"/></span>
                <span class="login" @click="$router.push('/login')">登录</span>
                <el-divider direction="vertical"></el-divider>
                <span  @click="$router.push('/login/register')" class="register">注册新账号</span>
                <!-- <p class="login">
                    <span  @click="$router.push('/login')">登录</span>
                    <el-divider direction="vertical"></el-divider>
                    <span  @click="$router.push('/login/register')" class="register">注册新账号</span>
                </p> -->
            </div>
            <!--<el-col :span="4"><span class="userImg"><img src="~@/assets/image/user.png" style="width:100%;"/></span></el-col>
            <el-col :span="7"><p style="font-size:14px;height: 40px;line-height: 40px;">您好，{{user}}</p></el-col>
            <el-col :span="1" style="font-size: 13px;height: 40px;line-height: 40px;margin-left:5px;">|</el-col>
            <el-col :span="6"><a @click="$router.push('/login')" style="font-size: 13px;height: 40px;line-height: 40px;color:red;">退出登录</a></el-col>-->
        
        </el-row>
        <div class="listMessageOne" v-if="user">
            <div class="list love" @click="$router.push('/loved')">
                <span>商品收藏</span><i class="el-icon-arrow-right"></i>
            </div>
            <div class="list addressList" @click="$router.push('/selectAddress')">
                <span>收货地址</span><i class="el-icon-arrow-right"></i>
            </div>
        </div>
    <!--<div class="listMessageTwo">
        <div class="list">
            <span>我的订单</span><i class="el-icon-arrow-right"></i>
        </div>-->
        <el-collapse  v-if="user">
            <el-collapse-item title="我的订单" name="1">
            <div style="width:100%;height:1px;background:#ddd;"></div>
            <div class="orderList">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="'未付款 ' + '(' + orderList.data.length + ')'" name="first" >
                        <p class="noData" v-if="orderList.data.length == 0">暂无数据</p>
                        <div v-else>
                            <order :orderList="orderList.data" :status="'1'" @editOrder="editOrder">    
                            </order>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="'处理中' + '(' + shippedOrderList.data.length + ')'" name="second" >
                        <p class="noData" v-if="shippedOrderList.data.length == 0">暂无数据</p>
                        <div v-else>
                            <order :orderList="shippedOrderList.data"  :status="'2'" @handlerOPear="handlerOPear" />
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="'已到货' + '(' + toReceivedOrderList.data.length + ')'" name="third">
                        <p class="noData" v-if="toReceivedOrderList.data.length == 0" >暂无数据</p>
                        <div v-else>
                            <order :orderList="toReceivedOrderList.data"  :status="'3'" @editOrder="editOrder"></order>
                        </div>
                    </el-tab-pane>
                    
                    <el-tab-pane :label="'已取消' + '(' + caceldOrderList.data.length + ')'" name="zero">
                        <p class="noData" v-if="caceldOrderList.data.length == 0">暂无数据</p>
                        <div v-else>
                            <order :orderList="caceldOrderList.data"  :status="'0'"  @handlerOPear="handlerOPear"/>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="'退款/退货' + '(' + receivedOrderList.data.length + ')'" name="four">
                        <p class="noData" v-if="receivedOrderList.data.length == 0">暂无数据</p>
                        <div v-else>
                            <order :orderList="receivedOrderList.data"  :status="'4'"  @handlerOPear="handlerOPear"/>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            </el-collapse-item>
        </el-collapse>
        <!-- <el-collapse>
            <el-collapse-item title="设置" name="1"  v-if="user">
                <div @click="$router.push('/login')" class="toLogin">退出登录</div>
            </el-collapse-item>
        </el-collapse> -->
    </div>
</template>

<script>
import workspace from '../../common.js'
import order from './order'
import {mapState} from 'vuex'
export default {
    props: ['id'],
    data() {
      return {
        //   activeNames: this.id || [],
          user: workspace.getCookie().name,
          activeName: 'first',
          status: '1',
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
          caceldOrderList:{
              data: [],
          }
      }
    },
    components: {order},
    computed: mapState({
      tipList: state => state.home.menuList
    ,
    activeNames() {
        let list = []
        this.id && list.push(this.id) 
        return list
    }}),
    created() {
        this.initOrder()
       
    },
    methods: {
        handlerOPear(){
            this.initOrder()
        },
        //加载所有订单状态列表
        initOrder() {  
             // 商品详情
            if(this.user) {
                let me = this
                let param0 = this.queryOrder('0')
                this.$store.dispatch('address/detailConfirmInfo', param0).then(res => {
                    this.caceldOrderList = res
                    this.caceldOrderList && (this.caceldOrderList.data.forEach(el => {
                        el.tagprice =  workspace.thousandBitSeparator(el.price)
                    }))
                })
                let param = this.queryOrder('1')
                this.shistatus = '1'
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
            }

        },
        queryOrder(val) { 
            // val 物流状态 status 订单状态
            // shipstatus
            // 1表示未付款
            // 2表示待發貨
            // 3表示已發貨
            // 4表示已收貨
            // 0表示預售 
            let param = {
                userid: workspace.getCookie().name,
                status: val || '',
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
                // this.shipstatus = '1'
                this.$store.dispatch('address/detailConfirmInfo', param).then(res => {
                    this.orderList = res
                })
            } else if (tab.name == 'second') {
                let param = this.queryOrder('2')
                // this.shipstatus = '2'
                this.$store.dispatch('address/detailConfirmInfo', param).then(res => {
                    this.shippedOrderList = res
                })
            }  else if (tab.name == 'third') {
                let param = this.queryOrder('3')
                // this.shipstatus = '3'
                this.$store.dispatch('address/detailConfirmInfo', param).then(res => {
                    this.toReceivedOrderList = res
                })
            }  else if (tab.name == 'four') {
                let param = this.queryOrder('4')
                // this.shipstatus = '4'
                this.$store.dispatch('address/detailConfirmInfo', param).then(res => {
                    this.receivedOrderList = res
                })
            }else if (tab.name == 'zero') {
                let param = this.queryOrder('0')
                // this.shipstatus = '0'
                this.$store.dispatch('address/detailConfirmInfo', param).then(res => {
                    this.caceldOrderList = res
                })
            }
        },
        editOrder(val) {
            let me = this
            let param = {
                status: 0,
                orderid: val.orderid
            }
            this.shipstatus = val.shipstatus // 确认收货的接口未做
            this.$store.dispatch('address/cancelOrder', param).then(res => {
                if(res.msg > 0) {
                    let params = this.queryOrder('1')
                    this.$store.dispatch('address/detailConfirmInfo', params).then(res => {
                        me.shipstatus == '1' && (me.orderList = res)
                        me.shipstatus == '4' && (me.toReceivedOrderList = res)
                        me.initOrder()
                    })
                } 
            })           
        },
        //删除订单
        delOrder(val) {
            let me = this
            let param = {
                status: 9,
                orderid: val.orderid
            }
            // this.shipstatus = val.shipstatus // 确认收货的接口未做
            this.$store.dispatch('address/cancelOrder', param).then(res => {
                if(res.msg > 0) {
                    // let params = this.queryOrder('1')
                    // this.$store.dispatch('address/detailConfirmInfo', params).then(res => {
                    //     me.shipstatus == '1' && (me.orderList = res)
                    //     me.shipstatus == '4' && (me.toReceivedOrderList = res)
                    // })
                    me.initOrder()
                } 
            })

        },
        //登出并清除cookie
        logOut(){
            this.$router.push('/login')
            this.clearCookie()
        },
        clearCookie() {          
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
                for (var i = keys.length; i--;) {
                    document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
                    document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
                    document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
                }
            }
        }
    }
}
</script>

<style scoped>
.userImg{
    width: 10%;
    display: inline-block;
    border-radius: 50%;
    margin-right:10px;
}
.list{
    text-align: left;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    padding-left: 10px;
    padding-right: 10px;
}
.list i{
    position: relative;
    left: 100%;
    margin-left: -68px;
}
.love i,.setting i{
    margin-left: -68px;
    
}
.user{
    
    text-align: left;
}
.userMessage{
    background: #fff;
    padding:0.2rem 0.2rem 0.3rem 0.2rem;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
}
.listMessage{
    background: #fff;
}
.listMessageOne,.setting{
    background: #fff;
    /* padding:0px 18px 0px 18px; */
    margin-bottom: 0.05rem;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    margin-top: 0.1rem;
}
.addressList{
    border:none;
    padding-left: 10px;
    padding-right: 10px;
}
.listMessageTwo .list{
    background: #fff;
    padding:0px 18px 0px 18px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    border:none;
}
.user /deep/ .el-tabs__item{
    width:20%;
    text-align:center;
    font-size: 13px;
    padding: 0 5px;
}
.user /deep/ .el-tabs__nav{
    width:100%;
    background: #fff;
    padding:0px 15px 0px 5px;
}
.user /deep/ .el-tabs__header {
    margin: 0;
}
.orderList{
    max-height: 3rem;
    /* overflow-y: scroll; */
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
    padding: 0 0.02rem 0 0.1rem;
}
.user /deep/ .el-tabs__content{
    padding: 0.1rem 0.2rem;
    background: #f6f6f6;
    max-height: 3rem;
    overflow-y: scroll;
}
.user /deep/ .el-collapse-item__content {
    margin-bottom: 35px;
    padding-bottom: 0!important;
}


.noData{
    text-align: center;
    position: relative;
    margin-top: 20%;
    color: #999;
    margin-bottom: 20%;
}
.user /deep/ .el-tabs__active-bar{
    width:20%!important;
}
.login{
    font-size: 14px;
    color: #c5a480;
}
.toLogin{
    font-size: 12px;
    text-decoration: underline;
    color: rgb(102, 102, 102);
    padding-left:30px;
}
.user /deep/ .el-tabs__item:hover,.orderList /deep/ .el-tabs__item.is-active {
    color: #c5a480;
    cursor: pointer;
}
.user /deep/ .el-tabs__active-bar {
    background-color: #c5a480;
    z-index: 1;
    display: none;
}
.userInfo{
    display: flex;
    width: 100%;
    padding-top:0.1rem;
}
.register{
    color:#ccc;
}
.user-name{
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 150px;
    display: inline-block;
}
.say-hello{
    display: inline-block;
    position: relative;
}
</style>