<template>
    <div class="reject"> 
      <div class="reject-status">
        <div v-if="returnOrderInfo.returnStatus == 0 ">不受理</div>
        <div v-if="returnOrderInfo.returnStatus == 1 ">受理中</div>
        <div v-if="returnOrderInfo.returnStatus == 2 ">已受理</div>
        <div v-if="returnOrderInfo.returnStatus == 3 ">已完成</div>
        <div v-if="returnOrderInfo.returnStatus == 9 ">异常</div>
        <div>{{returnOrderInfo.defaultTime}}</div>
      </div>
      <div class="reject-msg"><span>退款总金额</span><span class="reject-price">￥ {{returnOrderInfo.price}}</span></div> 
      <div class="reject-title">退款信息</div> 
        <!-- <el-collapse class="address">
            <el-collapse-item title="退款信息" name="1">  
            <div> 
                <el-select v-model="value" placeholder="请选择退款/退货原因">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </div>
            </el-collapse-item>
        </el-collapse> -->
        <el-row :gutter="20" class="order_noPay_list">
            <el-col :span="6"><img :src="returnOrderInfo.imgpath" class="loved_img" style="width:100%;" /></el-col>
            <el-col :span="18">
                <div>
                    <div>
                        <span class="bag_text">{{returnOrderInfo.name}} </span>
                        <span class="txt_right" style="float:right;">￥ {{returnOrderInfo.price}}</span>
                    </div>
                    <div>
                        <span class="bag_color"> <span  class="bag_code">编号  {{returnOrderInfo.productid}}</span></span>
                        <span class="txt_right" style="float:right;color:#999999;"> <span  class="bag_code">x{{returnOrderInfo.amount}}</span></span>
                    </div>
                    <div style="height: 0.2rem; margin-top: 0.05rem;">
                        <div class="bag_size" style="text-align:right;">
                            <div class="txt_right"><span class="order-amount mr15">共 {{returnOrderInfo.amount}}件商品</span>  <span class="order-count ">合计： ￥ {{returnOrderInfo.price}}</span></div>
                        </div>
                    </div>
            </div>
            </el-col>
        </el-row>
        <el-card class="box-card">
          <div class="text item"><span>退款原因：</span><span>{{returnOrderInfo.returnReason}}</span></div>
          <div class="text item"><span>退款金额：</span><span>{{returnOrderInfo.price}}</span></div>
          <div class="text item"><span>申请时间：</span><span>{{returnOrderInfo.createtime}}</span></div>
          <!-- <div class="text item"><span>退款编号：</span><span>{{returnOrderInfo.amount}}</span></div> -->
        </el-card>
        <el-collapse accordion class="return-addr">
          <el-collapse-item title="退货地址">
            <div class="returnAddr-content">
              <div class="returnAddr-content-bg"><img src="../../assets/image/wxcodeImg.png" alt=""><div style="text-align:center;">关注公众号</div></div>
              <div class="returnAddr-content-text">
                <ul>
                  <li>微信公众号ID：gh_ac5d2c91045b</li>
                  <li>公司电话：0755-82174455</li>
                  <li>商务电话：13631057040</li>
                  <li>地址：中国广东省深圳市罗湖区南湖路3005号国贸商住大厦16F</li>
                </ul>
              </div>
            </div>

          </el-collapse-item>
        </el-collapse>
        <div v-if="returnOrderInfo.returnStatus == 2" class="return-no">
            <div class="return-title" v-if="isView == false">快递信息补充</div> 
            <div class="return-title" v-if="isView == true">快递信息</div>
            <el-row>
              <div style="margin-bottom: 0.5rem;">
                <el-col :span="6"><div class="grid-content bg-purple">物流公司：</div></el-col>
                <el-col :span="18">
                  <el-select v-model="returnOrderInfo.couriername" placeholder="请选择" class="color_select"  v-if="isView == false" :disabled="isView">
                    <el-option
                      v-for="item in logisticsCompanyList"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <span class="req" v-if="showTips">请选择</span>
                </el-col>
                <el-col :span="18"><span v-if="isView == true">{{returnOrderInfo.couriername}}</span></el-col>
              </div>
              <div>
                <el-col :span="6"><div class="grid-content bg-purple">快递单号：</div></el-col>
                <el-col :span="18"><el-input v-if="isView == false" placeholder="请输入快递单号" v-model="returnOrderInfo.couriernumber" clearable :disabled="isView"></el-input></el-col>
                <el-col :span="18"><span v-if="isView == true">{{returnOrderInfo.couriernumber}}</span></el-col>
              </div>
              
              
            </el-row>    
        </div>
        <!-- <el-button class="btn cancel_btn" @click="back">返回</el-button> -->
        <div class="returnBtn">
          <el-button v-if="submitStatus" class="btn ok_btn" type="defualt"  @click="submit">提交</el-button>
          <el-button class="btn ok_btn" type="primary"  @click="back">返回</el-button>  
        </div>

    </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import workspace from '../../common.js'

  export default {
    computed: mapState({
      countryList: state => state.address.country,   
      provinceList: function(state){ 
        return state.address.provinceList},   
      cityList: state => state.address.cityList,   
      areaList:  state => state.address.areaList,
    }),
    props: ['id'],
    data() {
      return {
          returnOrderInfo: {
                advancebooking: '',
                amount: '',
                createtime: '',
                description: '',
                productid:'',
                id: '',
                imgpath: '',
                name: '',
                price:'',
                shipstatus: '',
                status: '',
                unit: '',
                returnReason:'',  //退货原因//必填
                returnType: '', //退货类型//必填
                userName: '',  //用户名//非必填
                userPhone: '', //电话//非必填
                defaultTime:'', //退货订单时间
                returnStatus:'' , //退货状态
                couriernumber:'',  //快递单号
                couriername:'' //物流公司
          },
          submitStatus:false,
          isView:false,
          logisticsCompanyList:[],
          showTips:false
      }
    },
    created(){
       let self = this;
       self.logisticsCompanyList = [
         {"id":1,"title":"顺丰速递"},{"id":2,"title":"中国邮政"},{"id":3,"title":"圆通快递"},{"id":4,"title":"申通快递"},{"id":5,"title":"中通快递"},
         {"id":6,"title":"韵达快递"},{"id":7,"title":"天天快递"},{"id":8,"title":"百世汇通"},{"id":9,"title":"宅急送"},{"id":10,"title":"其他"}
       ]

       let param = {
            userid: workspace.getCookie().name,
            id: self.id
        }
        this.$store.dispatch('address/getReturnOrderDetail', param).then(res => {
          self.detailInfo = res.data[0];
          self.returnOrderInfo.defaultTime = self.timeFormat(res.data.return.statustime)
          self.returnOrderInfo.advancebooking = res.data.detailInfo.advancebooking,
          self.returnOrderInfo.amount = res.data.detailInfo.amount
          self.returnOrderInfo.createtime = self.timeFormat(res.data.return.createtime)
          self.returnOrderInfo.description = res.data.detailInfo.description
          self.returnOrderInfo.id = res.data.return.id
          self.returnOrderInfo.imgpath = res.data.prod.imgpath
          self.returnOrderInfo.name = res.data.prod.productname
          self.returnOrderInfo.productid = res.data.detailInfo.productid
          self.returnOrderInfo.price = res.data.detailInfo.price
          self.returnOrderInfo.shipstatus = res.data.return.shipstatus
          self.returnOrderInfo.status = res.data.return.status
          self.returnOrderInfo.unit = res.data.detailInfo.unit
          self.returnOrderInfo.returnReason = res.data.return.returnreason  //退货原因//必填
          self.returnOrderInfo.returnStatus = res.data.return.status
          self.returnOrderInfo.couriernumber = res.data.return.couriernumber
          self.returnOrderInfo.couriername = res.data.return.couriername
          if(self.returnOrderInfo.returnStatus ==2 && (self.returnOrderInfo.couriernumber==null || self.returnOrderInfo.couriernumber=="")){
            self.submitStatus = true
          }else{
            self.submitStatus = false
            self.isView = true
          }

      })
      this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
      })
    },
    methods: {
      //快递信息提交
      submit(){
        let self = this;
        let param = {
          id:self.id,
          couriernumber: self.returnOrderInfo.couriernumber,
          couriername:self.returnOrderInfo.couriername

        }
        this.$store.dispatch('address/updataReturnOrder',param).then(res => {
           if (res.err == 0) {
              self.$message({
                showClose: false,
                message: '提交成功',
                type: 'success'
              });
              this.$router.push('/user')       
            } else {
              self.$message({
                message: '操作失败!',
                type: 'error'
              })
            }
        })
      },
      back(){
         this.$router.push('/user')
      },
      add(m){return m<10?'0'+m:m },
     //时间戳转化成时间格式
      timeFormat(timestamp){
        var self = this;
      // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        return year+'年'+self.add(month)+'月'+self.add(date)+'日 '+self.add(hours)+':'+self.add(minutes)+':'+self.add(seconds);
      }

    }
  }
