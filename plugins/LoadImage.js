/**
 * Created by Admin on 2016/8/6.
 */
'use strict';

/**
 * 图片预加载函数
 * @param images  图片数组
 * @param callback 回调函数
 * @param timeout  超时
 * @constructor
 */
function LoadImage(images,callback,timeout) {
    //加载完成图片的计数器
    var count = 0;
    //全服图片加载成功的一个标志位
    var success = true;
    //超时timer的id
    var timeoutId = 0;
    //是否加载超时的标志位
    var isTimeout = false;
    //对图片数组（或对象）进行遍历
    for(var key in images){
        if(!images.hasOwnProperty(key)){
            continue;
        };
        //获得每个图片元素
        //期望格式是个object：{src:xxx
        var item = images[key];
        if(typeof  item === 'string'){
            item = images[key] = {
                src : item
            };
        }
        //如果格式不满足希望，就丢弃
        if(!item || !item.src){
            continue;
        }

        //计数加1
        count ++;
        //设置图片元素的id
        item.id = '__img__' + key +getId();
        //设置图片的元素img，他就是一个Images();
        item.img = window[item.id] = new Image();

        doLoad(item);
    }
    //遍历完成如果计数是0直接返回
    if(!count){
        callback(success);
    }else if(timeout){
        timeoutId = setTimeout(onTimeout,timeout);
    }

    //真正进行图片加载的函数
    function doLoad(item) {
        item.status = 'loading';

        var img = item.img;
        //定义加载成功的回调函数
        img.onload = function () {
            success = success & true;
            item.status = "loaded";
            done();
        };
        //定义加载失败的回调函数
        img.error = function () {
            success = false;
            item.status = 'error';
            done();
        };
        //发起请求
        img.src = item.src;
        /**
         * 每张图片加载完的回调函数
         */
        function done() {
            img.onload = img.onerror = null;
            try{
                delete window[item.id];
            }catch(e) {

            }
            //每张图片加载完成，计数器减一，当所有图片加载完成且没有超时的情况
            //清除超时计时器
            if(!--count && !isTimeout){
                clearTimeout(timeoutId);
                callback(success);
            }
        }
    }

    /**
     * 超时函数
     */
    function onTimeout() {
        isTimeout = true;
        callback(false);
    }


};
var __id = 0;
function getId() {
    return ++__id;
}

module.exports = LoadImage;
