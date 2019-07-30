<template>
  <div class="menu-select" :class="{'menu_sub':menu_sub}">  
    <div class="subMenu">
      <subList 
        v-for="(item, index) in menuLists" 
        :menuList="item" 
        :name="index + 1" 
        :key="index" 
        :activeNames="['1']"
        :selectedVal="selectedVal"
        :isMulti="isMulti"
        @handlerList="handlerList"
      />
    </div>
    <div class="sift-bottom">
      <div class="sift-clear sift-btn" id="J_SiftClear" data-spm-anchor-id="0.0.0.i8.568748ccCik6jV" @click="handlerReset">重置</div>
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
  props: {
    isMulti: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      menu_sub: false,
      expandSituation: false,
      expandcolorCheck: false,
      CommodityCategory:[],
      quality:[],//商品材质
      jewel:[], //宝石材质
      scenes:[], //场景
      price:[], //价格区间
      selectedMenu: [], // 选中的数据
      selectedVal: [],
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
  // computed:{
  //   isMulti() {
  //     return this.props.isMulti
  //   }
  // },
  components: {
    subList
  },
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
      this.selectedMenu = this.selectedMenu.filter(item => item.type !== value.type)
      this.selectedMenu = this.selectedMenu.concat(value)
      console.log('选中的数据' + JSON.stringify(this.selectedMenu))
      
    },
    handlerOk(value) {
      debugger
      this.$emit('changeFilter', this.selectedMenu || []) // 将选中的数据抛出
      // this.selectedVal = []
    },
    handlerReset(){
      this.selectedVal = []
    }
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