</script>
<style scoped>
.reject{
    /* height: 300px; */
    font-size:12px;
    text-align: left;
}
.reject /deep/ .reject-title {
    width: 100%;
    height: auto;
    padding: 15px;
    background: #fff;
    font-size: 13px;
}
.reject /deep/ .is-round span{
    font-size:12px;
}
.reject /deep/ .is-round{
    padding:3px 10px;
}
.reject /deep/ .el-row{
    background: #fff;
    margin-left: 18px;
    margin-right: 18px;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 18px 20px;
    margin-bottom: 10px;
}
.phone{
  display: inline-block;
}
.from_info /deep/ .el-select input,.from_info /deep/ .el-textarea textarea{
  border: none;
  border-bottom: 1px solid #DCDFE6;
}
.from_info{
  background: #fff;
  padding-left:18px;
  padding-right:18px;
}
.from_info /deep/ .el-form-item{
  margin-bottom: 0;
  font-size: 12px;
}
.btns{
  text-align: center;
}
.btns button{
  padding: 8px 20px;
}
.from_info /deep/ .el-form-item label{
  display: inline-block;
  /* width: 100px;
  text-align: right; */
  font-size:12px;
}
.address /deep/ .el-collapse-item__header{
  padding-left: 18px;
  padding-right: 18px;
}
.address /deep/ input,.address /deep/ textarea{
  border: none;
  border-bottom: 1px solid #DCDFE6;
}
.from_info  /deep/ .el-form-item{
  width:100%;
}
.textarea_remark /deep/ textarea,.phone /deep/ input{
  border:none!important;
}
.address /deep/ .el-collapse-item__content{
  padding-left:18px;
  padding-right:18px;
}
.bag_size span {
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 14.4px;
  white-space: nowrap;
}
.bag_size .order-amount {
  color: #999999;
  font-size: 12px;
  visibility: visible;
}
.bag_size .mr15 {
  margin-right: .15rem;
}
.bag_size .order-count {
  color: #333;
  font-size: 12px;
  visibility: visible;
}
.el-card__body {
  padding:0.01rem;
}
.el-card__body div {
  margin: 0.02rem 0;
  color:#999;
}
.reject-msg {
  width: 100%;
  padding: 0.15rem;
  margin: 0.05rem 0;
  background: #fff;
  font-size: 13px;
}
.reject-msg .reject-price {
  float: right;
  color: red;
}
.reject-status {
  width: 100%;
  height: auto;
  line-height: 0.25rem;
  padding: 0.2rem 0.15rem 0.2rem;
  background: #ed4747;
  color: #fff;
  font-size: 13px;
}
.returnBtn {
  margin: 50px 18px 0 18px;
}
.return-title {
    width: 100%;
    height: auto;
    padding: 10px;
    background: #fff;
    font-size: 13px;
}
.return-no .el-row {
    background: #fff;
    /* border-radius: 5px; */
    /* border: 1px solid #ddd; */
    padding: 18px 20px;
    line-height: 40px;
    margin: 0;
    border-top:1px solid #ddd;
}
.reject /deep/ .return-no {
  border: 1px solid #ddd;
  margin-top: 5px;
  border-radius: 5px;
}
.return-addr /deep/ .el-collapse-item .el-collapse-item__header {
  padding-left: .1rem;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.returnAddr-content-bg {
  width: 100px;
  float: left;
  margin-right: 15px;
}
.returnAddr-content-bg img {
  width: 100px;
  height: 100px;
}
.returnAddr-content {
  padding: .15rem;
  font-size: 12px;
}
</style>