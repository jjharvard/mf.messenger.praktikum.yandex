import { Component } from "../../abstract/Component";
export class InputMessage extends Component {
    getTemplate() {
        return `<input name="message" class="input__edit" type="text" placeholder="Message">`;
    }
    getKeys() {
        return {};
    }
}
