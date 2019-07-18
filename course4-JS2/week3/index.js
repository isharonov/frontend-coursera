/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
  
    //Решение без использования промисов
    //Случай, когда операции не переданы
    if (operations.length === 0) {
        callback(null, []);
    }

    var result = [];
    var hasError = false;
    var doneOperations = 0;

    operations.forEach(function (operation, index) {
        operation(function next(err, res){
            //Если была ошибка в предыдущих операциях, не обрабатываем результат и не вызываем callback
            if (hasError) {
                return;
            }

            //Обрабатываем ошибки
            if (err) {
                callback(err);
                hasError = true;

                return;
            }

            //Сохраняем результат
            result[index] = res;
            doneOperations++;

            //Вызываем результирующий callback
            if (doneOperations === operations.length) {
                callback(null, result);
            }
        });
    });
      
  /*   //Решение с использованием промисов
    function executeOperation(operation) {
        return new Promise(function(resolve, reject){
            operation(function(err, res){
                err ? reject(err) : resolve(res);
            });
        });
    }

    var promises = [];
    operations.forEach(function(item){
        promises.push(executeOperation(item));
    });

    Promise
        .all(promises)
        .then(function(data){
            callback(null, data);
        }, function(error){
            callback(error);
        }); 
    */
};