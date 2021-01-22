import { Templator } from "../common/Templator";
import { EventBus } from "../common/EventBus";
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
    convertProps(props2) {
        let result = {};
        for (let key in props2) {
            if (typeof props2 !== 'string') {
                if (typeof props2[key] === 'function') {
                    console.log('OK');
                    result[key] = "(" + props2[key] + ")();";
                    result[key] = result[key].replace(key, 'function');
                }
                else {
                    result[key] = "" + props2[key];
                }
            }
            else {
                result[key] = props2[key];
            }
        }
        result = Object.assign(result, { 'uuid': this.id });
        return result;
    }
    render(view = this) {
        return Templator.getInstance().withTemplate(view.getTemplate()).compile(this.convertProps(view.getProps()));
    }
    validate(buttonId) {
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
        };
        let inputsArray = Array.from(document.getElementsByClassName('should_be_validated'));
        let btnSign = document.getElementById(buttonId);
        btnSign.onclick = function () {
            inputsArray.forEach(input => {
                checkInputs(input);
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
