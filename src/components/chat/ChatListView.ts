import {ChatItemView} from "./ChatItemView";
import {View} from "../../abstract/View";
import {EventBus} from "../../common/EventBus";

export class ChatListView extends View {

    constructor() {
        super();
        EventBus.getInstance().register('onMessage', this)
    }

    data: {[k: string]: string[]} = {
        'messages': [
            `I can't get no satisfaction, I can't get no satisfaction 'cause I try and I try and I try and I try
                    I can't get no, I can't get no`,
            'hello',
            'How are you'
        ]
    }

    onMessage(payload: Payload) {
        this.data['messages'].unshift(payload['hello'] as string)
        let element = document.getElementById(this.id)
        element!.innerHTML = this.render()
    }

    getTemplate(): string {
        let result = ''
        for(let value of this.data['messages']) {
            let itemView: ChatItemView = new ChatItemView();
            itemView.keys = {'message': value};
            result += itemView.render() + '\n'
        }
        return `
                <ul class="chat__list">
                    ${result}
                </ul>
            `;
    }

    getKeys(): Keys {
        return {};
    }
}