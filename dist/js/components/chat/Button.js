import { Component } from "../../abstract/Component";
export class Button extends Component {
    getKeys() {
        return {};
    }
    getTemplate() {
        return `
                    <button class="input__send"></button>
               `;
    }
}
