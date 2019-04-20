<template>
    <div class="detail" :descDetail="descDetail">  
      <el-carousel :interval="5000" arrow="always" height="3.75rem">
        <el-carousel-item v-for="item in detailInfo.imgurl" :key="item">
          <img :src="item" style="width:100%">
        </el-carousel-item>
      </el-carousel>
      <span class="toLove" title="收藏" @click="toLoveFunc" v-if="detailInfo.love === 0"></span>
      <span class="Loved" title="取消收藏" @click="cancelLove" v-else></span>
      <!--<p class="loveTip">{{loveTip}}</p>-->
      <div class="detail_content">
        <p class="detail_name">{{detailInfo.productname}}</p>
        <p class="detail_price"><span>RMB </span><span>{{detailInfo.tagprice}}</span></p>
        <div class="detail_flag">
          <span class="position_btn">{{detailInfo.occasion}}</span>
          <!--<span class="position_btn" v-for="(item, index) in detail.occasion" :key="index">{{item.text}}</span>-->
        </div>  
      </div>
      <div class="detail_bts">
       <!-- <el-select v-model="detail.color" placeholder="选择颜色" class="color_select">
          <el-option
            v-for="item in colorList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>-->
        <el-button class="btn ok_btn" type="primary" @click="toBuy">立即选购</el-button>
        <el-button class="btn addBag_btn" @click="toBag">加入购物袋</el-button>
      </div>
      <div class="share">
        <p>分享至</p>
        <img src="../../assets/image/weChatNew.png">
        <img src="../../assets/image/friend.png">
      </div>
      <div class="detail_desc">
        <p class="desc_title">描述</p>
        <ul class="detail_desc_list">
          <li class="detail_desc_sub_one"> {{desc.brand}}.</li>
          <li>• {{desc.category}}.</li>
          <li>• {{desc.vaservie}}.</li>
          <li>• {{desc.occasion}}.</li>
          <li>• {{desc.service}}.</li>
          <li>• {{desc.sizenum}}.</li>
          <li>• {{desc.weight}}.</li>
          <li>• {{desc.material}}.</li>
          <!--<li class="detail_desc_sub_last">•款号 {{desc.typeno}}.</li>-->
        </ul>
      </div>     
      <div class="recommend_list">
        <p class="recommend">为您推荐相关搭配</p>
        <div>
          <!-- <div v-for="(item, index) in recommendList" :key="index" class="recommend_list_div">
            <img :src="item.url" style="width:110px;height:147px;display:block;background:#fff;">
            <div class="recommend_line"></div>
            <p class="recommend_text">{{item.text}}</p>
          </div> -->
          <el-row :gutter="10">
            <el-col :span="8"  v-for="(item, index) in recommendList" :key="index">
              <div class="grid-content bg-purple" style="margin-bottom: 0.25rem;">
                <img :src="item.url" style="width:100%;height:1.47rem;display:block;background:#fff;">
                <div class="recommend_line"></div>
                <p class="recommend_text">{{item.text}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div></div>
      <el-dialog
        width="100%"
        :visible.sync="innerVisible"
        append-to-body class="select">
        <!--<div class="dialog_content">
          <p class="select_size">选择尺码</p>
          <el-tag type="info" v-for="(item, index) in sizeLists" :key="index">{{item.name}}</el-tag>
          <div class="size_line"></div>
          <a class="link size_link">没有适合的尺码</a>
        </div>-->
        <div class="dialog_content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple leftImg">
                <img :src="detailInfo.imgurl" style="width:0.68rem;height:0.68rem;">
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple rightImg">
                <p class="price">RMB {{detailInfo.tagprice}}</p>
                <p class="inventory">库存{{detailInfo.inventory}}件</p>
              </div>
              </el-col>
          </el-row>
          <div class="showImg">

            
          </div>
          <div v-if="colorList.length > 0">
            <div class="select_color"><span class="select_color">颜色</span><span style="color: red;margin-left:0.1rem;font-weight:normal" v-if="colorTip">请选择颜色</span></div>
            <el-tag type="info" v-for="(item, index) in colorList" :key="index" @click="selectColorFunc(item, index)" :class="{'checkedColor': selectColorList[index]}">{{item}}</el-tag>   
             <div class="size_line"></div>
          </div>      
          <div v-if="weightList.length > 0">
            <div class="select_color"><span class="select_color">重量</span><span style="color: red;margin-left:0.1rem;font-weight:normal" v-if="weightTip">请选择重量</span></div>
            <el-tag type="info" v-for="(item, index) in weightList" :key="index" @click="selectWeightFunc(item, index)" :class="{'checkedColor': selectWeightList[index]}">{{item}}</el-tag>   
             <div class="size_line"></div>
          </div>    
          <div v-if="sizeLists.length > 0">
            <div class="select_size"><span class="select_size">尺寸</span><span style="color: red;;margin-left:0.1rem;font-weight:normal" v-if="sizeTip">请选择尺码</span></div>
            <el-tag type="info" v-for="(item, index) in sizeLists" :key="index" @click="selectSizeFunc(item, index)" :class="{'checkedSize': selectSizeList[index]}">{{item}}</el-tag>          
            <a class="link size_link" @click="noticeVisible = true">没有适合的尺码</a>
            <div class="size_line" style="margin-top: 0.2rem;"></div>
          </div>          
          <!--<a class="link size_link">没有适合的尺码</a>-->
          <p class="select_num">购买数量</p>
          <el-input-number v-model="num" :min="1" label="数量"></el-input-number>             
        </div>
        <div slot="footer" class="dialog-footer">
          <div class="size_line"></div>    
          <el-button class="btn ok_btn" type="primary" @click="save">确定</el-button>
        </div>
      </el-dialog>
      <!--补货上架-->   
      <el-dialog
        title="补货上架，请通知我"
        :visible.sync="noticeVisible"
        width="90.4%"
        :before-close="handleClose">
        <div style="padding-left:0.18rem;padding-right:0.18rem;">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="1rem" class="demo-ruleForm">
            <el-form-item label="" prop="email">
              <el-input type="text" v-model="ruleForm.email" autocomplete="off" placeholder="请输入正确的电邮地址"></el-input>
            </el-form-item>
            <el-form-item label="" prop="size" class="size_txt">
              <el-input type="text" v-model="ruleForm.size" autocomplete="off" placeholder="请输入您的尺码"></el-input>
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
          <div class="span_txt">
            <i class="span_txt_img"></i>
            <span class="span_txt_desc">让我们寄信给您吧！获取独家Sale折扣预览与为您量身的新品推荐，潮流资讯与优惠信息。</span> 
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveNotice('ruleForm')" class="btn ok_btn">提交</el-button>
          </span>
        </div>       
      </el-dialog>
    </div>
</template>
                    
<script>
import { mapState } from 'vuex'
// import workspace from '../../common.js'
export default {
  components: {

  },
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
    return {
      showMenu:false,
      toLove: true,
      loveTip: '收藏',
      innerVisible: false,
      num: 1,
      flag: '',
      selectColor: '',
      selectColorList: [true],
      selectSize: '',
      selectSizeList: [true],
      selectWeight: '',
      selectWeightList: [true],
      sizeTip: false,
      colorTip: false,
      weightTip: false,
      noticeVisible: false,
      desc: {
          brand: '',
          category: '',
          vaservie: '',
          occasion: '',
          service: '',
          sizenum: '',
          weight: '',
          material: '',
          typeno: '',
          coloravailable: '',
          weight: '',
          sizenum: ''
      },
      detail:{
        name: 'Consectetur',
        price: 100,
        color: '',
        flags: [{text: '职场刚需'},{text: '约会必备'}]
      },
       ruleForm: {
          email: '',
          size: '',
          term: false
        },
        rules: {
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          size: [
            { required: true, message: '请输入您的尺码', trigger: 'blur' }
          ],
          term: [
            { required: true, message: '请勾选条款与协议', trigger: ['blur', 'change'] }
          ]
        },
        colorList: [],
        sizeLists: [],
        weightList: []
    }
  },
  props: ['id'],
  computed: mapState({
      queryImg: state => state.detail.queryImg,
      // colorList: state => state.detail.colorList,
      recommendList: state => state.detailList.recommendList,
      // sizeLists: state => state.detail.sizeLists,
      detailInfo: function(state) {
        this.desc = state.detail.detailInfo.describe
        this.colorList = this.desc.coloravailable.split(" ")
        this.weightList = this.desc.weight.split(" ")
        this.sizeLists = this.desc.sizenum.split(" ")
        this.selectColor = this.desc.coloravailable
        this.selectSize = this.desc.sizenum
        this.selectWeight = this.desc.weight
        return state.detail.detailInfo},
      descDetail: state => {
        this.desc = state.detail.detailInfo.describe
        return state.detail.detailInfo.describe 
      }
    }),
  created() {
    let param = {
      productid: this.id
    }
    this.$store.dispatch('detail/queryDetail', param)
    // this.$store.dispatch('detail/queryImg') // 获取轮播图列表 
    // this.$store.dispatch('detail/queryColorList') // 获取颜色的下拉值 
  },
  methods: {
    // 清除
    del() {
      this.showMenu = false
    },
    // 展开
    expand() {
      this.showMenu = true
    },
    // 收藏
    toLoveFunc(item) {
      this.toLove = false
      this.loveTip = '收藏成功'
      let param = {
        userid: localStorage.getItem('userName'),
        status: "1",
        prodid: item.productid,
        amount: "1"
      }
      this.$store.dispatch('toLoved', param).then(res => {
        if(res == 1) {
          let queryParam = {
            userid: localStorage.getItem('userName'),
            status: "1"
          }
          this.$store.dispatch('login/queryLovedList', queryParam)
          let param = {
            productid: this.id
          }
          this.$store.dispatch('detail/queryDetail', param)
        } else {
          this.$message({
            message: '添加挚爱失败，请重试',
            type: 'error'
          })
        }   
      })
    },
    // 取消收藏
    cancelLove(item) {
      this.toLove = true
      this.loveTip = '收藏'
      // 发送请求
      let param = {
        userid: localStorage.getItem('userName'),
        status: "0",
        prodid: item.productid,
        amount: "1"
      }
      this.$store.dispatch('cancelLove', param).then(res => {
        if(res == 1) {
          let queryParam = {
            userid: localStorage.getItem('userName'),
            status: "1"
          }
          this.$store.dispatch('login/queryLovedList', queryParam)
          let param = {
            productid: this.id
          }
          this.$store.dispatch('detail/queryDetail', param)
        } else {
          this.$message({
            message: '移除挚爱失败，请重试',
            type: 'error'
          })
        }   
      })
    },
    // 立即选购
    toBuy() {    
      this.innerVisible = true
      this.flag = 'buy'
    },
    // 加入购物袋
    toBag() {
      
      this.innerVisible = true
      this.flag = 'add'         
    },
    // 确定
    save(){
      this.colorTip = false
      this.sizeTip = false
      this.weightTip = false
      if(this.selectColor == '' || this.selectColor == null) {
        this.colorTip = true
        return false
      } 
      if (this.selectWeight === '' || this.selectWeight == null) {
        this.weightTip = true
        return false
      }  
      if (this.selectSize === '' || this.selectSize == null) {
        this.sizeTip = true
        return false
      }
      let param = {
          selectColor: this.selectColor,
          selectSize: this.selectSize,
          amount: this.num,
          prodid: this.id,
          userid: localStorage.getItem('userName'),
          status: "1"
        }
        if(this.flag === 'add') { // 加入购物袋
          // let param = {"prodid":"VR0060DI18R","userid":"admin","amount":"1","status":"1"}
          this.$store.dispatch('detail/toBag', param).then(res => {
            if(res == 1) {
              this.$store.commit('shopBagNumber', 1)
              this.$message({
                message: '添加成功，在购物车等着亲~',
                type: 'success'
              })
              let queryParam = {
                userid: localStorage.getItem('userName'),
                status: "1"
              }
              this.$store.dispatch('login/queryBagList', queryParam)
              this.innerVisible = false
            } else {
              this.$message({
                message: '添加失败，请重试',
                type: 'error'
              })
            }       
          })
        } else {
          this.$store.dispatch('detail/toBuy', param).then(res => {
            this.innerVisible = false
            this.$router.push('/confirmAddress')
          })
        }     
    },
    // 颜色选择
    selectColorFunc(val, index) {     
      this.colorTip = false     
      if(this.selectColorList[index]){
        this.selectColor = ''
        this.$set(this.selectColorList, index, false)        
      } else {
        this.selectColor = val
        this.$set(this.selectColorList, index, true)        
      }
      console.log(this.selectColor)     
    },
    // 重量选择
    selectWeightFunc(val, index) {     
      this.weightTip = false     
      if(this.selectWeightList[index]){
        this.selectWeight = ''
        this.$set(this.selectWeightList, index, false)        
      } else {
        this.selectWeight = val
        this.$set(this.selectWeightList, index, true)        
      }
      console.log(this.selectWeight)     
    },
    // 尺码选择
    selectSizeFunc(val, index) {
      this.sizeTip = false
      if(this.selectSizeList[index]){
        this.selectSize = ''
        this.$set(this.selectSizeList, index, false)        
      } else {
        this.selectSize = val
        this.$set(this.selectSizeList, index, true)        
      }
      console.log(this.selectSize)     
      
    },
    toContact(param) {      
      this.$router.push(`/contact/${param}`)
    },
    // 补货通知
    saveNotice(formName) {
      let me = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          me.$store.dispatch('detail/toNotice').then(res => {
            me.$message({
              message: '一定会通知亲~',
              type: 'success'
            })
            me.noticeVisible = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    handleClose (){
      this.noticeVisible = false
    },
    toMesssge() {

    }
  }
}
</script>

<style scoped>
@import "./css/detail.less";
</style>