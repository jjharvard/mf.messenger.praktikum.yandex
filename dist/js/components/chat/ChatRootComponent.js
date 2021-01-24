import { ComponentGroup } from "../../abstract/ComponentGroup";
export class ChatRootComponent extends ComponentGroup {
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
//# sourceMappingURL=ChatRootComponent.js.map