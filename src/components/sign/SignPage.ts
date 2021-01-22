import {ViewGroup} from "../../abstract/ViewGroup";

export class SignPage extends ViewGroup {
    getProps(): Props2 {
        return {};
    }

    getTemplate(): string {
        return `<div class="sign-container">
                    <div class="sign">
                        <h1 class="sign__title">Registration</h1>
                        <form id="formElem" class="sign__form" action="">
                            <input name="email" class="auth__input" text="" placeholder="Email">
                            <input name="login" class="auth__input" text="" placeholder="Login">
                            <input name="name" class="auth__input" text="" placeholder="Name">
                            <input name="surname" class="auth__input" text="" placeholder="Surname">
                            <input name="phone" class="auth__input" text="" placeholder="Phone">
                            <input name="password" class="auth__input" text="" placeholder="Password" type="password">
                            <input name="confirm_password" class="auth__input" text="" placeholder="Confirm Password" type="password">
                        </form>
                        <div class="sign__btn-group">
                            <button class="sign__btn_main">Registration</button>
                            <button onclick="location.href='/index.html'" class="sign__btn_secondary">Login</button>
                        </div>
                    </div>
                </div>`;
    }

}