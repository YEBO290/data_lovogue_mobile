<template>
  <div class="login" :from="from">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="1rem" class="loginForm" key="login">
      <label class="label_txt">用户名/手机号/邮箱</label><span class="req">*</span>
      <el-form-item prop="phone" key="loginPhone">
        <el-input type="text" v-model="ruleForm.phone" :clearable="true" autocomplete="off" placeholder="用户名、手机号码、电子邮箱"></el-input>
      </el-form-item>
      <label class="label_txt">密码</label><span class="req">*</span>
      <el-form-item prop="pass">
        <el-input type="password" v-model="ruleForm.pass" :clearable="true" autocomplete="off" placeholder="请输入密码" key="loginPass"></el-input>
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
      <el-col :span="8"> <div class="grid-content bg-purple" @click="devIng"><img src="../../assets/image/wechat.png" style="float:left"/><img src="../../assets/image/fb.png" style="float:right"/></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple" style="height:0.01rem"></div></el-col>
    </el-row>
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
  props:['id'],
  computed: {
    from: function(){
      return this.fromPath
    }
  },
    ...mapState({
  }),
  mounted() {
    workspace.clearCookie()
    this.$store.commit('login/lovesList', []) // 喜爱的列表查询
    this.$store.commit('login/bagList', []) // 购物的列表查询
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
      // Decrypt 解密
      var bytes = CryptoJS.AES.decrypt(cipherText, "password")
      var originalText = bytes.toString(CryptoJS.enc.Utf8)
      console.log(originalText); // 'my message'

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            userid: me.ruleForm.phone,
            password: me.calcuMD5(me.ruleForm.pass)
          }     
          me.$store.dispatch('login/toLogin', param).then(res => {
            if(res.length > 0) {
              //判断用户是否勾选了记住密码选项rememberPsw，传入保存的账号currentPortId，密码password，天数30
              if(typeof res === "string") {
                workspace.setCookie(res, me.ruleForm.pass, 30)                
              } else {
                workspace.setCookie(res[0].userid, me.ruleForm.pass, 30)
              }  
              let loginId = me.id || me.$route.params.id
              let fromPath = me.$router.history.current.query && me.$router.history.current.query.fromPath
              if(fromPath && fromPath != '' && fromPath != null && fromPath != '/' && loginId!='resetPassword') {
                me.$router.push(fromPath)
              } else {
                me.$router.push('/home')
              }
              let loveParam = {
                // userid: workspace.getCookie().name,
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
              me.$message.error('操作失败！')
              this.clearCookie()
            }           
          }).catch(err => {
            workspace.clearCookie()
              me.$store.commit('login/lovesList', []) // 喜爱的列表查询
              me.$store.commit('login/bagList', []) // 购物的列表查询
          })
        } else{
          return false
        }
      })
    },
    // 忘记密码
    toPass() {
      this.$router.push({
        path: '/resetPassEmail'
      })
    },
    devIng() {
      this.$message({
        message: '模块建设中...',
        type: 'warning'
      })
    },
  }
}
</script>

<style scoped>
@import "./css/index.less";
</style>