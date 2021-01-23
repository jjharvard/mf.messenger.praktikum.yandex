import {ViewGroup} from "../../abstract/ViewGroup";

export class ChatPage extends ViewGroup {

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