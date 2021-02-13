import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {Button} from "../_common/Button.js";
import {Avatar} from "../_common/Avatar.js";
import {ValidatableInput} from "../_common/ValidatableInput.js";
import {Router} from "../../abstract/Router.js";
import {UsersApi} from "../../api/UsersApi.js";
import {UserProfile} from "../../abstract/StorageTypes.js";
import {StateUtil} from "../../utils/StateUtil.js";

export class ProfilePassChangeComponent extends ComponentGroup {

    constructor() {
        super([
            new Avatar('none', ''),
            new ValidatableInput('profile', 'password', 'profile__input', '', 'password', '123456'),
            new ValidatableInput('profile', 'password', 'profile__input', '', 'password', ''),
            new ValidatableInput('profile', 'password', 'profile__input', '', 'password', ''),
            new Button("Save", "'profile-save__btn'")
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
                            {{ValidatableInput}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__password_new">New Password</label>
                            {{ValidatableInput}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__password_repeat">Repeat New Password</label>
                            {{ValidatableInput}}
                        </div>
                    </form>
                
                    <div class="profile-save">
                        {{Button}}
                    </div>
                </div>`;
    }

    onViewCreated(): boolean {
        if (super.onViewCreated()) {
            let signBtn = <HTMLButtonElement>this.getChildElementsByName('Button')[0];
            let avatar = <Avatar>this.getChildComponentsByName('Avatar')[0];
            let profileData = StateUtil.getUserProfile();
            avatar.setAvatar(<string>profileData['avatar' as keyof UserProfile]);
            let validatableInputs = <ValidatableInput[]>this.getChildComponentsByName('ValidatableInput');
            this.validateOnClick(signBtn, validatableInputs, () => {
                let keys = ['oldPassword', 'newPassword'];
                let data = keys.reduce((acc, key, i) =>
                    Object.assign(acc, {[key]: validatableInputs[i].getInput().value}), {});
                UsersApi.changePassword(data)
                    .then(response => {
                        if (response.ok) {
                            Router.getInstance().back();
                        } else {
                            let message = JSON.parse(response.data)['reason'];
                            validatableInputs[1].showMessage(message);
                        }
                    });
            });
            return true;
        } else {
            return false;
        }
    }
}