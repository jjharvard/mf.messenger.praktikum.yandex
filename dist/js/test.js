import { ViewGroup } from "./abstract/ViewGroup";
import { EditText } from "./components/chat/EditText";
import { Button } from "./components/chat/Button";
import { ChatListView } from "./components/chat/ChatListView";
import { UploadButton } from "./components/chat/UploadButton";
import { InputMessage } from "./components/chat/InputMessage";
import { ChatRoom } from "./components/chat/ChatRoom";
class IndexPage extends ViewGroup {
    getTemplate() {
        return `<div>
                    {{Chat}}
                    {{EditText}}
                </div>`;
    }
    getProps() {
        return {};
    }
}
let indexPage = new IndexPage([
    new ChatRoom([new ChatListView()]),
    new EditText([
        new UploadButton(),
        new InputMessage(),
        new Button()
    ])
]);
let inner = indexPage.render(indexPage);
console.log(inner);
