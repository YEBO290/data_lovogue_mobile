import CryptoJS from "crypto-js"
import md5 from "js-md5"
var workspace = {
    // 千位分割
    thousandBitSeparator(num) {
      var val = num && parseFloat(num).toFixed(2)
      var res=val.toString().replace(/\d+/, function(n){ // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
           return $1+","
         })
      })
      debugger
      return res
    },
      //设置cookie
  setCookie(portId, psw, exdays) {
    // Encrypt，加密账号密码
    var cipherPortId = CryptoJS.AES.encrypt(
     portId+'',
     "secretkey123"
    ).toString();
    var cipherPsw = CryptoJS.AES.encrypt(psw+'', "secretkey123").toString()
    console.log(cipherPortId+'/'+cipherPsw)//打印一下看看有没有加密成功
  
    var exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) //保存的天数
    //字符串拼接cookie，为什么这里用了==，因为加密后的字符串也有个=号，影响下面getcookie的字符串切割，你也可以使用更炫酷的符号。
    window.document.cookie =
     "currentPortId" +
     "==" +
     cipherPortId +
     ";path=/;expires=" +
     exdate.toGMTString();
    window.document.cookie =
     "password" +
     "==" +
     cipherPsw +
     ";path=/;expires=" +
     exdate.toGMTString();
   },
   //读取cookie
   getCookie: function() {
    var obj = {
      name: '',
      password: ''
    }
    if (document.cookie.length > 0) {
     var arr = document.cookie.split("; ") //这里显示的格式请根据自己的代码更改
     for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("=="); //根据==切割
      //判断查找相对应的值
      if (arr2[0] == "currentPortId") {
       // Decrypt，将解密后的内容赋值给账号
       var bytes = CryptoJS.AES.decrypt(arr2[1], "secretkey123")
       this.currentPortId = bytes.toString(CryptoJS.enc.Utf8)
      } else if (arr2[0] == "password") {
       // Decrypt，将解密后的内容赋值给密码
       var bytes = CryptoJS.AES.decrypt(arr2[1], "secretkey123")
       this.password = bytes.toString(CryptoJS.enc.Utf8)
      }
     }
      obj = {
        name: this.currentPortId,
        password: this.password

      }
    }    
    return obj
   },
   //清除cookie
   clearCookie: function() {
    this.setCookie("", "", -1); 
  },
  // 加密
  calcuMD5(val) {
    let data = val.toUpperCase()
    return md5(data)
  },
  //退货状态过滤
  returnStatus(val){
    let status = ""
    switch(val){
      case 0: status = "傻逼";break;
    }
  },
  add(m){return m<10?'0'+m:m },
  //时间戳转化成时间格式
  timeFormat(timestamp){
    var self = this;
   // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year+'年'+self.add(month)+'月'+self.add(date)+'日 '+self.add(hours)+':'+self.add(minutes)+':'+self.add(seconds);
   }
}
export default workspace