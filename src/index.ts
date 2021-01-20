import {ChatListAdapter} from "./adapters/ChatListAdapter";
import {ChatListView} from "./adapters/ChatListView";
import {ViewGroup} from "./widgets/ViewGroup";
import {EditText} from "./widgets/EditText";
import {Button} from "./widgets/Button";

let root = document.getElementById('root');

class IndexPage extends ViewGroup {

    getTemplate(): string {
        return `<div>
                    {{group}}
                </div>`;
    }

    getProps(): Props {
        return {};
    }

}

let indexPage = new IndexPage([
    new ChatListView(new ChatListAdapter()),
    new EditText([
        new Button()
    ])
]);

let inner = indexPage.render(indexPage);
console.log(inner);
root!.innerHTML = inner;