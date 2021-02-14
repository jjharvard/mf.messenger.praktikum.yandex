import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {EventBus} from "../../utils/EventBus.js";
import {ChatListComponent} from "./lists/ChatListComponent.js";
import {Adapter} from "../../abstract/Adapter.js";
import {ChatData} from "../../abstract/StorageTypes.js";

export class ChatRoom extends ComponentGroup {

    chatTitle: string = '';

    constructor() {
        super([new ChatListComponent(new Adapter(ChatListComponent.initialData()))]);
        EventBus.getInstance().register('onChatSelected', this);
    }

    getKeys(): Keys {
        return {
            'ChatTitle': this.chatTitle
        };
    }

    onChatSelected(payload: Payload = {}) {
        this.chatTitle = (payload['chatData'] as ChatData).title;
        this.getDOMView()!.outerHTML = this.render();
    }

    getTemplate(): string {
        return `<div class="chat">
                    <div class="chat__title">
                        <div class="chat__name">{{ChatTitle}}</div>
                        <button class="chat__remove"></button>
                    </div>
                        {{ChatListComponent}}
                </div>`;
    }

}