import {View} from "../../abstract/View";

export class ChatItemView extends View {

    props: Props2 = {}

    getProps(): Props2 {
        return this.props;
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