import {ViewGroup} from "./abstract/ViewGroup";
import {EditText} from "./components/chat/EditText";
import {Button} from "./components/chat/Button";
import {ChatListView} from "./components/chat/ChatListView";
import {UploadButton} from "./components/chat/UploadButton";
import {InputMessage} from "./components/chat/InputMessage";
import {Chat} from "./components/chat/Chat";

class IndexPage extends ViewGroup {

    getTemplate(): string {
        return `<div>
                    {{Chat}}
                    {{EditText}}
                </div>`;
    }

    getProps(): Props {
        return {};
    }
}

let indexPage = new IndexPage([
    new Chat([new ChatListView()]),
    new EditText([
        new UploadButton(),
        new InputMessage(),
        new Button()
    ])
]);

let inner = indexPage.render(indexPage);
console.log(inner);