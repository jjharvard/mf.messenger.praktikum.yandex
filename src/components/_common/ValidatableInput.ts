import {ComponentGroup} from '../../content/ComponentGroup';
import {Input} from './Input';
import {ValidationMessage} from './ValidationMessage';
import {ValidationUtil} from '../../utils/ValidationUtil';

export class ValidatableInput extends ComponentGroup {
    input: HTMLInputElement;
    message: HTMLDivElement;

    constructor(prefix: string, name: string, clazz: string, placeholder: string, type: string, value: string) {
        super([
            new Input(name, clazz, placeholder, type, value, ''),
            new ValidationMessage(prefix, name)
        ]);
    }

    getKeys(): Keys {
        return {};
    }

    getInput(): HTMLInputElement {
        return this.input;
    }

    showMessage(message: string) {
        this.message.textContent = message;
        this.setErrorStyle();
    }

    onViewCreated() {
        this.input = <HTMLInputElement>document.getElementById(this.getChildren()[0].id);
        this.message = <HTMLDivElement>document.getElementById(this.getChildren()[1].id);
        this.input.onblur = () => {
            this.check();
        };
        this.input.onfocus = () => {
            this.setValidStyle();
        };
    }

    check() {
        const hasError = ValidationUtil.hasError(this.input);
        if (hasError) {
            this.setErrorStyle();
        }
        return hasError;
    }

    setErrorStyle() {
        this.message.setAttribute('style', 'display: flex;');
        this.input.setAttribute('style', 'border: 2px solid #fa3e3e;');
    }

    setValidStyle() {
        this.message.setAttribute('style', 'display: none;');
        this.input.setAttribute('style', 'border: 2px solid #dfe3ee;');
    }

    getTemplate(): string {
        return `<div class="validatable">
                    {{Input}}
                    {{ValidationMessage}}
                </div>
                `;
    }
}
