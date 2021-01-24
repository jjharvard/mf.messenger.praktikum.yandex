import { ChatItemView } from "./ChatItemView";
import { EventBus } from "../../utils/EventBus";
import { ViewGroup } from "../../abstract/ViewGroup";
export class ChatListView extends ViewGroup {
    constructor(adapter) {
        super(adapter.getItems());
        this.adapter = adapter;
        EventBus.getInstance().register('onMessage', this);
    }
    onMessage(payload) {
        this.removeAllChildren();
        this.adapter.addItem(new ChatItemView(payload['message']));
        this.addViews(this.adapter.getItems());
        let element = document.getElementById(this.id);
        element.innerHTML = this.render();
    }
    getTemplate() {
        let t = this.adapter.getTemplate();
        return t;
    }
    getKeys() {
        return {};
    }
}
