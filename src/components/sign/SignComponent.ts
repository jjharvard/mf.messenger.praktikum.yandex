import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {Button} from "../_common/Button.js";
import {ValidatableInput} from "../_common/ValidatableInput.js";
import {Router} from "../../abstract/Router.js";

export class SignComponent extends ComponentGroup {

    constructor() {
        super([
            new ValidatableInput('auth', 'email', 'auth__input', 'Email', 'text', ''),
            new ValidatableInput('auth', 'login', 'auth__input', 'Login', 'text', ''),
            new ValidatableInput('auth', 'name', 'auth__input', 'Name', 'text', ''),
            new ValidatableInput('auth', 'surname', 'auth__input', 'Surname', 'text', ''),
            new ValidatableInput('auth', 'phone', 'auth__input', 'Phone', 'text', ''),
            new ValidatableInput('auth', 'password', 'auth__input', 'Password', 'password', ''),
            new ValidatableInput('auth', 'confirm_password', 'auth__input', 'Confirm Password', 'password', ''),
            new Button("Registration", "'sign__btn_main'"),
            new Button("Login", "sign__btn_secondary"),
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
                            {{ValidatableInput}}
                            {{ValidatableInput}}
                            {{ValidatableInput}}
                            {{ValidatableInput}}
                            {{ValidatableInput}}
                            {{ValidatableInput}}
                            {{ValidatableInput}}
                        </form>
                        <div class="sign__btn-group">
                            {{Button}}
                            {{Button}}
                        </div>
                    </div>
                </div>`;
    }

    onViewCreated(): boolean {
        if (super.onViewCreated()) {
            let btnSign = <HTMLButtonElement>this.getChildElementsByName('Button')[0];
            let validatableInputs = <ValidatableInput[]>this.getChildComponentsByName('ValidatableInput');
            this.validateOnClick(btnSign, validatableInputs, () => {
                console.log('/registration');
            });
            let btnLogin = <HTMLButtonElement>this.getChildElementsByName('Button')[1];
            btnLogin.onclick = () => {
                Router.getInstance().push('/login');
            };
            return true;
        } else {
            return false;
        }
    }

}