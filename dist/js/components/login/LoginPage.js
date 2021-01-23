import { ViewGroup } from "../../abstract/ViewGroup";
import { SubmitButton } from "../_common/SubmitButton";
export class LoginPage extends ViewGroup {
    constructor() {
        super([
            new SubmitButton("'/chat.html'", "Authorise", "'auth__btn_main'"),
            new SubmitButton("'/sign.html'", "No Account?", "auth__btn_secondary"),
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
                            {{SubmitButton}}
                            {{SubmitButton}}
                        </div>
                    </div>
                </div>`;
    }
    onViewCreated(payload) {
        let id = this.getChildrenByName('SubmitButton')[0].id;
        this.validate(id, () => {
            location.href = '/chat.html';
        });
    }
}
