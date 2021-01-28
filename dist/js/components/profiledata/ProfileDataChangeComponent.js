import { ComponentGroup } from "../../abstract/ComponentGroup.js";
import { Button } from "../_common/Button.js";
import { Avatar } from "../_common/Avatar.js";
import { ValidatableInput } from "../_common/ValidatableInput.js";
export class ProfileDataChangeComponent extends ComponentGroup {
    constructor() {
        super([
            new ValidatableInput("profile", "email", "profile__input", "Email", "text", "john@yandex.ru"),
            new ValidatableInput("profile", "login", "profile__input", "Login", "text", "john"),
            new ValidatableInput("profile", "name", "profile__input", "Name", "text", "John"),
            new ValidatableInput("profile", "surname", "profile__input", "Surname", "text", "Doe"),
            new ValidatableInput("profile", "nickname", "profile__input", "Nickname", "text", "Johnny"),
            new ValidatableInput("profile", "phone", "profile__input", "Phone", "text", "8(900)909-99-00"),
            new Avatar('none'),
            new Button("'/profile.html'", "Save", "'profile-save__btn'")
        ]);
    }
    getKeys() {
        return {};
    }
    getTemplate() {
        return `<div class="profile-container">
                    {{Avatar}}
                    <form class="profile">
                        <div class="profile__field">
                            <label class="profile__label" for="form__email">Email</label>
                            {{ValidatableInput}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__login">Login</label>
                            {{ValidatableInput}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__name">Name</label>
                            {{ValidatableInput}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__surname">Surname</label>
                            {{ValidatableInput}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__nickname">Chat Nickname</label>
                            {{ValidatableInput}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__phone">Phone</label>
                            {{ValidatableInput}}
                        </div>
                    </form>
                
                    <div class="profile-save">
                        {{Button}}
                    </div>
                </div>`;
    }
    onViewCreated() {
        let signBtn = this.getChildElementsByName('Button')[0];
        let validatableInputs = this.getChildComponentsByName('ValidatableInput');
        this.validateOnClick(signBtn, validatableInputs, () => {
            location.href = '/profile.html';
        });
    }
}
//# sourceMappingURL=ProfileDataChangeComponent.js.map