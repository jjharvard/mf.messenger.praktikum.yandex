import {Component} from "../../abstract/Component.js";

export class Button extends Component {

    getKeys(): Keys {
        return {};
    }

    getTemplate(): string {
        return `
                    <button class="input__send"></button>
               `;
    }
}