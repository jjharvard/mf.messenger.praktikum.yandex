import {ViewGroup} from "../abstract/ViewGroup";
import {EditText} from "../components/chat/EditText";
import {Button} from "../components/chat/Button";
import {ChatListView} from "../components/chat/ChatListView";
import {UploadButton} from "../components/chat/UploadButton";
import {InputMessage} from "../components/chat/InputMessage";
import {EventBus} from "../common/EventBus";
import {Chat} from "../components/chat/Chat";
import {Sidebar} from "../components/chat/Sidebar";
import {User} from "../components/chat/User";

let root = document.getElementById('root');

class IndexPage extends ViewGroup {

    getTemplate(): string {
        return `<div class="chat-container">
                    {{User}}
                    {{Sidebar}}
                    {{Chat}}
                    {{EditText}}
                </div>`;
    }

    getProps(): Props {
        return {};
    }
}

let indexPage = new IndexPage([
    new User(),
    new Sidebar(),
    new Chat([new ChatListView()]),
    new EditText([
        new UploadButton(),
        new InputMessage(),
        new Button()
    ])
]);

let inner = indexPage.render(indexPage);
console.log(inner);
root!.innerHTML = inner;
window.onload = function () {
    EventBus.getInstance().emit('onViewCreated')
}