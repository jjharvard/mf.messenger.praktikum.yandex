import {Component} from '../../../content/Component';
import {MessageData} from '../../../content/StorageTypes';

export class ChatItemComponent extends Component {
    constructor(private messageData: MessageData) {
        super();
    }

    getKeys(): Keys {
        return {
            'message': this.messageData.content
        };
    }

    getTemplate(): string {
        return `<li class="message">
                <div class="message__outgoing">
                        {{message}}
                    <div class="timer__outgoing">11:30</div>
                </div>
            </li>`;
    }
}
