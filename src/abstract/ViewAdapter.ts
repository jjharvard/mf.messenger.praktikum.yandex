import {ChatItemView} from "../components/chat/ChatItemView";
import {Adapter} from "./Adapter";

export class ViewAdapter extends Adapter<ChatItemView> {

    constructor(private items: ChatItemView[] = []) {
        super()
        this.items = this._preRendered()
    }

    setData(data: ChatItemView) {

    }

    getItems(): ChatItemView[] {
        return this.items
    }

    addItem(item: ChatItemView) {
        this.items.unshift(item)

    }

    _preRendered(): ChatItemView[] {
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

    getTemplate(): string {
        let t = `
                <ul class="chat__list">
                    ${this.append()}
                </ul>
            `;
        return t;
    }

    protected append(): string {
        let res = '';
        for (let i = 0; i < this.items.length; i++) {
            res += '{{ChatItemView}}\n';
        }
        return res;
    }

}