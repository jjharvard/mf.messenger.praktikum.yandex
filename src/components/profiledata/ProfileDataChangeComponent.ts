import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {Button} from "../_common/Button.js";
import {Avatar} from "../_common/Avatar.js";
import {ValidatableInput} from "../_common/ValidatableInput.js";
import {Router} from "../../abstract/Router.js";
import {UsersApi} from "../../api/UsersApi.js";
import {StateUtil} from "../../utils/StateUtil.js";
import {UserProfile} from "../../abstract/StorageTypes.js";

export class ProfileDataChangeComponent extends ComponentGroup {

    constructor() {
        super([
            new ValidatableInput("profile", "email", "profile__input", "Email", "text", ""),
            new ValidatableInput("profile", "login", "profile__input", "Login", "text", ""),
            new ValidatableInput("profile", "first_name", "profile__input", "Name", "text", ""),
            new ValidatableInput("profile", "second_name", "profile__input", "Surname", "text", ""),
            new ValidatableInput("profile", "display_name", "profile__input", "Nickname", "text", ""),
            new ValidatableInput("profile", "phone", "profile__input", "Phone", "text", ""),
            new Avatar('none', ''),
            new Button("Save", "'profile-save__btn'")
        ]);
    }

    getKeys(): Keys {
        return {};
    }

    onViewCreated() {
        let saveBtn = <HTMLButtonElement>this.getChildElementsByName('Button')[0];
        let validatableInputs = <ValidatableInput[]>this.getChildComponentsByName('ValidatableInput');
        let avatar = <Avatar>this.getChildComponentsByName('Avatar')[0];
        let profileData = StateUtil.getUserProfile();
        validatableInputs.forEach(input => {
            input.getInput().value = <string>profileData[input.getInput().name as keyof UserProfile];
        });
        profileData.avatar && avatar.setAvatar(profileData.avatar);
        avatar.setName(profileData.first_name);
        this.validateOnClick(saveBtn, validatableInputs, () => {
            let data = validatableInputs.reduce((acc, input) =>
                Object.assign(acc, {[input.getInput().name]: input.getInput().value}), {});
            UsersApi.saveProfile(data)
                .then(response => {
                    if (response.ok) {
                        Router.getInstance().back();
                    }
                });
        });
    }

    getTemplate(): string {
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
}