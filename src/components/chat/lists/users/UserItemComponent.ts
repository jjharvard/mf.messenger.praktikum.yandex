import {Component} from "../../../../content/Component";
import {UserData} from "../../../../content/StorageTypes";
import {Consts} from "../../../../utils/Consts";
import {API_HOST} from "../../../../content/HTTPTransport";

export class UserItemComponent extends Component {

    checkbox: HTMLInputElement;

    constructor(private userData: UserData) {
        super();
    }

    getKeys(): Keys {
        return {
            "avatar": this.userData.avatar ? API_HOST + this.userData.avatar : Consts.DEFAULT_AVATAR,
            "login": this.userData.login
        };
    }

    onViewCreated() {
        this.checkbox = <HTMLInputElement>(<HTMLDivElement>this.getDOMView())!.querySelector('.users-modal__checkbox');
    }

    getTemplate(): string {
        return `
            <div class="users-modal__item">
                <img class="users-modal__icon" src="{{avatar}}" alt=""/>
                <div class="users-modal__login">{{login}}</div>
                <input class="users-modal__checkbox" type="checkbox">
            </div>
        `;
    }
}