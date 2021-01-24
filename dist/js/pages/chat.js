import { User } from "../components/chat/User.js";
import { Sidebar } from "../components/chat/Sidebar.js";
import { ChatRoom } from "../components/chat/ChatRoom.js";
import { ChatListComponent } from "../components/chat/ChatListComponent.js";
import { EditText } from "../components/chat/EditText.js";
import { UploadButton } from "../components/chat/UploadButton.js";
import { InputMessage } from "../components/chat/InputMessage.js";
import { Button } from "../components/chat/Button.js";
import { ChatRootComponent } from "../components/chat/ChatRootComponent.js";
import { Page } from "../abstract/Page.js";
import { Adapter } from "../abstract/Adapter.js";
let chatPage = new Page(new ChatRootComponent([
    new User(),
    new Sidebar(),
    new ChatRoom([new ChatListComponent(new Adapter(ChatListComponent.initialData()))]),
    new EditText([
        new UploadButton(),
        new InputMessage(),
        new Button()
    ])
]));
chatPage.mount();
//# sourceMappingURL=chat.js.map