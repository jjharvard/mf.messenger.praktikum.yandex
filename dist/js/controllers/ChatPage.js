import { ViewGroup } from "../abstract/ViewGroup";
import { EditText } from "../components/chat/EditText";
import { Button } from "../components/chat/Button";
import { ChatListView } from "../components/chat/ChatListView";
import { UploadButton } from "../components/chat/UploadButton";
import { InputMessage } from "../components/chat/InputMessage";
import { ChatRoom } from "../components/chat/ChatRoom";
import { Sidebar } from "../components/chat/Sidebar";
import { User } from "../components/chat/User";
import { Mountable } from "../abstract/Mountable";
class ChatPage extends ViewGroup {
    getTemplate() {
        return `<div class="chat-container">
                    {{User}}
                    {{Sidebar}}
                    {{Chat}}
                    {{EditText}}
                </div>`;
    }
    getProps() {
        return {};
    }
}
let MountableChatPage = Mountable(ChatPage);
let chatPage = new MountableChatPage([
    new User(),
    new Sidebar(),
    new ChatRoom([new ChatListView()]),
    new EditText([
        new UploadButton(),
        new InputMessage(),
        new Button()
    ])
]);
chatPage.mount(chatPage);
