<template>
  <div class="reject">  
    <el-row :gutter="20" class="order_noPay_list">
        <el-col :span="6"><img :src="detailInfo.imgpath" class="loved_img" style="width:100%;" /></el-col>
        <el-col :span="18">
          <div>
            <div>
                <span class="bag_text">{{detailInfo.name}} </span>
                <span class="txt_right" style="float:right;">￥ {{detailInfo.price}}</span>
            </div>
            <div>
                <span class="bag_color"> <span  class="bag_code">编号  {{detailInfo.productid}}</span></span>
                <span class="txt_right" style="float:right;color:#999999;"> <span  class="bag_code">x{{detailInfo.amount}}</span></span>
            </div>
            <div style="height: 0.2rem; margin-top: 0.05rem;">
                <div class="bag_size" style="text-align:right;">
                    <div class="txt_right"><span class="order-amount mr15">共 {{detailInfo.amount}}件商品</span>  <span class="order-count ">合计： ￥ {{detailInfo.price}}</span></div>
                </div>
            </div>
          </div>
        </el-col>
    </el-row>
    <el-collapse class="address reason">
          <el-collapse-item title="退款/退货原因" name="1">  
          <div class="drop"> 
            <el-select v-model="returnMsg.returnReason" placeholder="请选择" :popper-class="'drop'">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </div>
          </el-collapse-item>
    </el-collapse>
    <el-form :inline="true" :model="formInline" class="demo-form-inline from_info">
      <el-form-item label="联系人：">
        <el-input  v-model="returnMsg.userName" class="phone" placeholder="选填"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：">
        <el-input v-model="returnMsg.userPhone" class="phone" placeholder="选填"></el-input>
      </el-form-item>
      <!-- <el-form-item label="退款金额：">
        <div><span class="price">{{detailInfo.price}}</span></div>
      </el-form-item> -->
      <el-form-item label="退款说明：">
        <el-input type="textarea" v-model="returnMsg.returnType" class="textarea_remark" placeholder="选填"></el-input>
      </el-form-item>
    </el-form>
    <!-- <el-collapse class="address">
      <el-collapse-item title="联系地址" name="1">  
      <div> 
        <el-select v-model="info.addressprovince" placeholder="选择省份" @change="addressprovinceFunc">
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="info.addresscity" placeholder="选择城市" no-data-text="请先选择配送省份" @change="addresscityFunc">
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select> 
        <el-select v-model="info.addressdistrict" placeholder="选择区" no-data-text="请先选择配送省份、城市" @change="addressdistrictFunc">
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input type="textarea" v-model="info.address" placeholder="街道地址"></el-input>
        </div>
      </el-collapse-item>
    </el-collapse> -->
    <div class="btns">
      <el-button round size="medium" type="primary" style="margin-right:15px" @click="insertReturn">提 交</el-button>
      <el-button round size="medium" @click="goback">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import workspace from '../../common.js'
  export default {
    computed: mapState({
      countryList: state => state.address.country,   
      provinceList: function(state){ 
        return state.address.provinceList},   
      cityList: state => state.address.cityList,   
      areaList:  state => state.address.areaList,
      detailInfo: function(state){
         return state.address.provinceList
      }
    }),
    props: ['id'],
    data() {
      return {
          detailInfo:{
                advancebooking: '',
                amount: '',
                createtime: '',
                description: '',
                id: '',
                imgpath: '',
                name: '',
                price:'',
                shipstatus: '',
                status: '',
                unit: '',
          },
          radio: '',
          input:'',
          options: [{
            value: '商品错发、漏发',
            label: '商品错发、漏发'
            }, {
            value: '商品质量问题',
            label: '商品质量问题'
            }, {
            value: '退运费',
            label: '退运费'
            }, {
            value: '其他',
            label: '其他'
            }],
            returnMsg:{
              returnReason:'',  //退货原因//必填
              returnType: '', //退货类型//必填
              userName: '',  //用户名//非必填
              userPhone: ''  //电话//非必填
            },
            value: '',
            Returntype:'',
            textarea: '',
            info: {
                phone: '',
                name: '',
                addressprovince: '', // 省份
                addresscity: '', // 城市
                addressdistrict: '',// 地区/行政区
                address: '', // 街道地址  
            },
            formInline: {
              user: '',
              region: ''
            }
      }
    },
    created(){
      let self = this;
       let param = {
            userid: workspace.getCookie().name,
            orderid: this.id
        }
      this.$store.dispatch('address/getOrderDetail', param).then(res => {
        self.detailInfo = res.data[0];
        console.log('数据:'+res);

      })

    },
    methods: {
      //提交退货申请
      insertReturn(){
        let self = this;
        let param = {
          orderid:self.detailInfo.orderid,//必填，用于退款交互的
          id:self.detailInfo.id,//必填，每个订单的商品id
          returnreason:self.returnMsg.returnReason, //退货原因
          returntype:self.returnMsg.returnType,   //必填
          username: self.returnMsg.userName,//非必填
          userphone: self.returnMsg.userPhone//非必填
        };
        this.$store.dispatch('address/insertReturn', param).then(res => {
            if(res.err == 0 && res.msg == 1){
              this.$message({
                showClose: false,
                message: '提交成功！',
                type: 'success'
              });
              this.$router.push('/user');//返回上一层
            }else {
              alert(res.message);
            }
        })
      },
      // 返回上一页
      goback(){
        this.$router.push('/user')
      },
        // 选择省份
      addressprovinceFunc(val) {
        this.$store.dispatch('address/queryCity', {
          level: "1",
          parent: val
        })
        this.editInfo.addresscity = ''
        this.editInfo.addressdistrict = ''
        this.editInfo.address =''

      },
      // 选择城市
      addresscityFunc(val) {
        this.$store.dispatch('address/queryArea', {
          level: "2",
          parent: val
        })
        this.editInfo.addressdistrict = ''
        this.editInfo.address =''
      },
      // 选择城市区
      addressdistrictFunc(val) {
        this.editInfo.address =''
      },
    }
  }
</script>
<style scoped>
.reject{
    height: 300px;
    font-size:12px;
    text-align: left;
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
.drop .el-select-dropdown__list li {
  font-size: 13px!important;
}
.drop .el-collapse-item__content input {
  font-size: 13px!important;
}
</style>