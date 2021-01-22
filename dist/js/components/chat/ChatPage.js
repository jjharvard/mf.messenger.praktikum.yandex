import { ViewGroup } from "../../abstract/ViewGroup";
export class ChatPage extends ViewGroup {
    getTemplate() {
        return `<div class="chat-container">
                    {{User}}
                    {{Sidebar}}
                    {{ChatRoom}}
                    {{EditText}}
                </div>`;
    }
    getProps() {
        return {};
    }
}
