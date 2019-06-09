<template>
    <div>
      <input type='checkbox' class='input-checkbox' :checked="checkAll" @click='checkedAll()'>全选
      <div v-for='(fruit, index) in list' :key="index">
          <!--判断fruitIds是否包含当前fruit，fruitIds.indexOf(fruit.fruitId)返回包含fruit的下标, 若不包含则返回-1-->
         <input type='checkbox' :checked="checkedData[index]"  name='checkboxinput' class='input-checkbox' @click='checkedOne(fruit.id, index)'>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      list:[{
        id:'1',
        value:'苹果'
      },{
        id:'2',
        value:'荔枝'
      },{
        id:'3',
        value:'香蕉'
      },{
        id:'4',
        value:'火龙果'
      }],
      fruitIds:[],
      // 初始化全选按钮, 默认不选
      isCheckedAll: false,
      checkedData: [false,true],
      checkAll: false
    }
  },
  methods:{
    checkedOne (fruitId, index) {
      let me = this
        if(this.checkedData[index]){
          this.$set(this.checkedData, index, false)
        }else {
          this.$set(this.checkedData, index, true)
        }
        for(let i=0; i< this.checkedData.length; i++){
          (me.checkedData.length == me.list.length) && (me.checkAll = true)
          if(!(this.checkedData[i])){
            me.checkAll = false
            break;
          }
        }
        // this.checkedData.forEach((el, index) =>{
        //   (me.checkedData.length == me.list.length && flag) && (me.checkAll = true)
        //   el == undefined && (el = false)
        //   if(!el) {
        //     me.checkAll = false
        //     flag = false
        //   }
        // })
    },
    checkedAll () {
      this.checkAll = !this.checkAll
        this.checkedData = []
        this.list.forEach(el => {
          this.checkedData.push(this.checkAll)
        })
    },
    deleteFruits () {

    }
  }
}
</script>