import { View } from "../../abstract/View";
export class InputMessage extends View {
    getTemplate() {
        return `<input name="message" class="input__edit" type="text" placeholder="Message">`;
    }
    getKeys() {
        return {};
    }
}
