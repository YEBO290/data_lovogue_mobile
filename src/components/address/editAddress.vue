<template>
  <div class="adress address-content" >
    <div class="edit_title"><i class="el-icon-arrow-left" @click="back"></i><span>编辑收货地址</span><el-button type="text" @click="save" class="save">保存</el-button></div>
        <el-form :model="editInfo" status-icon :rules="rules" ref="ruleForm" label-width="1rem" class="demo-ruleForm edit_content">
            <el-form-item label="" prop="name">
                <el-input
                    suffix-icon="glyphicon glyphicon-user"
                    v-model="editInfo.name">
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="phone">
                <el-input v-model="editInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="" prop="address">
                <el-input type="textarea" :rows="2" v-model="editInfo.address"></el-input>
            </el-form-item>   
        </el-form>
        <div class="del_btn"><el-button type="text" @click="del" class="del">删除收货地址</el-button></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {    
    data() {  
    // 手机
      var validPhone = (rule, value, callback) => {
          debugger
        if (value === '') {
            callback(new Error('请输入手机号码'))
        } else {
            let phoneNumber = /^1[34578]\d{9}$/
            if(!(phoneNumber.test(value))){ 
                callback(new Error('请输入正确的手机号码!'))
            } else {
                callback()
            }
        }     
      }   
      return {
        editInfo: {
            phone: '',
            name: '',
            address: ''
        },
        showEdit: false,
        editList: [],
        rules: {
            phone: [
                { validator: validPhone, trigger: 'blur' }
            ],
            name: [
                { required: true, message: '请输入收货人姓名', trigger: 'blur' }
            ],
            address: [
                { required: true, message: '请输入收货地址', trigger: 'blur' }
            ]}
        }
    },
    computed: mapState({
      // 箭头函数可使代码更简练
      addressList: state => state.address.addressList
    }),
    created() {
        this.editInfo = this.$route.query.param && JSON.parse(decodeURIComponent(this.$route.query.param))
    },
    methods: {
      back(){
        this.$router.push('/selectAddress')
      },
      toAddAdress() {
        this.$router.push('/address')
      },
      edit(val, index) {
        this.editInfo = val
        this.showEdit = true
        this.$set(this. editList, index, false)
      },
      save() {

      },
      del() {
          this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        })
      }
    }
  }
</script>

<style scoped>
@import "./css/index.less";
.adress /deep/ .el-form-item__content input,.adress /deep/ .el-form-item__content textarea{
  border-top: none;
  border-left: none;
  border-right: none;
}
.edit_content{
    background: #fff;
    padding: 0rem 0.1rem 0.2rem 0.1rem;
}
.el-icon-arrow-left{
    position: absolute;
    left: 0.18rem;
    margin-top:0.08rem;
}
.save{
    position: absolute;
    right: 0.24rem;
    margin-top: -0.05rem;
}
.edit_title{
    height: 0.3rem;
    line-height: 0.3rem;
}
.del_btn{
    height: 0.4rem;
    margin-top: 0.15rem;
    text-align: left;
    color: red;
    padding-left:0.1rem;
    background:#fff;
}
.del{
    color:red;
    
}
.save{
    color:#C5A480;
}


</style>