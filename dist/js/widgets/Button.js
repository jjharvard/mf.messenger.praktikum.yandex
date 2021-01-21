import { View } from "./View";
export class Button extends View {
    getTemplate() {
        return `
                    <button onclick="{{hello}}" class="input__send">{{name}}</button>
               `;
    }
    getProps() {
        return {
            'name': 'Button',
            'hello': [123, 123, 123]
        };
    }
}
