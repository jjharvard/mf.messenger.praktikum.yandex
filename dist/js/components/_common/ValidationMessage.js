import { Component } from "../../abstract/Component.js";
export class ValidationMessage extends Component {
    constructor(prefix, name) {
        super();
        this.prefix = prefix;
        this.name = name;
    }
    getKeys() {
        return {
            'message': ValidationMessage.MESSAGES[this.name],
            'prefix': this.prefix
        };
    }
    getTemplate() {
        return `<div class="{{prefix}}__validatable_error">{{message}}</div>`;
    }
}
ValidationMessage.MESSAGES = {
    'email': 'Should contain valid email',
    'password': 'Password should be of length from 6 to 25 symbols',
    'confirm_password': 'Password should be of length from 6 to 25 symbols',
    'name': 'Name should contain letters only',
    'login': 'Login should contain letters only',
    'surname': 'Surname should contain letters only',
    'nickname': 'Nickname should contain letters only',
    'phone': 'Should contain valid phone number',
};
//# sourceMappingURL=ValidationMessage.js.map