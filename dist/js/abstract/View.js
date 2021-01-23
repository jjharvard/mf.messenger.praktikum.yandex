import { Templator } from "../utils/Templator";
import { EventBus } from "../utils/EventBus";
import { EventsListener } from "./EventsListener";
export class View extends EventsListener {
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
                if (typeof keys[key] === 'function') {
                    console.log('OK');
                    result[key] = "(" + keys[key] + ")();";
                    result[key] = result[key].replace(key, 'function');
                }
                else {
                    result[key] = "" + keys[key];
                }
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
            inputsArray.forEach(input => {
                let hasError = checkInputs(input);
                if (!hasError) {
                    onValidated();
                }
            });
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
