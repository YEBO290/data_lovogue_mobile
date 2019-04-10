<template>
  <div class="menu_home" @click="expandMenu">
    <div class="menu" :class="{'menu_sub':menu_sub}">  
      <div class="menu_del">
        <!--<span class="menu_filter_btn"><i class="icon_f_btn"></i>筛选</span>-->
        <span @click.stop="expandMenu">清除</span>
      </div>
      <span class="el-icon-plus" @click.stop="expandSituationFunc" v-if="!expandSituation"></span>
      <span class="el-icon-minus" @click.stop="expandSituationFunc" v-if="expandSituation"></span>
      <p class="menu_title">按穿着场合</p>       
      <ul v-if="expandSituation">
        <li v-for="(item, index) in situationList" :key="item.id" class="menu_txt" :class="{'checked_list': situationCheckList[index]}" @click.stop="checkList(index, item)">{{item.name}}
          <i class="el-icon-check" v-if="situationCheckList[index] || false"></i>
        </li>
      </ul>
      <span class="el-icon-plus" @click.stop="expandcolorCheckFunc" v-if="!expandcolorCheck"></span>
      <span class="el-icon-minus" @click.stop="expandcolorCheckFunc" v-if="expandcolorCheck"></span>
      <p class="menu_title">颜色</p>       
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
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      situationCheckList: [],
      colorCheckList: [],
      situationCheckData: [],
      colorCheckData: [],
      menu_sub: false,
      expandSituation: false,
      expandcolorCheck: false
    }
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
    this.$store.commit('showMenu', false)
    // this.$store.dispatch('list/querySituationList', '123')
    this.menu_sub = this.$route.name === 'specialEditionList'? false: true
  },
  methods: {
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
    expandMenu() {
      this.$store.commit('showSubMenu', false)     
    }
  }
}
</script>

<style scoped>
@import "./css/menu.less";
</style>