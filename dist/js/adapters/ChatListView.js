import { ViewGroup } from "../widgets/ViewGroup";
export class ChatListView extends ViewGroup {
    getTemplate() {
        return `
                <ul class="chat__list">
                    {{ChatListAdapter}}
                </ul>
            `;
    }
    getProps() {
        return {};
    }
}
