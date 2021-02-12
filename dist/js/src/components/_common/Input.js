import { Component } from "../../abstract/Component.js";
export class Input extends Component {
    constructor(name, clazz, placeholder, type, value) {
        super();
        this.name = name;
        this.clazz = clazz;
        this.placeholder = placeholder;
        this.type = type;
        this.value = value;
    }
    getKeys() {
        return {
            'name': this.name,
            'clazz': this.clazz,
            'placeholder': this.placeholder,
            'type': this.type,
            'value': this.value
        };
    }
    getTemplate() {
        return `<input name="{{name}}" class="{{clazz}}" text="" placeholder="{{placeholder}}" type="{{type}}" value="{{value}}">`;
    }
}
//# sourceMappingURL=Input.js.map