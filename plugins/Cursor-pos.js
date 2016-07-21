/**
 * Created by chen on 2016/7/21.
 */
/**
 * 光标在结尾
 * var  Rangeselect = require('./Cursor-pos');
 var CursorPos = new Rangeselect();

 window.onload = function () {
    var cursorid = document.getElementById('cursorPos');
    cursorPos.onclick = cursorPos.onkeyup = function () {
        CursorPos.cursorPos(cursorid);
    }

 * @constructor
 */

var Eursor_pos = function () {

};
Eursor_pos.prototype.cursorPos =function (cursorid) {
    var _vLen = cursorid.value.length;
    if (cursorid.setSelectionRange){ //现在浏览器支持
        cursorid.setSelectionRange(_vLen,_vLen);
    }else{
        var a = cursorid.createTextRange(); //兼容ie
        a.moveStart('character',_vLen);
        a.collapse(true);
        a.select();
    }
}

module.exports = Eursor_pos;

