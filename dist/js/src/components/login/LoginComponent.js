import { ComponentGroup } from "../../abstract/ComponentGroup.js";
import { Button } from "../_common/Button.js";
import { ValidatableInput } from "../_common/ValidatableInput.js";
import { Router } from "../../abstract/Router.js";
import { AuthApi } from "../../api/AuthApi.js";
export class LoginComponent extends ComponentGroup {
    constructor() {
        super([
            new ValidatableInput("auth", "login", "auth__input", "Login", "text", ''),
            new ValidatableInput("auth", "password", "auth__input", "Password", "password", ''),
            new Button("Authorise", "auth__btn_main"),
            new Button("No Account?", "'auth__btn_secondary'"),
        ]);
    }
    getKeys() {
        return {};
    }
    getTemplate() {
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
        if (super.onViewCreated()) {
            let btnSign = this.getChildElementsByName('Button')[0];
            let validatableInputs = this.getChildComponentsByName('ValidatableInput');
            let loginInput = validatableInputs[0];
            let passwordInput = validatableInputs[1];
            this.validateOnClick(btnSign, validatableInputs, () => {
                AuthApi.signIn(loginInput.input.value, passwordInput.input.value)
                    .then(response => {
                    if (response.ok) {
                        Router.getInstance().push('/chat');
                    }
                });
            });
            let btnNoAccount = this.getChildElementsByName('Button')[1];
            btnNoAccount.onclick = () => {
                Router.getInstance().push('/sign');
            };
            return true;
        }
        else {
            return false;
        }
    }
}
//# sourceMappingURL=LoginComponent.js.map