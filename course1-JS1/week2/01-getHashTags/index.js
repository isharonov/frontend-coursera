/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
//разбиваем строку на массив слов: разделитель - пробел
var allWords = tweet.split(' ');

//перебираем массив: 
//если слово начинается с # - копируем в итоговый массив
var result = [];

for (var i = 0; i < allWords.length; i++) {
    var hashTag = allWords[i];
    if (hashTag.startsWith('#')) {
        //добавляем в итоговый массив и убираем # c хештегов
        result.push(hashTag.slice(1));
    }
}

//возвращаем итоговый массив
return result;
};