<template>
    <el-collapse class="select-table" v-model="activeIndex">
        <el-collapse-item :title="menuList.name" name="1">
            <div class="Category">
            <ul>
                <li v-for="(item, index) in menuList.lists" 
                :key="item.value" 
                @click="handlerList(item, index, menuList)" 
                :class="{'activelist': activelist[index]}"
            >{{item.lable}}</li>
            </ul>
            </div>
        </el-collapse-item>
    </el-collapse>
</template>
<script>
export default {
    props: {    
        menuList: {
            type: Object,
            default: {
                name: ''
            }
        },
        name: {
            type: String,
            default: ''
        }, 
        activeNames: {
            type: Array,
            default: []
        },
        selectedVal: {
            function() {
                return {
                    type: Array,
                    default: []
                }
            }
            
        }
    },
    watch:{
        selectedVal: {
            handler(val){
                if(val.length === 0) {
                    this.activelist = []
                }
            },
            immediate: true
        }
    },
    data(){
        return{
           activeIndex: ['1'],
           activelist: [],
           selectedData: this.selectedVal
        }
    },
    methods:{
        handlerList(val, index, menuList){
            let {name, type} = menuList
            if(!this.activelist[index]) {
                this.activelist = []
                this.selectedData = []
                this.$set(this.activelist, index, true) 
                let obj = {
                    name,
                    type,
                    val: val 
                }
                this.selectedData.push(obj)
            } else {
                this.selectedData = this.selectedData.filter(item => item.type != type)
                this.$set(this.activelist, index, false) 
            }
            // 抛出选中的数据
            this.$emit('handlerList', this.selectedData)   
        }
    }
}
</script>
<style>
.Category> ul >li {
    border-radius: 8px;
    line-height: 28px;
    height: 28px;
    width: 30%;
    margin: 0 3% 10px 0;
    text-align: center;
    background: #f2f2f2;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
}
.sift-bottom{
  /* position: fixed; */
  bottom: 0;
  right: 0;
  width: 100%;
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
.activelist{
    background: #c5a480!important;
    color: #fff;
}
.select-table /deep/ .el-collapse-item__content{
    padding-bottom: 0;
}
</style>
