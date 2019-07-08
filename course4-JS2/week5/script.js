'use strict';

// Код валидации формы
function validateForm(params) {

    function addErrorClass(element) {
        element.classList.add(params.inputErrorClass);
    }

    function checkInputs(element) {

        //Обязательность поля
        if (element.hasAttribute('data-required')) {
            if (!element.value) {
                addErrorClass(element);
            };
        };

        //Валидация
        switch(element.dataset.validator) {
            case 'letters': //Валидатор letters
                if (!/^[a-zA-Zа-яА-яё]*$/.test(element.value)) {
                    addErrorClass(element);
                }; 
                break;
            case 'number': //Валидатор number
                if (!/^[0-9]*$/.test(element.value)) {
                    addErrorClass(element);
                };
                if (parseInt(element.value) > parseInt(element.dataset.validatorMax) || 
                    parseInt(element.value) < parseInt(element.dataset.validatorMin)) {
                        addErrorClass(element);
                };
                break;
            case 'regexp': //Валидатор regexp
                if (element.value) {
                    if (!element.value.match(element.dataset.validatorPattern)) {
                        addErrorClass(element);
                    };
                }     
                break;
        };
    };

    var form = document.getElementById(params.formId);

    form.addEventListener('submit', function(event){
        event.preventDefault();

        //Проверка всех элементов формы
        var elements = Array.from(form.querySelectorAll('input')),
            errors = 0;
        elements.forEach(function(currentElement){
            checkInputs(currentElement);
            if (currentElement.classList.contains(params.inputErrorClass)) {
                errors++;
            }
        });

        //Сообщение о наличии ошибок
        if (errors) {
            form.classList.remove(params.formValidClass);
            form.classList.add(params.formInvalidClass);
        } else {
            form.classList.remove(params.formInvalidClass);
            form.classList.add(params.formValidClass);
        }
    });

    //Класс с ошибкой (inputErrorClass) удаляется при фокусе на элемент (focus)
    form.addEventListener('focus', function(event) {
        if (event.target.tagName === 'INPUT') {
            event.target.classList.remove(params.inputErrorClass);
        };
    }, true);

    //При потере фокуса (blur) элемента input вызывается проверка для этого элемента
    form.addEventListener('blur', function(event){
        if (event.target.tagName === 'INPUT') {
            checkInputs(event.target);
        };   
    }, true);

    
};