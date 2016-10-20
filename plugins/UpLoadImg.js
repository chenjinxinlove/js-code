(function (window) {
        var op;
        var UploadImg = function (options) {
            var _options = {
                fileInput: null,				//html file控件
                dragDrop: null,					//拖拽敏感区域
                upButton: null,					//提交按钮
                url: "",						//ajax地址
                fileFilter: [],					//过滤后的文件数组
                filter: function(files) {		//选择文件组的过滤方法
                    return files;
                },
                onSelect: function() {},		//文件选择后
                onDelete: function() {},		//文件删除后
                onDragOver: function() {},		//文件拖拽到敏感区域时
                onDragLeave: function() {},	//文件离开到敏感区域时
                onProgress: function() {},		//文件上传进度
                onSuccess: function() {},		//文件上传成功时
                onFailure: function() {},		//文件上传失败时,
                onComplete: function() {},		//文件全部上传完毕时
            };
            for ( var key in _options){
                if(!options[key]){
                    options[key] = _options[key];
                }
            }
            op = options;
            return new UploadImg.prototype.init(options);
        };
        UploadImg.prototype.init = function (options) {
            var _self = this;
            //拖拽的实现
            if(options.dragDrop){
                options.dragDrop.addEventListener("dragover",function (e) {
                    _self.funDragHover(e);
                },false);
                options.dragDrop.addEventListener("dragleave",function (e) {
                    _self.funDragHover(e);
                },false);
                options.dragDrop.addEventListener("drop",function (e) {
                    _self.funGetFiles(e);
                },false)
            };
            //监听文件input上穿
            if(options.fileInput){
                options.fileInput.addEventListener("change",function (e) {_self.funGetFiles(e);},false);
            }
            //上传提交
            if(options.upButton) {
                options.upButton.addEventListener("click", function (e) {_self.funUploadFile(e);},false)
            }


        };
        //文件拖放
        UploadImg.prototype.funDragHover = function(e) {
            e.stopPropagation();
            e.preventDefault();
            op[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
            return this;
        };
        //获取选择文件，file控件或拖放
        UploadImg.prototype.funGetFiles = function(e) {
            // 取消鼠标经过样式
            this.funDragHover(e);

            // 获取文件列表对象
            var files = e.target.files || e.dataTransfer.files;
            //继续添加文件
            op.fileFilter = op.fileFilter.concat(op.filter(files));
            this.funDealFiles();;
            return this;
        };

        //选中文件的处理与回调
        UploadImg.prototype.funDealFiles = function() {
            for (var i = 0, file; file = op.fileFilter[i]; i++) {
                //增加唯一索引值
                file.index = i;
            }
            //执行选择回调
            op.onSelect(op.fileFilter);
            return this;
        };

        //删除对应的文件
        UploadImg.prototype.funDeleteFile = function(fileDelete) {
            var arrFile = [];
            for (var i = 0, file; file = op.fileFilter[i]; i++) {
                if (file != fileDelete) {
                    arrFile.push(file);
                } else {
                    op.onDelete(fileDelete);
                }
            }
            op.fileFilter = arrFile;
            return this;
        };

        //文件上传
        UploadImg.prototype.funUploadFile =  function() {
            var self = this;
            if (location.host.indexOf("sitepointstatic") >= 0) {
                //非站点服务器上运行
                return;
            }
            for (var i = 0, file; file = this.fileFilter[i]; i++) {
                (function(file) {
                    var xhr = new XMLHttpRequest();
                    if (xhr.upload) {
                        // 上传中
                        xhr.upload.addEventListener("progress", function(e) {
                            self.onProgress(file, e.loaded, e.total);
                        }, false);

                        // 文件上传成功或是失败
                        xhr.onreadystatechange = function(e) {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    self.onSuccess(file, xhr.responseText);
                                    self.funDeleteFile(file);
                                    if (!self.fileFilter.length) {
                                        //全部完毕
                                        self.onComplete();
                                    }
                                } else {
                                    self.onFailure(file, xhr.responseText);
                                }
                            }
                        };

                        // 开始上传
                        xhr.open("POST", self.url, true);
                        xhr.setRequestHeader("X_FILENAME", encodeURIComponent(file.name));
                        xhr.send(file);
                    }
                })(file);
            }

        };
        UploadImg.prototype.init.prototype = UploadImg.prototype;
        window.UploadImg = UploadImg;

    })(window, undefined)