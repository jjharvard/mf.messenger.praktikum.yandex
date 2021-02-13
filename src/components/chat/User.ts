import {Router} from "../../abstract/Router.js";
import {Component} from "../../abstract/Component.js";

export class User extends Component {

    btnAddChat: HTMLButtonElement;

    getKeys(): Keys {
        return {};
    }

    onViewCreated() {
        let btnProfile = <HTMLButtonElement>this.getDOMView()!.querySelector('.user__profile');
        btnProfile.onclick = () => {
            Router.getInstance().push('/profile');
        };
        this.btnAddChat = <HTMLButtonElement>this.getDOMView()!.querySelector('.user__chat-add');
    }

    getTemplate(): string {
        return `<div class="user">
                    <button class="user__chat-add">
                        Add
                        <i class="arrow"></i>
                    </button>
                    <button class="user__profile">
                        Profile
                        <i class="arrow"></i>
                    </button>
                    <input id="user__search_id" class="user__search" type="text" placeholder="Search">
                </div>
            `;
    }

}