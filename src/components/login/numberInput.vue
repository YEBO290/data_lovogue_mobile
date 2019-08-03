<template>
    <div  class="inputNumber">
        <span><i class="el-icon-minus" @click="handlerMinus"></i></span>
        <el-input v-model="inputValue"  size="mini" :disabled="true" class="inputValue"></el-input>
        <span><i class="el-icon-plus" @click="handlerAdd"></i></span>
    </div>
</template>
<script>
export default {
    props:['inputVal', 'index', 'field'],
    data() {
        return {
            inputValue: this.inputVal,
            oldVal: ''
        }
    } ,
    methods: {
        handlerMinus() {
            this.inputValue <= 1? this.inputValue = 1 : this.inputValue--
            let res = {
                inputValue: this.inputValue,
                index: this.index,
                field: this.field
            }
            this.$emit('change', res)

            
        },
        handlerAdd() {
            this.inputValue < this.field.inventory && this.inputValue++
            let res = {
                inputValue: this.inputValue,
                index: this.index,
                field: this.field
            }
            this.$emit('change', res)      
        }

    }
}
</script>
<style scoped>
.inputValue /deep/ .el-input__inner{
    height: 20px;
    width: 60px;
}
.inputNumber .el-icon-plus, .inputNumber .el-icon-minus, .inputNumber .el-icon-close {
    position: initial!important;
    color: #333!important;
    font-weight: normal!important;
}
.inputNumber{
    display: flex;
    width: 60%;
}
span{
        display: inline-block;
    width: 18px;
    height: 20px;
    border: 1px solid #e4e7ed;
    border-radius: 2px;
}
</style>

