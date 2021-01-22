import {Mountable} from "../abstract/Mountable";
import {User} from "../components/chat/User";
import {Sidebar} from "../components/chat/Sidebar";
import {ChatRoom} from "../components/chat/ChatRoom";
import {ChatListView} from "../components/chat/ChatListView";
import {EditText} from "../components/chat/EditText";
import {UploadButton} from "../components/chat/UploadButton";
import {InputMessage} from "../components/chat/InputMessage";
import {Button} from "../components/chat/Button";
import {ChatPage} from "../components/chat/ChatPage";

let MountableChatPage = Mountable(ChatPage)

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

chatPage.mount(chatPage)