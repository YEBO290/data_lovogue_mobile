<template>
    <div class="menu_home" @click="expandMenu">
        <el-drawer
            title="我嵌套了表格!"
            :visible.sync="table"
            direction="rtl"
            size="50%">
            <el-table :data="gridData">
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
                </el-table>
        </el-drawer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
     
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
    // this.$store.commit('showMenu', false)
    // // this.$store.dispatch('list/querySituationList', '123')
    // this.menu_sub = this.$route.name === 'specialEditionList'? false: true
  },
  methods: {
    // // 列表选择
    // checkList(index, value) {
    //   if (this.situationCheckList[index]) {
    //     this.$set(this.situationCheckList, index, false)
    //     // 目前通过id处理 具体看后台返回的唯一识别码
    //     this.situationCheckData.filter(item => item.id === value.id)     
    //   } else {
    //     this.$set(this.situationCheckList, index, true)
    //     this.situationCheckData.push(value)
    //   }
    //   console.log('场合穿着选中数据------' + this.situationCheckData)
    // },
    // // 颜色选择
    // checkColorList(index, value) { 
    //   if (this.colorCheckList[index]) {
    //     this.$set(this.colorCheckList, index, false)
    //     // 目前通过id处理 具体看后台返回的唯一识别码
    //     this.colorCheckData.filter(item => item.id === value.id)
    //   } else {
    //     this.$set(this.colorCheckList, index, true)
    //     this.colorCheckData.push(value)       
    //   }
    //   console.log('颜色选中数据------' + this.colorCheckData)
    // },
    // expandSituationFunc() {
    //   this.expandSituation = !this.expandSituation
    // },
    // expandcolorCheckFunc() {
    //   this.expandcolorCheck = !this.expandcolorCheck
    // },
    // expandMenu() {
    //   this.$store.commit('showSubMenu', false)     
    // }
  }
}
</script>

<style scoped>
@import "./css/index.less";
</style>