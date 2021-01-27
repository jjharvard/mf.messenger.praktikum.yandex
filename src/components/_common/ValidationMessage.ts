import {Component} from "../../abstract/Component.js";

export class ValidationMessage extends Component {

    static MESSAGES: { [k: string]: string } = {
        'email': 'Should contain valid email',
        'password': 'Password should be of length from 6 to 25 symbols',
        'confirm_password': 'Password should be of length from 6 to 25 symbols',
        'name': 'Name should contain letters only',
        'login': 'Login should contain letters only',
        'surname': 'Surname should contain letters only',
        'nickname': 'Nickname should contain letters only',
        'phone': 'Should contain valid phone number',
    };

    constructor(private prefix: string, private name: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'message': ValidationMessage.MESSAGES[this.name],
            'prefix': this.prefix
        };
    }

    getTemplate(): string {
        return `<div class="{{prefix}}__validatable_error">{{message}}</div>`;
    }

}