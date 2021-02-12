import { ComponentGroup } from "../../abstract/ComponentGroup.js";
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