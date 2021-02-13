import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {Button} from "../_common/Button.js";
import {Avatar} from "../_common/Avatar.js";
import {Router} from "../../abstract/Router.js";
import {AuthApi} from "../../api/AuthApi.js";
import {Input} from "../_common/Input.js";
import {StateUtil} from "../../utils/StateUtil.js";
import {Modal} from "../_common/Modal.js";
import {UserProfile} from "../../abstract/StorageTypes.js";

export class ProfileComponent extends ComponentGroup {

    constructor() {
        super([
            new Avatar('flex', ''),
            new Input("email", "profile__input", "", "text", "", 'readonly'),
            new Input("login", "profile__input", "", "text", "", 'readonly'),
            new Input("first_name", "profile__input", "", "text", "", 'readonly'),
            new Input("second_name", "profile__input", "", "text", "", 'readonly'),
            new Input("display_name", "profile__input", "", "text", "", 'readonly'),
            new Input("phone", "profile__input", "", "text", "", 'readonly'),
            new Button("Change user data", "'change__ref'"),
            new Button("Change password", "change__ref"),
            new Button("Exit", "change__ref_alert"),
            new Modal()
        ]);
    }

    getKeys(): Keys {
        return {};
    }

    initInputs(userProfile: UserProfile) {
        let inputs = <HTMLInputElement[]>this.getChildElementsByName('Input');
        inputs.forEach((input) => {
            let key = input.name;
            input.value = <string>userProfile[key as keyof UserProfile];
        });
        let avatar = <Avatar>this.getChildComponentsByName('Avatar')[0];
        userProfile.avatar && avatar.setAvatar(userProfile.avatar);
        avatar.setName(userProfile.first_name);
        let modal = <Modal>this.getChildComponentsByName('Modal')[0];
        modal.onChangedCallback = () => {
            avatar.setAvatar(StateUtil.getUserProfile().avatar!);
        };
        let imgBtn = <HTMLElement>this.getDOMView()!.querySelector('.profile-title__hover-message');
        imgBtn.onclick = () => {
            modal.show();
        };
    }

    onViewCreated() {
        this.initInputs(StateUtil.getUserProfile());
        let btnChangeData: HTMLButtonElement = <HTMLButtonElement>this.getChildElementsByName('Button')[0];
        btnChangeData.onclick = () => {
            Router.getInstance().push('/profile-change-data');
        };
        let btnChangePass: HTMLButtonElement = <HTMLButtonElement>this.getChildElementsByName('Button')[1];
        btnChangePass.onclick = () => {
            Router.getInstance().push('/profile-change-password');
        };
        let btnExit: HTMLButtonElement = <HTMLButtonElement>this.getChildElementsByName('Button')[2];
        btnExit.onclick = () => {
            AuthApi.logOut().then(response => {
                if (response.ok) {
                    Router.getInstance().exit();
                }
            });
        };
    }

    getTemplate(): string {
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