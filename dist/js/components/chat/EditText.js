import { ComponentGroup } from "../../abstract/ComponentGroup.js";
import { EventBus } from "../../utils/EventBus.js";
export class EditText extends ComponentGroup {
    getTemplate() {
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
        EventBus.getInstance().register('onMessage', this);
        let inputMessage = this.getChildrenByName('InputMessage')[0];
        let button = this.getChildrenByName('Button')[0];
        let sendMessage = () => {
            EventBus.getInstance().emit('onMessage', { 'message': inputMessage.value });
            inputMessage.value = '';
        };
        inputMessage.onkeypress = (e) => {
            let eventTarget = e.target;
            if (inputMessage.value && (e.key === 'Enter' && eventTarget.id === inputMessage.id)) {
                sendMessage();
            }
        };
        button.onclick = (e) => {
            let eventTarget = e.target;
            if (inputMessage.value && eventTarget.id === button.id) {
                sendMessage();
            }
        };
    }
    getKeys() {
        return {};
    }
}
//# sourceMappingURL=EditText.js.map