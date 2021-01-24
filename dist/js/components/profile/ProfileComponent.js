import { ComponentGroup } from "../../abstract/ComponentGroup";
import { Button } from "../_common/Button";
export class ProfileComponent extends ComponentGroup {
    constructor() {
        super([
            new Button("'/profile-change-data.html'", "Change user data", "'change__ref'"),
            new Button("'/profile-change-password.html'", "Change password", "change__ref"),
            new Button("'/index.html'", "Exit", "change__ref_alert"),
        ]);
    }
    getKeys() {
        return {};
    }
    getTemplate() {
        return `<div class="profile-container">
                    <div  class="profile-title">
                        <img class="profile-title__icon" src="img/owl.png" alt=""/>
                        <p class="profile-title__hover-message">Upload<br>image</p>
                        <label class="profile-title__label">John</label>
                    </div>
                
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
