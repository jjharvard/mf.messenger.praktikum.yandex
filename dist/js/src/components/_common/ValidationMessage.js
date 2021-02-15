import { Component } from "../../content/Component.js";
import { ValidationUtil } from "../../utils/ValidationUtil.js";
export class ValidationMessage extends Component {
    constructor(prefix, name) {
        super();
        this.prefix = prefix;
        this.name = name;
    }
    getKeys() {
        return {
            'message': this.name ? ValidationUtil.VALIDATION_DATA[this.name][0] : '',
            'prefix': this.prefix
        };
    }
    getTemplate() {
        return `<div class="{{prefix}}__validatable_error">{{message}}</div>`;
    }
}
//# sourceMappingURL=ValidationMessage.js.map