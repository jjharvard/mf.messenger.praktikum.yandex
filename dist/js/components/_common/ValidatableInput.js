import { Validatable } from "../../abstract/Validatable.js";
export class ValidatableInput extends Validatable {
    constructor(name, clazz, placeholder, type) {
        super();
        this.name = name;
        this.clazz = clazz;
        this.placeholder = placeholder;
        this.type = type;
    }
    getKeys() {
        return {
            'name': this.name,
            'clazz': this.clazz,
            'placeholder': this.placeholder,
            'type': this.type
        };
    }
    getTemplate() {
        return `<input name="{{name}}" class="{{clazz}} should_be_validated" text="" placeholder="{{placeholder}}" type="{{type}}">`;
    }
}
//# sourceMappingURL=ValidatableInput.js.map