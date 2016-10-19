 (function (window) {
        var Tab = function (options) {
            return new Tab.prototype.init(options);
        }
        Tab.prototype.init = function (options) {
            var tabListLi = [].slice.call(options.tabList.getElementsByTagName('li'));
            var tabConDiv = [].slice.call(options.tabCon.getElementsByTagName('div'));
            for(var i = 0, len = tabListLi.length; i < len; i++ ){
                (function (i) {
                    tabListLi[i].onclick = function () {
                        tabListLi.forEach(function (value) {
                            value.className = '';
                        });
                        tabConDiv.forEach(function (value) {
                            value.className = '';
                        });
                        tabConDiv[i].className = 'cur';
                        this.className = 'cur';
                    }
                })(i)
            }

        }

        Tab.prototype.init.prototype = Tab.prototype;
        window.Tab = Tab;
    })(window, undefined);
    Tab({
        'tabList' : document.getElementById('tabList'),
        'tabCon' : document.getElementById('tabCon')
    })