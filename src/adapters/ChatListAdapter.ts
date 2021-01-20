import {ArrayAdapter} from "../model/ArrayAdapter";
import {Templator} from "../common/Templator";

export class ChatListAdapter extends ArrayAdapter<string> {
    messages: string[] = [
        `I can't get no satisfaction, I can't get no satisfaction 'cause I try and I try and I try and I try
                    I can't get no, I can't get no`,
        'hello',
        'How are you'
    ];

    getItemTemplate(): string {
        let template = `<li class="message">
                <div class="message__outgoing">
                        {{message}}
                    <div class="timer__outgoing">11:30</div>
                </div>
            </li>`;
        return template;
    }

    bindData(index: number): string {
        let message = Templator.getInstance().withTemplate(this.getItemTemplate()).compile({'message': this.messages[index]});
        return message;
    }

    getCount(): number {
        return this.messages.length;
    }

}