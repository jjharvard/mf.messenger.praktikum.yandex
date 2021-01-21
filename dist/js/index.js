import { ViewGroup } from "./widgets/ViewGroup";
import { EditText } from "./widgets/EditText";
import { Button } from "./widgets/Button";
import { ChatListView } from "./adapters/ChatListView";
import { UploadButton } from "./widgets/UploadButton";
import { InputMessage } from "./widgets/InputMessage";
let root = document.getElementById('root');
class IndexPage extends ViewGroup {
    getTemplate() {
        return `<div>
                    {{ChatListView}}
                    {{EditText}}
                </div>`;
    }
    getProps() {
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
root.innerHTML = inner;
