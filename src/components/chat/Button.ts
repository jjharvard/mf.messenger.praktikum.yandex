import {View} from "../../abstract/View";
import {EventBus} from "../../common/EventBus";

export class Button extends View {

    getTemplate(): string {
        return `
                    <button class="input__send"></button>
               `;
    }

    onViewCreated(payload: {}) {
        let button = document.getElementById(this.id)
        button!.addEventListener('click', () => {
            EventBus.getInstance().emit('onMessage', {'hello': 'World!'})
        })
    }

    getProps(): Props2 {
        return {
            'hello': [123, 123, 123]
        }
    }
}