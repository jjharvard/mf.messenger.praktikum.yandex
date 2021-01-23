import { View } from "../../abstract/View";
export class ChatItemView extends View {
    constructor() {
        super(...arguments);
        this.keys = {};
    }
    getKeys() {
        return this.keys;
    }
    getTemplate() {
        return `<li class="message">
                <div class="message__outgoing">
                        {{message}}
                    <div class="timer__outgoing">11:30</div>
                </div>
            </li>`;
    }
}
