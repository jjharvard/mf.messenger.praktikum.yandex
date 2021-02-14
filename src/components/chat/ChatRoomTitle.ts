import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {EventBus} from "../../utils/EventBus.js";
import {ArrowButton} from "../_common/ArrowButton.js";
import {ChatData} from "../../abstract/StorageTypes.js";

export class ChatRoomTitle extends ComponentGroup {

    chatTitle: string = '';
    btnUserAdd: HTMLButtonElement;
    btnUserRemove: HTMLButtonElement;
    btnChatRemove: HTMLButtonElement;

    constructor() {
        super([new ArrowButton('Add User', 'chat__user-add'),
            new ArrowButton('Remove User', 'chat__user-remove'),
            new ArrowButton('Remove Chat', 'chat__chat-remove')
        ]);
        EventBus.getInstance().register('onChatSelected', this);
    }

    getKeys(): Keys {
        return {
            'ChatTitle': this.chatTitle
        };
    }

    onViewCreated(_: Payload = {}) {
        let buttons = <HTMLButtonElement[]>this.getChildElementsByName('ArrowButton');
        this.btnUserAdd = buttons[0];
        this.btnUserAdd.onclick = () => {
            EventBus.getInstance().emit('onChatAction', {'action': 'userAdd'});
        };
        this.btnUserRemove = buttons[1];
        this.btnUserRemove.onclick = () => {
            EventBus.getInstance().emit('onChatAction', {'action': 'userRemove'});
        };
        this.btnChatRemove = buttons[2];
        this.btnChatRemove.onclick = () => {
            EventBus.getInstance().emit('onChatAction', {'action': 'chatRemove'});
        };
    }

    onChatSelected(payload: Payload = {}) {
        this.chatTitle = (payload['chatData'] as ChatData).title;
        this.getDOMView()!.outerHTML = this.render();
        this.onViewCreated();
    }

    getTemplate(): string {
        return `<div class="chat__title">
                    <div class="chat__name">{{ChatTitle}}</div>
                    {{ArrowButton}}
                    {{ArrowButton}}
                    {{ArrowButton}}
                </div>`;
    }

}