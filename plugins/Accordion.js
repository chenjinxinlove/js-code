(function (window) {
        var Accordion = function (options) {
          return new Accordion.prototype.init(options);
        };
        Accordion.prototype.init = function (options) {
            var titleArr = [].slice.call(options.title),
                    accordionUl = [].slice.call(options.accordion.getElementsByTagName('ul'));
            for(var i = 0, len = titleArr.length; i < len; i++){
                (function (i) {
                    titleArr[i].onclick = function () {
                        accordionUl.forEach(function (value) {
                            value.style.display = 'none';
                        })
                        accordionUl[i].style.display = 'block';
                    }
                })(i)
            }
        };
        Accordion.prototype.init.prototype = Accordion.prototype;
        window.Accordion = Accordion;
    })(window, undefined)

    Accordion({
        'accordion' : document.getElementById('accordion'),
        'title' : document.getElementsByClassName('first-level')
    })