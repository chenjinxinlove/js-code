/**
 * Created by Admin on 2016/8/4.
 * "preview":document.getElementById("previewImg")
})
/**
*
 * e 长传的图片
 * preview 展示的div
 * @param options
 */

var UpPreviewImg = function (options) {
    this.upPreview(options)
}

UpPreviewImg.prototype = {
    isIE :function () { //是否是IE
        return !!window.ActiveXObject;
    },
    isIE6 :function () {//是否是IE6
        return isIE() && !window.XMLHttpRequest;
    },
    isIE7 :function () {//是否是IE7
        return isIE() && !isIE6() && !isIE8()
    },
    isIE8 :function () {
        return isIE() && !!document.documentMode;
    },
    setCss : function (_this,cssOption) {
        if(!_this||_this.nodeType ===3 || _this.nodeType === 8 || !_this.style){
            return;
        }
        for(var cs in cssOption){
            _this.style[cs] = cssOption[cs];
        }
        return _this;
    },

    upPreview:function (options) {
    var _e = options.e,
        preloadImg = null;
    _e.onchange = function () {
        var _v = this.value,
            _body = document.body;
        picReg = /(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png){1}/;

        if(!picReg.test(_v)){
            alert("请选择正确的图片格式");
            return false;
        }
        if(typeof FileReader == 'undefined') {
            if (this.file) {
                var _img = document.createElement("img");
                _img.setAttribute("src", this.file.files[0].getAsDataURL());
                options.preview.appendChild(_img);
            }
            else if (this.isIE6()) {
                var _img = document.createElement("img");
                _img.setAttribute("src", _v);
                options.preview.appendChild(_img);
            }
            else{
                _v = _v.replace(/[('"%]/g,function (str) {
                    return escape(escape(str));
                });
                this.setCss(options.preview,{
                    "filter":"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\'"+_v+"\')","display":"block"
                });
            }
        }
        else{
            var reader = new FileReader(),
                _file = this.files[0];
            reader.onload = (function (file) {
                return function () {
                    var _img = document.createElement("img");
                    _img.setAttribute("src",this.result);
                    options.preview.appendChild(_img);
                };
            })(_file);

            reader.onerror = function () {
                alert("文件读取数据出错");
            }

            reader.readAsDataURL(_file);

        }
    }


}
}


module.exports = upPreviewImg;