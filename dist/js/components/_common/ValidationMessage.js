import { Component } from "../../abstract/Component.js";
export class ValidationMessage extends Component {
    constructor(name) {
        super();
        this.name = name;
    }
    getKeys() {
        return {
            'message': ValidationMessage.MESSAGES[this.name]
        };
    }
    getTemplate() {
        return `<div class="validatable_error">{{message}}</div>`;
    }
}
ValidationMessage.MESSAGES = {
    'email': 'Should contain valid email',
    'password': 'Password should be of length from 6 to 25 symbols',
    'confirm_password': 'Password should be of length from 6 to 25 symbols',
    'name': 'Should contain letters only',
    'login': 'Should contain letters only',
    'surname': 'Should contain letters only',
    'nickname': 'Should contain letters only',
    'phone': 'Should contain valid phone number',
};
//# sourceMappingURL=ValidationMessage.js.map