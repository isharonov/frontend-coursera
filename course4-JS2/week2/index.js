module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection(values) {
    if (values) {
        this.value = [].concat(values);
    } else {
        this.value = [];
    }  
}


// Методы коллекции
Collection.prototype.values = function () {
    return this.value;
};

Collection.prototype.count = function() {
    return this.value.length;
}

Collection.prototype.at = function(position) {
    return this.value[position - 1] ? this.value[position - 1] : null;
};

Collection.prototype.append = function(elements) {
    if (elements instanceof Collection) {
        for (var i = 0; i < elements.value.length; i++) {
            this.value.push(elements.value[i]);
        }
    } else {
        this.value.push(elements);
    }
    
};

Collection.prototype.removeAt = function(position) {
    if (this.value[position - 1]) {
        this.value.splice(position - 1, 1);
        return true;
    } else {
        return false;
    }
};

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (values) {
   return new Collection(values);
};
/* 
//Testing:
// Создаем коллекцию чисел
var numbers = new Collection();
numbers.append(10);
numbers.append(20);
console.log(numbers.count()); //2
console.log(numbers.values()); // [10,20]

// Создаем коллекцию букв
var letters = Collection.from(['a', 'b', 'c']);
letters.append('d');
console.log(letters.count()); //4
console.log(letters.values()); // ['a', 'b', 'c', 'd']

// Смешиваем обе коллекции
var items = new Collection();
items.append(numbers);
items.append(letters);
console.log(items.count()); //6
console.log(items.values()); // [10, 20, 'a', 'b', 'c', 'd']

// Проверяем получение элемента
console.log(items.at(0)) //null
console.log(items.at(1)) //10)
console.log(items.at(3)) //'a'
console.log(items.at(6)) //'d'

// Проверяем удаление
console.log(items.removeAt(0)); //false
console.log(items.removeAt(2)); //true
console.log(items.removeAt(5)); //true

console.log(items.values()) //[10, 'a', 'b', 'c'] */