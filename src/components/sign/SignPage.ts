import {ViewGroup} from "../../abstract/ViewGroup";

export class SignPage extends ViewGroup {

    signBtnId = 'signBtnId';

    getKeys(): Keys {
        return {
            'signBtnId': this.signBtnId
        };
    }

    getTemplate(): string {
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
                            <button id="{{signBtnId}}" class="sign__btn_main">Registration</button>
                            <button onclick="location.href='/index.html'" class="sign__btn_secondary">Login</button>
                        </div>
                    </div>
                </div>`;
    }

    onViewCreated(payload: Payload) {
        this.validate('signBtnId')
    }

}