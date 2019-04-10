<template>
    <div class="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="loginForm">
            <label class="label_txt">姓名</label><span class="req">*</span>
            <el-form-item prop="name">
                <el-input type="text" v-model="ruleForm.name" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt">电邮地址</label><span class="req">*</span>
            <el-form-item prop="email">
                <el-input type="text" v-model="ruleForm.email" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt">手机号码</label><span class="req">*</span>
            <el-form-item prop="phone">
                <el-input type="text" v-model="ruleForm.phone" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt">密码</label><span class="req">*</span>
            <el-form-item prop="pass">
                <el-input type="text" v-model="ruleForm.pass" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt">确认密码</label><span class="req">*</span>
            <el-form-item prop="checkPass">
                <el-input type="text" v-model="ruleForm.checkPass" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item prop="term" class="term_item">
                <el-checkbox v-model="ruleForm.term">    
                    <div class="span_txt">
                        您接受并同意遵守我们的
                        <a class="term_txt" @click="toContact('termsConditions')">条款与条件</a>
                        <span>、</span>
                        <a class="term_txt" @click="toContact('privacyPolicy')">隐私政策</a>
                        <span>,</span><br><span> 以及</span>
                        <a @click="toMesssge" class="term_txt">个人敏感信息政策。</a>
                    </div>             
                </el-checkbox>
                
            </el-form-item>
        </el-form>
        <div>
            <el-button class="btn login_btns" type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
        </div>
    </div>
</template>

<script>
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
      // 条约
      var validTerm = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请勾选条款与条件'));
        } else {
          callback();
        }
      }
      return {
        ruleForm: {
            name: '',
            email: '',
            phone: '',
            pass: '',
            checkPass: '',
            term: false
        },
        rules: {
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            email: [
                { validator: validateEmail, trigger: 'blur' }
            ],
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validateCheckPass, trigger: 'blur' }
            ],
            phone: [
                { validator: validPhone, trigger: 'blur' }
            ],
            term: [
                { validator: validTerm, trigger: ['blur', 'change'] }
            ],
        }
      };
    },
    methods: {
        // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
        toContact(param) {      
            this.$router.push(`/contact/${param}`)
        }
    } 
  }
</script>

<style scoped>
@import "./css/index.less";
</style>