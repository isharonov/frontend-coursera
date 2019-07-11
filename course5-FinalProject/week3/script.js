//Вспомогательные методы для массивов
//Удвоить элементы
Array.prototype.valueX2 = function() {
    return this.concat(this);
}
//Перемешать элементы в случайном порядке
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
    //Параметры игры вцелом
    this.playground = document.getElementById('playground');
    this.values = this.playground.dataset.memoji.split(' ').valueX2();
    this.timer = document.getElementById('timer');
    this.duration = this.timer.dataset.duration;
    this.messages = {
        win: '<div class="messageBox"><h2 class="messageText"><span>W</span><span>i</span><span>n</span></h2><button class="messageButton">Play again</button></div>',
        lose: '<div class="messageBox"><h2 class="messageText"><span>L</span><span>o</span><span>s</span><span>e</span></h2><button class="messageButton">Try again</button></div>'
    }

    //Параметры партии
    this.cards = {};
    this.cardsSelected = { length: 0 };
    this.cardsFlipped = 0;
    this.isStarted = false;
}
Game.prototype.setPlayground = function(gameObj) {
    //Перемешиваем карточки
    gameObj.values.valueShuffle();

    //Раскладываем карточки
    gameObj.playground.innerHTML = '';
    for (var i = 0; i < gameObj.values.length; i++) {
        gameObj.cards[i] = new Card(i, gameObj.values[i]);
        gameObj.playground.appendChild(gameObj.cards[i].createNode());
    }

    //Выставляем таймер
    if (gameObj.duration % 60 < 10) {
        gameObj.timer.innerText = Math.floor(gameObj.duration / 60) + ':0' + gameObj.duration % 60;
    } else {
        gameObj.timer.innerText = Math.floor(gameObj.duration / 60) + ':' + gameObj.duration % 60;
    }
}
Game.prototype.runTimer = function(gameObj) {
    var seconds = gameObj.duration,
        timer = gameObj.timer;
    
    gameObj.timerRender = setInterval(function(){
        seconds--;
        if (seconds >= 10) {
            timer.innerText = '0:' + seconds;
        } else if (seconds < 10 && seconds > 0) {
            timer.innerText = '0:0' + seconds;
        } else if (seconds == 0) {
            timer.innerText = '0:0' + seconds;
            clearInterval(gameObj.timerRender);
        }    
    }, 1000);

    gameObj.timerOut = setTimeout(function(){
        if (gameObj.cardsFlipped !== gameObj.values.length) {
            gameObj.showResult(gameObj, 'lose');
        }
    }, seconds * 1000);
};
Game.prototype.showResult = function(gameObj, result) {

    clearInterval(gameObj.timerRender);

    var node = document.createElement('div');
    node.setAttribute('id', 'message');
    node.innerHTML = gameObj.messages[result];
    gameObj.playground.appendChild(node);
}
Game.prototype.reset = function(gameObj) {
    clearTimeout(gameObj.timerOut);
    clearInterval(gameObj.timerRender);
    gameObj.cards = {};
    gameObj.cardsSelected = { length: 0 };
    gameObj.cardsFlipped = 0;
    gameObj.isStarted = false;
}
Game.prototype.start = function() {
    
    this.setPlayground(this);

    //Сохраняем контекст объекта игры
    var self = this;

    //Делегируем обработку кликов на карточках
    this.playground.addEventListener('click', function(event){

        //Обрабатываем клики на карточках
        if (event.target.classList.contains('side')){

            var target = self.cards[event.target.parentNode.id];

            //00 - При первом клике начинаем партию и запускаем игровой таймер
            if (!self.isStarted) {
                self.isStarted = true;
                self.runTimer(self);
            }

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
                        self.cardsFlipped += 2;

                        if (self.cardsFlipped == self.values.length) {

                            //Победа!
                            self.showResult(self, 'win');
                        }

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

        //Обрабатываем клик на кнопке
        if (event.target.tagName == 'BUTTON') {
            self.reset(self);
            self.setPlayground(self);
        }
        
    });

};

//Новая игра
var myGame = new Game();
myGame.start();