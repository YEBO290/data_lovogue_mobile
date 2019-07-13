<template>
  <div class="paySuccess">
    <el-row>
      <el-col :span="24"><div class=""><img class="success" src="~@/assets/image/success.png"></div></el-col>
    </el-row>
     <el-row>
      <el-col :span="24"><div class="">
        <span class="text">您的订单{{orderId}}已经支付成功，祝您购物愉快！</span>
      </div></el-col>
    </el-row>
    <el-row class="btns">
      <el-col :span="12"><el-button type="success" @click='toHome'>返回首页</el-button></el-col>
      <el-col :span="12"><el-button type="danger" @click="toDetail">查看订单</el-button></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data(){
    return{
      orderId: this.id
    }
  },
  methods: {
    toHome(){
      this.$router.push('/home')
    },
    toDetail(){ 
       this.$router.push("/user/1")
    }
  }
}
</script>
<style scoped>
.paySuccess{
  background: #FFF;
  padding: 0.5rem 0.5rem 2.25rem 0.5rem;
}
.success{
  width: 1.5rem;
}
.btns .el-button{
  padding:0.08rem 0.16rem;
}
</style>
