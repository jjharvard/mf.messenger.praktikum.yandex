import {View} from "../../abstract/View";

export class ChatItemView extends View {

    keys: Keys = {}

    getKeys(): Keys {
        return this.keys;
    }

    getTemplate(): string {
        return `<li class="message">
                <div class="message__outgoing">
                        {{message}}
                    <div class="timer__outgoing">11:30</div>
                </div>
            </li>`;
    }
}