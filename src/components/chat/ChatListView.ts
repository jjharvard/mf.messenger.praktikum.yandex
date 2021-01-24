import {ChatItemView} from "./ChatItemView";
import {EventBus} from "../../utils/EventBus";
import {ViewGroup} from "../../abstract/ViewGroup";
import {Adapter} from "../../abstract/Adapter";

export class ChatListView extends ViewGroup {

    static initialData(): string[] {
        return [
            `I can't get no satisfaction, I can't get no satisfaction 'cause I try and I try and I try and I try
                    I can't get no, I can't get no`,
            'hello',
            'How are you'
        ];
    }

    constructor(private adapter: Adapter<string>) {
        super(adapter.getItems().map(item => {
            return new ChatItemView(item)
        }));
        EventBus.getInstance().register('onMessage', this);
    }

    onMessage(payload: Payload) {
        this.removeAllChildren()
        this.adapter.addItem(payload['message'] as string)
        this.addViews(this.adapter.getItems().map(item => {
            return new ChatItemView(item)
        }));
        let element = document.getElementById(this.id);
        element!.innerHTML = this.render();
    }

    getTemplate(): string {
        return `
                <ul class="chat__list">
                    ${this.adapter.appendTemplate('ChatItemView')}
                </ul>
            `;
    }

    getKeys(): Keys {
        return {};
    }
}