import { Component } from "../../../content/Component.js";
export class ChatItemComponent extends Component {
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
//# sourceMappingURL=ChatItemComponent.js.map