    (function (window) {
        var _options = {},
                starPoint = {},
                endPoint = {},
                imgSmall,
                verTop,
                verLeft,
                curvature,
                steps,
                count = -1;

        var Parabola = function (options) {
            return new Parabola.prototype.init(options)
        };
        Parabola.prototype = {
            init:function (options) {
                _options = {
                    'verTop' : '',
                    'speed'  : 1,
                    'starID' : '',
                    'endID'  : '',
                    'srcImg' : '',
                    'end'    : {'width' : 0, 'height' : 0},
                    'start'  : {'width' : 40, 'height' : 40},
                    'onComplete' : '',
                };
                //合并参数
//                _options = Object.assign(_default,options);

                for(var key in options){
                    _options[key] = options[key];
                }

                //验证参数
                if(!_options.starID || !_options.endID || !_options.srcImg ){
                    return ;
                };
                //得到开始和结束的位置
                starPoint = this.getPoint(_options.starID);
                endPoint = this.getPoint(_options.endID);
                // 把小图片插入到页面中
                imgSmall = document.createElement('img');
                imgSmall.setAttribute('src',_options.srcImg.src);
                imgSmall.id = 'imgSmall';
                document.body.appendChild(imgSmall);
                this.setCss(imgSmall, {
                    'width': _options.start.width  + 'px',
                    'height' : _options.start.height + 'px',
                    'borderRadius' :  _options.start.height / 2 + 'px',
                    'position' : 'fixed',
                    'top' : starPoint.top + 'px',
                    'left' : starPoint.left + 'px',
                });
                //获取页面最高点的top值，也是y=ax2 + b 中的b
                verTop = Math.min(starPoint.top, endPoint.top) * 0.75;
                if(_options.verTop && verTop < _options.verTop){
                    verTop = Math.min(_options.verTop, Math.min(starPoint.top, endPoint.top));
                }
                var distance = Math.sqrt(Math.pow(starPoint.top - endPoint.top, 2) + Math.pow(starPoint.left - endPoint.left, 2));
                        steps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / _options.speed);
                var ratio = starPoint.top == verTop ? 0 : -Math.sqrt((endPoint.top - verTop) / (starPoint.top - verTop));
                        verLeft = (ratio * starPoint.left - endPoint.left) / (ratio - 1);
                        curvature = endPoint.left == verLeft ? 0 : (endPoint.top - verTop) / Math.pow(endPoint.left - verLeft, 2);
                this.move();
            },
            constructor:Parabola,
            getPoint : function (_e) {
                var _point = {};
                var _left = _e.offsetLeft,
                        _current = _e.offsetParent;
                while(_current !== null){
                    _left += _current.offsetLeft;
                    _current = _current.offsetParent;
                }
                var _top = _e.offsetTop,
                        _current = _e.offsetParent;
                while(_current !== null){
                    _top += _current.offsetTop;
                    _current = _current.offsetParent;
                }
                var body = document.body,
                        __left = 0,
                        __top = 0;
                if(typeof window.pageXOffset != 'undefined'){
                    __left = window.pageXOffset;
                    __top = window.pageYOffset;
                }
                else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat'){
                    __left = document.documentElement.scrollLeft;
                    __top = document.documentElement.scrollTop;
                }
                else {
                    __left = body.offsetLeft;
                    __top = body.offsetTop;
                }
                var _height = _options.starID.offsetHeight,
                        _width = _options.starID.offsetWidth;
                return _point = {
                    'top' : _top - __top +_height / 2.5 ,
                    'left' :　_left - __left + _width / 2.5,
                };

            },
            setCss : function (_this, Option){
                if(!_this || _this.nodeType !== 3 || _this.nodeType !== 8 || !_this.style){
                    for(var cs in Option){
                        _this.style[cs] = Option[cs];
                    }
                }
                return _this;
            },
            move : function () {
                var _self = this;
                function _move(){
                    var left = starPoint.left + (endPoint.left - starPoint.left) * count / steps,
                            top = curvature == 0 ? starPoint.top + (endPoint.top - starPoint.top) * count / steps : curvature * Math.pow(left - verLeft, 2) + verTop;
                if (_options.end.width != null && _options.end.height != null) {
                    var i = steps / 2,
                            width = _options.end.width - (_options.end.width - _options.start.width) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2),
                            height = _options.end.height - (_options.end.height - _options.start.height) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2);
                    width = Math.max(width, 0);
                    height = Math.max(height,0)
                    _self.setCss(imgSmall,{
                        'height' : height + 'px',
                        'width'  : width + 'px'
                    })
                }
                    _self.setCss(imgSmall,{
                        'left'   : left + 'px',
                        'top'    : top + 'px'
                    })
                    count++;
                    // 定时任务
                    var time = window.requestAnimationFrame(_move);
                    if (count == steps) {
                        window.cancelAnimationFrame(time);
                        // fire callback
                        _options.onComplete();
                    }
                }
                _move();

            }


        }

        Parabola.prototype.init.prototype = Parabola.prototype;
        window.Parabola =   Parabola;
    })(window, undefined)