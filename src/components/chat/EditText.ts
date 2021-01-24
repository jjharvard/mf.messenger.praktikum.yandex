import {ComponentGroup} from "../../abstract/ComponentGroup";
import {EventBus} from "../../utils/EventBus";

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

    onViewCreated(payload: Payload) {
        EventBus.getInstance().register('onMessage', this)
        let inputMessage = <HTMLInputElement>this.getChildrenByName('InputMessage')[0]
        let button = <HTMLButtonElement>this.getChildrenByName('Button')[0]
        let sendMessage = () => {
            EventBus.getInstance().emit('onMessage', {'message': inputMessage.value})
            inputMessage.value = ''
        }
        inputMessage.onkeypress = (e: KeyboardEvent) => {
            let eventTarget: HTMLElement = <HTMLElement>e.target
            if(inputMessage.value && (e.key === 'Enter' && eventTarget.id === inputMessage.id)) {
                sendMessage()
            }
        }
        button.onclick = (e: Event) => {
            let eventTarget: HTMLElement = <HTMLElement>e.target
            if(inputMessage.value && eventTarget.id === button.id) {
                sendMessage()
            }
        }
    }

    getKeys(): Keys {
        return {}
    }

}