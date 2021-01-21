import { View } from "../widgets/View";
export class ChatItemView extends View {
    constructor() {
        super(...arguments);
        this.props = {};
    }
    getProps() {
        return this.props;
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
