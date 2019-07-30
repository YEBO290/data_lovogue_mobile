<template>
  <div>
    <div class="menu_filter">
      <el-row>
          <el-col :span="8" v-for="(item, index) in filterLists" :key="index">
            <div class="grid-content bg-purple" @click="item.action(index)">
              <span :class="{'menu_del': activeSeleted[index]}">
                <i :class="item.icon"></i>{{item.label}}
              </span>
            </div>
          </el-col>
      </el-row>
    </div>
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :showClose="false"
      size="80%">
      <el-card class="box-card" v-if="showFilter[0]">
        <ul >
          <li @click="filterPrice()" :class="{'menu_del': activeSelectedList[0]}">价格从低到高</li>
          <li @click="filterPrice('1')" :class="{'menu_del': activeSelectedList[1]}">价格从高到低</li>
        </ul>
      </el-card>
      <el-card class="box-card" v-if="showFilter[1]">
        <ul >
          <li @click="filterTime()" :class="{'menu_del': activeSelectedList[0]}">上市时间默认</li>
          <li @click="filterTime('1')" :class="{'menu_del': activeSelectedList[1]}">上市时间最新</li>
        </ul>
      </el-card>
      
      <filterSearch class="menu_list" v-if="showFilter[2]" id="menu_select" @changeFilter="changeFilter" :isMulti="isMulti"/>
    </el-drawer>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import filterSearch from './filterSearch'
import screenSelect from '../home/screenSelect'
import workspace from '../../common.js'
import api from '../../axios/api.js'
import {post} from '../../axios/index'
export default {
  components: {
    filterSearch,
    'screen-select':screenSelect
  },
  props: {
    isMulti: {
      type: Boolean,
      default: false
    }
  },
  watch: {
      filterLists: {
        handler(val){ 
          console.log(val)
        }
      }
  },
  // computed:{
  //   isMulti() {
  //     return this.props.isMulti
  //   }
  // },
  data() {
    return {
      showMore: true,
      isShow:false,
      direction: 'rtl',
      drawer: false,
      showFilter: [false, false, true],
      title: '',
      activeSelected: [],
      activeSelectedList: [],
      filterLists: [
        {
          label: '价格排序',
          icon: 'el-icon-caret-bottom',
          action: (index) => {
            return this.handlerPrice(index)
          }
        },
        {
          label: '上市时间',
          icon: 'el-icon-caret-bottom',
          action: (index) => {
            return this.handlerTime(index)
          }
        },
        {
          label: '筛选',
          icon: 'icon_f_btn',
          action: (index) => {
            return this.handlerFilter(index)
          }
        }
      ],
      activeSeleted: [],
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    changeFilter(val) {
      debugger
        console.log(val)
        this.$emit('changeFilter', val || [])
        this.drawer = false
    },
    changePrice(val) {
      return workspace.thousandBitSeparator(val)
    },
    handlerFilter(index){
      this.title= '筛选'
      this.direction = 'rtl'
      this.showFilter = []
      this.$set(this.showFilter, index, true)
      this.drawer = true
      this.activeSeleted = []
      this.$set(this.activeSeleted, index, true)
    },
    handlerTime(index) {
      this.title= '时间排序'
      this.direction = 'ttb'
      this.drawer = true
      this.showFilter = []
      this.$set(this.showFilter, index, true)
      this.activeSeleted = []
      this.$set(this.activeSeleted, index, true)
      this.activeSelectedList = []
    },
    handlerPrice(index) {
      this.title= '价格排序'
      this.direction = 'ttb'
      this.drawer = true
      this.showFilter = []
      this.$set(this.showFilter, index, true)
      this.activeSeleted = []
      this.$set(this.activeSeleted, index, true)
      this.activeSelectedList = []
    },
    filterPrice(val){
        let index = val && 1 || 0
        this.activeSelectedList = []
        this.$set(this.activeSelectedList, index, true)
        let obj = {   
            "sortype": 'tagprice',
            "sortdesc": val
        }
        this.$emit('changeFilter', obj || {})
    },
    filterTime(val){
        let index = val && 1 || 0
        this.activeSelectedList = []
        this.$set(this.activeSelectedList, index, true)
        let obj = {
            "sortype": 'publishdate',
            "sortdesc": val,
        }
        this.$emit('changeFilter', obj || {})
    }
  }
}
</script>
<style scoped>
.box-card ul{
  text-align:left;
}
.box-card ul>li{
    position: relative;
    left: 0;
    right: 0;
    z-index: 2;
    white-space: nowrap;
    background: #fff;
    line-height: 39px;
    border-bottom: solid 1px #c8c7cc;
}
.box-card /deep/ .el-card__body{
  padding-top:0;
}
.box-card{
  position: absolute;
  z-index: 10;
  width: 100%;
}
</style>