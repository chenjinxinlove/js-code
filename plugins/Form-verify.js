/**
 * Created by chen on 2016/7/25.
 */
/**
 * var Form_v = require("./Form-verify");
 var rule = {
    "username":{
        email:true,
        cannot:true
    },
    "password":{
        phone:true,
        cannot:true
    }
}

 var msgs = {

}

 var show = {
    "username":"msgUq",
    "password":"msgE"
}
 new Form_v(rule,msgs,show)
 * 简单表单验证
 * @param rule 验证规则
 * @param msgs 提示嘻嘻
 * @param show 展示的id
 * @constructor
 */

var Form_Verify =function (rule,msgs,show) {
    this._regular ={
        "rtrim" : /^(\s*)|(\s*)$/g ,//去除空格的正册
        "chinese" : /[\u4e00-\u9fa5]/g ,//中文
        "nonumber": /\D/g , //数字
        "nochinese" : /[^\u4e00-\u9fa5]/g , //非中文
        "email" :  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g,//邮箱
        "phone" : /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,//电话
        "decimalNumber" : /^\d+(\.\d+)+$/,   //带小数位的数字
        "html" : /<[\/\！]*[^<>]*>/ig,//html
        "password":/^\\w+$/,//由数字、26个英文字母或下划线组成的字符串
        "card":/^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$///校验身份证号码
    };
    this._msgses = {
        "chinese" :"请输入合法的中文",
        "nonumber":"请不要输入数字",
        "nochinese" : "请输入合法的非中文",
        "email" :"请输入合法的邮箱",
        "phone" :"请输入合法的电话",
        "decimalNumber" : "请输入合法的带小数位的数字",
        "html" : "请输入合法的html",
        "password":"请输入合法的由数字、26个英文字母或下划线组成的字符串",
        "card":"请输入合法的校验身份证号码",
        "cannot":"不能为空",
        "lenght":"长度不足"
    }
    this._init(rule,msgs,show)
}

/**
 * 初始化把输入的规则和展示的数据转换为程序需要的格式
 * @param rule
 * @param msgs
 * @param show
 * @private
 */

Form_Verify.prototype._init = function (rule,msgs,show) {

    var _rule = rule || {},
        _msgs = msgs || {},
        _show = show || {},
        _combination = {};

    for (var key in _rule) {
        if (!_rule.hasOwnProperty(key)){
            return;
        }
        __msgs = {};
        if (JSON.stringify(_msgs[key]) !== "" && JSON.stringify(_msgs[key]) !== undefined ){
            __msgs = _msgs[key];
        }else{

            for (var ms in _rule[key]) {
                __msgs[ms] = this._msgses[ms] || ""
            }
        }

        _combination[key] = {
            "rule":_rule[key],
            "msgs":__msgs,
            "show":_show[key]
        }

    }
    this._main(_combination);
}

/**
 * 设置css
 * @param _this
 * @param cssOption
 * @returns {*}
 * @private
 */
Form_Verify.prototype._cssSet = function (_this, cssOption) {
        if (!_this || _this.nodeType === 3 || _this.nodeType ===8 || !_this.style) {
            return;
        }
        for (var cs in cssOption) {
            _this.style[cs] = cssOption[cs];
        }
        return _this;
}

/**
 * 验证的方法
 * @param key
 * @param com
 * @private
 */

Form_Verify.prototype._verification = function (key,com) {
    var self = this;

    console.log(JSON.stringify(com))
    var rules = com['rule'];
    var _total = []
    for (var k in rules) {

        if (rules[k]){
            var _vf = _v(k);
            if(_vf !== 1){
                _total.push("0")
                document.getElementById(com['show']).innerHTML =_vf["msgs"]
                break;
            }else{
                _total.push("1")
            }
        }
    }
    if(_total.join("").indexOf("0") < 0){
        document.getElementById(com['show']).innerHTML ="";
    }

    function _v(k) {
        switch (k){
            case "lenght":
                if(!(self._trim(document.getElementById(key).value).toString().lenght  > rules[k] || 6) ){
                    return {"msgs":com['msgs']['lenght']};
                }else{
                    return 1;
                }
                break;
            case "cannot":
                if(self._trim(document.getElementById(key).value).lenght  > 0 ){
                    return {"msgs":com['msgs']['cannot']};
                }else{
                    return 1;
                }
                break;
            default:
                if(!self._regular[k].test(self._trim(document.getElementById(key).value))) {
                    return {"msgs":com['msgs'][k]};
                }else{
                    return 1;
                }
        }
    }





}

Form_Verify.prototype._main = function (_combination) {
    var self = this;
    for(var key in _combination){
      var _id = document.getElementById(key) || "";
        _id.onkeyup = function () {
            self._verification(this.id,_combination[this.id])
        }
    }
}

Form_Verify.prototype._trim = function (str) {
    return str.replace(/^(\s*)|(\s*)$/g,"");
}
module.exports = Form_Verify;