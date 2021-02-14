import { ComponentGroup } from "../../abstract/ComponentGroup.js";
import { EventBus } from "../../utils/EventBus.js";
import { ArrowButton } from "../_common/ArrowButton.js";
export class ChatRoomTitle extends ComponentGroup {
    constructor() {
        super([new ArrowButton('Add User', 'chat__user-add'),
            new ArrowButton('Remove User', 'chat__user-remove'),
            new ArrowButton('Remove Chat', 'chat__chat-remove')
        ]);
        this.chatTitle = '';
        EventBus.getInstance().register('onChatSelected', this);
    }
    getKeys() {
        return {
            'ChatTitle': this.chatTitle
        };
    }
    onViewCreated(_ = {}) {
        let buttons = this.getChildElementsByName('ArrowButton');
        this.btnUserAdd = buttons[0];
        this.btnUserAdd.onclick = () => {
            EventBus.getInstance().emit('onChatAction', { 'action': 'userAdd' });
        };
        this.btnUserRemove = buttons[1];
        this.btnUserRemove.onclick = () => {
            EventBus.getInstance().emit('onChatAction', { 'action': 'userRemove' });
        };
        this.btnChatRemove = buttons[2];
        this.btnChatRemove.onclick = () => {
            EventBus.getInstance().emit('onChatAction', { 'action': 'chatRemove' });
        };
    }
    onChatSelected(payload = {}) {
        this.chatTitle = payload['chatData'].title;
        this.getDOMView().outerHTML = this.render();
        this.onViewCreated();
    }
    getTemplate() {
        return `<div class="chat__title">
                    <div class="chat__name">{{ChatTitle}}</div>
                    {{ArrowButton}}
                    {{ArrowButton}}
                    {{ArrowButton}}
                </div>`;
    }
}
//# sourceMappingURL=ChatRoomTitle.js.map