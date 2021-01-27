import { Component } from "./Component.js";
export class Validatable extends Component {
    validate(buttonId, onValidated) {
        let checkInputs = (input) => {
            let hasError = false;
            let inputMessage = '';
            switch (input.name) {
                case 'email':
                    hasError = !/^\S+@\S+\.[a-z]{2,5}$/.test(input.value);
                    inputMessage = 'Should contain valid email';
                    break;
                case 'login':
                case 'name':
                case 'surname':
                case 'nickname':
                    hasError = !/^[a-zA-Z\-]+$/.test(input.value);
                    inputMessage = 'Should contain letters only';
                    break;
                case 'phone':
                    hasError = !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
                    inputMessage = 'Should contain valid phone';
                    break;
                case 'password':
                case 'confirm_password':
                    hasError = !/^(\S){6,25}$/.test(input.value);
                    inputMessage = 'Password length from 6 to 25';
                    break;
                default:
                    break;
            }
            if (hasError) {
                input.setAttribute('style', 'border: 2px solid #fa3e3e;');
                input.value = '';
                input.placeholder = inputMessage;
            }
            return hasError;
        };
        let inputsArray = Array.from(document.getElementsByClassName('should_be_validated'));
        let btnSign = document.getElementById(buttonId);
        btnSign.onclick = function () {
            let next = true;
            inputsArray.forEach(input => {
                let hasError = checkInputs(input);
                if (hasError && next) {
                    next = false;
                }
            });
            if (next) {
                onValidated();
            }
        };
        inputsArray.forEach(input => {
            input.onfocus = function (event) {
                event.currentTarget.setAttribute('style', 'border: 2px solid #dfe3ee;');
            };
            input.onblur = function (event) {
                let input = event.target;
                checkInputs(input);
            };
        });
    }
}
//# sourceMappingURL=Validatable.js.map