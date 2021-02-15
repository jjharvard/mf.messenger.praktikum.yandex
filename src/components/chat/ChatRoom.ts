import {ComponentGroup} from "../../content/ComponentGroup";
import {ChatListComponent} from "./lists/ChatListComponent";
import {Adapter} from "../../content/Adapter";
import {ChatRoomTitle} from "./ChatRoomTitle";

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