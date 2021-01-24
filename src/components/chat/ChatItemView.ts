import {View} from "../../abstract/View";

export class ChatItemView extends View {

    constructor(private message: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'time': '11:30'
        };
    }

    getTemplate(): string {
        return `<li class="message">
                <div class="message__outgoing">
                        ${this.message}
                    <div class="timer__outgoing">{{time}}</div>
                </div>
            </li>`;
    }
}