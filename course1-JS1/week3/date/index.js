/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {

    //Разобрать с помощью регулярных выражений строку date, 
    //чтобы определить переменные year, month, day, hour, minute
    var params = date.match(/\d{2,4}/g);
    
    var curDate = new Date(Date.UTC(params[0], params[1]-1, params[2], params[3], params[4])); 

    return {
        dateObj: curDate,
        //_value: undefined,
        get value() {
            return this.dateObj.toISOString().slice(0,16).replace(/T/, ' ');
        },
        add: function (number,  measure) {
            //Проверяем, что number  не отрицательный
            if (number < 0) {
                throw new TypeError('Количество единиц отрицательное!'); 
            }
            //проверяем единицу измерения времени
            switch (measure) {
                case "years":
                    var curMonth = this.dateObj.getMonth();
                    this.dateObj.setMonth(12 * number + curMonth);
                    break;
                case "months":
                    var curMonth = this.dateObj.getMonth();
                    this.dateObj.setMonth(number + curMonth);
                    break;
                case "days":
                    var curHours = this.dateObj.getHours();
                    this.dateObj.setHours(24 * number + curHours);
                    break;
                case "hours":
                    var curMinutes = this.dateObj.getMinutes();
                    this.dateObj.setMinutes(60 * number + curMinutes);
                    break;
                case "minutes":
                    var curSeconds = this.dateObj.getSeconds();
                    this.dateObj.setSeconds(60 * number + curSeconds);
                    break;
                default:
                     throw new TypeError('Некорректное значение единицы измерения времени');
            }
            return this;
        },
        subtract: function (number,  measure) {
            //Проверяем, что number  не отрицательный
            if (number < 0) {
                throw new TypeError('Количество единиц отрицательное!'); 
            }
            //проверяем единицу измерения времени
            switch (measure) {
                case "years":
                    var curYear = this.dateObj.getFullYear();
                    this.dateObj.setFullYear(curYear - number);
                    break;
                case "months":
                    var curMonth = this.dateObj.getMonth();
                    //Проверим, нужно ли менять значение года
                    if (curMonth >= number) {
                        this.dateObj.setMonth(curMonth - number);
                    } else if (curMonth >= number % 12) {
                        var curYear = this.dateObj.getFullYear();
                        this.dateObj.setFullYear(curYear - Math.floor(number / 12));
                        this.dateObj.setMonth(curMonth - number % 12);
                    } else {
                        var curYear = this.dateObj.getFullYear();
                        this.dateObj.setFullYear(curYear - Math.ceil(number / 12));
                        this.dateObj.setMonth(curMonth + 12 - number % 12);
                    }
                    break;
                case "days":
                    var curTimestamp = this.dateObj.getTime();
                    this.dateObj = new Date(curTimestamp - number * 24 * 60 * 60 * 1000);
                    break;
                case "hours":
                    var curTimestamp = this.dateObj.getTime();
                    this.dateObj = new Date(curTimestamp - number * 60 * 60 * 1000);
                    break;
                case "minutes":
                    var curTimestamp = this.dateObj.getTime();
                    this.dateObj = new Date(curTimestamp - number * 60 * 1000);
                    break;
                default:
                     throw new TypeError('Некорректное значение единицы измерения времени');
            }
            return this;
        }
    }
}