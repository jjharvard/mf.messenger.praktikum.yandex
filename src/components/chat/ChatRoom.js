import { ComponentGroup } from "../../content/ComponentGroup";
import { ChatListComponent } from "./lists/ChatListComponent";
import { Adapter } from "../../content/Adapter";
import { ChatRoomTitle } from "./ChatRoomTitle";
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