import { ChatItemView } from "./ChatItemView";
import { EventBus } from "../../utils/EventBus";
import { ViewGroup } from "../../abstract/ViewGroup";
export class ChatListView extends ViewGroup {
    constructor() {
        super(ChatListView.preRendered());
        EventBus.getInstance().register('onMessage', this);
    }
    static temp() {
        function append(c) {
            let res = '';
            for (let i = 0; i < ChatListView.count; i++) {
                res += '{{ChatItemView}}\n';
            }
            return res;
        }
        let t = `
                <ul class="chat__list">
                    ${append(3)}
                </ul>
            `;
        return t;
    }
    static preRendered() {
        let a = [
            `I can't get no satisfaction, I can't get no satisfaction 'cause I try and I try and I try and I try
                    I can't get no, I can't get no`,
            'hello',
            'How are you'
        ];
        return a.map(message => {
            return new ChatItemView(message);
        });
    }
    onMessage(payload) {
        this.removeAllChildren();
        let m = new ChatItemView(payload['message']);
        ChatListView.newItems.unshift(m);
        this.addViews([...ChatListView.newItems, ...ChatListView.preRendered()]);
        ChatListView.count++;
        console.log(ChatListView.count);
        let element = document.getElementById(this.id);
        element.innerHTML = this.render();
    }
    getTemplate() {
        let t = ChatListView.temp();
        return t;
    }
    getKeys() {
        return {};
    }
}
ChatListView.count = ChatListView.preRendered().length;
ChatListView.newItems = [];
