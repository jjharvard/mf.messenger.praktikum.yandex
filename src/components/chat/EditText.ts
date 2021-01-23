import {ViewGroup} from "../../abstract/ViewGroup";
import {EventBus} from "../../common/EventBus";

export class EditText extends ViewGroup {

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
        let inputMessage = <HTMLInputElement>this.getChildByName('InputMessage')
        let button = <HTMLButtonElement>this.getChildByName('Button')
        button.onclick = (event) => {
            EventBus.getInstance().emit('onMessage', {'message': inputMessage.value})
            inputMessage.value = ''
        }
    }

    getKeys(): Keys {
        return {}
    }

}