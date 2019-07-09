var memoji = ['🐮', '🐓', '🦃', '🐟', '🦄', '🐞'];

//Конструктор объекта карточки
function Card(id, content) {
    this.value = content;
    this.id = id;
}
Card.prototype.createNode = function() {
    this.node = document.createElement('div');
    this.node.setAttribute('id', this.id);
    this.node.classList.add('card');
    this.node.innerHTML = '<div class="side front">' + this.value + '</div><div class="side back"></div>';
    return this.node;
}

//Конструктор объекта игры
function Game() {
    this.playground = document.getElementById('playground');
    this.values = memoji.concat(memoji);
    this.cards = {};
}
Game.prototype.start = function() {

    //Раскладываем карточки
    for (var i = 0; i < this.values.length; i++) {
        this.cards[i] = new Card(i, this.values[i]);
        this.playground.appendChild(this.cards[i].createNode());
    }

    //Сохраняем контекст объекта игры
    var self = this;

    //Делегируем обработку кликов на карточках
    this.playground.addEventListener('click', function(event){

        //Обрабатываем только клики на карточках
        if (event.target.classList.contains('side')){

            var target = self.cards[event.target.parentNode.id];


            if (!target.node.classList.contains('rotate')) {
                
                target.node.classList.add('rotate');

            } else {
            
                target.node.classList.remove('rotate');
                
            }
        }
        
    });

}

//Новая игра
var myGame = new Game();
myGame.start();

