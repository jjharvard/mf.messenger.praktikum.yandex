import { ComponentGroup } from "../../abstract/ComponentGroup";
export class ChatPage extends ComponentGroup {
    getTemplate() {
        return `<div class="chat-container">
                    {{User}}
                    {{Sidebar}}
                    {{ChatRoom}}
                    {{EditText}}
                </div>`;
    }
    getKeys() {
        return {};
    }
}
