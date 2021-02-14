import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {ChatData} from "../../abstract/StorageTypes.js";
import {EventBus} from "../../utils/EventBus.js";
import {ArrowButton} from "../_common/ArrowButton.js";

export class ChatRoomTitle extends ComponentGroup {

    chatTitle: string = '';

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
        let btnUserAdd = <HTMLButtonElement>this.getDOMView()!.querySelector('.chat__user-add');
        btnUserAdd.onclick = () => {
        };
        let btnUserRemove = <HTMLButtonElement>this.getDOMView()!.querySelector('.chat__user-remove');
        btnUserRemove.onclick = () => {
        };
    }

    onChatSelected(payload: Payload = {}) {
        this.chatTitle = (payload['chatData'] as ChatData).title;
        this.getDOMView()!.outerHTML = this.render();
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