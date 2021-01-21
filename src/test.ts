import {ViewGroup} from "./widgets/ViewGroup";
import {EditText} from "./widgets/EditText";
import {Button} from "./widgets/Button";
import {ChatListView} from "./adapters/ChatListView";
import {ChatListAdapter} from "./adapters/ChatListAdapter";
import {UploadButton} from "./widgets/UploadButton";
import {InputMessage} from "./widgets/InputMessage";

class IndexPage extends ViewGroup {

    getTemplate(): string {
        return `<div>
                    {{ChatListView}}
                    {{EditText}}
                </div>`;
    }

    getProps(): Props {
        return {};
    }

}

let indexPage = new IndexPage([
    new ChatListView([new ChatListAdapter()]),
    new EditText([
        new UploadButton(),
        new InputMessage(),
        new Button()
    ])
]);

let inner = indexPage.render(indexPage);
console.log(inner);