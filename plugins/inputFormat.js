/**
 * Created by chen on 2016/9/7.
 */
/**
 * id:inout的id
 * type：bank（银行）和finance(金融)
 * location:inner内部 其实外部
 * outid：外部展示的id
 */
class InputFormat{
    constructor(){
        this._type = '';
    };
    init(id, type =  'bank', location = 'inner', outid) {
        if(!id){return};
        let eleid = document.getElementById(id);
        let setdata;
        this.addLiter(eleid, 'change',() => {
            let text = eleid.value;
            //报存便于计算

            eleid.setAttribute('data-num',text.trim())
            switch (type){
                case 'bank':{
                     setdata = this.formatFi(text)
                }
                    break;
                case 'finance':{
                    setdata = this.formatBa(text)
                }
                    break;

            }
            this.setdata(eleid, setdata, location, outid)
        })
        return this;
    }
    addLiter(_e, event ,callback){
        if(typeof document.addEventListener !== undefined){
            _e.addEventListener(event,callback);
        } else{
            _e.attachEvent('on'+enent, callback);
        }
    }
    formatFi(text){
        let t = text.trim();
        if(t.length > 22){
               t =  t.slice(0, 22);
        }
        var temp = t.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
        return temp;
    }
    formatBa(s){
        if(/.+(\..*\.|\-).*/.test(s)){
            return;
        }
        s = parseFloat((s + "").replace(/[^\d\.\-]/g, "")).toFixed(2) + "";
        let l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        let t = "";
        for(let i = 0, len = l.length; i < len; i ++ ) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length && (l[i+1]!='-')? "," : "");
        }
        let temp = t.split("").reverse().join("") + "." + r;
        return temp;

    }
    setdata(e, text, location, outid){
        if (location === 'inner'){
            e.value = text;
        }else{
            let d =document.getElementById(outid);
            d.innerHTML = text;

            if(!!outid){
                if(!e.value){
                    d.style.display = 'none';
                }else {
                    d.style.display = 'block';
                }
            }

        }

    }

}

export {InputFormat};