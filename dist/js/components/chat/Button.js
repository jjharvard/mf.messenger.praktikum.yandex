import { View } from "../../abstract/View";
import { EventBus } from "../../common/EventBus";
export class Button extends View {
    getTemplate() {
        return `
                    <button id="btnId" class="input__send"></button>
               `;
    }
    onViewCreated(payload) {
        let button = document.getElementById(this.id);
        button.addEventListener('click', () => {
            EventBus.getInstance().emit('onMessage', { 'hello': 'World!' });
        });
    }
    getProps() {
        return {};
    }
}
