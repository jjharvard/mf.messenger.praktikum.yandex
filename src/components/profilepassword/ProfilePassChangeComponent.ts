import {ComponentGroup} from '../../content/ComponentGroup';
import {Button} from '../_common/Button';
import {Avatar} from '../_common/Avatar';
import {ValidatableInput} from '../_common/ValidatableInput';
import {Router} from '../../content/Router';
import {UsersApi} from '../../api/UsersApi';
import {StateUtil} from '../../utils/StateUtil';

export class ProfilePassChangeComponent extends ComponentGroup {
    constructor() {
        super([
            new Avatar('none', ''),
            new ValidatableInput('profile', 'password', 'profile__input', '', 'password', ''),
            new ValidatableInput('profile', 'password', 'profile__input', '', 'password', ''),
            new ValidatableInput('profile', 'password', 'profile__input', '', 'password', ''),
            new Button('Save', '\'profile-save__btn\'')
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

    onViewCreated() {
        const signBtn = <HTMLButtonElement> this.getChildElementsByName('Button')[0];
        const avatar = <Avatar> this.getChildComponentsByName('Avatar')[0];
        const profileData = StateUtil.getUserProfile();
        profileData.avatar && avatar.setAvatar(profileData.avatar);
        avatar.setName(profileData.first_name);
        const validatableInputs = <ValidatableInput[]> this.getChildComponentsByName('ValidatableInput');
        this.validateOnClick(signBtn, validatableInputs, () => {
            const keys = ['oldPassword', 'newPassword'];
            const data = keys.reduce((acc, key, i) =>
                Object.assign(acc, {[key]: validatableInputs[i].getInput().value}), {});
            UsersApi.changePassword(data)
                .then(response => {
                    if (response.ok) {
                        Router.getInstance().back();
                    } else {
                        const message = JSON.parse(response.data)['reason'];
                        validatableInputs[1].showMessage(message);
                    }
                });
        });
    }
}
