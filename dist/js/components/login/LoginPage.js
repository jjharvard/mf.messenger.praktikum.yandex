import { ViewGroup } from "../../abstract/ViewGroup";
import { Button } from "../_common/Button";
export class LoginPage extends ViewGroup {
    constructor() {
        super([
            new Button("'/chat.html'", "Authorise", "'auth__btn_main'"),
            new Button("'/sign.html'", "No Account?", "auth__btn_secondary"),
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
    onViewCreated(payload) {
        let id = this.getChildrenByName('Button')[0].id;
        this.validate(id, () => {
            location.href = '/chat.html';
        });
    }
}
