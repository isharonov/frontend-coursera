/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    //копируем коллекцию в новое место
    var newCollection = JSON.parse(JSON.stringify(collection));
    
    var args = [].slice.call(arguments);
    var answer = [];
    
    //если операции не переданы - возвращаем исходную коллекцию
    if (args.length === 1) {
        return newCollection;
    }
    
    //обработка операций фильтрации
    for (var i = 1; i < args.length; i++) {
        if (args[i][0] === 'filterIn'){
            var filterField = args[i][1];
            var filterValue = [];
            for (var j = 2; j < args[i].length; j++) {
                filterValue.push(args[i][j]);
            }
            
            //перебираем элементы newCollection
            //если filterValue содержит значение newCollection[i][filterField]
            //делаем answer.push(newCollection[i])
            for (var k = 0; k < newCollection.length; k ++) {
                if (filterValue.indexOf(newCollection[k][filterField]) !== -1) {
                    answer.push(newCollection[k]);
                }
            }
            newCollection = answer;
            answer = [];
        }
    }
    //обработка операций выборки
    for (var i = 1; i < args.length; i++) {
        if (args[i][0] === 'select') {
            var selectValue = [];
            for (var j = 1; j < args[i].length; j++) {
                selectValue.push(args[i][j]);
            }
            //перебираем элементы newCollection
            //если properties[m] не содержится в selectValue
            //удаляем properties[m]
            for (k = 0; k < newCollection.length; k++) {
                var properties = Object.keys(newCollection[k]);
                for (var m = 0; m < properties.length; m++) {
                    if (selectValue.indexOf(properties[m]) === -1) {
                        delete newCollection[k][properties[m]];
                    }
                }
            }
        }
    }
    return newCollection;
}

/**
 * @params {String[]}
 */
function select() {
    //определяем переданные поля
    var fields = [];
    for (var i = 0; i < arguments.length; i++) {
        fields.push(arguments[i]);
    }
    //['select', '_field1', '_fieldN']
    return ['select'].concat(fields);
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    //['filterIn', '_property', '_value1', '_valueN']
    return ['filterIn'].concat(property).concat(values);
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};