import {ComponentGroup} from '../../content/ComponentGroup';
import {Button} from '../_common/Button';
import {ValidatableInput} from '../_common/ValidatableInput';
import {Router} from '../../content/Router';
import {AuthApi} from '../../api/AuthApi';

export class LoginComponent extends ComponentGroup {
    constructor() {
        super([
            new ValidatableInput('auth', 'login', 'auth__input', 'Login', 'text', ''),
            new ValidatableInput('auth', 'password', 'auth__input', 'Password', 'password', ''),
            new Button('Authorise', 'auth__btn_main'),
            new Button('No Account?', '\'auth__btn_secondary\''),
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
        const btnSign = <HTMLButtonElement> this.getChildElementsByName('Button')[0];
        const validatableInputs = <ValidatableInput[]> this.getChildComponentsByName('ValidatableInput');
        const loginInput = validatableInputs[0];
        this.validateOnClick(btnSign, validatableInputs, () => {
            const data = validatableInputs.reduce((acc, input) =>
                Object.assign(acc, {[input.getInput().name]: input.getInput().value}), {});
            AuthApi.signIn(data)
                .then(response => {
                    if (!response.ok) {
                        loginInput.showMessage(JSON.parse(response.data)['reason']);
                        return;
                    }
                    AuthApi.userInfo()
                        .then(response => {
                            if (!response.ok) {
                                loginInput.showMessage(JSON.parse(response.data)['reason']);
                                return;
                            }
                            Router.getInstance().push('/chat');
                        });
                });
        });
        const btnNoAccount = <HTMLButtonElement> this.getChildElementsByName('Button')[1];
        btnNoAccount.onclick = () => {
            Router.getInstance().push('/sign');
        };
    }
}
