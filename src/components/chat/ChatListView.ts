import {ChatItemView} from "./ChatItemView";
import {EventBus} from "../../utils/EventBus";
import {ViewGroup} from "../../abstract/ViewGroup";
import {ViewAdapter} from "../../abstract/ViewAdapter";

export class ChatListView extends ViewGroup {

    constructor(private adapter: ViewAdapter) {
        super(adapter.getItems());
        EventBus.getInstance().register('onMessage', this);
    }

    onMessage(payload: Payload) {
        this.removeAllChildren()
        this.adapter.addItem(new ChatItemView(payload['message'] as string))
        this.addViews(this.adapter.getItems());
        let element = document.getElementById(this.id);
        element!.innerHTML = this.render();
    }

    getTemplate(): string {
        let t = this.adapter.getTemplate();
        return t
    }

    getKeys(): Keys {
        return {};
    }
}