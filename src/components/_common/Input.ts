import {Component} from "../../abstract/Component.js";

export class Input extends Component {

    constructor(private name: string, private clazz: string, private placeholder: string, private type: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'name': this.name,
            'clazz': this.clazz,
            'placeholder': this.placeholder,
            'type': this.type
        };
    }

    getTemplate(): string {
        return `<input name="{{name}}" class="{{clazz}}" text="" placeholder="{{placeholder}}" type="{{type}}">`;
    }

}