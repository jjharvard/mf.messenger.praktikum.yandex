import {Validatable} from "../../abstract/Validatable.js";

export class ValidatableInput extends Validatable {

    constructor(private name: string, private clazz: string, private placeholder: string, private type: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'name': this.name,
            'clazz': this.clazz,
            'placeholder': this.placeholder,
            'type': this.type
        }
    }

    getTemplate(): string {
        return `<input name="{{name}}" class="{{clazz}} should_be_validated" text="" placeholder="{{placeholder}}" type="{{type}}">`;
    }
}