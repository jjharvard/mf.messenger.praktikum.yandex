import {View} from "../../abstract/View";

export class ChatItemView extends View {

    constructor(private message: string) {
        super();
    }

    getKeys(): Keys {
        return {};
    }

    getTemplate(): string {
        return `<li class="message">
                <div class="message__outgoing">
                        ${this.message}
                    <div class="timer__outgoing">11:30</div>
                </div>
            </li>`;
    }
}