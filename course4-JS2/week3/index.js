/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
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
};