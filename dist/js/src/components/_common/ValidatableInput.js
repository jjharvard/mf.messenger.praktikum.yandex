import { ComponentGroup } from "../../abstract/ComponentGroup.js";
import { Input } from "./Input.js";
import { ValidationMessage } from "./ValidationMessage.js";
import { ValidationUtil } from "../../utils/ValidationUtil.js";
export class ValidatableInput extends ComponentGroup {
    constructor(prefix, name, clazz, placeholder, type, value) {
        super([
            new Input(name, clazz, placeholder, type, value),
            new ValidationMessage(prefix, name)
        ]);
    }
    getKeys() {
        return {};
    }
    getInput() {
        return this.input;
    }
    onViewCreated() {
        if (super.onViewCreated()) {
            this.input = document.getElementById(this.getChildren()[0].id);
            this.message = document.getElementById(this.getChildren()[1].id);
            this.input.onblur = () => {
                this.check();
            };
            this.input.onfocus = () => {
                this.setValidStyle();
            };
            return true;
        }
        else {
            return false;
        }
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
    getTemplate() {
        return `<div class="validatable">
                    {{Input}}
                    {{ValidationMessage}}
                </div>
                `;
    }
}
//# sourceMappingURL=ValidatableInput.js.map