import {ViewGroup} from "./widgets/ViewGroup";
import {EditText} from "./widgets/EditText";
import {Button} from "./widgets/Button";
import {ChatListAdapter} from "./adapters/ChatListAdapter";
import {ChatListView} from "./adapters/ChatListView";
import {UploadButton} from "./widgets/UploadButton";

let root = document.getElementById('root');

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
        new Button()
    ])
]);

let inner = indexPage.render(indexPage);
console.log(inner);
root!.innerHTML = inner;