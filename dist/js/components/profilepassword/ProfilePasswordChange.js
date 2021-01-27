import { ComponentGroup } from "../../abstract/ComponentGroup";
import { Button } from "../_common/Button";
export class ProfilePasswordChange extends ComponentGroup {
    constructor() {
        super([new Button("''", "Save", "'profile-save__btn'")]);
    }
    getKeys() {
        return {};
    }
    getTemplate() {
        return `<div class="profile-container">
                    <div  class="profile-title">
                        <img class="profile-title__icon" src="img/owl.png" alt=""/>
                        <label class="profile-title__label">John</label>
                    </div>
                
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
    onViewCreated(payload) {
        let id = this.getChildrenByName('Button')[0].id;
        this.validate(id, () => {
            location.href = '/profile.html';
        });
    }
}
