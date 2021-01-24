import {ComponentGroup} from "../../abstract/ComponentGroup";
import {Button} from "../_common/Button";

export class LoginPage extends ComponentGroup {

    constructor() {
        super([
            new Button("''", "Authorise", "'auth__btn_main'"),
            new Button("'/sign.html'", "No Account?", "auth__btn_secondary"),
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
                            <input name="login" class="auth__input should_be_validated" text="" placeholder="Login">
                            <input name="password" class="auth__input should_be_validated" text="" placeholder="Password" type="password">
                        </form>
                        <div class="auth__btn-group">
                            {{Button}}
                            {{Button}}
                        </div>
                    </div>
                </div>`;
    }

    onViewCreated(payload: Payload) {
        let id = this.getChildrenByName('Button')[0].id
        this.validate(id, () => {
            location.href = '/chat.html'
        })
    }

}