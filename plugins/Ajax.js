/**
 * Created by Admin on 2016/7/24.
 */
//
// var ajax = new Ajax({"type":"post","url":"http://localhost/11.php","data":formData},function () {
//     alert('sdf')
// });

/**
 * ajax提交
 * @param options
 * @param callback
 * @constructor
 */
var Ajax = function (options,callback) {
    options || {};
    _options = {
        "type":options.type || "post",
        "url" :options.url || "",
        "data" :options.data || ""
    }
    this._init(_options,callback);
}
Ajax.prototype._init = function (_options,callback) {
    function createXMLHttpRequest() {
        try {
            XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP
        }
        catch(E) {
            try {
                XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP
            }
            catch(E) {
                XMLHttpReq = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象
            }
        }

    }
    (function sendAjaxRequest() {
        createXMLHttpRequest();                                //创建XMLHttpRequest对象
        XMLHttpReq.open(_options.type, _options.url, true);
        XMLHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        XMLHttpReq.onreadystatechange = processResponse; //指定响应函数
        XMLHttpReq.send(_options.data);
    })();
    //回调函数
    function processResponse(callback) {
        if (XMLHttpReq.readyState == 4) {
            if (XMLHttpReq.status == 200) {

                callback();

            }
        }

    }
}

module.exports =  Ajax;
