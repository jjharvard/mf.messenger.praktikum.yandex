import { ComponentGroup } from "../../content/ComponentGroup";
import { Button } from "../_common/Button";
import { Avatar } from "../_common/Avatar";
import { Router } from "../../content/Router";
import { AuthApi } from "../../api/AuthApi";
import { Input } from "../_common/Input";
import { StateUtil } from "../../utils/StateUtil";
import { ModalBuilder } from "../_common/Modal";
import { UsersApi } from "../../api/UsersApi";
export class ProfileComponent extends ComponentGroup {
    constructor() {
        super([
            new Avatar('flex', ''),
            new Input("email", "profile__input", "", "text", "", "readonly"),
            new Input("login", "profile__input", "", "text", "", "readonly"),
            new Input("first_name", "profile__input", "", "text", "", "readonly"),
            new Input("second_name", "profile__input", "", "text", "", "readonly"),
            new Input("display_name", "profile__input", "", "text", "", "readonly"),
            new Input("phone", "profile__input", "", "text", "", "readonly"),
            new Button("Change user data", "'change__ref'"),
            new Button("Change password", "change__ref"),
            new Button("Exit", "change__ref_alert"),
            new ModalBuilder()
                .withTitle("Change avatar")
                .withUpload("Choose image on your computer")
                .withButton('Submit').build()
        ]);
    }
    getKeys() {
        return {};
    }
    initInputs(userProfile) {
        let inputs = this.getChildElementsByName('Input');
        inputs.forEach((input) => {
            let key = input.name;
            input.value = userProfile[key];
        });
        let avatar = this.getChildComponentsByName('Avatar')[0];
        userProfile.avatar && avatar.setAvatar(userProfile.avatar);
        avatar.setName(userProfile.first_name);
        let modal = this.getChildComponentsByName('Modal')[0];
        modal.onChangedCallback = (files) => {
            UsersApi.changeAvatar(files)
                .then(_ => {
                avatar.setAvatar(StateUtil.getUserProfile().avatar);
                modal.hide();
            });
        };
        let imgBtn = this.getDOMView().querySelector('.profile-title__hover-message');
        imgBtn.onclick = () => {
            modal.show();
        };
    }
    onViewCreated() {
        this.initInputs(StateUtil.getUserProfile());
        let btnChangeData = this.getChildElementsByName('Button')[0];
        btnChangeData.onclick = () => {
            Router.getInstance().push('/profile-change-data');
        };
        let btnChangePass = this.getChildElementsByName('Button')[1];
        btnChangePass.onclick = () => {
            Router.getInstance().push('/profile-change-password');
        };
        let btnExit = this.getChildElementsByName('Button')[2];
        btnExit.onclick = () => {
            AuthApi.logOut().then(response => {
                if (response.ok) {
                    Router.getInstance().exit();
                }
            });
        };
    }
    getTemplate() {
        return `<div class="profile-container">
                    {{Avatar}}
                    <form class="profile">
                        <div class="profile__field">
                            <label class="profile__label" for="form__email">Email</label>
                            {{Input}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__login">Login</label>
                            {{Input}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__name">Name</label>
                            {{Input}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__surname">Surname</label>
                            {{Input}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__nickname">Chat Nickname</label>
                            {{Input}}
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__phone">Phone</label>
                            {{Input}}
                        </div>
                    </form>
                
                    <div class="change">
                        <div class="change__field">
                            {{Button}}
                        </div>
                        <class class="change__field">
                            {{Button}}
                        </class>
                        <class class="change__field">
                            {{Button}}
                        </class>
                    </div>
                    {{Modal}}
                </div>`;
    }
}
//# sourceMappingURL=ProfileComponent.js.map