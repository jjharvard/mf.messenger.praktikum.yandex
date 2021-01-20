import {View} from "./View";

export class Button extends View {

    getTemplate(): string {
        return `
                    <button id="input__send_id" onclick="{{hello}}" class="input__send"></button>
               `;
    }

    getProps(): Props {
        return {}
    }
}