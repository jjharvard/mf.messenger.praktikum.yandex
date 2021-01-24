import {ComponentGroup} from "../../abstract/ComponentGroup.js";

export class ChatRootComponent extends ComponentGroup {

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