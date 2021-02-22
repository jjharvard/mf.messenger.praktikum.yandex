import {ChatItemComponent} from './ChatItemComponent';
import {EventBus} from '../../../utils/EventBus';
import {ComponentGroup} from '../../../content/ComponentGroup';
import {Adapter} from '../../../content/Adapter';
import {Templator} from '../../../utils/Templator';

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

    onMessage(payload: Payload) {
        this.removeAllChildren();
        this.adapter.addItem(payload['message'] as string);
        this.addViews(this.adapter.getItems().map(item => {
            return new ChatItemComponent(item);
        }));
        this.getDOMView()!.outerHTML = this.render();
        return true;
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
