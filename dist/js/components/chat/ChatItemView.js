import { View } from "../../abstract/View";
export class ChatItemView extends View {
    constructor(message) {
        super();
        this.message = message;
    }
    getKeys() {
        return {
            'time': '11:30'
        };
    }
    getTemplate() {
        return `<li class="message">
                <div class="message__outgoing">
                        ${this.message}
                    <div class="timer__outgoing">{{time}}</div>
                </div>
            </li>`;
    }
}
