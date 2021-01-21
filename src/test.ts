import {ViewGroup} from "./widgets/ViewGroup";
import {EditText} from "./widgets/EditText";
import {Button} from "./widgets/Button";
import {ChatListView} from "./adapters/ChatListView";
import {UploadButton} from "./widgets/UploadButton";
import {InputMessage} from "./widgets/InputMessage";
import {Chat} from "./adapters/Chat";

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