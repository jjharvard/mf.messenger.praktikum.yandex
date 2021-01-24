import { ChatItemView } from "./ChatItemView";
import { EventBus } from "../../utils/EventBus";
import { ComponentGroup } from "../../abstract/ComponentGroup";
import { Templator } from "../../utils/Templator";
export class ChatListView extends ComponentGroup {
    constructor(adapter) {
        super(adapter.getItems().map(item => {
            return new ChatItemView(item);
        }));
        this.adapter = adapter;
        EventBus.getInstance().register('onMessage', this);
    }
    static initialData() {
        return [
            `I can't get no satisfaction, I can't get no satisfaction 'cause I try and I try and I try and I try
                    I can't get no, I can't get no`,
            'hello',
            'How are you'
        ];
    }
    onMessage(payload) {
        this.removeAllChildren();
        this.adapter.addItem(payload['message']);
        this.addViews(this.adapter.getItems().map(item => {
            return new ChatItemView(item);
        }));
        let element = document.getElementById(this.id);
        element.innerHTML = this.render();
    }
    getTemplate() {
        return `
                <ul class="chat__list">
                    ${Templator.appendTemplate('{{ChatItemView}}', this.adapter.getItems().length)}
                </ul>
            `;
    }
    getKeys() {
        return {};
    }
}
