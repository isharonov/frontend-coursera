'use strict';
//Скрываем от window все методы, кроме validateForm
(function () {
    function validateNumber(value, min, max) {
        value = parseInt(value);

        if (isNaN(value)) {
            return false;
        }
        // typeof(min) == string, поэтому условие выполнится даже если min == '0'
        if (min && value < parseInt(min)) {
            return false;
        }
        if (max && value > parseInt(max)) {
            return false;
        }

        return true;
    }

    function validateRegExp(value, pattern, flags) {
        var regExp = new RegExp(pattern, flags);

        return regExp.test(value);
    }

    function validateValue(value, dataset) {
        switch(dataset.validator) {
            case 'letters': 
                return validateRegExp(value, '^[a-zа-яё]+$', 'i');
            case 'number': 
                return validateNumber(value, dataset.validatorMin, dataset.validatorMax);
            case 'regexp': 
                return validateRegExp(value, dataset.validatorPattern);
            default: 
                return true;
        };
    }

    function checkInput(element) {
        var value = element.value;
        //Обязательность поля
        if (element.dataset.hasOwnProperty('required') && !value) {
            return false;
        }

        //Валидация
        var validator = element.dataset.validator;

        return (validator && value) 
            ? validateValue(value, element.dataset)
            : true;
        
    };
    // Код валидации формы
    window.validateForm = function(options) {

        var form = document.getElementById(options.formId),
            inputs = Array.from(form.querySelectorAll('input'));

        //Класс с ошибкой (inputErrorClass) удаляется при фокусе на элемент (focus)
        form.addEventListener('focus', function(event) {
            var target = event.target;
            if (target.tagName === 'INPUT') {
                target.classList.remove(options.inputErrorClass);
            };
        }, true);

        //При потере фокуса (blur) элемента input вызывается проверка для этого элемента
        form.addEventListener('blur', function(event){
            var target = event.target;
            if (target.tagName === 'INPUT') {
                if (!checkInput(target)) {
                    target.classList.add(options.inputErrorClass);
                };
            };   
        }, true);

        form.addEventListener('submit', function(event){
            event.preventDefault();
            form.classList.remove(options.formValidClass);
            form.classList.remove(options.formInvalidClass);

            //Проверка всех элементов формы
            var hasError = false;
            inputs.forEach(function(currentInput){
                if (!checkInput(currentInput)) {
                    currentInput.classList.add(options.inputErrorClass);
                    hasError = true;
                };
            });

            //Сообщение о наличии ошибок
            if (hasError) {
                form.classList.add(options.formInvalidClass);
            } else {
                form.classList.add(options.formValidClass);
            }
        });
    };
}());