//Способ №1: Обработчик на каждой карте
/* var cards = Array.from(document.querySelectorAll('.card'));
cards.forEach(function(element) {
    element.addEventListener('click', function(event){
        if (this.classList.contains('active')){
            this.classList.remove('active');
        } else {
            this.classList.add('active');
        }
        
    });
}); */

//Способ №2: Делегируем обработку на карточное поле
document.querySelector('.playground').addEventListener('click', function(event) {
    if (event.target.classList.contains('side')) {
        if (event.target.parentNode.classList.contains('active')){
            event.target.parentNode.classList.remove('active');
        } else {
            event.target.parentNode.classList.add('active');
        }
    }
});

