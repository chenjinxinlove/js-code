/**
 * Created by Admin on 2016/8/7.
 */
/**
 * 例如：<div id="right_button_menu">
 <ul>
 <li><a href="">更换桌面背景</a></li>
 <li>
 <ul>
 <li><a href="">文本文档</a></li>
 <li><a href="">word文档</a></li>
 <li><a href="">exexl文档</a></li>
 <li><a href="">幻灯片</a></li>
 </ul>
 </li>
 <li><a href="javascript:show('player');">听音乐</a></li>
 </ul>
 </div>
 * 那个网页版的右键菜单
 * @param right_button_menu  菜单的id
 * @constructor
 */
var Hide_menu = function (right_button_menu) {
    this.menu = document.getElementById(right_button_menu);
    var self = this;
    document.oncontextmenu = function (e) {
        return false;
    }
    document.onmousedown = function (e) {
        self.click(e);
    };
};
Hide_menu.prototype = {

    click:function click(e) {
        var self = this;
        var e=e||event;
        if (e.which == 2||e.button==4){
            self.hide_menu(self.menu);
            return false;
        }
        else if(e.which==3||e.button==2) {
            x = e.clientX;y=e.clientY;
            var l = document.body.scrollLeft>0?document.body.scrollLeft:document.documentElement.scrollLeft;
            var t = document.body.scrollTop>0?document.body.scrollTop:document.documentElement.scrollTop;
            document.title = "x"+(x+l) + "y" + (y+t);
            this.show_menu(this.menu,x+l,y+t);
        }
        else if(e.which==1||e.button==1){
            setTimeout(function () {
                self.hide_menu(self.menu)
            },100)
        }
    },
    show_menu :function(obj,left,top) {
        obj.style.left = left + "px";
        obj.style.top = top + "px";
        obj.style.display = 'block';

    },
    hide_menu:function (obj) {
        obj.style.display='none';
    }
}


module.exports = Hide_menu;