<template>
    <div class="confirm"> 
        <div class="confirm_content">
            <div class="addAddress_title">
                <span class="adress_txt">收件地址</span>
                <i class="el-icon-arrow-right" @click="selectAddress"></i>
                <!--<el-button @click="toAddress" class="addAddress">添加新地址</el-button>-->
            </div>
            <div class="confirm_message">
                <span class="confirm_name">{{confirmData.name}}</span>
                <span class="confirm_phone">{{confirmData.phone}}</span>
                <p class="confirm_address">{{confirmData.address}}</p>
            </div>
            <div style="margin-top: 0.45rem;">
                <div class="confirm_info"  v-for="(item, index) in confirmData.baseInfo" :key="index">
                    <div class="confirm_img">
                        <img :src="item.url" style="width:0.8rem;height:0.9rem;"/>
                    </div>
                    <div class="confirm_base_info">
                        <p class="confirm_title">{{item.title}}</p>
                        <p class="confirm_desc">{{item.desc}}</p>
                        <p><span class="price">RMB {{item.price}}</span><span class="number">x {{item.number}}</span></p>
                    </div>
                </div>   
            </div>
            <div class="confirm_way_price">
                <p class="confirm_way">配送方式： <span>{{confirmData.way}}</span></p>
                <p>共 {{confirmData.totalNumber}} 件商品 总计： <span class="price_total">RMB {{confirmData.totalPrice}}</span></p>
            </div>
            <el-button class="btn ok_btn" type="primary" @click="toBuy">立即支付</el-button>
        </div>     
    </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    data() {
      return {
          
      }
    },
    components: {},
    computed: mapState({
      // 箭头函数可使代码更简练
      confirmData: state => state.address.confirmData
    }),
    created() {
        this.$store.dispatch('address/detailConfirmInfo')
    },
    methods: {
        toBuy() {
            // this.$store.dispatch('address/toBuy')
        },
        toAddress() {
            this.$router.push('/address')
        },
        selectAddress() {
            this.$router.push('/selectAddress')
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
</style>