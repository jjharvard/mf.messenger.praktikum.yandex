import { ChatPage } from "./components/chat/ChatPage";
import { User } from "./components/chat/User";
import { Sidebar } from "./components/chat/Sidebar";
import { ChatRoom } from "./components/chat/ChatRoom";
import { ChatListView } from "./components/chat/ChatListView";
import { EditText } from "./components/chat/EditText";
import { UploadButton } from "./components/chat/UploadButton";
import { InputMessage } from "./components/chat/InputMessage";
import { Button } from "./components/chat/Button";
import { ViewAdapter } from "./abstract/ViewAdapter";
let chatPage = new ChatPage([
    new User(),
    new Sidebar(),
    new ChatRoom([new ChatListView(new ViewAdapter())]),
    new EditText([
        new UploadButton(),
        new InputMessage(),
        new Button()
    ])
]);
chatPage.render();
