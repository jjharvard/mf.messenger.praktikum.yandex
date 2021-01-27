import { Component } from "../../abstract/Component.js";
export class Input extends Component {
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
        return `<input name="{{name}}" class="{{clazz}}" text="" placeholder="{{placeholder}}" type="{{type}}">`;
    }
}
//# sourceMappingURL=Input.js.map