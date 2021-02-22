import { ChatItemComponent } from "./ChatItemComponent";
import { EventBus } from "../../../utils/EventBus";
import { ComponentGroup } from "../../../content/ComponentGroup";
import { Templator } from "../../../utils/Templator";
export class ChatListComponent extends ComponentGroup {
    constructor(adapter) {
        super(adapter.getItems().map(item => {
            return new ChatItemComponent(item);
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
            return new ChatItemComponent(item);
        }));
        this.getDOMView().outerHTML = this.render();
        return true;
    }
    getTemplate() {
        return `
                <ul class="chat__list">
                    ${Templator.appendTemplate('{{ChatItemComponent}}', this.adapter.getItems().length)}
                </ul>
            `;
    }
    getKeys() {
        return {};
    }
}
//# sourceMappingURL=ChatListComponent.js.map