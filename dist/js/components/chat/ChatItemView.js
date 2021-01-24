import { View } from "../../abstract/View";
export class ChatItemView extends View {
    constructor(message) {
        super();
        this.message = message;
    }
    getKeys() {
        return {};
    }
    getTemplate() {
        return `<li class="message">
                <div class="message__outgoing">
                        ${this.message}
                    <div class="timer__outgoing">11:30</div>
                </div>
            </li>`;
    }
}
