import {Component} from "../../abstract/Component.js";

export class ChatItemComponent extends Component {

    constructor(private message: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'message': this.message
        };
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