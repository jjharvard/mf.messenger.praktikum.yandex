import {Component} from '../../../content/Component';
import {MessageData} from '../../../content/StorageTypes';

export class ChatItemComponent extends Component {
    constructor(private messageData: MessageData, private userId: number) {
        super();
    }

    getKeys(): Keys {
        return {
            'message': this.messageData.content
        };
    }

    onViewCreated(_: Payload = {}) {
        const messageContent = <HTMLDivElement>this.getDOMView()!.querySelector('.message__content');
        if (this.messageData.user_id !== this.userId) {
            messageContent.classList.add('incoming');
        } else {
            messageContent.classList.add('outgoing');
        }
    }

    getTemplate(): string {
        return `<li class="message">
                <div class="message__content">
                        {{message}}
                    <div class="message__timer">11:30</div>
                </div>
            </li>`;
    }
}
