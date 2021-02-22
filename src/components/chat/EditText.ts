import {ComponentGroup} from '../../content/ComponentGroup';
import {EventBus} from '../../utils/EventBus';

export class EditText extends ComponentGroup {
    getTemplate(): string {
        return `
                <div class="input">
                    <label class="input__attach" for="input__attach_id"></label>
                    {{UploadButton}}
                    {{InputMessage}}
                    {{Button}}
                </div>
            `;
    }

    onViewCreated() {
        const inputMessage = <HTMLInputElement> this.getChildElementsByName('InputMessage')[0];
        const button = <HTMLButtonElement> this.getChildElementsByName('Button')[0];
        const sendMessage = () => {
            EventBus.getInstance().emit('onMessage', {'message': inputMessage.value});
            inputMessage.value = '';
        };
        inputMessage.onkeypress = (e: KeyboardEvent) => {
            const eventTarget: HTMLElement = <HTMLElement>e.target;
            if (inputMessage.value && (e.key === 'Enter' && eventTarget.id === inputMessage.id)) {
                sendMessage();
            }
        };
        button.onclick = (e: Event) => {
            const eventTarget: HTMLElement = <HTMLElement>e.target;
            if (inputMessage.value && eventTarget.id === button.id) {
                sendMessage();
            }
        };
    }

    getKeys(): Keys {
        return {};
    }
}
