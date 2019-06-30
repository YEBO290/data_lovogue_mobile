<template>
  <div class="adress address-content" >
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="1rem" class="adressForm">
      <p class="addr_title">收货地址</p>
      <label class="label_txt">收件人</label><span class="req">*</span>
      <el-form-item prop="name">
        <el-input type="text" v-model="ruleForm.name" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
      <label class="label_txt">手机</label><span class="req">*</span>
      <el-form-item prop="phone">
        <el-input type="text" v-model="ruleForm.phone" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
      <!--<label class="label_txt">配送国家</label><span class="req">*</span>
      <el-form-item prop="country">
        <el-select v-model="ruleForm.country" placeholder="选择国家" clearable>
          <el-option
            v-for="item in countryList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      -->
      <label class="label_txt">配送地址地区</label><span class="req">*</span>
      <el-form-item prop="addressprovince">
        <el-select v-model="ruleForm.addressprovince" filterable placeholder="选择省份"  @change="addressprovinceFunc" value-key="id">
        <el-option
          v-for="item in provinceList"
          :key="item.id"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      </el-form-item>
      
      <label class="label_txt">配送地址城市</label><span class="req">*</span>
      <el-form-item prop="addresscity">
        <el-select v-model="ruleForm.addresscity" filterable placeholder="选择城市" no-data-text="请先选择配送省份" @change="addresscityFunc" value-key="id">
        <el-option
          v-for="item in cityList"
          :key="item.id"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      </el-form-item>
      
      <label class="label_txt">配送地址行政区</label><span class="req">*</span>
       <el-form-item prop="addressdistrict">
        <el-select v-model="ruleForm.addressdistrict" filterable placeholder="选择区" no-data-text="请先选择配送省份、城市" @change="addressdistrictFunc" value-key="id">
        <el-option
          v-for="item in areaList"
          :key="item.id"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      </el-form-item>
      
      <label class="label_txt">配送地址街道名称</label><span class="req">*</span>
      <el-form-item prop="address">
        <el-input type="text" v-model="ruleForm.address" autocomplete="off"></el-input>
      </el-form-item>    
        <el-form-item prop="term" class="term_item">
          <el-checkbox v-model="ruleForm.term">    
              <div class="span_txt">
                  您接受并同意遵守我们的条款与条件
                  <!-- <a class="term_txt" @click="toContact('termsConditions')">条款与条件</a> -->
                  <span>、</span>
                  <a class="term_txt" @click="toContact('privacyPolicy')">隐私政策</a>
                  <span>,</span><br><span> 以及</span>
                  <a @click="toContact('personalSensitive')" class="term_txt">个人敏感信息政策。</a>
              </div>             
          </el-checkbox>
        </el-form-item> 
        <el-button class="adress_btn btn ok_btn" type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button class="btn cancel_btn" @click="back">返回</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import workspace from '../../common.js'
export default {
    data() {     
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {      
          callback()
        }
      };
      var validPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请正确输入手机号码'))
        } else {
          let phoneNumber = /^1[34578]\d{9}$/
          if (!(phoneNumber.test(value))){ 
            callback(new Error('请正确输入手机号码'))
          } else {
            callback()            
          }
        }
        
      }
      let cachData = sessionStorage.getItem('cachFromData')
      let cachParam = cachData !== "undefined" && cachData != null && cachData !='null' && cachData != '' && JSON.parse(cachData)
      return {
        ruleForm: {
          name: cachParam && JSON.parse(cachData).name || '', //收件人姓名
          phone: cachParam && JSON.parse(cachData).phone || '',  // 手机号
          country:  cachParam && JSON.parse(cachData).country || '', // 国家
          addressprovince:  cachParam && JSON.parse(cachData).addressprovince || '', // 省份
          addresscity:  cachParam && JSON.parse(cachData).addresscity || '', // 城市
          addressdistrict:  cachParam && JSON.parse(cachData).addressdistrict || '',// 地区/行政区
          address: cachParam && JSON.parse(cachData).address || '', // 街道地址   
          term:  cachParam && JSON.parse(cachData).term || false 
        },
        rules: {
          name: [
            {required: true, message: '请输入收件人姓名', trigger: ['blur', 'change']}
          ],
          phone: [
            { validator: validPhone, trigger: 'blur' }
          ],
          country: [
            {required: true, message: '请选择配送国家', trigger: ['blur', 'change']}
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
          ],
          term: [
            { required: true, message: '请勾选条款与协议', trigger: ['blur', 'change'] }
          ]
        }
      };
    },
    computed: mapState({
      // 箭头函数可使代码更简练
      countryList: state => state.address.country,   
      provinceList: state => state.address.provinceList,   
      cityList: state => state.address.cityList,   
      areaList:  state => state.address.areaList,
        
      // 传字符串参数 'count' 等同于 `state => state.count`
      // countAlias: 'count',

      // // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      // countPlusLocalState (state) {
      //   return state.count + this.localCount
      // }
    }),
    created() {
      // this.$store.dispatch('address/queryCountry')
      this.$store.dispatch('address/queryProvince', {level: "0"})
    },
    methods: {
      submitForm(formName) {
        let me = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              userid: workspace.getCookie().name,
              address: me.ruleForm.address,
              status: "1",
              addressprovince: me.ruleForm.addressprovince.name,
              addresscity: me.ruleForm.addresscity.name,
              addressdistrict: me.ruleForm.addressdistrict.name,
              name: me.ruleForm.name,
              phone: me.ruleForm.phone
             }
            me.$store.dispatch('address/toSave',param )
              .then(function (res) {
                if (res.msg > 0) {
                  me.$message({
                    message: '新增成功',
                    type: 'success'
                  })
                  me.$router.push('/selectAddress')
                  sessionStorage.removeItem('cachFromData')
                } else {
                  me.$message({
                    message: '操作失败！',
                    type: 'error'
                  })
                }
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error)
              })
            // service.fetch('/Train_new/servlet/AppServlet', '123', me)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      toContact(param) {      
        this.$router.push(`/contact/${param}`)
      },
      // 条件
      toTerm() {

      },
      // 政策
      toPolicy() {

      },
      // 个人信息
      toMesssge() {
          
      },
      back(){
        this.$router.push('/selectAddress')
        sessionStorage.removeItem('cachFromData')
      },
      // 选择省份
      addressprovinceFunc(val) {
        this.$store.dispatch('address/queryCity', {
          level: "1",
          parent: val.id
        })
        this.ruleForm.addresscity = ''
        this.ruleForm.addressdistrict = ''
        this.ruleForm.address =''

      },
      // 选择城市
      addresscityFunc(val) {
        this.$store.dispatch('address/queryArea', {
          level: "2",
          parent: val.id
        })
        this.ruleForm.addressdistrict = ''
        this.ruleForm.address =''
      },
      // 选择城市区
      addressdistrictFunc(val) {
        this.ruleForm.address =''
      }
    },
    beforeRouteLeave (to, from, next) {
      // debugger
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
      let obj = this.ruleForm
      sessionStorage.setItem('cachFromData', JSON.stringify(obj))
      next()
    }
  }
</script>

<style scoped>
@import "./css/index.less";
</style>