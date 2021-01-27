import { Templator } from "../utils/Templator.js";
import { EventBus } from "../utils/EventBus.js";
import { EventsListener } from "./EventsListener.js";
export class Component extends EventsListener {
    constructor() {
        super();
        this.id = Templator.uuidv4();
        EventBus.getInstance().register('onViewCreated', this);
    }
    getDOMView() {
        return document.getElementById(this.id);
    }
    convertKeys(keys) {
        let result = {};
        for (let key in keys) {
            if (typeof keys !== 'string') {
                result[key] = "" + keys[key];
            }
            else {
                result[key] = keys[key];
            }
        }
        result = Object.assign(result, { 'uuid': this.id });
        return result;
    }
    merge(a, argObj) {
        for (let key in argObj) {
            a[key] = a[key] ? [...a[key], argObj[key]] : [argObj[key]];
        }
        return a;
    }
    render(view = this) {
        return Templator.getInstance().withTemplate(view.getTemplate()).compile(this.merge({}, this.convertKeys(view.getKeys())));
    }
    validate(buttonId, onValidated) {
        let checkInputs = (input) => {
            let hasError = false;
            switch (input.name) {
                case 'email':
                    hasError = !/^\S+@\S+\.[a-z]{2,5}$/.test(input.value);
                    break;
                case 'login':
                case 'name':
                case 'surname':
                case 'nickname':
                    hasError = !/^[a-zA-Z\-]+$/.test(input.value);
                    break;
                case 'phone':
                    hasError = !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
                    break;
                case 'password':
                case 'confirm_password':
                    hasError = !/^(\S){6,25}$/.test(input.value);
                    break;
                default:
                    break;
            }
            if (hasError) {
                input.setAttribute('style', 'border: 2px solid #fa3e3e;');
            }
            return hasError;
        };
        let inputsArray = Array.from(document.getElementsByClassName('should_be_validated'));
        let btnSign = document.getElementById(buttonId);
        btnSign.onclick = function () {
            let next = true;
            inputsArray.forEach(input => {
                let hasError = checkInputs(input);
                if (hasError && next) {
                    next = false;
                }
            });
            if (next) {
                onValidated();
            }
        };
        inputsArray.forEach(input => {
            input.onfocus = function (event) {
                event.currentTarget.setAttribute('style', 'border: 2px solid #dfe3ee;');
            };
            input.onblur = function (event) {
                let input = event.target;
                checkInputs(input);
            };
        });
    }
}
//# sourceMappingURL=Component.js.map