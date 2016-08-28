    (function() {
        'use strict'
        var range = function() {
            this._mousePoint = {
                "left":0,
                "top":0
            };
            this._rangeW = 0;
            this._isrange = false;
            this._dValue = 0;
            this._bar = "";
            this._slide = "";
            this._contrast = 0;
            this._direction = "";
        };
        range.prototype.init= function (options,callback) {
            var _options = {};
            _options.max = options.max || 10;
            _options.min = options.min || 1;
            _options.step = options.step || 1;
            _options.slide = options.slide;
            _options.bar = options.bar;
            _options.value = options.value || 0;
            this._direction = options.direction || "left";
            this._bar = document.getElementById(_options.bar);
            this._slide = document.getElementById(_options.slide);
            var _range = document.getElementById(_options.slide).parentNode;
            if(this._direction === "left"){
                this._rangeW = _range.offsetWidth;
                this._contrast = this._rangeW / (_options.max - _options.min);
                if(_options.value === 0){
                    var _l =  - (this._bar.offsetWidth/2);
                    this._bar.style.left = _l + "px";
                    this._slide.style.width = 0 + "px";
                }
            }else{
                this._rangeW = _range.offsetHeight;
                this._contrast = this._rangeW / (_options.max - _options.min);
                if(_options.value === 0){
                    var _l =  - (this._bar.offsetHeight/2);
                    this._bar.style.top = _l + "px";
                    this._slide.style.height = 0 + "px";
                }
            }

            this._start(_options,callback);

        };
        range.prototype._setCss = function (_this, _optionCss) {
            if( !_this && _this.nodeType !==3 && _this.nodeType !== 8 && _this.style){
                return;
            }
            for(var cs in _optionCss){
                _this.style[cs] = _optionCss.cs;
            }
            return _this;
        };
        range.prototype._getMousePoint = function (_e) {
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
        range.prototype._getAbleft = function (_e) {
            var _left = _e.offsetLeft,
                    _current = _e.offsetParent;
            while(_current !== null){
                _left += _current.offsetLeft;
                _current = _current.offsetParent;
            }
            return _left;
        };
        range.prototype._getAbtop = function (_e) {
            var _top = _e.offsetTop,
                    _current = _e.offsetParent;
            while(_current !== null){
                _top += _current.offsetTop;
                _current = _current.offsetParent;
            }
            return _top;
        };
        range.prototype._preventDefault = function (_e) {
            if(!_e.preventDefault()){
                _e.preventDefault();
            }else{
                _e.returnValue = false;
            }
        };
        range.prototype._stopP = function (_e) {
            if(!_e.stopPropagation()){
                _e.stopPropagation();
            }else{
                _e.cancelBubble = false;
            }
        }
        range.prototype._start = function (_options,callback) {
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
                self._isrange = true;
                console.log("doen");
                document.body.onmousemove = function (_e) {
                    self._preventDefault(_e);
                    if(self._isrange){
                        self._getMousePoint(_e);
                        if(self._direction === "left"){
                            _width = self._mousePoint.left - self._dValue - self._getAbleft(self._slide);
                            _width = Math.max(- (self._bar.offsetWidth/2),_width);
                            _width = Math.min(_width,self._rangeW - self._bar.offsetWidth/2);
                            self._bar.style.left =  _width + "px";
                            self._slide.style.width = _width + "px";
                        }else{
                            _height = self._mousePoint.top - self._dValue - self._getAbtop(self._slide);
                            _height = Math.max(-self._bar.offsetHeight/2,_height);
                            _height = Math.min(_height,self._rangeW - (self._bar.offsetHeight/2));
                            self._bar.style.top =  _height + "px";
                            self._slide.style.height =_height + "px";
//
                        }


                    }
                }
                document.onmouseup = function () {
                    self._isrange = false;
                    if(self._direction ==="left"){
                        var num = Math.ceil(_width / self._contrast);
                    }else{
                        var num = Math.ceil(_height / self._contrast);
                    }

                    callback(num)
                }
            };


        }
    window.range = range;
    })()