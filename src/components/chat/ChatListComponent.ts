import {ChatItemComponent} from "./ChatItemComponent.js";
import {EventBus} from "../../utils/EventBus.js";
import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {Adapter} from "../../abstract/Adapter.js";
import {Templator} from "../../utils/Templator.js";

export class ChatListComponent extends ComponentGroup {

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
            return new ChatItemComponent(item);
        }));
        EventBus.getInstance().register('onMessage', this);
    }

    onMessage(payload: Payload): boolean {
        if (super.onMessage(payload)) {
            this.removeAllChildren();
            this.adapter.addItem(payload['message'] as string);
            this.addViews(this.adapter.getItems().map(item => {
                return new ChatItemComponent(item);
            }));
            let element = document.getElementById(this.id);
            element!.innerHTML = this.render();
            return true;
        } else {
            return false;
        }

    }

    getTemplate(): string {
        return `
                <ul class="chat__list">
                    ${Templator.appendTemplate('{{ChatItemComponent}}', this.adapter.getItems().length)}
                </ul>
            `;
    }

    getKeys(): Keys {
        return {};
    }
}