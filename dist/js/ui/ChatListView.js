import { AdapterView } from "../widgets/AdapterView";
export class ChatListView extends AdapterView {
    getTemplate() {
        return `
                <ul class="chat__list">
                    {{group}}
                </ul>
            `;
    }
    getProps() {
        return {};
    }
}
