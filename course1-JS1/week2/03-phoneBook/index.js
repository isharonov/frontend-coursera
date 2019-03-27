// Телефонная книга
var phoneBook = {};

function addContact (contact, phones){
    if (phoneBook.hasOwnProperty(contact)) {
        phoneBook[contact] = phoneBook[contact].concat(phones);
    } else {
        phoneBook[contact] = phones;
    }
}

function removePhone (phone) {
    var keys = Object.keys(phoneBook);
    for (var i = 0; i < keys.length; i++){
         var key = keys[i];
         var currentPhones = phoneBook[key];
         var pos = currentPhones.indexOf(phone);
         if (pos !== -1) {
             //удаляем телефон из массива по индексу 
             currentPhones.splice(pos, 1);
            //если номеров больше нет - удаляем контакт
             if (currentPhones.length === 0) {
                delete phoneBook[key];
             }

             return true;
         }
    }
    return false;
 }
 function showPhones() {    
    //Получаем список имен
    var names = Object.keys(phoneBook);
    
    //Сортируем по алфавиту
    names.sort();
    
    //Выводим в формате:
    //[ 'Name: Phone1, Phone2', 'Name2: Phone3, Phone4' ]
    return names.map(function (name) {
        // Получаем список телефонов контакта
        var phones = phoneBook[name];

        //Формируем строчку контакта
        return name + ': ' + phones.join(', ');
    });
}
/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
var commandLine = command.split(' ');
var commandName = commandLine[0];

//Обработка команды ADD
//ADD Name phone1,phone2
if (commandName === 'ADD') {
    var contact = commandLine[1];
    var phones = commandLine[2].split(',');
 
    return addContact(contact, phones);
}

//Обработка команды REMOVE_PHONE
//REMOVE_PHONE phone1
if (commandName === 'REMOVE_PHONE') {
    var phone = commandLine[1];
    
    return removePhone(phone);
}

//Обработка команды SHOW
if (commandName === 'SHOW') {
    return showPhones();
}
}