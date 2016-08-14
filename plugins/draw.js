/**
 * Created by chen on 2016/8/12.
 */
/**
 * var draw = require("./draw");
 new draw(document.getElementById("draw"));
 * @type {null}
 */
var DRAWELEMENT = null,
    ISDRAWELEMENT = false,
    STARTMOUSEPOS = {
        "left":0,
        "top":0
    };

var Draw = function (e) {
    this._mousepos = {
        "top":0,
        "left":0
    };
    this._init(e)
};
/**
 * 初始化函数
 * @param _e 传入的需要拖到的对象
 * @private
 */
Draw.prototype._init = function (_e) {
    var self = this;
    this.bindDrawElement(_e);
    document.body.onmousemove = function (e) {
        self.moveDraw(e);
    }
}
/**
 * 获取元素的绝对左坐标
 * @param _e  需要获取的元素dom对象
 * @returns {number|Number}
 */
Draw.prototype.getAbsoluteLeft = function (_e) {
    var _left = _e.offsetLeft,
        _current = _e.offsetParent;
    while(_current !== null){
        _left += _current.offsetLeft;
        _current = _current.offsetParent;
    }
    return _left;
};
/**
 * 获取元素的绝对顶部坐标
 * @param _e  需要获取的元素dom对象
 * @returns {number|Number}
 */
Draw.prototype.getAbsoluteTop = function (_e) {
    var _top = _e.offsetTop,
        _current = _e.offsetParent;
    while(_current !== null){
        _top += _current.offsetTop;
        _current = _current.offsetParent;
    }
    return _top;
};
/**
 * 获取元素的鼠标的位置
 * @param _e
 * @returns {{}}
 */
Draw.prototype.getMousePoint = function(_e){
    var body = document.body,
        _left = 0,
        _top = 0;
    if(typeof window.pageXOffset != 'undefined'){
        _left = window.pageXOffset;
        _top = window.pageYOffset;
    }
    else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat'){
        _left = document.documentElement.scrollLeft;
        _top = document.documentElement.scrollTop;
    }
    else {
        _left = body.offsetLeft;
        _top = body.offsetTop;
    }
    _left += _e.clientX;
    _top += _e.clientY;
    this._mousepos.left = _left;
    this._mousepos.top = _top;
    return this._mousepos;
};
/**
 * 设置css的属性
 * @param _this 需要设备css的元素
 * @param Option  css属性
 * @returns {*}
 */
Draw.prototype.setCss = function (_this, Option){
    if(!_this || _this.nodeType !== 3 || _this.nodeType !== 8 || !_this.style){
        for(var cs in Option){
            _this.style[cs] = Option[cs];
        }
    }
    return _this;
};
/**
 * 碰撞检测
 * @param _event 需要检测的鼠标位置元素
 * @param _e 检测的边界元素
 * @param options 检测的边界元素的设置选项，默认可以为空
 * @returns {boolean}
 */
Draw.prototype.pointCheck = function (_event, _e, options) {
    var _pos = this.getMousePoint(_event),
        _w = options &&　options.width || options.offsetWidth,//获取元素的宽度
        _h = options && options.height || options.offsetHeight,//获取元素的高度
        _left = this.getAbsoluteLeft(_e),
        _top = this.getAbsoluteTop(_e);
    _pos.left += options && options.left || 0;
    if(_pos.left <(_left + _w) && _left < _pos.left && _pos.top > _top && _pos.top < (_top + _h)){
        return true;
    }
    return false;
};
/**
 * 绑定函数
 * @param e
 */
Draw.prototype.bindDrawElement = function (e) {
    var self = this;
    DRAWELEMENT = e;
    var absoluteLeft = this.getAbsoluteLeft(e),
        absoluteTop = this.getAbsoluteTop(e);
    this.setCss(e,{
        "position": "absolute",
        "left": absoluteLeft + "px",
        "top": absoluteTop + "px",
        "cursor": "move",
        "zIndex:": 101
    });
    e.onmousedown = function (event) {
        event = event || window.event;
        var _pos = self.getMousePoint(event);
        ISDRAWELEMENT = true;

        STARTMOUSEPOS = {
            "left": _pos.left - self.getAbsoluteLeft(this),
            "top": _pos.top  - self.getAbsoluteTop(this)
        }
    };

    e.onmouseup = function () {
        ISDRAWELEMENT = false;
    };


}
/**
 * 拖动函数
 * @param event
 */
Draw.prototype.moveDraw = function (event) {
    if(ISDRAWELEMENT){
        event = event ||window.event;
        var _pos = this.getMousePoint(event);
        // console.log(_pos.left);
        this.setCss(DRAWELEMENT,{
            "left": (_pos.left - STARTMOUSEPOS.left) + "px",
            "top" : (_pos.top - STARTMOUSEPOS.top) + "px"
        })
    }
}

module.exports = Draw;