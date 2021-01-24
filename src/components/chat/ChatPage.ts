import {ComponentGroup} from "../../abstract/ComponentGroup";

export class ChatPage extends ComponentGroup {

    getTemplate(): string {
        return `<div class="chat-container">
                    {{User}}
                    {{Sidebar}}
                    {{ChatRoom}}
                    {{EditText}}
                </div>`;
    }

    getKeys(): Keys {
        return {};
    }
}