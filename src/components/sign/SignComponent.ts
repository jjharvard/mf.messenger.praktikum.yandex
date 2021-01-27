import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {Button} from "../_common/Button.js";

export class SignComponent extends ComponentGroup {

    constructor() {
        super([
            new Button("'/chat.html'", "Registration", "'sign__btn_main'"),
            new Button("'/index.html'", "Login", "sign__btn_secondary"),
        ]);
    }

    getKeys(): Keys {
        return {};
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
                            {{Button}}
                            {{Button}}
                        </div>
                    </div>
                </div>`;
    }

    onViewCreated() {
        let id = this.getChildElementsByName('Button')[0].id;
        this.validate(id, () => {
            console.log('registration');
        });
    }

}