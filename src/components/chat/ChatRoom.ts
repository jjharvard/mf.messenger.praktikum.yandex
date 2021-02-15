import {ComponentGroup} from "../../_std/ComponentGroup.js";
import {ChatListComponent} from "./lists/ChatListComponent.js";
import {Adapter} from "../../_std/Adapter.js";
import {ChatRoomTitle} from "./ChatRoomTitle.js";

export class ChatRoom extends ComponentGroup {

    chatRoomTitle: ChatRoomTitle;

    constructor() {
        super([new ChatRoomTitle(),
            new ChatListComponent(new Adapter(ChatListComponent.initialData()))]);
    }

    getKeys(): Keys {
        return {};
    }

    onViewCreated() {
        this.chatRoomTitle = <ChatRoomTitle>this.getChildComponentsByName('ChatRoomTitle')[0];
    }

    getTemplate(): string {
        return `<div class="chat">
                        {{ChatRoomTitle}}
                        {{ChatListComponent}}
                </div>`;
    }

}