import { Component } from "../../content/Component";
export class Input extends Component {
    constructor(name, clazz, placeholder, type, value, readOnly) {
        super();
        this.name = name;
        this.clazz = clazz;
        this.placeholder = placeholder;
        this.type = type;
        this.value = value;
        this.readOnly = readOnly;
    }
    getInput() {
        return this.getDOMView();
    }
    getKeys() {
        return {
            'name': this.name,
            'clazz': this.clazz,
            'placeholder': this.placeholder,
            'type': this.type,
            'value': this.value,
            'readonly': this.readOnly
        };
    }
    getTemplate() {
        return `<input name="{{name}}" class="{{clazz}}" text="" placeholder="{{placeholder}}" type="{{type}}" value="{{value}}" {{readonly}}>`;
    }
}
//# sourceMappingURL=Input.js.map