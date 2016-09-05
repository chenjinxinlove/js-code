/**
 * Created by chen on 2016/8/29.
 */

class countdown {
    constructor(){

    }
    init(options) {

    }
    parseTime(_endTime){
        let _timeTamp =  Date.parse(_endTime) - Date.new,
            seconds  = Math.floor((_timeTamp/1000)%60),
            minutes = Math.floor((_timeTamp/1000/60)%60),
            hours = Math.floor((_timeTamp/1000*60*60)%24),
            day = Math.floor((_timeTamp/1000*60*60*24));
        return {day, hours, minutes, seconds};
    }


}

export default countdown;