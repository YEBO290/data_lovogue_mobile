<template>
    <div  class="inputNumber">
        <span><i class="el-icon-minus" @click="handlerMinus"></i></span>
        <el-input v-model="inputValue"  size="mini" class="inputValue" @focus="open"></el-input>
        <span><i class="el-icon-plus" @click="handlerAdd"></i></span>
        <el-dialog
            customClass="input-number-dialog"
            title="请输入您的内容"
            :visible.sync="dialogVisible"
            width="80%"
            :show-close="false"
            :before-close="handleClose">
            <el-input size="mini" v-model.number="inputNumber"></el-input>
            <div style="margin-top:0.1rem;text-align: right;">
                <!-- <span  @click="dialogVisible = false">取 消</span>
                <span  @click="save">确 定</span> -->
                <el-button size="mini"  type="text" @click="dialogVisible = false" style="color:#c5a480;margin-right:10px;">取 消</el-button>
                <el-button size="mini"  type="text" @click="save" style="color:#c5a480;margin-right:10px;">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props:['inputVal', 'index', 'field'],
    data() {
        return {
            inputValue: this.inputVal,
            oldVal: '',
            dialogVisible: false,
            inputNumber: ''
        }
    } ,
    methods: {
        handleClose(done) {
           this.dialogVisible = false
        },
        open() {
            this.dialogVisible = true
            this.inputNumber = this.inputValue
        },
        vail() {
            let flag = true
            let reg = /^[1-9]\d*$/
            if(!reg.test(this.inputNumber)) {
                this.$message.error('请正确输入'); 
                flag = false
            }
            return flag
        },
        save() {
            this.$emit('changeData', this.inputNumber)
            let flag = this.vail()
            if(!flag) {
                return false
            }
            if(this.inputNumber > this.field.inventory) {
               this.$message.error('库存不足'); 
               return false
            }
            this.dialogVisible = false
            this.inputValue = this.inputNumber
            let res = {
                inputValue: this.inputValue,
                index: this.index,
                field: this.field
            }
            this.$emit('change', res)
        },
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
            this.inputValue <= this.field.inventory && this.inputValue++
            let res = {
                inputValue: this.inputValue,
                index: this.index,
                field: this.field
            }
            this.$emit('change', res)      
            this.inputValue >= this.field.inventory && (this.inputValue =  this.field.inventory)
        }

    }
}
</script>
<style scoped>
.inputValue /deep/ .el-input__inner{
    height: 0.2rem;
    width: 0.4rem;
    line-height: 0.2rem;
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
    width: 0.18rem;
    height: 0.2rem;
    border: 1px solid #e4e7ed;
    border-radius: 2px;
}

/* .input-number-dialog /deep/ .el-dialog__header .el-dialog__title{
    font-size:14px!important;
}
.input-number-dialog /deep/ .el-dialog__body{
    padding:0.15rem 0.2rem !important;
} */
</style>

