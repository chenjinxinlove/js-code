(function() {
    'use strict'
    var PushAndPull = function() {
        this._mousePoint = {
            "left":0,
            "top":0
        };
        this._PushAndPullW = 0;
        this._isPushAndPull = false;
        this._dValue = 0;
        this._bar = "";
        this._slide = "";
        this._contrast = 0;
        this._direction = "";
    };
    PushAndPull.prototype.init= function (options,callback) {
        var _options = {};
        _options.max = options.max || 10;
        _options.min = options.min || 1;
        _options.step = options.step || 1;
        _options.slide = options.slide;
        _options.bar = options.bar;
        _options.push = options.push;
        _options.value = options.value || 0;
        this._direction = options.direction || "left";
        this._bar = document.getElementById(_options.bar);
        this._slide = document.getElementById(_options.slide);
        this._push = document.getElementById(_options.push);
        this._PushAndPullW = + (window.getComputedStyle(this._push).width).replace('px', '');
        this._PushAndPullH = + (window.getComputedStyle(this._push).height).replace('px', '');
        this._contrast = this._PushAndPullW / (_options.max - _options.min);
        this._start(_options,callback);

    };
    PushAndPull.prototype._setCss = function (_this, _optionCss) {
        if( !_this && _this.nodeType !==3 && _this.nodeType !== 8 && _this.style){
            return;
        }
        for(var cs in _optionCss){
            _this.style[cs] = _optionCss.cs;
        }
        return _this;
    };
    PushAndPull.prototype._getMousePoint = function (_e) {
        var _left = 0,
            _top = 0;
        if(typeof  window.pageXOffset !== 'undefined'){
            _left = window.pageXOffset;
            _top = window.pageYOffset;
        }
        else if (typeof document.documentMode !== 'undefined' && document.documentMode !== "BackCompot"){
            _left = document.documentElement.scrollLeft;
            _top = document.documentElement.scrollTop;
        }
        else{
            _left = document.body.scrollLeft;
            _top = document.body.scrollTop;
        }
        this._mousePoint.left = _left + _e.clientX;
        this._mousePoint.top = _top + _e.clientY;
        return this._mousePoint;
    };
    PushAndPull.prototype._getAbleft = function (_e) {
        var _left = _e.offsetLeft,
            _current = _e.offsetParent;
        while(_current !== null){
            _left += _current.offsetLeft;
            _current = _current.offsetParent;
        }
        return _left;
    };
    PushAndPull.prototype._getAbtop = function (_e) {
        var _top = _e.offsetTop,
            _current = _e.offsetParent;
        while(_current !== null){
            _top += _current.offsetTop;
            _current = _current.offsetParent;
        }
        return _top;
    };
    PushAndPull.prototype._preventDefault = function (_e) {
        if(!_e.preventDefault()){
            _e.preventDefault();
        }else{
            _e.returnValue = false;
        }
    };
    PushAndPull.prototype._stopP = function (_e) {
        if(!_e.stopPropagation()){
            _e.stopPropagation();
        }else{
            _e.cancelBubble = false;
        }
    }
    PushAndPull.prototype._start = function (_options,callback) {
        var self = this;
        var _width = 0;
        var _height = 0;
        document.getElementById(_options.bar).onmousedown = function (_e) {
            self._preventDefault(_e);
            self._getMousePoint(_e);
            if(self._direction === "left"){
                self._dValue = self._mousePoint.left - self._getAbleft(self._bar);
            }else{
                self._dValue = self._mousePoint.top - self._getAbtop(self._bar);
            }
            self._isPushAndPull = true;
            document.body.onmousemove = function (_e) {
                self._preventDefault(_e);
                if(self._isPushAndPull){
                    self._getMousePoint(_e);
                        _width = self._mousePoint.left - self._dValue - self._getAbleft(self._slide);
                        _width = Math.max(0,_width);
                        _width = Math.min(_width,self._PushAndPullW);
                        self._bar.style.left =  _width - self._bar.offsetWidth/2  + "px";
                        self._push.style.clip = "rect(0px," + _width +"px,"+ self._PushAndPullH +"px,0px)" ;
                }
            }
            document.onmouseup = function () {
                self._isPushAndPull = false;

                    var num = Math.ceil(_width / self._contrast);


                callback(num)
            }
        };


    }
    window.PushAndPull = PushAndPull;
})();