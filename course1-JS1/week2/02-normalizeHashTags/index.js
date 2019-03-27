/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
var result = '';
//Проверяем не пустой ли массив
if (hashtags.length === 0) {
    return result;
}
//Создаем новый массив без повторов
var uniqueHashTags = hashtags.reduce(deleteRepeats, []);
function deleteRepeats(acc, item) {
    var currentHashtag = item.toLowerCase();
    //если item не содержится в  acc, то добавляем item в конец acc
   if  (!acc.includes(currentHashtag)) {
        acc.push(currentHashtag);
   }
   return acc;
}
//Преобразуем новый массив в строку с разделителем ", "
result = uniqueHashTags.join(', ');
//Возвращаем результат
return result;
};
