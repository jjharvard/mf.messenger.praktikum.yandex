import {ComponentGroup} from '../../content/ComponentGroup';
import {ChatListComponent} from './lists/ChatListComponent';
import {ChatRoomTitle} from './ChatRoomTitle';
import {Adapter} from '../../content/Adapter';
import {MessageData} from '../../content/StorageTypes';

export class ChatRoom extends ComponentGroup {
    chatRoomTitle: ChatRoomTitle;
    chatListComponent: ChatListComponent;

    constructor() {
        super([new ChatRoomTitle(),
            new ChatListComponent()]);
    }

    getKeys(): Keys {
        return {};
    }

    notifyChatListAll(adapter: Adapter<MessageData>) {
        this.chatListComponent.notifyAll(adapter);
    }

    notifyChatList(message: MessageData) {
        this.chatListComponent.notify(message);
    }

    onViewCreated() {
        this.chatRoomTitle = <ChatRoomTitle>this.getChildComponentsByName('ChatRoomTitle')[0];
        this.chatListComponent = <ChatListComponent>this.getChildComponentsByName('ChatListComponent')[0];
    }

    getTemplate(): string {
        return `<div class="chat">
                        {{ChatRoomTitle}}
                        {{ChatListComponent}}
                </div>`;
    }
}
