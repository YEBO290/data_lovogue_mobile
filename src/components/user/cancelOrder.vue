<template>
    <div class="reject"> 
      <div class="reject-status">
        <div>退款状态</div>
        <div>2019年5月20日 5:20</div>
      </div>
      <div class="reject-msg"><span>退款总金额</span><span class="reject-price">￥ {{detailInfo.price}}</span></div> 
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
        <el-card class="box-card">
          <div class="text item"><span>退款原因：</span><span>{{}}</span></div>
          <div class="text item"><span>退款金额：</span><span>{{}}</span></div>
          <div class="text item"><span>申请时间：</span><span>{{}}</span></div>
          <div class="text item"><span>退款编号：</span><span>{{}}</span></div>

        </el-card>
        <el-button class="btn cancel_btn" @click="back">返回</el-button>

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
    }),
    data() {
      return {
          detailInfo:{
              advancebooking: 0,
                amount: 1,
                createtime: 1558245365000,
                description: "我也不知道是什么",
                id: "44b135230d264a04b74c05fb1cca2ee4",
                imgpath: "http://lovoguesave-1258660965.cos.ap-guangzhou.myqcloud.com/cms/product/ring1.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDpPjrk0ZkFivqWxvF0WmmY4KdcDYegw85%26q-sign-time%3D1558803124%3B1558806124%26q-key-time%3D1558803124%3B1558806124%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D9ca7e0d83e6ad019061830036953bfee78d9fe68",
                name: "18K红金钻石花戒",
                orderid: "bbcc8eea64ad4340802deb34ec6bc9cb",
                payid: "4200000321201905192834959892",
                paytime: 1558245366000,
                paytype: "Wechat",
                price: 0.01,
                productid: "VC0001XX18R",
                shipstatus: "3",
                status: "1",
                unit: "件",
                userid: "yebo2"
          },
          radio: '',
          input:'',
          options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
            value: '',
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
    methods: {

    }
  }
</script>
<style scoped>
.reject{
    height: 300px;
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
  background: #EFDED1;
  color: #fff;
  font-size: 13px;
}
</style>