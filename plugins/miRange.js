/**
 * Created by chen on 2016/10/18.
 */
(function (window) {
    var MiRange = function (options) {
        return new MiRange.prototype.init(options);
    }

    var _mousepos = {"top": 0,"left": 0},
        isScrollBar = false, //是否开启滚动
        scrollBarLeft = 0, //拖拽的修正值
        scrollBarTop = 0, //拖拽的修正值
        scrollBarMaxLeft = 0,//left最大拖拽值
        scrollBarMaxTop = 0,//top最大拖拽值
        scrollBarObj = null, //被拖拽的滚轴元素的对象
        scrollBarContent = null,//被拖动的内容元素
        scrollBarScale = 1,//转换比例
        direction = 'left';
    MiRange.prototype.getMousePoint = function (_e) {
        var _left = 0,
            _top = 0;
        if(typeof window.pageXOffset !== 'undefined'){
            _left = window.pageXOffset;
            _top = window.pageYOffset;
        }
        else if(typeof document.documentMode !== 'undefined' && document.documentMode !== 'BackCompat'){
            _left = document.documentElement.scrollLeft;
            _top = document.documentElement.scrollTop;
        }
        else {
            _left = document.body.scrollLeft;
            _top = document.body.scrollTop;
        }
        _mousepos.left = _left + _e.clientX;
        _mousepos.top = _top + _e.clientY;

        return _mousepos;
    };
    MiRange.prototype.getAbsoluteleft = function (_e) {
        var _left = _e.offsetLeft,
            _current = _e.offsetParent;
        while (_current !== null){
            _left += _current.offsetLeft;
            _current = _current.offsetParent;
        }
        return _left;
    };
    MiRange.prototype.getAbsolutetop = function (_e) {
        var _top = _e.offsetTop,
            _current = _e.offsetParent;
        while (_current !== null){
            _top += _current.offsetTop;
            _current = _current.offsetParent;
        }
        return _top;
    };
    MiRange.prototype.init = function (options) {
        direction = options.direction;
        var _self = this;
        var _parent = options.scrolling.parentNode,
            parentWidth = _parent.offsetWidth,
            parentHeight = _parent.offsetHeight,
            contentWidth = options.contentScroll.scrollWidth,
            contentHeight = options.contentScroll.scrollHeight,
            _scrolling = options.scrolling;
        if(options.direction === 'top'){
            _scale = scrollBarScale = parentHeight / contentHeight;
        }else{
            _scale = scrollBarScale = parentWidth / contentWidth;
        }
        _scrollingHeight = parentHeight * _scale;
        _scrollingWidth = parentWidth * _scale;

        scrollBarContent = options.contentScroll;
        scrollBarObj = _scrolling;
        //动态设置bar的宽度
        if(direction === 'top'){
            if(typeof options.barWH === 'number'){
                _scrolling.style.height = options.barHeight  + "px";
            }else{
                _scrolling.style.height = _scrollingHeight + "px";
            }
        }else{
            if(typeof options.barWH === 'number'){
                _scrolling.style.width = options.barWidth  + "px";
            }else{
                _scrolling.style.width = _scrollingWidth + "px";
            }
        }


        //设置最左的位置
        scrollBarMaxLeft = this.getAbsoluteleft(_parent) + _parent.offsetWidth - _scrolling.offsetWidth - 10;
        scrollBarMaxTop = this.getAbsolutetop(_parent) + _parent.offsetHeight - _scrolling.offsetHeight - 10;
        //鼠标摁下时
        _scrolling.onmousedown = function (event) {
            event =  event || window.event;
            var _pos = _self.getMousePoint(event);
            isScrollBar = true;
            if(direction === 'top'){
                scrollBarTop = _pos.top - _self.getAbsolutetop(this);
            }else{
                scrollBarLeft = _pos.left - _self.getAbsoluteleft(this);
            }

        };
        document.body.onmousemove = function (e) {
            _self.moveScrollBar(e);
        }

        document.onmouseup = function (e) {
            _self.closeScrollBar(e);
        }
    };
    MiRange.prototype.closeScrollBar = function () {
        isScrollBar = false;
    };
    MiRange.prototype.moveScrollBar = function (event) {
        if(isScrollBar){
            event = event || window.event;
            var _pos = this.getMousePoint(event);

            if(direction === 'top'){
                var _top = _pos.top - scrollBarTop,
                    cTop = _top;
                if(_top<0){
                    _top = 0;
                    cTop = 0;
                }
                if(_top >scrollBarMaxTop) _top = scrollBarMaxTop;
                if(cLeft > scrollBarMaxTop + 10) cTop = scrollBarMaxTop + 10;
                scrollBarObj.style.top = _top + "px";
                scrollBarContent.style.top = -1 * cTop / scrollBarScale + "px"
            }else{
                var _left = _pos.left - scrollBarLeft,
                    cLeft = _left;
                if(_left<0){
                    _left = 0;
                    cLeft = 0;
                }
                if(_left >scrollBarMaxLeft) _left = scrollBarMaxLeft;
                if(cLeft > scrollBarMaxLeft + 10) cLeft = scrollBarMaxLeft + 10;
                scrollBarObj.style.left = _left + "px";
                scrollBarContent.style.left = -1 * cLeft / scrollBarScale + "px"
            }






        }
    };
    MiRange.prototype.init.prototype = MiRange.prototype;
    window.MiRange = MiRange;
})(window, undefined)

/**
 * contentScroll内容的id
 * scrolling的id
 * direction top的上下的，left是左右
 * barWH:是滑块的高度或者宽度auto就是自动计算，填写整数
 */

MiRange({
    "contentScroll" : document.getElementById("contentScroll"),
    "scrolling" : document.getElementById("scrolling"),
    "direction" : "top",
    "barWH" : "auto"
});
// MiRange({
//     "contentScroll" : document.getElementById("contentScroll1"),
//     "scrolling" : document.getElementById("scrolling1"),
//     "direction" : "left",
//     "barWH" : "auto"
// });