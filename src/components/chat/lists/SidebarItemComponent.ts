import {Component} from "../../../abstract/Component.js";
import {ChatData} from "../../../abstract/StorageTypes.js";
import {API_HOST} from "../../../api/Client.js";
import {Consts} from "../../../utils/Consts.js";

export class SidebarItemComponent extends Component {

    it: HTMLLIElement;

    constructor(private chatData: ChatData) {
        super();
    }

    getKeys(): Keys {
        return {
            'ChatTitle': this.chatData.title,
            'ChatAvatar': this.chatData.avatar ? API_HOST + this.chatData.avatar : Consts.DEFAULT_AVATAR,
            'ChatMessage': Consts.MESSAGE()
        };
    }

    onViewCreated() {
        this.it = <HTMLLIElement>this.getDOMView()!;
    }

    setOnItemClickListener(listener: (component: Component, chatData: ChatData) => void) {
        this.it.onclick = () => listener(this, this.chatData);
    }

    setHighlighted(isHighlighted: boolean) {
        isHighlighted ? this.it.classList.add('highlighted') : this.it.classList.remove('highlighted');
    }

    getTemplate(): string {
        return `
            <li class="sidebar__item topic">
                <img class="topic__icon" src="{{ChatAvatar}}" alt=""/>
                <div class="topic__author">{{ChatTitle}}</div>
                <div class="topic__time">11.01.21</div>
                <div class="topic__teaser">{{ChatMessage}} </div>
                <div class="topic__unread-wrapper hidden"><p class="topic__unread-count">0</p></div>
            </li>
        `;
    }
}