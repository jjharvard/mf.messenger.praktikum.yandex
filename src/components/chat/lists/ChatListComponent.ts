import {ChatItemComponent} from './ChatItemComponent';
import {EventBus} from '../../../utils/EventBus';
import {ComponentGroup} from '../../../content/ComponentGroup';
import {Adapter} from '../../../content/Adapter';
import {Templator} from '../../../utils/Templator';
import {MessageData} from '../../../content/StorageTypes';

export class ChatListComponent extends ComponentGroup {
    adapter: Adapter<MessageData> = new Adapter<MessageData>();

    constructor() {
        super();
        EventBus.getInstance().register('onMessage', this);
    }

    notifyAll(adapter: Adapter<MessageData> = this.adapter) {
        this.adapter = adapter;
        this.removeAllChildren();
        this.addViews(this.adapter.getItems().map(item => {
            return new ChatItemComponent(item);
        }));
        this.getDOMView()!.outerHTML = this.render();
        return true;
    }

    notify(message: MessageData) {
        this.adapter.addItem(message);
        this.notifyAll();
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
