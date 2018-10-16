// 模板函数可以使用 <%= … %>插入变量, 也可以用<% … %>执行任意的 JavaScript 代码
// 当你要给模板函数赋值的时候，可以传递一个含有与模板对应属性的data对象 
var str = "\n    <% if( data.len > 20 ) { %>\n        <p>\u6211\u662F\u4E00\u4E2Aaaa</p>\n    <% } else { %>\n        <p>\u6211\u662F\u4E00\u4E2Abbb</p>\n    <% } %>\n\n    <% for(var i = 0; i < data.list.length; i++) { %>\n        <!--\u5C55\u793A\u5FAA\u73AF-->\n    \t<p><%= i %> : <%= data.list[i] %></p>\n    <%} %>\n";
var data = { len: 10, list: [1, 2, 3, 4, 5, 76, 87, 8] };
var template = function (temp, data) {
    var regValue = /<%=(.+?)%>/g;
    var evalSign = /<%(.+?)%>/g;
    var commentSign = /<!--(.+?)-->/g;
    var tplStr = str.replace(/\n/g, '')
        .replace(commentSign, function (match, p) { return ''; })
        .replace(regValue, function (match, p) { return "'+(" + p + ")+'"; })
        .replace(evalSign, function (match, p) { return "'; " + p.replace('&gt;', '>').replace('&lt;', '<') + "; tpl += '"; });
    console.log("var tpl='" + tplStr + "'; return tpl;");
    return new Function('data', "var tpl='" + tplStr + "'; return tpl;")(data);
};
template(str, data);
