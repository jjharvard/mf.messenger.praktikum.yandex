import {View} from "./View";

export class Button extends View {

    getTemplate(): string {
        return `
                    <button onclick="{{hello}}" class="input__send">{{name}}</button>
               `;
    }

    getProps(): Props2 {
        return {
            'name': 'Button',
            'hello': [123, 123, 123]
        }
    }
}