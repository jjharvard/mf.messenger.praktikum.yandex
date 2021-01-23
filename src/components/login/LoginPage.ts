import {ViewGroup} from "../../abstract/ViewGroup";
import {SubmitButton} from "../_common/SubmitButton";

export class LoginPage extends ViewGroup {

    loginBtnId = 'loginBtnId';

    constructor() {
        super([
            new SubmitButton("'/chat.html'", "Authorise"),
            new SubmitButton("'/sign.html'", "No Account?"),
        ]);
    }

    getKeys(): Keys {
        return {
            'loginBtnId': this.loginBtnId
        };
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
                        
                            {{SubmitButton}}
                            {{SubmitButton}}
                            <!--<button id="{{loginBtnId}}" onclick="location.href='/chat.html'" class="auth__btn_main">Authorise</button>
                            <button onclick="location.href='/sign.html'" class="auth__btn_secondary">No Account?</button>-->
                        </div>
                    </div>
                </div>`;
    }

    onViewCreated(payload: Payload) {
        // this.validate(this.loginBtnId, () => {
        //     location.href = '/chat.html'
        // })
    }

}