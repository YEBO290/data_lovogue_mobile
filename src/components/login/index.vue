<template>
    <div class="login_home">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登录" name="login"><login/></el-tab-pane>
            <el-tab-pane label="注册" name="register"><register @setActive="setActive"/></el-tab-pane>
        </el-tabs>       
    </div>
</template>

<script>
import login from './login'
import register from './register'
  export default {
    data() {
      return {
          activeName: 'login',
      }
    },
    props: ['id'],
    components: {login, register},
    created() {
        this.activeName = this.id === 'register'? 'register': 'login'
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event)
            // tab.index == '1' && (this.showRes = true)
        },
        setActive(val) {
            this.activeName = val
        }
    },
    beforeRouteEnter(to, from, next) {   
        next(vm => {
            vm.fromPath = from.fullPath
            vm.$set(vm.$route.query, 'fromPath', from.fullPath)
        })
    }
  }
</script>

<style scoped>
@import "./css/index.less";
</style>