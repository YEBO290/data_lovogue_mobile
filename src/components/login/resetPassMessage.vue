<template>
    <div class="resetPass content_text">
        <div class="desc_txt" v-if="false">
            <p  class="desc_txt_title">重设密码</p>
            <p  class="desc_txt_p">欲重设密码，您只需在下面的项栏里输入您的手机号码并点击“获取验证码"即可。我们将会向您的手机号码发送难证码。为安全起见，此验证码将会在1小时后立刻失效。之后，您可以再次在下面的项栏里输入手机号码，重获一组新的验证码。</p>
        </div>
        <div class="desc_txt">
            <p  class="desc_txt_title">重设密码</p>
            <p  class="desc_txt_p">欲重设密码，您只需在下面的项栏里输入您的邮件地址并点击“提交"即可。我们将会向您发送邮件，邮件中将包含一个可以重设密码的链接。为安全起见，此链接将会在24小时后立刻失效。之后，您可以再次在下面的项栏里输入电邮地址，重获一组重设密码的链接。</p>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="1rem" class="loginForm">
            <label class="label_txt">用户名</label><span class="req">*</span>
            <el-form-item prop="name">
                <el-input type="text" v-model="ruleForm.name" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt" v-if="false">手机号码</label><span class="req"  v-if="false">*</span>
            <label class="label_txt">电邮地址</label><span class="req">*</span>

            <el-form-item prop="phone" v-if="false">
                <el-input type="text" v-model="ruleForm.phone" :clearable="true" autocomplete="off" ></el-input>
                <el-button class="verificationCode" @click="queryCode" :disabled="codeDis">{{code}}</el-button>
                <router-link to="/resetPassEmail" class="link" v-if="false">使用邮箱接收链接?</router-link>
            </el-form-item>

            <el-form-item prop="email">
                <el-input type="text" v-model="ruleForm.email" :clearable="true" autocomplete="off" ></el-input>
                <el-button class="verificationCode" @click="queryCode" :disabled="codeDis">{{code}}</el-button>
                <router-link to="/resetPassMessage" class="link" v-if="false">使用短信验证码?</router-link>
            </el-form-item>

            <label class="label_txt">填写验证码</label><span class="req">*</span>
            <el-form-item prop="verificationCode">
                <el-input type="text" v-model="ruleForm.verificationCode" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt">密码</label><span class="req">*</span>
            <el-form-item prop="pass">
                <el-input type="text" v-model="ruleForm.pass" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt">确认密码</label><span class="req">*</span>
            <el-form-item prop="checkPass">
                <el-input type="text" v-model="ruleForm.checkPass" :clearable="true" autocomplete="off" ></el-input>
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
       // 密码
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else { 
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
            if(!(reg.test(value))) {
                callback(new Error('密码需由6位或以上字母、数字组成'))
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }                   
        }
      };
      // 手机
      var validPhone = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入手机号码或邮箱'))
        } else {
            let phoneNumber = /^1[34578]\d{9}$/
            if(!(phoneNumber.test(value))){ 
                callback(new Error('手机号码有误，请重填!'))
            } else {
                callback()
            }
        }     
      };
      // 确认密码
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不同!'));
        } else {
          callback();
        }
      };
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
          email:'',
          name: ''
        },
        rules: {
            name: [{
              required: true, message: '请选择用户名', trigger: 'blur'
            }],
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validateCheckPass, trigger: 'blur' }
            ],
            phone: [
                { validator: validPhone, trigger: 'blur' }
            ],
            email: [
                { validator: validateEmail, trigger: 'blur' }
            ]
        },
        code: '获取验证码',
        codeDis: false
      };
    },
    methods: {
      submitForm(formName) {
        let me = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              password: workspace.calcuMD5(me.ruleForm.pass),
              userid: workspace.getCookie().name,
              uuid: me.ruleForm.verificationCode
            }
            me.$store.dispatch('login/resetPwMessage', param).then(res => {
              if(res === 1) {
                me.$message({
                  message: '密码重设成功',
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
        });
      },
      // 发送邮件
      toEmail() {
          this.$router.push('/resetPassMessage')
      },
      // 返回
      back() {
          this.$router.push('/login')
      },
      lookEmail() {
        let me = this
        let param = {
          email: me.ruleForm.email,
          userid: workspace.calcuMD5(me.ruleForm.name),
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
      },
      // 获取验证码
      queryCode() {
          // 发送请求
        this.lookEmail()
        this.codeDis = true
        let num = 60 
        let inter = setInterval(() => {
            num--
            this.code = num + ' S'
            if (num <= 0) {
                num = 0
                this.codeDis = false
                this.code = '获取验证码'
                clearInterval(inter)
            }
        }, 1000)
        // if(num <= 0) {
        //     clearInterval(inter)
        // }
      }
    }
  }
</script>

<style scoped>
@import "./css/index.less";
</style>
<style scoped>
.toEmail_txt{
    text-align: right;
}
</style>