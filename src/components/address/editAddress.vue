<template>
  <div class="address address-content" >
    <div class="edit_title"><i class="el-icon-arrow-left" @click="back"></i><span>编辑收货地址</span><el-button type="text" @click="save" class="save">保存</el-button></div>
        <el-form :model="editInfo" status-icon :rules="rules" ref="editInfo" label-width="1rem" class="demo-ruleForm edit_content">
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
              <div class="detailInfo" v-if="!showEdit" @click="showEdit = true">
                <el-row :gutter="20">
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <p>{{editInfo.addressprovince}}</p>
                      <p>{{editInfo.addresscity}}</p>
                      <p>{{editInfo.addressdistrict}}</p>
                      <p>{{editInfo.address}}</p> 
                    </div>
                    </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple" @click="showEdit = true">
                      <i class="el-icon-arrow-down"></i>
                    </div>
                    </el-col>
                </el-row>
              </div>
              <div>
                <el-collapse-transition>   
                  <div v-if="showEdit"> 
                    <el-select v-model="editInfo.addressprovince" placeholder="选择省份" @change="addressprovinceFunc">
                      <el-option
                        v-for="item in provinceList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-model="editInfo.addresscity" placeholder="选择城市" no-data-text="请先选择配送省份" @change="addresscityFunc">
                      <el-option
                        v-for="item in cityList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select> 
                    <el-select v-model="editInfo.addressdistrict" placeholder="选择区" no-data-text="请先选择配送省份、城市" @change="addressdistrictFunc">
                      <el-option
                        v-for="item in areaList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-input type="textarea" v-model="editInfo.address"></el-input>
                    </div>
                  </el-collapse-transition>
              </div>
            </el-form-item>   
        </el-form>
        <div class="del_btn"><el-button type="text" @click="del" class="del">删除收货地址</el-button></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import workspace from '../../common.js'
export default {    
    data() {  
    // 手机
      var validPhone = (rule, value, callback) => {
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
            addressprovince: '', // 省份
            addresscity: '', // 城市
            addressdistrict: '',// 地区/行政区
            address: '', // 街道地址  
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
            addressprovince: [
            {required: true, message: '请选择配送地区', trigger: ['blur', 'change']}
            ],
            addresscity: [
              {required: true, message: '请选择配送城市', trigger: ['blur', 'change']}
            ],
            addressdistrict: [
              {required: true, message: '请选择配送行政地区', trigger: ['blur', 'change']}
            ],
            address: [
              {required: true, message: '请输入街道及详细地址', trigger: 'blur'}
            ]}
        }
    },
    computed: mapState({
      countryList: state => state.address.country,   
      provinceList: state => state.address.provinceList,   
      cityList: state => state.address.cityList,   
      areaList:  state => state.address.areaList,
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
        let me = this
        this.$refs['editInfo'].validate((valid) => {
          if (valid) {
            let param = {
              id: me.editInfo.id,
              userid: workspace.getCookie().name,
              address: me.editInfo.address,
              status: "1",
              addressprovince: me.editInfo.addressprovince,
              addresscity: me.editInfo.addresscity,
              addressdistrict: me.editInfo.addressdistrict,
              name: me.editInfo.name,
              phone: me.editInfo.phone
            }
            me.$store.dispatch('address/editAddress',param )
              .then(function (res) {
                if (res.msg == 1) {
                  me.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  me.$router.push('/selectAddress')
                } else {
                  me.$message({
                    message: '操作失败',
                    type: 'error'
                  })
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      del() {
        let me = this
        this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
            id: me.editInfo.id,
            userid: workspace.getCookie().name,
            status: 0
          }
          me.$store.dispatch('address/editAddress',param )
            .then(function (res) {
              if (res.msg == 1) {
                me.$message({
                  message: '删除成功',
                  type: 'success'
                })
                me.$router.push('/selectAddress')
              } else {
                me.$message({
                  message: '操作失败',
                  type: 'error'
                })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
      },
      // 选择省份
      addressprovinceFunc(val) {
        this.editInfo.addresscity = ''
        this.editInfo.addressdistrict = ''
        this.editInfo.address =''

      },
      // 选择城市
      addresscityFunc(val) {
        this.editInfo.addressdistrict = ''
        this.editInfo.address =''
      },
      // 选择城市区
      addressdistrictFunc(val) {
        this.editInfo.address =''
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
.detailInfo{
  text-align: left;
  margin-left: 0.18rem;
}
.address /deep/ .el-input input,.address /deep/ .el-textarea textarea{  
  border: none;
  border-bottom: 1px solid #DCDFE6;
  border-radius: inherit!important;
}

</style>