import {ViewGroup} from "./widgets/ViewGroup";
import {EditText} from "./widgets/EditText";
import {Button} from "./widgets/Button";
import {ChatListView} from "./adapters/ChatListView";
import {UploadButton} from "./widgets/UploadButton";
import {InputMessage} from "./widgets/InputMessage";
import {EventBus} from "./common/EventBus";

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
    new ChatListView(),
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