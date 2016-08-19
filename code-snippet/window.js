/**
 * Created by chen on 2016/8/19.
 */

/**
 * 禁止右键菜单
 */
window.onload = function () {
    document.oncontextmenu = function () {
        return false;
    }
}
/**
 * 防止被人frame
 */
window.onload = function () {
    if(top.location != self.location){
        top.location = self.location;
    }
}

/**
 * 永远都带着框架
 */
window.onload = function () {
    if(window.location.href == top.location.href){
        top.location.href = '../frames.html'
    }
}

window.onload = function () {
    var dd = document.getElementById("dd");
    dd.oncopy = function () {
        return fasle;  //禁止复制
    }
    dd.oncut = function () {
        return fasle; //禁止剪切
    }
    dd.onselectstart  = function () {
        return falee;  //禁止选取
    }
}

/**
 * 得到上一页的来源
 * @returns {string}
 */
function getPreviousPage() {
    return document.referrer;
}


/**
 * 前端获取get
 * @returns {{}}
 */
function getArgs(){
    var args = {};
    var match = null;
    var search = decodeURIComponent(location.search.substring(1));
    var reg = /(?:([^&]+)=([^&]+))/g;
    while((match = reg.exec(search))!==null){
        args[match[1]] = match[2];
    }
    return args;
}
/**
 * 禁用shift alt ctrl
 */
window.onload = function () {
    (function () {
        document.onkeydown = function (event) {
            event = event || widows.event;
            if(event.shiftKey || event.altKey || event.ctrlKey){
                return;
            }
        }
    })()
}