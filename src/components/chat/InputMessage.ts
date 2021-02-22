import {Component} from '../../content/Component';

export class InputMessage extends Component {
    getTemplate(): string {
        return `<input name="message" class="input__edit" type="text" placeholder="Message">`;
    }

    getKeys(): Keys {
        return {};
    }
}
