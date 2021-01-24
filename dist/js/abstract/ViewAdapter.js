import { ChatItemView } from "../components/chat/ChatItemView";
export class ViewAdapter {
    constructor(items = []) {
        this.items = items;
        this.items = ViewAdapter._preRendered();
    }
    setData(data) {
    }
    getItems() {
        return this.items;
    }
    addItem(item) {
        this.items.unshift(item);
    }
    static _preRendered() {
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
    getTemplate() {
        let t = `
                <ul class="chat__list">
                    ${this.append()}
                </ul>
            `;
        return t;
    }
    append() {
        let res = '';
        for (let i = 0; i < this.items.length; i++) {
            res += '{{ChatItemView}}\n';
        }
        return res;
    }
}
