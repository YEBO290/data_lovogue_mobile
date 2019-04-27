<template>
    <div class="contact">
      <p class="contact_txt" :class="{'active_static': id === 'customerService'}" @click="showDetail('customerService')">客服</p>
      <div class="contact_detail" v-if="id === 'customerService'">{{contactDetail.AdvisoryCategory}}
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="1rem" class="loginForm">
            <label class="label_txt">姓名</label><span class="req">*</span>
            <el-form-item prop="name">
                <el-input type="text" v-model="ruleForm.name" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt">电邮地址</label><span class="req">*</span>
            <el-form-item prop="email">
                <el-input type="text" v-model="ruleForm.email" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt">咨询类别</label><span class="req">*</span>
            <el-form-item prop="category">
                <el-select v-model="ruleForm.category" placeholder="请选择">
                  <el-option
                    v-for="item in contactDetail.advisoryCategory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <label class="label_txt">留言</label><span class="req">*</span>
            <el-form-item prop="message">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="ruleForm.message">
                </el-input>
            </el-form-item>             
        </el-form>
        <el-button class="btn ok_btn" type="primary" @click="submitForm('ruleForm')" style="margin-top:0.05rem">提交</el-button>
      </div>
      <p class="contact_txt" :class="{'active_static': id === 'orderSend'}" @click="showDetail('orderSend')">订单与配送</p>
      <div class="contact_detail" v-if="id === 'orderSend'">
        <div>{{contactDetail.orderSend}}</div>
        <!--<el-button class="ok_btn btn" type="primary" @click="toResetPassWord">立即登录</el-button>-->
      </div>
      <p class="contact_txt" :class="{'active_static': id === 'resetPassWord'}" @click="showDetail('resetPassWord')">重设密码</p>
      <div class="contact_detail" v-if="id === 'resetPassWord'">
        <p style="margin-bottom:0.3rem;">欲重设密码，您只需在下面的项栏里输入您的初始密码，验证通过后即可重设密码。</p>
        <el-form :model="rulePassWordForm" status-icon :rules="rulesPassWord" ref="rulePassWordForm" label-width="1rem" class="loginForm">
            <label class="label_txt">原始密码</label><span class="req">*</span>
            <el-form-item prop="oldPass">
                <el-input type="text" v-model="rulePassWordForm.oldPass" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt">新密码</label><span class="req">*</span>
            <el-form-item prop="pass">
                <el-input type="text" v-model="rulePassWordForm.pass" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>
            <label class="label_txt">确认新密码</label><span class="req">*</span>
            <el-form-item prop="checkPass">
                <el-input type="text" v-model="rulePassWordForm.checkPass" :clearable="true" autocomplete="off" ></el-input>
            </el-form-item>           
        </el-form>
        <el-button class="ok_btn btn" type="primary" @click="submitPassWord('rulePassWordForm')" style="margin-top:0.15rem;margin-bottom:0rem;">确认更改</el-button>
      </div>
      <p class="contact_txt" :class="{'active_static': id === 'returnRefund'}" @click="showDetail('returnRefund')">退货与退款</p>
      <div class="contact_detail returnRefund" v-if="id === 'returnRefund'">
        <p class="sub_title">退货必须符合以下退货政策：</p>
        <p>商品必须未经穿戴、未洗涤过，未受损及使用过，并且附有所有的标签。</p>
        <p>鞋履和配饰必须采用原有的品牌包装和运输箱进行退货。</p>
        <p>当您试穿鞋款时，请采取妥善保护措施，避免在鞋底留下刻痕或损坏鞋盒。</p>
        <p>请勿拆卸附加的防盗标签。如果防盗标签已被拆卸，我们无法接受退货和退款要求。</p>
        <p>珠宝首饰必须以原状态退回，包括所附品牌包装和文件。</p>
        <p>请小心试穿并妥善保管您收到的商品，并以签收时的完好状态退回。我们建议您使用原包装退货以确保商品不会在配送途中受损。如有不符合退货政策的情况，我们将无法接受退货。</p>
        <p class="sub_title sub_title_top">退款</p>
        <p>在仓库收到，并确认接受您的退货后，您的退款将以原付款形式退还给您。您可以通过退货运单上的追踪号了解退货进程。</p>
        <p>请注意，根据不同的银行，退款可能需要最长达 14 个工作日完成。退款将不包含您在订购时支付的运费。</p>
        <p class="sub_title sub_title_top">瑕疵品</p>
        <p>我们全力以完好无损的状态送达每一款商品，并希望您能满意在这里的每次购物。如果您收到了有瑕疵，或与网站描述完全不相符的商品，请尽快通知客服。我们将安排退货，并对瑕疵品进行全额退款。</p>                                                   
      </div>
      <!-- <p class="contact_txt" :class="{'active_static': id === 'termsConditions'}" @click="showDetail('termsConditions')">条款与条件</p> -->
      <div class="contact_detail" v-if="id === 'termsConditions'">{{contactDetail.termsConditions}}</div>
      <!-- <p class="contact_txt" :class="{'active_static': id === 'privacyPolicy'}" @click="showDetail('privacyPolicy')">隐私政策</p> -->
      <div class="contact_detail privacyPolicy" v-if="id === 'privacyPolicy'">
        <p>本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。 您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。</p>
        <p class="sub_txt">1. 适用范围</p>
        <p>(a) 在您注册本应用帐号时，您根据本应用要求提供的个人注册信息</p>
        <p>(b) 在您使用本应用网络服务，或访问本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据</p>
        <p>(c) 本应用通过合法途径从商业伙伴处取得的用户个人数据。</p>     
        <p class="sub_txt">您了解并同意，以下信息不适用本隐私权政策：</p>    
        <p>(a) 您在使用本应用平台提供的搜索服务时输入的关键字信息；</p>  
        <p>(b) 本应用收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；</p>    
        <p>(c) 违反法律规定或违反本应用规则行为及本应用已对您采取的措施。</p> 
        <p class="sub_txt">2. 信息使用</p>
        <p>(a)本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。</p>
        <p>(b) 本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。</p>
        <p>(c) 为服务用户的目的，本应用可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本应用合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。</p>
        <p class="sub_txt">3. 信息披露在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：</p> 
        <p>(a) 经您事先同意，向第三方披露；</p>    
        <p>(b)为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；</p>                  
        <p>(c) 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；</p> 
        <p>(d) 如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；</p>
        <p>(e) 如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；</p>  
        <p>(f) 在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。</p>  
        <p>(g) 其它本应用根据法律、法规或者网站政策认为合适的披露。</p>                    
        <p class="sub_txt">4. 信息存储和交换</p>   
        <p>本应用收集的有关您的信息和资料将保存在本应用及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本应用收集信息和资料所在地的境外并在境外被访问、存储和展示。</p> 
        <p class="sub_txt">5. Cookie的使用</p>  
        <p>(a) 在您未拒绝接受cookies的情况下，本应用会在您的计算机上设定或取用cookies ，以便您能登录或使用依赖于cookies的本应用平台服务或功能。本应用使用cookies可为您提供更加周到的个性化服务，包括推广服务。</p> 
        <p>(b) 您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的本应用网络服务或功能。</p> 
        <p>(c) 通过本应用所设cookies所取得的有关信息，将适用本政策。</p> 
        <p class="sub_txt">6. 信息安全</p>  
        <p>(a) 本应用帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。</p> 
        <p>(b) 在使用本应用网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对</p>  
        <p class="sub_txt">7.本隐私政策的更改</p>  
        <p>(a)如果决定更改隐私政策，我们会在本政策中、本公司网站中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。</p> 
        <p>(b)本公司保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，本公司会通过网站通知的形式告知。</p> 
        <p class="sub_txt"></p> 
        <p>自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用客服，以便本应用采取相应措施。</p>                           
      </div>
      <p class="contact_txt" :class="{'active_static': id === 'contact'}" @click="showDetail('contact')">联系我们</p>
      <address class="contact_detail" v-if="id === 'contact'">
        <strong>刘建新</strong><br>
        电话： {{contactDetail.phone}}<br>
        地址： {{contactDetail.address}}<br>
        <strong class="wechat">微信客服</strong><br>
        服务时间： {{contactDetail.time}}
        <p></p>
      </address>  
    </div>
