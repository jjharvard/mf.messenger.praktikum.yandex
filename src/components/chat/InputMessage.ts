import {Component} from "../../abstract/Component.js";

export class InputMessage extends Component {

    getTemplate(): string {
        return `<input name="message" class="input__edit" type="text" placeholder="Message">`;
    }

    getKeys(): Keys {
        return {};
    }

}