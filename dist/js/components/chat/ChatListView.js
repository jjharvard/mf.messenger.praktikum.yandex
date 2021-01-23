import { ChatItemView } from "./ChatItemView";
import { View } from "../../abstract/View";
import { EventBus } from "../../utils/EventBus";
export class ChatListView extends View {
    constructor() {
        super();
        this.data = {
            'messages': [
                `I can't get no satisfaction, I can't get no satisfaction 'cause I try and I try and I try and I try
                    I can't get no, I can't get no`,
                'hello',
                'How are you'
            ]
        };
        EventBus.getInstance().register('onMessage', this);
    }
    onMessage(payload) {
        this.data['messages'].unshift(payload['message']);
        let element = document.getElementById(this.id);
        element.innerHTML = this.render();
    }
    getTemplate() {
        let result = '';
        for (let value of this.data['messages']) {
            let itemView = new ChatItemView();
            itemView.keys = { 'message': value };
            result += itemView.render() + '\n';
        }
        return `
                <ul class="chat__list">
                    ${result}
                </ul>
            `;
    }
    getKeys() {
        return {};
    }
}
