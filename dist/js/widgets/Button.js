import { View } from "./View";
export class Button extends View {
    getTemplate() {
        return `
                    <button id="input__send_id" onclick="{{hello}}" class="input__send"></button>
               `;
    }
    getProps() {
        return {};
    }
}
