import { Component } from "../../abstract/Component";
export class Button extends Component {
    getTemplate() {
        return `
                    <button id="btnId" class="input__send"></button>
               `;
    }
    getKeys() {
        return {};
    }
}
