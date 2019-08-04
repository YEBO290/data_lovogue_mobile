const loading = function(val, content) {
    let html = `<div class="loading" style=" width: 100%;
    background: #fff;
    height: 620px;
    position: fixed;z-index: 1000;"><img src="~@/assets/image/loading2.gif" style="width:100%;"/><p>加载中</p></div>`
    // document.body.appendChild(html);
return html
}
export default new loading()

