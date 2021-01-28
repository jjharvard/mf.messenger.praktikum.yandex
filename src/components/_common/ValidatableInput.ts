import {ComponentGroup} from "../../abstract/ComponentGroup.js";
import {Input} from "./Input.js";
import {ValidationMessage} from "./ValidationMessage.js";
import {ValidationUtil} from "../../utils/ValidationUtil.js";

export class ValidatableInput extends ComponentGroup {
    // @ts-ignore проинициализируются после рендеринга
    input: HTMLInputElement;
    // @ts-ignore
    message: HTMLDivElement;

    constructor(prefix: string, name: string, clazz: string, placeholder: string, type: string, value: string) {
        super([
            new Input(name, clazz, placeholder, type, value),
            new ValidationMessage(prefix, name)
        ]);
    }

    getKeys(): Keys {
        return {};
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
        let hasError = ValidationUtil.hasError(this.input);
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