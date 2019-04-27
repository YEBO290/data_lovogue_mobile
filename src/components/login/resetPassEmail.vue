<template>
    <div class="resetPass content_text">
        <div class="desc_txt">
            <p  class="desc_txt_title">重设密码</p>
            <p  class="desc_txt_p">欲重设密码，您只需在下面的项栏里输入您的邮件地址并点击“提交"即可。我们将会向您发送邮件，邮件中将包含一个可以重设密码的链接。为安全起见，此链接将会在24小时后立刻失效。之后，您可以再次在下面的项栏里输入电邮地址，重获一组重设密码的链接。</p>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="1rem" class="loginForm">
            <label class="label_txt">电邮地址</label><span class="req">*</span>
            <el-form-item prop="email">
                <el-input type="text" v-model="ruleForm.email" :clearable="true" autocomplete="off"></el-input>
                <!--<router-link to="/resetPassMessage" class="link">使用短信验证码?</router-link>-->
            </el-form-item>
        </el-form>
        <div class="btns">
            <el-button class="btn ok_btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button class="btn cancel_btn" @click="back">返回</el-button>
        </div>
    </div>
</template>

<script>
import workspace from '../../common.js'
  export default {
    data() {
      // 邮箱校验
      var validateEmail =  (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请正确输入电邮地址'))
        } else {
            let email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            if(!(email.test(value))){ 
                callback(new Error('请正确输入电邮地址'))
            } else {
                callback()
            }
        }        
      };
      return {
        ruleForm: {
          pass: '',
          phone: '',
          email:''
        },
        rules: {
            email: [
                { validator: validateEmail, trigger: 'blur' }
            ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let me = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              email: me.ruleForm.email,
              userid: workspace.getCookie().name,
            }
            me.$store.dispatch('login/resetPwEmail', param).then(res => {
              if(res === 1) {
                me.$message({
                  message: '链接已发送至您邮箱，请前往邮箱重设密码',
                  type: 'success'
                })
              } else {
                me.$message({
                  message: '操作失败',
                  type: 'error'
                })
              }
            }).catch(err => {
              
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      // 获取用户登陆信息
      queryUseLogin() {
        let me = this
        let param = {
            "userid": workspace.getCookie().name,
            "password": "123456"
        }
        me.$store.dispatch('login/queryUseLogin', param)
      },
      // 返回
      back() {
          this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
@import "./css/index.less";
</style>