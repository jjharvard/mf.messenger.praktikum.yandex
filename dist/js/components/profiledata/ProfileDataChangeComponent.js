import { ComponentGroup } from "../../abstract/ComponentGroup.js";
import { Button } from "../_common/Button.js";
import { Avatar } from "../_common/Avatar.js";
export class ProfileDataChangeComponent extends ComponentGroup {
    constructor() {
        super([
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
                            <input name="email" class="profile__input should_be_validated" id="form__email" value="john@yandex.ru">
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__login">Login</label>
                            <input name="login" class="profile__input should_be_validated" id="form__login" value="john">
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__name">Name</label>
                            <input name="name" class="profile__input should_be_validated" id="form__name" value="John">
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__surname">Surname</label>
                            <input name="name" class="profile__input should_be_validated" id="form__surname" value="Doe">
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__nickname">Chat Nickname</label>
                            <input name="nickname" class="profile__input should_be_validated" id="form__nickname" value="Johnny">
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__phone">Phone</label>
                            <input name="phone" class="profile__input should_be_validated" id="form__phone" value="8(900)909-99-00">
                        </div>
                
                    </form>
                
                    <div class="profile-save">
                        {{Button}}
                    </div>
                </div>`;
    }
    onViewCreated() {
        let id = this.getChildElementsByName('Button')[0].id;
        this.validate(id, () => {
            location.href = '/profile.html';
        });
    }
}
//# sourceMappingURL=ProfileDataChangeComponent.js.map