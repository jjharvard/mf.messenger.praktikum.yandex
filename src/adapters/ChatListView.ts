import {ViewGroup} from "../widgets/ViewGroup";

export class ChatListView extends ViewGroup {

    getTemplate(): string {
        return `
                <ul class="chat__list">
                    {{ChatListAdapter}}
                </ul>
            `;
    }

    getProps(): Props2 {
        return {};
    }
}