import { User } from "../components/chat/User";
import { Sidebar } from "../components/chat/Sidebar";
import { ChatRoom } from "../components/chat/ChatRoom";
import { ChatListView } from "../components/chat/ChatListView";
import { EditText } from "../components/chat/EditText";
import { UploadButton } from "../components/chat/UploadButton";
import { InputMessage } from "../components/chat/InputMessage";
import { Button } from "../components/chat/Button";
import { ChatRootComponent } from "../components/chat/ChatRootComponent";
import { Page } from "../abstract/Page";
import { Adapter } from "../abstract/Adapter";
let chatPage = new Page(new ChatRootComponent([
    new User(),
    new Sidebar(),
    new ChatRoom([new ChatListView(new Adapter(ChatListView.initialData()))]),
    new EditText([
        new UploadButton(),
        new InputMessage(),
        new Button()
    ])
]));
chatPage.mount();
//# sourceMappingURL=chat.js.map