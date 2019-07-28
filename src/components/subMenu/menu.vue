<template>
  <div class="menu-select" :class="{'menu_sub':menu_sub}">  
    <!-- <div class="menu_del">  -->
      <!--<span class="menu_filter_btn"><i class="icon_f_btn"></i>筛选</span>-->
    <!--  <span @click.stop="expandMenu">清除</span>
    </div>
    <span class="el-icon-plus" @click.stop="expandSituationFunc" v-if="!expandSituation"></span>
    <span class="el-icon-minus" @click.stop="expandSituationFunc" v-if="expandSituation"></span>
    <p class="menu_title"  @click.stop="expandSituationFunc">按穿着场合</p>       
    <ul v-if="expandSituation">
      <li v-for="(item, index) in situationList" :key="item.id" class="menu_txt" :class="{'checked_list': situationCheckList[index]}" @click.stop="checkList(index, item)">{{item.name}}
        <i class="el-icon-check" v-if="situationCheckList[index] || false"></i>
      </li>
    </ul>
    <span class="el-icon-plus" @click.stop="expandcolorCheckFunc" v-if="!expandcolorCheck"></span>
    <span class="el-icon-minus" @click.stop="expandcolorCheckFunc" v-if="expandcolorCheck"></span>
    <p class="menu_title" @click.stop="expandcolorCheckFunc">颜色</p>       
    <ul v-if="expandcolorCheck">
      <li v-for="(item, index) in colorList" :key="item.id" class="menu_txt"
      
        :class="{'checked_list': colorCheckList[index]}" @click.stop="checkColorList(index, item)">{{item.name}}
        <i class="el-icon-check"  v-if="colorCheckList[index] || false"></i>
      </li>
    </ul>
    <span class="more_list"><i class="el-icon-plus"></i>查看更多</span>
    <ul>
      <li v-for="item in moreList" :key="item.id" class="menu_txt">{{item.name}}</li>
    </ul>
    <p class="menu_tip">
      可同时选择多个选项
    </p> -->
    <div class="subMenu">
      <subList 
        v-for="(item, index) in menuLists" 
        :menuList="item" 
        :name="index + 1" 
        :key="index" 
        :activeNames="['1']"
        @handlerList="handlerList"
      />
    </div>


    <!-- <el-collapse class="select-table" v-model="activeNames" @change="handleChange">
      <el-collapse-item title="商品品类" name="1">
        <div class="Category">
          <ul>
            <li v-for="item  in CommodityCategory" :key="item.value" >{{item.lable}}</li>
        </ul>
        </div>
        
      </el-collapse-item>
      <el-collapse-item title="商品材质" name="2">
        <div class="Category">
          <ul>
            <li v-for="item  in quality" :key="item.value" >{{item.lable}}</li>
        </ul>
        </div>
      </el-collapse-item>
      <el-collapse-item title="宝石材质" name="3">
        <div class="Category">
          <ul>
            <li v-for="item  in jewel" :key="item.value" >{{item.lable}}</li>
          </ul>
        </div>
      </el-collapse-item>
      <el-collapse-item title="商品场景" name="4">
        <div class="Category">
          <ul>
            <li v-for="item  in scenes" :key="item.value" >{{item.lable}}</li>
          </ul>
        </div>
      </el-collapse-item>
      <el-collapse-item title="价格区间" name="5">
        <div class="Category">
          <ul>
            <li v-for="item  in price" :key="item.value" >{{item.lable}}</li>
          </ul>
        </div>
      </el-collapse-item>
    </el-collapse> -->
    <div class="sift-bottom">
      <div class="sift-clear sift-btn" id="J_SiftClear" data-spm-anchor-id="0.0.0.i8.568748ccCik6jV">重置</div>
      <div class="sift-btn-ok sift-btn" id="J_SiftCommit" data-spm-anchor-id="0.0.0.i14.568748ccCik6jV" @click="handlerOk">确定</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import subList from './list'
