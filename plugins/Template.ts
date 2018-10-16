// 模板函数可以使用 <%= … %>插入变量, 也可以用<% … %>执行任意的 JavaScript 代码

// 当你要给模板函数赋值的时候，可以传递一个含有与模板对应属性的data对象 

const str:string = `
    <% if( data.len > 20 ) { %>
        <p>我是一个aaa</p>
    <% } else { %>
        <p>我是一个bbb</p>
    <% } %>

    <% for(var i = 0; i < data.list.length; i++) { %>
        <!--展示循环-->
    	<p><%= i %> : <%= data.list[i] %></p>
    <%} %>
`


// var tpl='';
// if( data.len > 20 ) {;
//     tpl += '<p>我是一个aaa</p>';  
// } else {;
//     tpl += ' <p>我是一个bbb</p>';
// };

// for(var i =0; i < data.list.length; i++) {;
//      tpl += '<p>'+( i )+' : '+( data.list[i] )+'</p>'; 
// }; 
// return tpl;

type DataType = {
    len: number,
    list: number[];
}

const data:DataType = {len:10, list: [1,2,3,4,5,76,87,8]};


const template = (temp:string, data:any):string => {
    const regValue = /<%=(.+?)%>/g;
    const evalSign = /<%(.+?)%>/g;

    const commentSign = /<!--(.+?)-->/g;
    const tplStr = str.replace(/\n/g, '')
        .replace(commentSign, (match, p) => '')
        .replace(regValue, (match, p) => `'+(${p})+'`)
        .replace(evalSign, (match, p) => `'; ${p.replace('&gt;', '>').replace('&lt;', '<')}; tpl += '`)
    console.log( `var tpl='${tplStr}'; return tpl;`);
    return new Function('data', `var tpl='${tplStr}'; return tpl;`)(data);
}

template(str, data);