var memoji = ['🐮', '🐓', '🦃', '🐟', '🦄', '🐞'];

Array.prototype.valueShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

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
    this.cardsSelected = { length: 0 };
}
Game.prototype.start = function() {
    
    //Перемешиваем карточки
    this.values.valueShuffle();

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

            //0 - Игнорируем клики на уже открытые карточки
            if (target.node.classList.contains('rotate')) {
                return;
            }

            //1 - Клик на закрытую карточку + нет открытых несовпавших карточек
            if (!target.node.classList.contains('rotate') && self.cardsSelected.length < 2) {
                
                target.node.classList.add('rotate');

                //1.1 - Если нет пары для сравнения
                if (self.cardsSelected.length == 0) {

                    self.cardsSelected[0] = target;
                    self.cardsSelected.length ++ ;
                 
                //1.2 - Если есть пара для сравнения
                } else if (self.cardsSelected.length == 1) {

                    self.cardsSelected[1] = target;
                    self.cardsSelected.length ++ ;
                    
                    //Проверяем 2 открытые карточки
                    if (self.cardsSelected[0].value == self.cardsSelected[1].value){

                        self.cardsSelected[0].node.classList.add('match');
                        self.cardsSelected[1].node.classList.add('match');

                        self.cardsSelected = { length: 0 };

                    } else {

                        self.cardsSelected[0].node.classList.add('mismatch');
                        self.cardsSelected[1].node.classList.add('mismatch');
                    }
                }
            //2 - Клик на закрытую карточку + есть 2 открытые несовпавшие карточки
            } else if (!target.node.classList.contains('rotate') && self.cardsSelected.length == 2) {
            
                self.cardsSelected[0].node.classList.remove('rotate');
                self.cardsSelected[1].node.classList.remove('rotate');

                self.cardsSelected[0].node.classList.remove('mismatch');
                self.cardsSelected[1].node.classList.remove('mismatch');

                self.cardsSelected = { length: 0 };

                target.node.classList.add('rotate');

                self.cardsSelected[0] = target;
                self.cardsSelected.length ++ ;
                
            }
        }
        
    });

}

//Новая игра
var myGame = new Game();
myGame.start();

