import {Component} from "../../_std/Component.js";
import {ValidationUtil} from "../../utils/ValidationUtil.js";

export class ValidationMessage extends Component {

    constructor(private prefix: string, private name: string) {
        super();
    }

    getKeys(): Keys {
        return {
            'message': this.name ? ValidationUtil.VALIDATION_DATA[this.name][0] : '',
            'prefix': this.prefix
        };
    }

    getTemplate(): string {
        return `<div class="{{prefix}}__validatable_error">{{message}}</div>`;
    }

}