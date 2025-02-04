import {Component} from '../../content/Component';

export class Input extends Component {
    constructor(private name: string, private clazz: string,
                private placeholder: string, private type: string,
                private value: string, private readOnly: string) {
        super();
    }

    getInput(): HTMLInputElement {
        return <HTMLInputElement> this.getDOMView();
    }

    getKeys(): Keys {
        return {
            'name': this.name,
            'clazz': this.clazz,
            'placeholder': this.placeholder,
            'type': this.type,
            'value': this.value,
            'readonly': this.readOnly
        };
    }

    getTemplate(): string {
        return `<input name="{{name}}" class="{{clazz}}" text="" placeholder="{{placeholder}}" type="{{type}}" value="{{value}}" {{readonly}}>`;
    }
}
