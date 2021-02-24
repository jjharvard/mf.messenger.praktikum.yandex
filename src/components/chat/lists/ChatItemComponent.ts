import {MessageData, UserData} from '../../../content/StorageTypes';
import {Utils} from '../../../utils/Utils';
import {ComponentGroup} from '../../../content/ComponentGroup';
import {Consts} from '../../../utils/Consts';
import {API_HOST} from '../../../content/HTTPTransport';

export class ChatItemComponent extends ComponentGroup {
    constructor(private messageData: MessageData, private usersData: UserData[], private userId: number) {
        super();
    }

    getKeys(): Keys {
        return {
            'message': this.messageData.content,
            'avatar': Consts.DEFAULT_AVATAR
        };
    }

    onViewCreated(_: Payload = {}) {
        const messageUserData = this.usersData.find(userData => userData.id === this.messageData.user_id);
        const messageContent = <HTMLDivElement>this.getDOMView()!.querySelector('.message__content');
        const label = <HTMLDivElement>this.getDOMView()!.querySelector('.message__label');
        const icon = <HTMLImageElement>this.getDOMView()!.querySelector('.profile-title__icon');
        const date = new Date(this.messageData.time);
        if (this.messageData.user_id !== this.userId) {
            messageContent.classList.add('incoming');
            if (messageUserData && messageUserData.avatar) {
                icon.src = API_HOST + messageUserData.avatar;
            }
            const userLogin = messageUserData ? Utils.ellipsize(messageUserData.login) : 'Removed from chat';
            label.textContent = userLogin + ' / ' + Utils.getTimeNow(date);
        } else {
            icon.style.display = 'none';
            messageContent.classList.add('outgoing');
            label.textContent = Utils.getTimeNow(date);
        }
    }

    getTemplate(): string {
        return `<li class="message">
                <div class="message__content">
                    <img class="profile-title__icon avatar_small" src="{{avatar}}" alt=""/>
                    <p class="message__text">{{message}}</p>
                    <div class="message__label"></div>
                </div>
            </li>`;
    }
}
