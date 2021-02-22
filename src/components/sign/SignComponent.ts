import {ComponentGroup} from '../../content/ComponentGroup';
import {Button} from '../_common/Button';
import {ValidatableInput} from '../_common/ValidatableInput';
import {Router} from '../../content/Router';
import {AuthApi} from '../../api/AuthApi';

export class SignComponent extends ComponentGroup {
    constructor() {
        super([
            new ValidatableInput('auth', 'email', 'auth__input', 'Email', 'text', ''),
            new ValidatableInput('auth', 'login', 'auth__input', 'Login', 'text', ''),
            new ValidatableInput('auth', 'first_name', 'auth__input', 'Name', 'text', ''),
            new ValidatableInput('auth', 'second_name', 'auth__input', 'Surname', 'text', ''),
            new ValidatableInput('auth', 'phone', 'auth__input', 'Phone', 'text', ''),
            new ValidatableInput('auth', 'password', 'auth__input', 'Password', 'password', ''),
            new ValidatableInput('auth', 'confirm_password', 'auth__input', 'Confirm Password', 'password', ''),
            new Button('Registration', '\'sign__btn_main\''),
            new Button('Login', 'sign__btn_secondary'),
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

    onViewCreated() {
        const btnSign = <HTMLButtonElement> this.getChildElementsByName('Button')[0];
        const validatableInputs = <ValidatableInput[]> this.getChildComponentsByName('ValidatableInput');
        this.validateOnClick(btnSign, validatableInputs, () => {
            const requestData = validatableInputs.reduce((acc, input) =>
                Object.assign(acc, {[input.getInput().name]: input.getInput().value}), {});
            AuthApi.signUp(requestData)
                .then(response => {
                    if (response.ok) {
                        AuthApi.userInfo()
                            .then(response => {
                                if (response.ok) {
                                    Router.getInstance().push('/chat');
                                }
                            });
                    } else {
                        const message = JSON.parse(response.data)['reason'];
                        validatableInputs[0].showMessage(message);
                    }
                });
        });
        const btnLogin = <HTMLButtonElement> this.getChildElementsByName('Button')[1];
        btnLogin.onclick = () => {
            Router.getInstance().push('/login');
        };
    }
}
