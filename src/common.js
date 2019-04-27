import CryptoJS from "crypto-js"
var workspace = {
    // 千位分割
    thousandBitSeparator(num) {
      return num && (num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
            return $1 + ","
          }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
            return $1 + ","
          }))
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
    }
    var obj = {
      name: this.currentPortId,
      password: this.password

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
}
export default workspace