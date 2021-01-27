import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {Button} from "../_common/Button.js";
import {Avatar} from "../_common/Avatar.js";

export class ProfilePassChangeComponent extends ComponentGroup {

    constructor() {
        super([
            new Avatar('none'),
            new Button("'/profile.html'", "Save", "'profile-save__btn'")
        ]);
    }

    getKeys(): Keys {
        return {};
    }

    getTemplate(): string {
        return `<div class="profile-container">
                   {{Avatar}}
                    <form class="profile">
                        <div class="profile__field">
                            <label class="profile__label" for="form__password_old">Old Password</label>
                            <input name="password" class="profile__input should_be_validated" type="password" id="form__password_old" value="123456">
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__password_new">New Password</label>
                            <input name="password" class="profile__input should_be_validated" type="password" id="form__password_new" value="654321">
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__password_repeat">Repeat New Password</label>
                            <input name="password" class="profile__input should_be_validated" type="password" id="form__password_repeat" value="654321">
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