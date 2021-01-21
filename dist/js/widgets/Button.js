import { View } from "./View";
import { EventBus } from "../common/EventBus";
export class Button extends View {
    getTemplate() {
        return `
                    <button onclick="{{hello}}" class="input__send"></button>
               `;
    }
    onViewCreated(payload) {
        setTimeout(() => {
            EventBus.getInstance().emit('onMessage', { 'hello': 'World!' });
        }, 3000);
    }
    getProps() {
        return {
            'hello': [123, 123, 123]
        };
    }
}
