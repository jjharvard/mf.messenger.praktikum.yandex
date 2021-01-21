import {View} from "./View";
import {EventBus} from "../common/EventBus";

export class Button extends View {

    getTemplate(): string {
        return `
                    <button onclick="{{hello}}" class="input__send"></button>
               `;
    }

    onViewCreated(payload: {}) {
        setTimeout(() => {
            EventBus.getInstance().emit('onMessage', {'hello': 'World!'})
        }, 1000)
    }

    getProps(): Props2 {
        return {
            'hello': [123, 123, 123]
        }
    }
}