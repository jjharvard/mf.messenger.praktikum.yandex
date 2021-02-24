import {ChatItemComponent} from './ChatItemComponent';
import {ComponentGroup} from '../../../content/ComponentGroup';
import {Adapter} from '../../../content/Adapter';
import {Templator} from '../../../utils/Templator';
import {MessageData} from '../../../content/StorageTypes';
import {EventBus} from '../../../utils/EventBus';
import {StateUtil} from '../../../utils/StateUtil';

export class ChatListComponent extends ComponentGroup {
    list: HTMLUListElement;
    adapter: Adapter<MessageData> = new Adapter<MessageData>();

    notifyAll(adapter: Adapter<MessageData> = this.adapter) {
        this.adapter = adapter;
        this.removeAllChildren();
        const userId = StateUtil.getUserProfile().id;
        this.addViews(this.adapter.getItems().map(item => {
            return new ChatItemComponent(item, userId);
        }));
        this.getDOMView()!.outerHTML = this.render();
        this.getChildren().forEach(c => c.onViewCreated());
        this.list = <HTMLUListElement>this.getDOMView()!;
        this.list.onscroll = () => {
            if (this.list.offsetHeight - this.list.scrollTop + 1 >= this.list.scrollHeight) {
                EventBus.getInstance().emit('onChatRefresh');
            }
        };
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
