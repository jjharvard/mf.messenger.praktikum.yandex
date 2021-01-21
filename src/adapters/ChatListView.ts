import {ChatItemView} from "./ChatItemView";
import {View} from "../widgets/View";
import {EventBus} from "../common/EventBus";

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

    onMessage(payload: {}) {
        console.log('onMessage ' + payload['hello'])
    }

    getTemplate(): string {
        let result = ''
        for(let prop of this.data['messages']) {
            let itemView: ChatItemView = new ChatItemView();
            itemView.props = {'message': prop};
            result += itemView.render() + '\n'
        }

        return `
                <ul class="chat__list">
                    ${result}
                </ul>
            `;
    }

    getProps(): Props2 {
        return {};
    }
}