</template>
<script>
import { mapState } from 'vuex'
import workspace from '../../common.js'
export default {
  components: {

  },
  props: ['id'],
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
      }
        // 原始密码
      var validateoldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原始密码'));
        } else { 
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
            if(!(reg.test(value))) {
                callback(new Error('密码需由6位或以上字母、数字组成'))
            } else {
                if(this.rulePassWordForm.pass && (this.rulePassWordForm.pass === this.rulePassWordForm.oldPass)) {
                  callback(new Error('新密码不能与原始密码相同'))
                } else {
                  if (this.rulePassWordForm.checkPass !== '') {
                    this.$refs.rulePassWordForm.validateField('checkPass');
                  }
                  callback();
                }              
            }                   
        }
      }
        // 密码
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else { 
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
            if(!(reg.test(value))) {
                callback(new Error('密码需由6位或以上字母、数字组成'))
            } else {
                if (this.rulePassWordForm.checkPass !== '') {
                    this.$refs.rulePassWordForm.validateField('checkPass');
                }
                callback();
            }                   
        }
      }
      // 确认新密码
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.rulePassWordForm.pass) {
          callback(new Error('两次输入密码不同!'));
        } else {
          callback();
        }
      }
    return {
      active_static: true,
      ruleForm: {
            name: '', // 名称
            email: '', // 电邮地址
            category: '', // 类别
            message: '' // 留言
        },
      rules: {
          name: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          email: [
              { validator: validateEmail, trigger: 'blur' }
          ],
          category: [
                { required: true, message: '请输入咨询类别', trigger: ['blur', 'change'] }
          ],
          message: [
              { required: true, message: '请输入不多于300字符的留言', trigger: ['blur', 'change'], maxLength: 1000 }
          ],
      },
      rulePassWordForm: {
        oldPass: '', // 旧密码
        pass: '', // 新密码
        checkPass: '', // 确认新密码
      },
      rulesPassWord: {
        oldPass: [
            { validator: validateoldPass, trigger: 'blur' }
        ],
        pass: [
            { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
            { validator: validateCheckPass, trigger: 'blur' }
        ],
      }
    }
  },
  computed: mapState({
      contactDetail: state => state.contactDetail
    }),
  mounted () {
    // this.$store.dispatch('queryContactDetail') // 联系我们
    console.log(this.id)
  },
  methods: {
    calcuMD5(val) {
      let data = val.toUpperCase()
      return md5(data)
    },
    toResetPassWord() {
      this.$router.push('/resetPassMessage')
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$store.dispatch('saveCustomerSservice') // 提交客服
        } else {
          console.log('error submit!!');
          return false;
        }
      }) 
    },
    // 提交更改密码
    submitPassWord() {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let me = this
          // Encrypt 加密 
          var cipherText = CryptoJS.AES.encrypt(rulePassWordForm.pass, "password").toString()
          console.log(cipherText)
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let param = {
                userid: workspace.getCookie().name,
                password: this.calcuMD5(me.rulePassWordForm.pass),
                role: '0',
                // stauts: '1',
              }
              me.$store.dispatch('login/toRegister', param).then(res => {
                debugger
                if(res.mag == 1) {
                  me.$router.push('/login')
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          })
          // this.$store.dispatch('savePassWord') // 提交客服
        } else {
          console.log('error submit!!');
          return false;
        }
      }) 
    },
    showDetail(val) {
      this.$router.push(`/contact/${val}`)
    }
  }
}
</script>
<style scoped>
.contact{
  padding-top: 0.25rem;
  padding-left:0.18rem;
  padding-right:0.18rem;
  background: #f6f6f6;
  text-align:left;
}
.contact_detail{
  background:#fff;
}
.active_static{
  font-weight: bold;
  font-size:13px;
  color:#333;
}
.contact{
  color:#666;
}
.contact_detail{
  padding-left:0.18rem;
  padding-right:0.18rem;
  padding-bottom:0.2rem;
  margin-top:0.13rem;
}
.contact_detail:before{
  content: ''; /*伪类下的属性*/
    display:block;
    position:relative;
    top: -0.2rem;
    left: 0rem;
    width:0;
    height:0;
    overflow:hidden;
    font-size: 0;     /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
    line-height: 0;  /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
    border:0.1rem;
    border-style:dashed dashed solid dashed;
    border-color:transparent transparent #fff transparent;
}
.contact_txt{
  margin-top:0.13rem;
}
.contact_detail strong{
  margin-bottom:0.1rem;
  display: inline-block;
}
.wechat{
  margin-top:0.15rem;
}
.returnRefund p,.privacyPolicy p{
  color:#666;
  font-size:12px;
  line-height:0.18rem;
}
.sub_title{
  color:#333!important;
  line-height:0.18rem;
  margin-bottom:0.25rem;
}
.sub_title_top,.sub_txt{
  margin-top:0.25rem;
}
</style>