import api from '../../axios/api.js'
import {post} from '../../axios/index'
import workspace from '../../common.js'
export default {
  data() {
    return {
      situationCheckList: [],
      colorCheckList: [],
      situationCheckData: [],
      colorCheckData: [],
      menu_sub: false,
      expandSituation: false,
      expandcolorCheck: false,
      activeNames: ['1','2','3','4','5'],
      CommodityCategory:[],
      quality:[],//商品材质
      jewel:[], //宝石材质
      scenes:[], //场景
      price:[], //价格区间
      selectedMenu: [], // 选中的数据
      menuLists: {
        productCategory: {
            name: '商品品类',
            type: 'category',
            lists: [{
                "lable":'耳饰',
                "value":'earrings'
            },{
                "lable":'戒指',
                "value":'rings'
            },{
                "lable":'颈饰',
                "value":'neckdress'
                },{
                "lable":'腕饰',
                "value":'wristwear'
            },{
                "lable":'配饰',
                "value":'pendant'
            },{
                "lable":'链条',
                "value":'anklets'
            }]
        },
        productMaterial: {
            name: '商品材质',
            type: 'theme',
            lists: [{
                "lable":'18K',
                "value":'18K'
                },{
                "lable":'18K珍珠钻石',
                "value":'18K珍珠钻石'
                },{
                "lable":'18K钻石',
                "value":'18K钻石'
                },{
                "lable":'18K珍珠',
                "value":'18K珍珠'
                },{
                "lable":'18K红宝钻石',
                "value":'18K红宝钻石'
                },{
                "lable":'18K珍珠绿宝',
                "value":'18K珍珠绿宝'
                }]
            },
            stoneMaterial: {
                name: '宝石材质',
                type: 'typegem',
                lists: [{
                    "lable":'珍珠',
                    "value":'珍珠'
                },{
                    "lable":'宝石',
                    "value":'宝石'
                }]
            },
            productScene: {
                name: '商品场景',
                type: 'occasion',
                lists: [{
                    "lable":'商务通勤',
                    "value":'商务通勤'
                },{
                    "lable":'商务会议',
                    "value":'商务会议'
                },{
                    "lable":'商务社交',
                    "value":'商务社交'
                },{
                    "lable":'百搭应用',
                    "value":'百搭应用'
                }]
            },
            priceRange: {
                name: '价格区间',
                type: 'tagprice',
                lists: [{
                    "lable":'1000以下',
                    "value":'1000以下'
                },{
                    "lable":'1001元-2999元',
                    "value":'1001元-2999元'
                },{
                    "lable":'3000元-4999元',
                    "value":'3000元-4999元'
                },{
                    "lable":'5000元-7999元',
                    "value":'5000元-7999元'
                },{
                    "lable":'8000元以上',
                    "value":'8000元以上'
                }]
            }
                
            }

    }
  },
  components: {
    subList
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    situationList: state => state.list.situationList,
    colorList: state => state.list.colorList,
    moreList: state => state.list.moreList
    // 传字符串参数 'count' 等同于 `state => state.count`
    // countAlias: 'count',

    // // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    // countPlusLocalState (state) {
    //   return state.count + this.localCount
    // }
  }),
  created() {
    this.$store.commit('showMenu', false),
    // this.$store.dispatch('list/querySituationList', '123')
    this.menu_sub = this.$route.name === 'specialEditionList'? false: true
    // this.CommodityCategory = [{"lable":'耳饰',"value":'earrings'},{"lable":'戒指',"value":'rings'},{"lable":'颈饰',"value":'neckdress'},{"lable":'腕饰',"value":'wristwear'},{"lable":'配饰',"value":'pendant'},{"lable":'链条',"value":'anklets'}]
    // this.quality = [{"lable":'18K',"value":'18K'},{"lable":'18K珍珠钻石',"value":'18K珍珠钻石'},{"lable":'18K钻石',"value":'18K钻石'},{"lable":'18K珍珠',"value":'18K珍珠'},{"lable":'18K红宝钻石',"value":'18K红宝钻石'},{"lable":'18K珍珠绿宝',"value":'18K珍珠绿宝'}],//商品材质
    // this.jewel = [{"lable":'珍珠',"value":'珍珠'},{"lable":'宝石',"value":'宝石'}] //宝石材质
    // this.scenes = [{"lable":'商务通勤',"value":'商务通勤'},{"lable":'商务会议',"value":'商务会议'},{"lable":'商务社交',"value":'商务社交'},{"lable":'百搭应用',"value":'百搭应用'}], //场景
    // this.price = [{"lable":'1000以下',"value":'1000以下'},{"lable":'1001元-2999元',"value":'1001元-2999元'},{"lable":'3000元-4999元',"value":'3000元-4999元'},{"lable":'5000元-7999元',"value":'5000元-7999元'},{"lable":'8000元以上',"value":'8000元以上'}] //价格区间
  },
  methods: {
    handlerList(value) {
      this.selectedMenu = this.selectedMenu.concat(value)
      console.log('选中的数据' + JSON.stringify(value))
      
    },
    async handlerOk(value) {
       let param = {
        data: {
          "language":"cn",
          "userid": workspace.getCookie().name,
          "sortype":"tagprice"
          },
          "listQuery":{"pageSize":30,"pageNum":1}
        }
        this.selectedMenu.forEach(item => {
          let {type, val} = item
          type === 'category' && (param.data.category = val.value) // 商品的品类
          type === 'theme' && (param.data.theme = val.value) // 商品的商品材质
          type === 'typegem' && (param.data.typegem = val.value) // 商品的宝石材质
          type === 'occasion' && (param.data.occasion = val.value) // 场景
          if(type === 'tagprice') { // 商品的价格
            let price = val.value && val.value.indexOf('-') > -1 && val.value.split('-') || ''
            param.data.tagpricemin = price && price[0] && parseInt(price[0])
            || parseInt(val.value) >=8000 && parseInt(val.value) || ''
            param.data.tagpricemax = price && price[1] && parseInt(price[1]) || parseInt(val.value) <= 1000 && 1000
             || ''
          }
        });
      
      // this.$emit('handlerMenu', [])
      let res = await post(api.getScreenSelect, param)
      this.$emit('handlerMenu', res.data || [])
    },
    // 列表选择
    checkList(index, value) {
      if (this.situationCheckList[index]) {
        this.$set(this.situationCheckList, index, false)
        // 目前通过id处理 具体看后台返回的唯一识别码
        this.situationCheckData.filter(item => item.id === value.id)     
      } else {
        this.$set(this.situationCheckList, index, true)
        this.situationCheckData.push(value)
      }
      console.log('场合穿着选中数据------' + this.situationCheckData)
    },
    // 颜色选择
    checkColorList(index, value) { 
      if (this.colorCheckList[index]) {
        this.$set(this.colorCheckList, index, false)
        // 目前通过id处理 具体看后台返回的唯一识别码
        this.colorCheckData.filter(item => item.id === value.id)
      } else {
        this.$set(this.colorCheckList, index, true)
        this.colorCheckData.push(value)       
      }
      console.log('颜色选中数据------' + this.colorCheckData)
    },
    expandSituationFunc() {
      this.expandSituation = !this.expandSituation
    },
    expandcolorCheckFunc() {
      this.expandcolorCheck = !this.expandcolorCheck
    },
    // expandMenu() {
    //   this.$store.commit('showSubMenu', false)     
    // }
  }
}
</script>

<style scoped>
@import "./menu.less";
.sift-bottom{
  position: fixed;
  bottom: 0;
  right: 0;
  width: 80%;
}
.sift-bottom /deep/ .sift-btn {
    width: 50%;
    height: 40px;
    background: #FFF;
    line-height: 40px;
    float: left;
    text-align: center;
    border-top: 1px solid #e7e7e7;
}
.sift-bottom /deep/ .sift-btn-ok {
    color: #fff;
    background: #ff5000;
    border-top-color: #e7e7e7;
}
.select /deep/ .el-collapse-item .el-collapse-item__header {
  padding-left: 10px;
}
.menu_bgr[data-v-3a39ad32] {
  width: 100%;
  height: 10rem;
  background: #000;
  opacity: 0.25;
}
.subMenu{
  overflow: scroll;
  max-height: 5.8rem;
} 
.select-table{
  padding-left:0.18rem;
}
</style>