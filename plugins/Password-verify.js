/**
 * Created by chen on 2016/7/21.
 */
/**
 *var PasswordV = require('./Password-verify');
  var pv = new PasswordV();

  var passid = document.getElementById('passwordStrength'),
      showid = document.getElementById('showStrength');
  window.onload = function () {
    passid.onkeyup = function () {
         pv.count(passid,showid);
     }
 }
 * 验证密码强度
 * @constructor
 */
var Password_verify = function () {

};

/**
 * 设置css的属性
 * @param id 需要设置属性的id
 * @param cssOption  css属性{"width":"100px"}
 * @returns {Password_verify}
 */

Password_verify.prototype._getCss =function (id,cssOption) {
    if (!id || id.nodeType === 3 || id.nodeType === 8 || ! id.style) {
        return;
    }
    for (cs in cssOption) {
        id.style[cs] = cssOption[cs];
    }
    return this;
};
/**
 * 去除两边的空格
 * @param str  需要处理的字符串
 * @returns {string}
 * @private
 */
Password_verify.prototype._trim = function (str) {
    return (str || "").replace(/^(s*)|(s*)$/g,"");
};

/**
 * 计算每个字符对应的值
 * @param char
 * @returns {number}
 * @private
 */

Password_verify.prototype._score = function (char) {
    if (char >= 48 && char <= 57) { //数字返回1
        return 1;
    }
    if (char >= 97 && char <= 122) { //小写返回2
        return 2;
    }else{
        return 3;
    }
}
/**
 *
 * @param pass 需要验证的id
 * @param show 需要显示返回结果的id
 */
Password_verify.prototype.count = function (pass,show) {
    var _color = ['red','yellow','orange','green'];
    var _msgs = ['密码太短','弱','中','强'];
    var self = this;
    var _v = self._trim(pass.value),
        _vL = _v.length,
        i = 0,
        _strLen =0;
    function _innerCss(i) {
        show.innerHTML = _msgs[i];
        self._getCss(show,{
            "color":_color[i]
        })
    }
    if ( _vL < 6) {
        _innerCss('0')
    }else {
        for ( ; i< _vL;i+=1) {
            _strLen += self._score(_v.toLowerCase().charCodeAt(i));
        };
        console.log(_strLen)
        if (_strLen < 10 ) {
            _innerCss('1')
        };
        if (_strLen > 10 && _strLen < 15) {
            _innerCss('2')
        };
        if (_strLen > 15) {
            _innerCss('3')
        }
    }
}

module.exports = Password_verify;