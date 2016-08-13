/**
 * Created by Admin on 2016/8/13.
 */

var TID = "",
    LENNING = null,
    OPTIONS = {};
var Printer = function (options) {
    this._init(options)
};

Printer.prototype._init = function (options) {
    var _options = {
        "e":options.e || "",
        "str":options.str || "",
        'time':options.time || "100"
    };
    if(_options.e === "" || _options.str  === ""){
        return false;
    }else{
        OPTIONS = _options;
        this.ui();
    }
};




Printer.prototype.ui = function () {
    for(var i = 0; i<1; i++){
        LENNING++;
        if(LENNING > OPTIONS.str.length ) {
            LENNING = 0;
            clearInterval(TID);
        }
        OPTIONS.e.innerHTML = OPTIONS.str.substring(0,LENNING) + "_";
    }
    TID = setInterval(this.ui,OPTIONS.time);
};

module.exports = Printer;