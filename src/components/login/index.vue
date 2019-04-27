<template>
  <div class="login" :from="from">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="1rem" class="loginForm" key="login">
      <label class="label_txt">手机号/邮箱</label><span class="req">*</span>
      <el-form-item prop="phone" key="loginPhone">
        <el-input type="text" v-model="ruleForm.phone" :clearable="true" autocomplete="off"></el-input>
      </el-form-item>
      <label class="label_txt">密码</label><span class="req">*</span>
      <el-form-item prop="pass">
        <el-input type="password" v-model="ruleForm.pass" :clearable="true" autocomplete="off" key="loginPass"></el-input>
        <router-link to="/resetPassMessage" class="link">忘记密码?</router-link>
      </el-form-item>        
    </el-form>
    <el-button class="login_btn" type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
    <el-row class="other_login">
      <el-col :span="8"><div class="login-line grid-content bg-purple"></div></el-col>
      <el-col :span="8"> <div class="grid-content bg-purple">使用第三方登录</div></el-col>
      <el-col :span="8"><div class="login-line grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row class="other_login_img">
      <el-col :span="8"><div class="grid-content bg-purple" style="height:0.01rem"></div></el-col>
      <el-col :span="8"> <div class="grid-content bg-purple"><img src="../../assets/image/wechat.png" style="float:left"/><img src="../../assets/image/fb.png" style="float:right"/></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple" style="height:0.01rem"></div></el-col>
    </el-row>
    <!--<div class="other_login">
        <div class="login-line"></div> <div>使用第三方登录</div> <div class="login-line"></div>
    </div>
    <div class="other_login_img">    
      <img src="../../assets/image/wechat.png"/>      
      <img src="../../assets/image/fb.png"/>
    </div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CryptoJS from "crypto-js"
import md5 from "js-md5"
import workspace from '../../common.js'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {      
        callback()
      }
    }
    var validPhone = (rule, value, callback) => {
      let flag = true
      // if (value === '') {
      //   flag = false
      //   callback(new Error('请正确输入手机号码或邮箱'))
      // } 
      // let email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      // let phoneNumber = /^1[34578]\d{9}$/
      // if (!(phoneNumber.test(value) || email.test(value))){ 
      //   flag = false
      //   callback(new Error('请正确输入手机号码或邮箱'))
      // } 
      if (flag) {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        phone: this.$store.state.login.phone
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { validator: validPhone, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    from: function(){
      return this.fromPath
    }
  },
    ...mapState({
  }),
  mounted() {
  },
  methods: {
    calcuMD5(val) {
      let data = val.toUpperCase()
      return md5(data)
    },
    submitForm(formName) {
      let me = this
      let fromPath = this.$router.history.current.query.fromPath
      // localStorage.setItem('userName', 'admin')
      // Encrypt 加密 
      var cipherText = CryptoJS.AES.encrypt(me.ruleForm.pass, "password").toString()
      console.log(cipherText)
      // Decrypt 解密
      var bytes = CryptoJS.AES.decrypt(cipherText, "password")
      var originalText = bytes.toString(CryptoJS.enc.Utf8)
      console.log(originalText); // 'my message'

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            userid: me.calcuMD5(me.ruleForm.phone),
            password: me.calcuMD5(me.ruleForm.pass)
          }     
          me.$store.dispatch('login/toLogin', param).then(res => {
            if(res.length > 0) {
              //判断用户是否勾选了记住密码选项rememberPsw，传入保存的账号currentPortId，密码password，天数30
              workspace.setCookie(me.ruleForm.phone, me.ruleForm.pass, 30)
              me.$router.push('/home')
              let loveParam = {
                userid: workspace.getCookie().name,
                status: "1"
              }
              me.$store.dispatch('login/queryLovedList', loveParam) // 喜爱的列表查询
              let queryParam = {
                userid: workspace.getCookie().name,
                status: "1"
              }
              me.$store.dispatch('login/queryBagList', queryParam)// 购物袋的列表查询
            } else {
              me.$store.commit('login/lovesList', []) // 喜爱的列表查询
              me.$store.commit('login/bagList', []) // 购物的列表查询
              me.$message.error('操作失败')
              this.clearCookie()
            }           
          }).catch(err => {
            workspace.clearCookie()
              me.$store.commit('login/lovesList', []) // 喜爱的列表查询
              me.$store.commit('login/bagList', []) // 购物的列表查询
          })
        } else{
          console.log('error submit!!')
          return false
        }
      })
    },
    // 忘记密码
    toPass() {
      this.$router.push({
        path: '/resetPassEmail'
      })
    }
  }
}
</script>

<style scoped>
@import "./css/index.less";
</style>