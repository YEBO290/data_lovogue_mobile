<template>
  <div class="bag">
    <div class="bag_lists" v-if="!showToLogin && bagList.length > 0">
      <!--暂不考虑全选，多选-->
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="allCheck">全选</el-checkbox>
      <div style="margin: 0.15rem 0;"></div>  
      <div class="topayList">  
        <el-row :gutter="20" class="bag_list" v-for="(item, index) in bagList" :id="index" :key="index" @click="toDetail(item)">
          <!--暂不考虑全选，多选-->
          <el-col :span="2">
            <el-checkbox-group v-model="checkedLists" @change="handleCheckedListsChange" :disabled="item.inventory == 0">          
              <el-checkbox :label="item.id" :key="item.id">
              </el-checkbox>
            </el-checkbox-group> 
          </el-col>
          <el-col :span="8">
            <img :src="item.imgpath" class="loved_img" style="width:100%;"  @click="$router.push(`/detail/${item.typeno}`)"/>
          </el-col>
          <el-col :span="14">
            <div>
              <div @click="$router.push(`/detail/${item.typeno}`)">
                <div>
                  <span class="bag_text">{{item.name}}</span>
                  <i class="el-icon-close" @click.stop="delBag(item)"></i>
                </div>
                <div>
                  <span class="bag_code">库存{{item.inventory}}件</span>
                  <br/>
                  <span class="bag_color"><span  class="bag_code">编号  - {{item.prodid}}</span></span>
                </div>
              </div>
              <!--暂不考虑数量的加减-->
              <div class="number">
                <label style="font-size:13px;">数量： </label>
                <number-input :inputVal="item.amount" :index="index" :field="item" @change="changeAmount" />
                <!-- <el-input-number  :min="1" v-model="item.amount" label="数量" 
                @change="changeAmount(item, index)" ></el-input-number>  -->
              </div>
              <div style="height: 0.2rem; margin-top: 0.40rem;">
                <!--<div class="bag_size">
                  <span>数量: {{item.amount}}</span>
                </div>-->
                <div class="bag_country">
                  <span class="bag_price" style="float:left;" v-if="item.inventory == 0">暂无库存</span><span class="bag_price">RMB {{changePrice(item.tagprice)}}</span>
                </div>
                <!-- <div v-if="item.showAmount" style="color:#ff0000">库存紧张</div> -->
                <div v-if="errTiplist[index] && item.inventory != 0" style="color:#ff0000">库存不足</div>
              </div>
            </div>
          </el-col>         
        </el-row> 
      </div>   
    </div>
    <div class="pay" v-if="!showToLogin && bagList.length > 0">   
      <el-row class="pay_content">
        <el-col :span="18">
          <p class="total_number">数量<span class="showPay"> {{totalNmubel}} </span></p>
          <p class="total"><sub>不含运费</sub>合计：<span>RMB  <span  class="showPay"> {{totalCost}} </span></span></p>
        </el-col>
        <el-col :span="6" style="margin-top: 5px;">
          <el-button round type="primary" size="small" @click="toPay">立即支付</el-button>
        </el-col>
      </el-row>
      <!-- <div style="" class="pat_content">    
        <div class="total_div">
          <p class="total_number">数量<span>{{totalNmubel}}</span></p>
          <p class="total_pay">运费<span>RMB  {{totalPay}}</span></p> 
          <p class="total">总计<span>RMB  {{totalCost}}</span></p>       
        </div>
        <el-button class="btn login_btns" type="primary" @click="toPay">立即支付</el-button>
      </div> -->
    </div>
    <div class="bag_none" v-if="!showToLogin && bagList.length === 0">      
      <p>您的购物袋暂无单品</p>
      <el-button class="login_btn pay_btn" type="primary" @click="toHome">前往选购</el-button>    
    </div>
    <div class="login_none" v-if="showToLogin">
      <p>创建您的购物清单</p>
      <span>再也不会找不到购物袋内的风格单品-立即</span>
      <a @click="toLogin">登录</a> / <a @click="toRegister">注册</a>
      <span>保留单品至您的账户</span>
      <!--<el-button class="btn ok_btn" type="primary" @click="toLogin">登录</el-button>
      <el-button class="btn cancel_btn" type="primary" @click="toRegister">注册</el-button>-->
    </div>  
    <div class="recommend" v-if="showToLogin && bagList.length === 0">
        <p class="titlt">为您推荐的搭配</p>
        <el-row>
          <el-col :span="8"  v-for="(item, index) in recommendList" :key="index">
            <img :src="item.imgpath" @click="toRemendDetail(item.typeno)">
            <div class="recommend_line"></div>
            <p class="recommend_name">{{item.name}}</p>
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import workspace from '../../common.js'
import numberInput from './numberInput'
export default {
    data() {
      return {
        recommendList: [],
        checkAll: false, // 全选
        checkedLists: [], // 选中列表
        isIndeterminate: true,
        totalNmubel: 0, // 总数量
        totalPay: 0, // 总运费
        totalCost: 0, // 总计
        delOrderId:[],  //待删除订单的 购物车序号Id
        errTiplist: [],
        oldBagList: []
      }
    },
    watch: {
      bagList: {
        handler(val, oldVal){
          return false
          if(!(this.showToLogin)){
            this.$store.commit('writeBgr', true)
          } else {
            this.$store.commit('writeBgr', false)
          }
        },
        immediate: true
      }
    },
    components:{
      numberInput
    },
    computed: mapState({
      // 箭头函数可使代码更简练
      bagList: function(state){
        state.login.bagList.forEach(item => {
          this.$set(item, 'showAmount', false)    
          if(item.inventory <= item.amount) {
            this.$set(item, 'showAmount', true) 
          }       
        })
        return state.login.bagList
      },
      // recommendList: state => state.login.recommendList
      // 传字符串参数 'count' 等同于 `state => state.count`
      // countAlias: 'count',

      // // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      // countPlusLocalState (state) {
      //   return state.count + this.localCount
      // }
    }),
    created() {
      let status = workspace.getCookie().name
      if(status !== '' && status !== null && status !== undefined) {
        this.showToLogin = false
      } else {
        this.showToLogin = true
      }
      if(workspace.getCookie().name) {
        // 购物袋的列表查询
        this.queryBag()
      } else {
        let params = {
          typeno: "",
        }
        this.$store.dispatch('detailList/queryRecommendList', params).then(res =>{
          if(Object.prototype.toString.call(res) == "[object Object]") {
            let list = []
            for(let i in res) {
              list.push(res[i])
            }
            this.recommendList = list
          } else {
            this.recommendList = res
          }
          
        }) // 推荐的列表查询 
      }    
    },
    beforeUpdate() {
      console.log(this.bagList)
      this.oldBagList = this.bagList
    },
    updated() {
      console.log(this.bagList)
    },
    methods: {
      changeData(res) {
        console.log(res)
      },
      queryBag() {
        // 购物袋的列表查询
        let queryParam = {
          userid: workspace.getCookie().name,
          status: "1"
        }
        this.$store.dispatch('login/queryBagList', queryParam)
      },
      changePrice(val) {
         return workspace.thousandBitSeparator(val)
      },
      toHome() {
        this.$router.push('/home')
      },
      toLogin() {
        this.$router.push('/login')        
      },
      toRegister() {
        this.$router.push('/login/register')        
      },
      delBag(val) {
        let me = this
        let param = {
          id: val.id,
          status: "0"
        }
        me.$store.dispatch('login/delBag', param).then(res => {
          if(res.msg > 0) {
            me.$message({
              message: '删除成功',
              type: 'success'
            })
            me.queryBagList() 
          } else {
            me.$message({
              message: '删除失败，请重试',
              type: 'error'
            })
          }        
        })
      },
      toPay() {
        let me = this
        let len = this.checkedLists.length
        if (len == 0 ) {
          this.$message({
            message: '请先勾选好商品！',
            type: 'warning'
          })
          return false
        }
        let selected = []
        let param = {}
        let idList = []
        this.checkedLists.forEach(el => this.bagList.forEach(item =>{ 
          if(el === item.id) {
            me.delOrderId.push(item.id)
            idList.push(item.productid)
            let obj = {
              productid: item.productid,
              price: item.tagprice,
              status: '未支付',
              amount: item.amount,
              shipstatus: '未发货',
              unit: '件',
              userid: workspace.getCookie().name,
              advancebooking: 0,
              name: item.name,
              imgpath: item.imgpath
            }
            selected.push(obj)
            // param = obj
            param = {
              data: selected
            }
          }   
        }))
        this.$store.dispatch('login/toPay', param).then(res => {
          if (res.err == 0) {
           // me.delBagOrder(me.delOrderId);  //创建订单成功后 执行删除该条购物车订单
            me.$router.push({path: '/confirmAddress', query: {
              id: res.msg.join(),
              orderid: res.orderid
            }})
          } else {
            me.$message({
              message: '操作失败!',
              type: 'error'
            })
          }   
        }).catch((err) => {
          if(err.msg.indexOf('默认的地址') > -1){
            this.$router.push('/selectAddress')
          }
        })
        // this.$router.push('/confirmAddress')
      },
      //订单创建成功后删除当前订单在购物车数据
      delBagOrder(list) {
        let me = this
        list.forEach(el => {
          (function(el) {
            return function() {
              let param = {
                id: el,
                status: "0"
              }
              me.$store.dispatch('login/delBag', param).then(res => {
                if(res.msg > 0) {
                
                } else {
                  me.$message({
                    message: '删除失败，请重试',
                    type: 'error'
                  })
                }        
              })
            }
          })(el)()
        })
        this.queryBagList()      
      },
      queryBagList() {
        let queryParam = {
          userid: workspace.getCookie().name,
          status: "1"
        }
        this.$store.dispatch('login/queryBagList', queryParam)
      },
      handleCheckAllChange(val) {
        let me = this
        if (val) {
          let list = []
          this.bagList.forEach(el => {
            (el.inventory !== 0) && (list.push(el.id))
          })
          this.checkedLists = val ? list : []
          this.isIndeterminate = false
          me.totalNmubel = this.bagList.length
          this.totalPayFun(this.bagList)
        } else {
          this.checkedLists = []
          me.totalNmubel = 0
          me.totalCost = 0
          // this.bagList.forEach(el => {
          //   me.$set(el, 'showAmount', true)
          // })        
        } 
      },
      handleCheckedListsChange(value) {
        let me = this
        let checkedCount = value.length;
        // this.checkedLists = value // 选中的数组
        this.checkAll = checkedCount === this.bagList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.bagList.length;
        this.totalCost = 0
        this.totalPay = 0
        this.totalNmubel = 0
        let newList = [] // 选中的数组
        // this.bagList.forEach(item => {   
        //   me.$set(item, 'showAmount', true)    
        // })
        value.forEach(el => {
          newList = newList.concat(this.bagList.filter(item => item.id === el ))
        })
        console.log(newList)
        this.totalPayFun(newList)
      },
         // 详情
      toDetail(val) {
        this.$router.push(`/detail/${val.prodid}`)
      },
      toRemendDetail(val) {
        this.$router.push(`/detail/${val}`)
      },
      // changeAmount(val, index) {
      //   let me = this
      //   me.$set(me.errTiplist, index, false)
      //   if(Number(val.amount) >= Number(val.inventory) ) {
      //     // me.errTiplist = []
      //     me.$set(this.bagList[index], 'amount', val.inventory)
      //     me.$set(me.errTiplist, index, true)
      //     return  false
      //   }
      //   /**调添加购物车接口 */
      //   let param = {
      //     id:val.id,
      //     prodid: val.productid,
      //     userid: workspace.getCookie().name,
      //     amount: val.amount,
      //     status: "1"
      //   }
      //   this.$store.dispatch('login/delBag', param).then(res => {
      //     if(res.msg > 0) {              
      //       me.queryBag()           
      //     } else {
      //       me.$message({
      //         message: '操作失败！',
      //         type: 'error'
      //       })
      //     }       
      //   }) 
      //   let list = []
      //   this.checkedLists.forEach(el => {
      //     me.bagList.forEach(item => {   
      //       if(item.id === el) {
      //         list.push(item)
      //       }  
      //     })
      //   })
      //   this.totalPayFun(list)
      // },
      changeAmount(res) {
        let me = this
        me.$set(me.errTiplist, res.index, false)
        if(Number(res.inputValue) > Number(res.field.inventory) || Number(res.inputValue) < 1 ) {
          Number(res.inputValue) >= Number(res.field.inventory) && me.$set(me.errTiplist, res.index, true)
          return  false
        }
        let val = res.field
        /**调添加购物车接口 */
        let param = {
          id:val.id,
          prodid: val.productid,
          userid: workspace.getCookie().name,
          amount: res.inputValue,
          status: "1"
        }
        this.$store.dispatch('login/delBag', param).then(res => {
          if(res.msg > 0) {              
            me.queryBag()           
          } else {
            me.$message({
              message: '操作失败！',
              type: 'error'
            })
          }       
        }) 
        let list = []
        this.checkedLists.forEach(el => {
          me.bagList.forEach(item => {   
            if(item.id === el) {
              list.push(item)
            }  
          })
        })
        this.totalPayFun(list)
      },
      totalPayFun(val) {
        let me = this
        me.totalNmubel = 0 // 总数量
        me.totalCost = 0 // 总计
        me.totalPay = 0 // 总运费
        val.forEach(item => {
          // me.$set(item, 'showAmount', false)
          // me.totalPay = me.totalPay + parseFloat(item.tagprice)
          me.totalNmubel = me.totalNmubel + parseInt(parseInt(item.amount))
          me.totalCost = me.totalCost + parseInt(item.amount) * parseFloat(item.tagprice)
          // 是否考虑运费
          // me.totalCost = me.totalCost + (parseInt(1) * parseFloat(item.tagprice)) + parseFloat(item.pay)
        })
        me.totalCost = workspace.thousandBitSeparator(me.totalCost.toFixed(2))
      }
    }
  }
