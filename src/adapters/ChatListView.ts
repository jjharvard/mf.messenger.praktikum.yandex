import {AdapterView} from "./AdapterView";
import {ChatListAdapter} from "./ChatListAdapter";

export class ChatListView extends AdapterView<ChatListAdapter> {

    getTemplate(): string {
        return `
                <ul class="chat__list">
                    {{group}}
                </ul>
            `;
    }

    getProps(): Props {
        return {};
    }

}