<template>
  <div class="adress address-content" >
    <el-form status-icon ref="ruleForm" label-width="1rem" class="adressForm">
      <div class="addAddress_title">
        <span >地址管理</span>
        <el-button @click="toAddAdress" class="addAddress">添加新地址</el-button>
      </div>
      <div class="address_content" v-for="(item, index) in addressList" :key="index">
          <span class="address_name">{{item.name}}</span>
          <span class="address_phone">{{item.phone}}</span>
          <div class="address_message">
            <div style="width:70%;">
                <p style="word-break: break-all;"><span v-if="item.status== 2" class="sureAdd">默认</span>{{item.addressprovince}}{{item.addresscity}}{{item.addressdistrict}}{{item.address}}</p>
            </div>
            <div style="width:30%;">
                <span class="edit_list" @click="edit(item, index)" 
                style="margin-right:0.36rem;border-right:0.02rem solid;padding-right:0.08rem;">修改</span>
                <span class="edit_list del_list" @click="del(item, index)">删除</span>
            </div>
            <div style="clear:both;"></div>
            <div class="line"></div>
          </div>
        
      </div>
        <el-button class="btn ok_btn" type="primary" @click="back" style="margin-top:0.45rem;">返回</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import workspace from '../../common.js'
export default {
    data() {     
      return {
        editInfo: '',
        showEdit: false,
        editList: []
      }
    },
    props: ['id'],
    computed: mapState({
      // 箭头函数可使代码更简练
      addressList: state => state.address.addressList
    }),
    created() {
      let param = {
        userid: workspace.getCookie().name,
        status: ""
      }
      this.$store.dispatch('address/queryAddressList', param)
    },
    methods: {
      //获取地址列表
      getAddressList() {
        let param = {
          userid: workspace.getCookie().name,
          status: ""
        }
        this.$store.dispatch('address/queryAddressList', param)
      },
      back(){
        let me = this
        // let fromPath = me.$router.history.current.query && me.$router.history.current.query.fromPath
        // if(fromPath && fromPath != '' && fromPath != null && fromPath != '/') {
        //   me.$router.push(fromPath)
        // } else {
        //   me.$router.push('/home')
        // }
        me.id? me.$router.push(`/detail/${me.id}`): me.$router.go(-1)
        // this.$router.push('/confirmAddress')
      },
      toAddAdress() {
       this.id? this.$router.push(`/address/${this.id}`):  this.$router.push(`/address`)
      },
      edit(val, index) {    
        this.editInfo = val
        this.editInfo.len = this.addressList.length
        this.showEdit = true
        let param = encodeURIComponent(JSON.stringify(this.editInfo))
        this.$router.push({path: '/editAddress', query: {
          param: param
        }})
        this.$set(this. editList, index, false)
      },
      del(val,index) {
        let me = this
        this.$confirm('是否删除该地址?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
            id: val.id,
            userid: workspace.getCookie().name,
            status: 0
          }
          me.$store.dispatch('address/editAddress',param )
            .then(function (res) {
              if (res.msg > 0) {
                me.$message({
                  message: '删除成功',
                  type: 'success'
                })
                me.getAddressList()
              } else {
                me.$message({
                  message: '操作失败！',
                  type: 'error'
                })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        })
      },
    }
  }
</script>

<style scoped>
@import "./css/index.less";
.adress /deep/ .el-row {
  margin-bottom: 0.01rem;
  
}
.adress /deep/ .el-row:last-child {
  margin-bottom: 0;
}
.adress /deep/ .el-row input,.adress /deep/ .el-row textarea{
  border-top: none;
  border-left: none;
  border-right: none;
}
.sureAdd {
  background: #d6d68f;
  border: 1px solid #ccc;
  padding: 1px 2px;
  font-size: 12px;
  border-radius: 0.05rem;
  color:#e90e0e;
  margin-right:0.1rem;
}
.del_list{
  color:#ff0000;
}
</style>