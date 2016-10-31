//参考了诸葛流云的思路，感谢
(function () {
        var decimal,
                duration,
                lastValue = 0,
                onComplete,
                loadings = [],
                barID,valueID;
        var Loader = function (options) {
            this.playing = false;
          return new Loader.prototype.init(options)
        };
        Loader.prototype = {
            constructor : Loader,
            init : function (options) {
                var _options = {
                    'decimal' : 2,
                    'duration' : 1500
                };
                for(var key in options){
                    _options[key] = options[key];
                }
                //验证参数
                if(!_options.bar || !_options.value ){
                    return ;
                }
                //小数点后面的保留几位小数
                decimal = _options.decimal;
                //完成整个动画的数据
                duration = _options.duration;
                onComplete = _options.onComplete;
                barID = _options.bar;
                valueID = _options.value;
            },
            setValue : function (val) {
                val = parseFloat(val,10);
                if(isNaN(val)){
                    return;
                }
                val = val * 100;
                function _setState(val) {
                    var percent = val.toFixed(decimal) + '%';
                    barID.style.width = percent;
                    valueID.innerHTML = percent;
                }
                this.queuePush(
                        this.Loading((val - lastValue) * duration / 100 , _setState, [lastValue, val])
                );
                lastValue = val;
                if(!this.playing){
                    this.queueFlush();
                }
                if(val >= 100){
                    onComplete();
                }

            },
            queuePush : function (loading) {
                loadings.push(loading);
            },
            Loading : function (duration, progress, interval) {
                return {
                    start: function (finished) {
                        //finished是当前任务执行完毕时的回调
                        var startTime = Date.now();
                        function step() {
                            var endTime = Date.now();
                            var p = (endTime - startTime) / duration;

                            if (p > 1) {
                                p = 1;
                            }
                            //计算当前的加载进度，并通知外部进行进度条百分比的更新
                            progress(interval[0] + (interval[1] - interval[0]) * p);
                            p < 1 ? requestAnimationFrame(step) : finished();
                        }
                        requestAnimationFrame(step);
                    }
                }
            },
            queueFlush : function () {
                if (this.isEmpty()) return;
                var self = this;
                function play() {
                    //队列是否处于执行状态
                    self.playing = true;
                    //从队列取第一个任务开始执行
                    loadings.shift().start(function () {
                        if (self.isEmpty()) {
                            //队列执行完毕
                            self.playing = false;
                            //调用外部可能设置有的回调
                            self.onComplete && self.onComplete();
                            return;
                        }
                        //执行队列中的下一个任务
                        play();
                    });
                }
                //执行队列当前的第一个任务
                play();
            },
            isEmpty: function () {
                return !loadings.length;
            }
            
        
        };
        Loader.prototype.init.prototype = Loader.prototype;
        window.Loader = Loader;
    })(window, undefined)
