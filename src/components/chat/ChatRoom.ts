import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {ChatListComponent} from "./lists/ChatListComponent.js";
import {Adapter} from "../../abstract/Adapter.js";
import {ChatRoomTitle} from "./ChatRoomTitle.js";

export class ChatRoom extends ComponentGroup {

    constructor() {
        super([new ChatRoomTitle(),
            new ChatListComponent(new Adapter(ChatListComponent.initialData()))]);
    }

    getKeys(): Keys {
        return {};
    }

    getTemplate(): string {
        return `<div class="chat">
                        {{ChatRoomTitle}}
                        {{ChatListComponent}}
                </div>`;
    }

}