</script>

<style scoped>
@import "./css/index.less";
.bag /deep/ .el-checkbox{
    display: inline-block;
    width: 100%;
}
.bag_lists{
  margin-bottom:52px;
}
.bag_list /deep/ .el-input-number{
  width: 0.8rem;
  height: 0.25rem;
  line-height: 0.23rem;
}
.bag_list /deep/ .el-input-number__decrease,.bag_list /deep/ .el-input-number__increase{
  width: 0.2rem!important;
}
.bag_list /deep/ .el-input-number__decrease i,.bag_list /deep/ .el-input-number__increase i {
    color:#333;
    top: 0.06rem;
    font-weight: normal;
    position: initial;
}
.bag_list /deep/ .el-input-number .el-input__inner {
    padding-left: 0.05rem;
    padding-right: 0.05rem;
    height: 0.25rem;
    line-height: 0.23rem;
}
.bag_list /deep/ .el-input-number__decrease:hover,.bag_list /deep/ .el-input-number__increase:hover {
    color: #C5A480;
}
.bag_list /deep/ .el-checkbox__label{
  display: none;
}
.number{
  position: absolute;
  /* top: 0.7rem; */
}
.allCheck .el-checkbox__label{
  display: inline-block;
}
.el-icon-plus, .el-icon-minus, .el-icon-close {
  left: auto;
}
.pay{
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 100;
  margin-bottom: .05rem;
  
  /* padding-left:10px;
  padding-right:10px; */
}
/* .pay .pat_content{
  border-top: 1px solid #EFDED1;
  width:100%;padding:0 18px;text-align:left;
  -moz-box-shadow:2px 2px 5px #333333; -webkit-box-shadow:2px 2px 5px #333333; box-shadow:2px 2px 5px #333333;
  padding-bottom: .18rem;
  border-radius: 3px;
  background: #fff;
} */
.pay .pay_content {
    background: #fff;
    /* box-shadow: 2px 2px 5px #333333; */
    padding: 5px;
    /* border: 1px solid red; */
    width: 100%;
    border-top: 1px solid #E4E7ED;
    border-bottom: 1px solid #E4E7ED;
    text-align: right;
}
.total sub{
  color:#999;
  margin-right:5px;
}
.showPay{
  font-weight: bold;
  color: #c5a480;
}
.bag_text{
    display: inline-block;
    padding-right: 20px;
    height: 40px;
}
.inputValue>input{
    height:0.2rem!important;
}
.number{
  display: flex;
  margin-top: 0.1rem;
}
</style>