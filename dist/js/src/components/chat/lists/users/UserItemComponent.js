import { Component } from "../../../../content/Component.js";
import { API_HOST } from "../../../../api/Client.js";
import { Consts } from "../../../../utils/Consts.js";
export class UserItemComponent extends Component {
    constructor(userData) {
        super();
        this.userData = userData;
    }
    getKeys() {
        return {
            "avatar": this.userData.avatar ? API_HOST + this.userData.avatar : Consts.DEFAULT_AVATAR,
            "login": this.userData.login
        };
    }
    onViewCreated() {
        this.checkbox = this.getDOMView().querySelector('.users-modal__checkbox');
    }
    getTemplate() {
        return `
            <div class="users-modal__item">
                <img class="users-modal__icon" src="{{avatar}}" alt=""/>
                <div class="users-modal__login">{{login}}</div>
                <input class="users-modal__checkbox" type="checkbox">
            </div>
        `;
    }
}
//# sourceMappingURL=UserItemComponent.js.map