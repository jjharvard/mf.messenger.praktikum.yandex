import {ChatItemView} from "./ChatItemView";
import {EventBus} from "../../utils/EventBus";
import {ViewGroup} from "../../abstract/ViewGroup";

export class ChatListView extends ViewGroup {

    constructor() {
        super(ChatListView.preRendered());
        EventBus.getInstance().register('onMessage', this);
    }

    static count: number = ChatListView.preRendered().length

    static temp(): string {
        function append(c: number): string {
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

    static preRendered(): ChatItemView[] {
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

    static newItems: ChatItemView[] = []

    onMessage(payload: Payload) {
        this.removeAllChildren()
        let m = new ChatItemView(payload['message'] as string)
        ChatListView.newItems.unshift(m)
        this.addViews([...ChatListView.newItems, ...ChatListView.preRendered()]);
        ChatListView.count++
        console.log(ChatListView.count)
        let element = document.getElementById(this.id);
        element!.innerHTML = this.render();
    }

    getTemplate(): string {
        let t = ChatListView.temp();
        return t
    }

    getKeys(): Keys {
        return {};
    }
}