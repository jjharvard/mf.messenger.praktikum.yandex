import { ComponentGroup } from "../../abstract/ComponentGroup.js";
import { Button } from "../_common/Button.js";
import { Avatar } from "../_common/Avatar.js";
import { Router } from "../../abstract/Router.js";
export class ProfileComponent extends ComponentGroup {
    constructor() {
        super([
            new Avatar('flex'),
            new Button("'#profile-change-data'", "Change user data", "'change__ref'"),
            new Button("'#profile-change-password'", "Change password", "change__ref"),
            new Button("'#index'", "Exit", "change__ref_alert"),
        ]);
    }
    getKeys() {
        return {};
    }
    onViewCreated() {
        if (super.onViewCreated()) {
            let btnExit = this.getChildElementsByName('Button')[2];
            btnExit.onclick = () => {
                Router.getInstance().popAll();
            };
            return true;
        }
        else {
            return false;
        }
    }
    getTemplate() {
        return `<div class="profile-container">
                    {{Avatar}}
                    <form class="profile">
                        <div class="profile__field">
                            <label class="profile__label" for="form__email">Email</label>
                            <input class="profile__input" id="form__email" value="john@yandex.ru" readonly>
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__login">Login</label>
                            <input class="profile__input" id="form__login" value="john" readonly>
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__name">Name</label>
                            <input class="profile__input" id="form__name" value="John" readonly>
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__surname">Surname</label>
                            <input class="profile__input" id="form__surname" value="Doe" readonly>
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__nickname">Chat Nickname</label>
                            <input class="profile__input" id="form__nickname" value="Johnny" readonly>
                        </div>
                        <div class="profile__field">
                            <label class="profile__label" for="form__phone">Phone</label>
                            <input class="profile__input" id="form__phone" value="8(900)909-99-00" readonly>
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
                
                    <div class="upload-modal">
                        <div class="upload-modal__content">
                            <b class="upload-modal__title">Upload File</b>
                            <form class="upload-modal__action" method="post" enctype="multipart/form-data"></form>
                            <button class="upload-modal__btn_submit">Change</button>
                        </div>
                    </div>
                
                </div>`;
    }
}
//# sourceMappingURL=ProfileComponent.js.map