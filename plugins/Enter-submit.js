/**
 * Created by chen on 2016/7/21.
 */

/**
 * var es = require('./enter-submit');
 var es = new es();
 window.onload = function () {
    var enterSubmit = document.getElementById('enterSubmit');
    enterSubmit.onkeyup = function (e) {
        var e = e || window.event;
        if(es.enter(e)){
            alert('回车提交')
        }
    }
}

 * @constructor
 */


var Enter_submit = function () {

};
Enter_submit.prototype.enter = function (e) {
        var keycode = e.keyCode || e.which || e.keyCode;
        if (keycode === 13){
            return true;
        }else{
            return false;
        }
}
module.exports =  Enter_submit;