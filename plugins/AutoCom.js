/**
 * Created by chen on 2016/9/19.
 */
class AutoCom {
    constructor() {
        this.options = '';
        this.num = 0;
    }

    init(options) {
        let _options = {
            'origin': 'api',
            'lenght': 5,
            'apiUrl': 'http://suggestion.baidu.com/su'
        }
        this.options = Object.assign(options, _options);
        this._start();
    }

    _start() {
        let _self = this;
        document.getElementById(this.options.inputId).oninput = function (_e) {
            let e = _e || window.event;
            _self._getData(this.value)
        }
    }

    _getData(value) {
        let _self = this;
        let Data = {
            "api": function (value) {
                _self._josnp(value)
                    .then(function (data) {
                        _self._addData(data)
                    })
            }
            ,
            'common': function (value) {

            }
        }
        Data[this.options.origin](value)
    }

    _josnp(value) {
        let _self = this;
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script');
            script.src = encodeURI(_self.options.apiUrl + `?cb=callback_jkkjljljpp_654646&wd=${value}&_=${+new Date()}`);
            document.body.appendChild(script);
            window.callback_jkkjljljpp_654646 = function (data) {
                resolve(data['s']);
            }
        })
    }

    _addData(data) {
        let _self = this;
        let auto = document.getElementById('AutoCom')
        if (data.length === 0) {
            auto.style.display = 'none';
            return;
        }
        auto.style.display = 'block'
        let ul = document.getElementById(this.options.showUl);
        ul.innerHTML = '';
        for (let i = 0; i < this.options.lenght; i++) {
            if (!!data[i]) {
                let li = document.createElement('li');
                li.innerHTML = data[i];
                li.className = 'lishow';
                ul.appendChild(li);
                let liClassA = document.getElementsByClassName(this.options.liClass);
                for (let j = 0, len = liClassA.length; j < len; j++) {
                    liClassA[j].onclick = function () {
                        document.getElementById(_self.options.inputId).value = this.innerHTML;
                        auto.style.display = 'none';
                    }
                }
            }
        }
        document.body.onkeydown = function (_e) {
            let e = _e || window.event;
            if (e.keyCode === 40) {
                _self._key('down')
            } else if (e.keyCode === 38) {
                _self._key('up');
            }
        }

    }

    _key(dir) {
        var liClassA = document.getElementsByClassName(this.options.liClass);
        if (document.getElementsByClassName(this.options.activeClass).length === 0) {
            this.num = 0;
        } else {
            if(dir === 'down'){
                if(this.num < this.options.lenght-1){
                    this.num++ ;
                }else{
                    this.num = 0 ;
                }
            }else{
                if(this.num > 0){
                    this.num--;
                }else{
                    this.num = this.options.lenght-1;
                }
            }
        }
        this._setActive(this.num);

    }
    _setActive(num){
        let liClassA = document.getElementsByClassName(this.options.liClass);
        for (let j = 0, len = liClassA.length; j < len; j++) {
            liClassA[j].className = this.options.liClass;
        }
        liClassA[num].className = this.options.liClass + " " + this.options.activeClass;
        document.getElementById(this.options.inputId).value = liClassA[num].innerHTML;
        document.body.onclick = function () {
            document.getElementById('AutoCom').style.display = 'none';
        }
    }

}


export {AutoCom};




/**
html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<style>
    .ff{
        margin: 200px;
        border: 1px solid red;
        position: relative;
        height: 800px;
        width: 800px;
        padding: 50px;
    }
    .text{
        width: 500px;
        height: 28px;
        line-height: 28px;
        outline: none;
        padding: 7px 6px 6px 5px;
    }
    .button{
        width: 100px;
        height: 43px;
        outline: none;
    }
    .AutoCom{
        width: 512px;
        border: 1px solid #ccc;
        border-top: none;
        position: absolute;
        top: 91px;
        left: 50px;
        display: none;
    }
    .AutoCom ul{
        padding: 10px 0;
        margin: 0;
    }
    .AutoCom li{
        list-style-type: none;
        height: 30px;
        line-height: 30px;
        text-indent: 10px;
    }
    .AutoCom li:hover{
        background-color: #cccccc;
    }
    .AutoCom .active{
        background-color: #cccccc;
    }
</style>
<body>
    <div class="ff">
        <input type="text" class="text" id="text"><input type="button" class="button" value="搜搜" id="button">
        <div id="AutoCom" class="AutoCom">
            <ul id="showUl">
                <!--<li class="active">符合为偶发违法</li>-->
                <!--<li>符合为偶发违法</li>-->
                <!--<li>符合为偶发违法</li>-->
                <!--<li>符合为偶发违法</li>-->
                <!--<li>符合为偶发违法</li>-->
            </ul>
        </div>
    </div>
</body>
<script src="./js/bundle.js"></script>
</html>

index.js

import  {AutoCom} from  './AutoCom';

let Auto  = new AutoCom();
Auto.init({
    'inputId' : 'text',
    'buttonId' :  'utton',
    'AutoCom' : 'AutoCom',
    'showUl'  : 'showUl',
    'activeClass' : 'active',
    'liClass' : 'lishow'
});


**/


















