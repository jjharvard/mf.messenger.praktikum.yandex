import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {User} from "./User.js";
import {Sidebar} from "./Sidebar.js";
import {ChatRoom} from "./ChatRoom.js";
import {ChatListComponent} from "./ChatListComponent.js";
import {Adapter} from "../../abstract/Adapter.js";
import {EditText} from "./EditText.js";
import {UploadButton} from "./UploadButton.js";
import {InputMessage} from "./InputMessage.js";
import {Button} from "./Button.js";

export class ChatRootComponent extends ComponentGroup {

    constructor() {
        super([
            new User(),
            new Sidebar(),
            new ChatRoom([new ChatListComponent(new Adapter(ChatListComponent.initialData()))]),
            new EditText([
                new UploadButton(),
                new InputMessage(),
                new Button()
            ])
        ]);
    }

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