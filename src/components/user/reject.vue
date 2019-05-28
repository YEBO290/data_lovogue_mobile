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
    <el-collapse class="address">
          <el-collapse-item title="退款/退货原因" name="1">  
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
        </el-collapse>
    <el-form :inline="true" :model="formInline" class="demo-form-inline from_info">
      <el-form-item label="联系人电话：">
        <el-input v-model="input" class="phone" placeholder="选填"></el-input>
      </el-form-item>
      <el-form-item label="退款金额：">
        <div><span class="price">{{detailInfo.price}}</span></div>
      </el-form-item>
      <el-form-item label="退款说明：">
        <el-input type="textarea" v-model="info.address" class="textarea_remark" placeholder="选填"></el-input>
      </el-form-item>
    </el-form>
    <el-collapse>
    <!-- <el-collapse class="address"> -->
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
    </el-collapse>
    <div class="btns">
      <el-button type="primary" style="margin-right:15px">提 交</el-button>
      <el-button>取 消</el-button>
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
</style>