import { ChatItemView } from "./ChatItemView";
import { View } from "../widgets/View";
export class ChatListView extends View {
    constructor() {
        super(...arguments);
        this.data = {
            'messages': [
                `I can't get no satisfaction, I can't get no satisfaction 'cause I try and I try and I try and I try
                    I can't get no, I can't get no`,
                'hello',
                'How are you'
            ]
        };
    }
    getTemplate() {
        let result = '';
        for (let prop of this.data['messages']) {
            let itemView = new ChatItemView();
            itemView.props = { 'message': prop };
            result += itemView.render() + '\n';
        }
        return `
                <ul class="chat__list">
                    ${result}
                </ul>
            `;
    }
    getProps() {
        return {};
    }
}
