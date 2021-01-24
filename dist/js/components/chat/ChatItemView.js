import { Component } from "../../abstract/Component";
export class ChatItemView extends Component {
    constructor(message) {
        super();
        this.message = message;
    }
    getKeys() {
        return {
            'message': this.message
        };
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
//# sourceMappingURL=ChatItemView.js.map