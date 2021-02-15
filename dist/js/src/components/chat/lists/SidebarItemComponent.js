import { Component } from "../../../_std/Component.js";
import { API_HOST } from "../../../api/Client.js";
import { Consts } from "../../../utils/Consts.js";
export class SidebarItemComponent extends Component {
    constructor(chatData) {
        super();
        this.chatData = chatData;
    }
    getKeys() {
        return {
            'ChatTitle': this.chatData.title,
            'ChatAvatar': this.chatData.avatar ? API_HOST + this.chatData.avatar : Consts.DEFAULT_AVATAR,
            'ChatMessage': Consts.MESSAGE()
        };
    }
    onViewCreated() {
        this.it = this.getDOMView();
        this.setHighlighted(this.chatData.isActive);
    }
    setOnItemClickListener(listener) {
        this.it.onclick = () => listener(this, this.chatData);
    }
    setHighlighted(isHighlighted) {
        isHighlighted ? this.it.classList.add('highlighted') : this.it.classList.remove('highlighted');
    }
    getTemplate() {
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
//# sourceMappingURL=SidebarItemComponent.js.map