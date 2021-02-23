import {ComponentGroup} from '../../content/ComponentGroup';

export class EditText extends ComponentGroup {
    inputMessage: HTMLInputElement;
    btnSend: HTMLButtonElement;

    onBtnSendCallback: (message: string) => void;

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
        this.inputMessage = <HTMLInputElement>this.getChildElementsByName('InputMessage')[0];
        this.btnSend = <HTMLButtonElement>this.getChildElementsByName('Button')[0];

        this.inputMessage.onkeypress = (e: KeyboardEvent) => {
            const eventTarget: HTMLElement = <HTMLElement>e.target;
            if (this.inputMessage.value && (e.key === 'Enter' && eventTarget.id === this.inputMessage.id)) {
                this.onBtnSendCallback(this.inputMessage.value);
                this.inputMessage.value = '';
            }
        };
        this.btnSend.onclick = (e: Event) => {
            const eventTarget: HTMLElement = <HTMLElement>e.target;
            if (this.inputMessage.value && eventTarget.id === this.btnSend.id) {
                this.onBtnSendCallback(this.inputMessage.value);
                this.inputMessage.value = '';
            }
        };
    }

    getKeys(): Keys {
        return {};
    }
}
