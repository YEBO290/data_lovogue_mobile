<template>
  <div class="adress address-content" >
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="1rem" class="adressForm">
      <div class="addAddress_title">
        <span >地址管理</span>
        <el-button @click="toAddAdress" class="addAddress">添加新地址</el-button>
      </div>
      <div class="address_content" v-for="(item, index) in addressList" :key="index">
        <span class="address_name">{{item.name}}</span>
        <span class="address_phone">{{item.phone}}</span>
        <div class="address_message">
          <p>{{item.address}}</p>
          <span class="edit_list" @click="edit">|  修改</span>
        </div>
        
        <div class="line"></div>
      </div>
        <el-button class="btn ok_btn" type="primary" @click="back" style="margin-top:0.45rem;">返回</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {     
      return {}
    },
    computed: mapState({
      // 箭头函数可使代码更简练
      addressList: state => state.address.addressList
    }),
    created() {
      let param = {userid: "admin"}
      this.$store.dispatch('address/queryAddressList', param)
    },
    methods: {
      back(){
        this.$router.push('/confirmAddress')
      },
      toAddAdress() {
        this.$router.push('/address')
      },
      edit() {
        this.$router.push('/address')
      }
    }
  }
</script>

<style scoped>
@import "./css/index.less";
</style>