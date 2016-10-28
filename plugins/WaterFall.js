        (function (window) {
            var WaterFall = function (options) {
                return new WaterFall.prototype.init(options)
            };
            WaterFall.prototype = {
                constructor : WaterFall,
                init:function (options) {
                    var _self = this,
                            main = options.main;
                    this.water(main);
                    window.onscroll = function () {
                        if(_self.checkscroll(main)){
                            var dataInt={'data':[{'src':'1.jpeg'},{'src':'2.jpg'},{'src':'3.jpeg'},{'src':'4.jpg'}]};
                            for(var i=0;i<dataInt.data.length;i++){
                                var oPin=document.createElement('div');
                                oPin.className='pin';
                                main.appendChild(oPin);
                                var oBox=document.createElement('div');
                                oBox.className='box';
                                oPin.appendChild(oBox);
                                var oImg=document.createElement('img');
                                oImg.src='./images/'+dataInt.data[i].src;
                                oBox.appendChild(oImg);
                            }
                            _self.water(main);
                        }
                    }

                },
                water : function (main) {
                    var PinClass = [].slice.call(document.querySelectorAll('.pin')),
                            iPinW = PinClass[0].offsetWidth,
                            num = Math.floor(window.innerWidth/iPinW,10);
                    main.parentNode.style.cssText = 'width:' + iPinW * num + 'px;margin:0 auto';
                    var pinHArr = [];
                    for(var i = 0, len = PinClass.length; i < len ;i++){
                        var pinH = PinClass[i].offsetHeight;
                        if(i < num){
                            pinHArr[i] = pinH;
                        }else{
//                            var minH = Math.min(...pinHArr);
                            var minH = Math.min.apply(null,pinHArr),
                                    index = pinHArr.indexOf(minH);
                            this.setCss(PinClass[i],{
                                'position' : 'absolute',
                                'top' : minH + 'px',
                                'left' : PinClass[index].offsetLeft + 'px'
                            });
                            pinHArr[index] += PinClass[i].offsetHeight;
                        }
                    }
                },
                setCss : function (_this, Option){
                    if(!_this || _this.nodeType !== 3 || _this.nodeType !== 8 || !_this.style){
                        for(var cs in Option){
                            _this.style[cs] = Option[cs];
                        }
                    }
                    return _this;
                },
                checkscroll : function (main) {
                    var PinClass = [].slice.call(document.querySelectorAll('.pin')),
                            lastPinH = this.getAbsoluteTop(PinClass[PinClass.length - 1]) + Math.floor(PinClass[PinClass.length-1].offsetHeight/2 , 10),
                            scrollTop = window.pageYOffset || document.documentElement.scrollTop||document.body.scrollTop;
                    return (lastPinH > scrollTop) ? true : false;
                },
                getAbsoluteTop : function (_e) {
                    var _top = _e.offsetTop,
                            _current = _e.offsetParent;
                    while(_current !== null){
                        _top += _current.offsetTop;
                        _current = _current.offsetParent;
                    }
                    return _top;
                },
            }

            WaterFall.prototype.init.prototype = WaterFall.prototype;
            window.WaterFall = WaterFall;

        })(window, undefined)