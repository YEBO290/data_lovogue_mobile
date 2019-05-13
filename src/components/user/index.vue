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
    <div class="listMessageTwo">
        <div class="list">
            <span>我的订单</span><i class="el-icon-arrow-right"></i>
        </div>
        <div style="width:100%;height:1px;background:#ddd;"></div>
        <div class="orderList">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="待支付" name="first">
                    <div>
                        <el-row :gutter="20" class="order_noPay_list" v-for="(item, index) in bagList" :key="index">
                        <el-col :span="8"><img :src="item.imgpath" class="loved_img" style="width:100%;" /></el-col>
                        <el-col :span="14">
                            <div>
                                <div>
                                    <span class="bag_text">{{item.name}} RMB {{item.tagprice}}</span>
                                    <i class="el-icon-close"></i>
                                    </div>
                                    <div>
                                    <span class="bag_color"> - <span  class="bag_code">编号  {{item.prodid}}</span></span>
                                </div>
                            <div style="height: 0.2rem; margin-top: 0.15rem;">
                                <div class="bag_size">
                                    <span>共 {{item.amount}}件商品，合计 RMB {{item.amount * item.tagprice}}</span>
                                </div>
                            </div>
                            </div>
                            <div><el-button round style="margin-right:15px;">取消订单</el-button><el-button round type="primary">付款</el-button></div>
                        </el-col>         
                        </el-row> 
                    </div>
                </el-tab-pane>
                <el-tab-pane label="待发货" name="second" >待发货</el-tab-pane>
                <el-tab-pane label="待收货" name="third">待收货</el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <div class="setting">
        <div class="list">
            <span>设置</span><i class="el-icon-arrow-right"></i>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import workspace from '../../common.js'
export default {
    data() {
      return {
          user: workspace.getCookie().name,
          activeName: 'first'
      }
    },
    computed: mapState({
      tipList: state => state.home.menuList,
      bagList: function(state){
        state.login.bagList.forEach(item => {
          this.$set(item, 'showAmount', true)
          item.tagprice = workspace.thousandBitSeparator(item.tagprice)
        })
        return state.login.bagList
      },
    }),
    created() {
        // 商品详情
        let param = {
            userid: workspace.getCookie().name,
            // orderid: this.orderid
        }
        this.$store.dispatch('address/detailConfirmInfo', param)
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
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
    width:33.3%;
    text-align:center;
}
.user /deep/ .el-tabs__nav{
    width:100%;
    background: #fff;
    padding:0px 18px 0px 18px;
}
.orderList{
    height: 300px;
    overflow-y: scroll;
    font-size:12px;
}
.user /deep/ .is-round span{
    font-size:12px;
}
.user /deep/ .is-round{
    padding:3px 10px;
}
.user .listMessageTwo /deep/ .el-row{
    background: #fff;
    margin-left: 18px;
    margin-right: 18px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

</style>