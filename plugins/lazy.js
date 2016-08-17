/**
 * 兼容ie678不支持bind(）办法
 * */
    if (!function() {}.bind) {
        Function.prototype.bind = function(context) {
            var self = this
                , args = Array.prototype.slice.call(arguments);

            return function() {
                return self.apply(context, args.slice(1));
            }
        };
    }
    var lazy = function () {

    };
    var _imgs = [],
        _num = 0;
    /**
     * 得到元素相当于窗口的高度
     * @param _e 出入元素
     * @returns {_number} 返回高度
     */

    lazy.prototype._getEleViewHeight = function (_e) {
        if(_e){
            var _top = _e.offsetTop,
                _c = _e.offsetParent;
            while (_c !== null){
                _top += _c.offsetTop;
                _c = _c.offsetParent;
            }
            if( typeof window.pageYOffset !== 'undefined'){
                return _top - window.pageYOffset;
            }
            else if(typeof  document.compatMode !== 'undefined' && document.compatMode !== "BackCopt"){
                return _top - document.documentElement.scrollTop;
            }
            else{
                return _top - document.body.scrollTop;
            }
        }

    };
    /**
     * 得到浏览内窗口高度
     * @returns {number}
     * @private
     */
    lazy.prototype._getViewHeight = function () {
        var _viewHeight = 0;
        if( typeof window.innerHeight !== 'undefined' ){
            _viewHeight = window.innerHeight;
        }
        else if(typeof document.compatMode !== 'undefined' &&　document.compatMode !== "BackCompt"){
            _viewHeight = document.documentElement.clientHeight;
        }
        else{
            _viewHeight = document.body.clientHeight;
        }
        return _viewHeight;
    };

    lazy.prototype._getImg = function () {
        var _i = document.getElementsByTagName("img");
        for(var i = 0, len = _i.length; i < len; i++){
            if(typeof  (_i[i].getAttribute("data-lazy"))){
                _imgs.push(_i[i]);
                _num++;
            }
        }
    };

    /**
     * 导入图片
     * @private
     */
    lazy.prototype._loadImg = function () {
        if(!_num)return;
        var _viewHeihgt = this._getViewHeight();
        for(var i = 0, len = _imgs.length; i < len; i++){
            var _imgEle = _imgs[i];
            if(this._getEleViewHeight(_imgEle) < _viewHeihgt){
                _imgEle.src =_imgEle.getAttribute("data-lazy");
                delete  _imgs[i];
                _num--;
            }
        }
    };


    /**
     * 初始化，可以设置延时
     */
    lazy.prototype.init = function (time) {
        this._getImg();
        var _time = time || 500;
        window.onscroll = window.onload = function () {
            setTimeout(function () {
                this._loadImg();
            }.bind(this),_time);
        }.bind(this);

    }

module,exports = new lazy();


