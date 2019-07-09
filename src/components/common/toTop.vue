<template>
  <div id="return-top" class="top_e" @click="toTop">
    <!--<img src="../../assets/image/top.png" width="60" id="img" >-->
    <i class="glyphicon glyphicon-triangle-top" ></i>
    <div style="margin:auto;">
        <!-- <p id='font' style="">返回<br>顶部</p> -->
        <p id='font' style="">TOP</p>
    </div>
    <!--<i class="glyphicon glyphicon-triangle-top" ></i>-->
    </div>
</template>

<script>
import $ from 'jquery'
  // 控制按钮的显示和消失
   $(window).scroll(function(){
    if($(window).scrollTop()>300){
      $('#return-top').fadeIn(300);
    } else{$('#return-top').fadeOut(200);}
  })

  // 鼠标悬浮按钮之上，图片消失，文字显示
  $(".top_e").mouseover(function(){
      $("#img").hide()
      $("#font").show()
  })
  //鼠标离开，文字消失，图片显示。
  $(".top_e").mouseout(function(){
    $("#font").hide()
    $("#img").show()
  })
export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      toTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    }
}
</script>
<style scoped>
.top_e{
  position:fixed;right:10px;bottom:15%;
  background:rgba(204,200,255,0.6);
  border-radius:50%;
  cursor:pointer;
  display:none;
  width:50px;
  height:50px;
}
.top_e:hover
{
  color:#333;
  background:#f1f1f1;
}
p{
  font-size:12px;
}
.glyphicon {
  position: relative;
  top: 4px!important;
  display: inline-block;
  font-family: "Glyphicons Halflings";
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>