import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {Button} from "../_common/Button.js";
import {ValidatableInput} from "../_common/ValidatableInput.js";

export class LoginComponent extends ComponentGroup {

    constructor() {
        super([
            new ValidatableInput("login", "auth__input should_be_validated", "Login", "text"),
            new ValidatableInput("password", "auth__input should_be_validated", "Password", "password"),
            new Button("", "Authorise", "'auth__btn_main'"),
            new Button("'/sign.html'", "No Account?", "'auth__btn_secondary'"),
        ]);
    }

    getKeys(): Keys {
        return {};
    }

    getTemplate(): string {
        return `<div class="auth-container">
                    <div class="auth">
                        <h1 class="auth__title">Enter</h1>
                        <form class="auth__form" action="">
                            {{ValidatableInput}}
                            {{ValidatableInput}}
                        </form>
                        <div class="auth__btn-group">
                            {{Button}}
                            {{Button}}
                        </div>
                    </div>
                </div>`;
    }

    onViewCreated() {
        let signBtn = <HTMLButtonElement>this.getChildElementsByName('Button')[0];
        let validatableInputs = <ValidatableInput[]>this.getChildComponentsByName('ValidatableInput');
        this.validateOnClick(signBtn, validatableInputs, () => {
            location.href = '/chat.html';
        });
    }

}