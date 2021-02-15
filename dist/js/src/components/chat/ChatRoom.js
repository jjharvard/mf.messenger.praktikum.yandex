import { ComponentGroup } from "../../_std/ComponentGroup.js";
import { ChatListComponent } from "./lists/ChatListComponent.js";
import { Adapter } from "../../_std/Adapter.js";
import { ChatRoomTitle } from "./ChatRoomTitle.js";
export class ChatRoom extends ComponentGroup {
    constructor() {
        super([new ChatRoomTitle(),
            new ChatListComponent(new Adapter(ChatListComponent.initialData()))]);
    }
    getKeys() {
        return {};
    }
    onViewCreated() {
        this.chatRoomTitle = this.getChildComponentsByName('ChatRoomTitle')[0];
    }
    getTemplate() {
        return `<div class="chat">
                        {{ChatRoomTitle}}
                        {{ChatListComponent}}
                </div>`;
    }
}
//# sourceMappingURL=ChatRoom.js.map