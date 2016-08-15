/**
 * Created by Admin on 2016/8/13.
 */
/**
 * 遮罩层与模拟弹出框
 * var Pop = require("./Pop");
 var Pop = new Pop();

 document.getElementById("button").onclick = function () {
    Pop.maskLayer(document.getElementById("maskLayer")).msgBox({
        "content":"asnkasnk",
        "agreeCallback":function () {
            console.log("sss")
        }
    });
}
 * @constructor
 */
Pop = function () {

};
/**
 * 设置css
 * @param _this 传入对象
 * @param cssOptions  设置css
 * @returns {*}
 */
Pop.prototype.setCss = function (_this, cssOptions) {
    if(!_this && _this.nodeType === 3 && _this.nodeType === 8 && !_this.style){
        return;
    }
    for(var cs in cssOptions){
        _this.style[cs] = cssOptions[cs];
    }
    return _this;
};

Pop.prototype.maskLayer = function (_e,color) {
    var b = document.body;
    this.setCss(b,{
        "margin":0,
        "padding":0
    })
    this.setCss(_e, {
        "position":"absolute",
        "left":"0",
        "dispaly":"block",
        "zIndex":1000,
        "backgroundColor":color || "#000",
        "height":b.scrollHeight + "px",
        "width":b.offsetWidth + "px",
        "filter":"alpha(Opacity=60)",
        "opacity":"0.6",
        "-moz-opacity":"0.6"
    });
    _e.style.display = "block"
    return this;
};

Pop.prototype.msgBox = function (_options) {
    var str = '<div id="promptMsgBox" style="border:1px  solid #ccc;dispaly:none;height:100px;width:300px;text-alignLcenter">'+
            '<p>'+_options.content+'</p>'+
            '<p>'+
                 '<input type="button" id="promptMsgBoxAgree" value="确认"/>'+
                 '<input type="button" id="promptMsgBoxCancel" value="取消"/>'+
            '</p>';
    var maskLayer = document.getElementById("maskLayer");
    maskLayer.innerHTML = str;
    var _e = document.getElementById("promptMsgBox");
    _e.style.display = "block";
    this.setCss(_e,{
        "position":"absolute",
        "zIndex":100,
        "left":"50%",
        "marginLeft":-_e.offsetWidth/2 + "px",
        "top":((document.body.scrollTop || document.documentElement.scrollTop)+window.screen.availHeight/2-_e.offsetHight ) +"px"
    });
    document.getElementById("promptMsgBoxAgree").onclick = function () {

        if(_options.agreeCallback){
            _options.agreeCallback();
        }else{
            alert("请传入成功的回调函数")
        }
        _e.style.display = "none";
    };

    document.getElementById("promptMsgBoxCancel").onclick = function () {
        _e.style.display = "none";
        if(_options.cancelCallback){
            _options.canceCallback();
        }
    };
}

Pop.prototype.hide = function (_e) {
    _e.style.display = "none"
}

module.exports = Pop;