import { ViewGroup } from "../../abstract/ViewGroup";
export class SignPage extends ViewGroup {
    constructor() {
        super(...arguments);
        this.signBtnId = 'signBtnId';
    }
    getProps() {
        return {
            'signBtnId': this.signBtnId
        };
    }
    getTemplate() {
        return `<div class="sign-container">
                    <div class="sign">
                        <h1 class="sign__title">Registration</h1>
                        <form id="formElem" class="sign__form" action="">
                            <input name="email" class="auth__input should_be_validated" text="" placeholder="Email">
                            <input name="login" class="auth__input should_be_validated" text="" placeholder="Login">
                            <input name="name" class="auth__input should_be_validated" text="" placeholder="Name">
                            <input name="surname" class="auth__input should_be_validated" text="" placeholder="Surname">
                            <input name="phone" class="auth__input should_be_validated" text="" placeholder="Phone">
                            <input name="password" class="auth__input should_be_validated" text="" placeholder="Password" type="password">
                            <input name="confirm_password" class="auth__input should_be_validated" text="" placeholder="Confirm Password" type="password">
                        </form>
                        <div class="sign__btn-group">
                            <button id="{{signBtnId}}" class="sign__btn_main" onclick="{{hello}}">Registration</button>
                            <button onclick="location.href='/index.html'" class="sign__btn_secondary">Login</button>
                        </div>
                    </div>
                </div>`;
    }
    onViewCreated(payload) {
        console.log('Hello Chat Page');
        let btnSign = document.getElementById('signBtnId');
        btnSign.onclick = function () {
            inputsArray.forEach(input => {
                input.setAttribute('style', 'background: #00f;');
            });
        };
        let inputsArray = Array.from(document.getElementsByClassName('should_be_validated'));
        inputsArray.forEach(input => {
            input.onfocus = function (event) {
                let inputId = event.target.name;
                switch (inputId) {
                    case 'email':
                        console.log('email hello');
                }
                event.currentTarget.setAttribute('style', 'border-color: red;');
            };
            input.onblur = function (event) {
                event.currentTarget.setAttribute('style', 'border-color: black;');
            };
        });
    }
}
