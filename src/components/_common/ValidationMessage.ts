import {Component} from "../../abstract/Component.js";

export class ValidationMessage extends Component {

    static MESSAGES: { [k: string]: string } = {
        'email': 'Should contain valid email',
        'password': 'Password should be of length from 6 to 25 symbols',
        'confirm_password': 'Password should be of length from 6 to 25 symbols',
        'name': 'Should contain letters only',
        'login': 'Should contain letters only',
        'surname': 'Should contain letters only',
        'nickname': 'Should contain letters only',
        'phone': 'Should contain valid phone number',

    };

    constructor(private name: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'message': ValidationMessage.MESSAGES[this.name]
        };
    }

    getTemplate(): string {
        return `<div class="validatable_error">{{message}}</div>`;
    }

}