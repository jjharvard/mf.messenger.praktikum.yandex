import { ComponentGroup } from "../../abstract/ComponentGroup.js";
import { Input } from "./Input.js";
import { ValidationMessage } from "./ValidationMessage.js";
export class ValidatableInput extends ComponentGroup {
    constructor(name, clazz, placeholder, type) {
        super([
            new Input(name, clazz, placeholder, type),
            new ValidationMessage(name)
        ]);
    }
    getKeys() {
        return {};
    }
    onViewCreated() {
        this.input = document.getElementById(this.getChildren()[0].id);
        this.message = document.getElementById(this.getChildren()[1].id);
        this.input.onblur = () => {
            this.check();
        };
        this.input.onfocus = () => {
            this.setValidStyle();
        };
    }
    check() {
        let hasError = this.hasError(this.input);
        if (hasError) {
            this.setErrorStyle();
        }
        return hasError;
    }
    setErrorStyle() {
        this.message.setAttribute('style', 'display: block;');
        this.input.setAttribute('style', 'border: 2px solid #fa3e3e;');
    }
    setValidStyle() {
        this.message.setAttribute('style', 'display: none;');
        this.input.setAttribute('style', 'border: 2px solid #dfe3ee;');
    }
    getTemplate() {
        return `<div class="validatable">
                    {{Input}}
                    {{ValidationMessage}}
                </div>
                `;
    }
    hasError(input) {
        let hasError = false;
        switch (input.name) {
            case 'email':
                hasError = !/^\S+@\S+\.[a-z]{2,5}$/.test(input.value);
                break;
            case 'login':
            case 'name':
            case 'surname':
            case 'nickname':
                hasError = !/^[a-zA-Z\-]+$/.test(input.value);
                break;
            case 'phone':
                hasError = !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
                break;
            case 'password':
            case 'confirm_password':
                hasError = !/^(\S){6,25}$/.test(input.value);
                break;
            default:
                break;
        }
        return hasError;
    }
}
//# sourceMappingURL=ValidatableInput.js.map