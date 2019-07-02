/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
//определяем текущее время в минутах
    var currentTime = hours*60 + minutes;
//добавляем интервал в минутах
    currentTime += interval;
//проверяем новые сутки (в сутках 1440 минут)
    currentTime = (currentTime < 1440) ? currentTime : currentTime % 1440;
//определяем количество часов
    hours = Math.floor(currentTime / 60);
//определяем количество минут
    minutes = currentTime - hours*60;
//приводим время к формату hh:mm
    hours = (hours < 10) ? '0' + hours : String(hours);
    minutes = (minutes < 10) ? '0' + minutes : String(minutes);
//возвращаем корректное время
    return hours + ':' + minutes;
};
