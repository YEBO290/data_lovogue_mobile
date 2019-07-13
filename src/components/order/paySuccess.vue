<template>
  <div class="paySuccess">
    <el-row>
      <el-col :span="24"><div class=""><img class="success" src="~@/assets/image/success.png"></div></el-col>
    </el-row>
     <el-row>
      <el-col :span="24"><div class="">
        <span class="text">您的订单{{orderId}}已经支付成功，感谢您的参与。</span>
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
      this.$router.push('/login')
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
  padding: 50px 50px 100px 50px;
}
.success{
  width: 150px;
}
.btns .el-button{
  padding:8px 20px;
}
</style>
