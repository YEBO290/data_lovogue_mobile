var workspace = {
    // 千位分割
    thousandBitSeparator(num) {
      return num && (num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
            return $1 + ","
          }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
            return $1 + ","
          }))
      },
}
export default workspace