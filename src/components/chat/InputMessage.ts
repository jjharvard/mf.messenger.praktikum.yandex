import {View} from "../../abstract/View";

export class InputMessage extends View {

    getTemplate(): string {
        return `<input name="message" class="input__edit" type="text" placeholder="Message">`;
    }

    getProps(): Props2 {
        return {};
    }

}