import { ViewGroup } from "../../abstract/ViewGroup";
import { EventBus } from "../../common/EventBus";
export class EditText extends ViewGroup {
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
    onViewCreated(payload) {
        EventBus.getInstance().register('onMessage', this);
        let inputMessage = this.getChildByName('InputMessage');
        let button = this.getChildByName('Button');
        let sendMessage = () => {
            EventBus.getInstance().emit('onMessage', { 'message': inputMessage.value });
            inputMessage.value = '';
        };
        inputMessage.onkeypress = (e) => {
            let eventTarget = e.target;
            if (e.key === 'Enter' && eventTarget.id === inputMessage.id) {
                sendMessage();
            }
        };
        button.onclick = (e) => {
            let eventTarget = e.target;
            if (eventTarget.id === button.id) {
                sendMessage();
            }
        };
    }
    getKeys() {
        return {};
    }
}
