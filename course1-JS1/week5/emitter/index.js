module.exports = {

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        
        //Сохраняем подписчик и обработчик в отдельный объект
        var eventItem = {};
        eventItem.subscriber = subscriber;
        eventItem.handler = handler.bind(subscriber); //bind() запустит новый handler в контексте subscriber, а не emitter
        
        if (!this.hasOwnProperty(event)) { //Проверяем, есть ли у объекта emitter свойство event
            this[event] = new Set(); //Если нет, создаем его и помещаем в него новый объект Set,
            this[event].add(eventItem); //в котором будем хранить объекты с подписчиками и обработчиками
        } else {
            this[event].add(eventItem); //если есть, добавляем объект в существующий Set
        }
        //возвращаем объект emitter
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (this.hasOwnProperty(event)) {
            var _this = this; // сохраняем контекст исполнения в переменную   
            this[event].forEach(function(eventItem) { // перебираем все объекты внутри Set данного события
                if (eventItem.subscriber === subscriber) { // если объект содержит нужный subscriber
                    _this[event].delete(eventItem);        //удаляем этот объект из Set
                }
            });
        } 
        //возвращаем объект emitter
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (this.hasOwnProperty(event)) {
            this[event].forEach(function(eventItem) { //т.к. объекты с подписчиками и обработчиками хранятся в объекте Set
                eventItem.handler();                  //каждый обработчик выполняется в порядке подписки
                }) 
            } 
        //возвращаем объект emitter
        //console.log(this);
        return this;
    }
};
