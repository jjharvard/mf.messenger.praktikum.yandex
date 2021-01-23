import {Templator} from "../common/Templator";
import {EventBus} from "../common/EventBus";
import {EventsListener} from "./EventsListener";

export abstract class View extends EventsListener {

    id: string = Templator.uuidv4();

    constructor() {
        super();
        EventBus.getInstance().register('onViewCreated', this);
    }

    abstract getTemplate(): string

    abstract getKeys(): Keys

    getDOMView(): HTMLElement | null {
        return document.getElementById(this.id);
    }

    protected convertKeys(keys: Keys): FlatKeys {
        let result: FlatKeys = {};
        for (let key in keys) {
            if (typeof keys !== 'string') {
                if (typeof keys[key] === 'function') {
                    console.log('OK');
                    result[key] = "(" + keys[key] + ")();";
                    result[key] = result[key].replace(key, 'function');
                } else {
                    result[key] = "" + keys[key];
                }

            } else {
                result[key] = keys[key];
            }
        }
        result = Object.assign(result, {'uuid': this.id});
        return result;
    }

    render(view: View = this): string {
        return Templator.getInstance().withTemplate(view.getTemplate()).compile(this.convertKeys(view.getKeys()));
    }

    validate(buttonId: string, onValidated: () => void) {
        let checkInputs = (input: HTMLInputElement) => {
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
                    hasError = !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value)
                    break;
                case 'password':
                case 'confirm_password':
                    hasError = !/^(\S){6,25}$/.test(input.value)
                    break;
                default:
                    break;
            }
            if (hasError) {
                input.setAttribute('style', 'border: 2px solid #fa3e3e;');
            }
            return hasError
        }

        let inputsArray: Element[] = Array.from(document.getElementsByClassName('should_be_validated'));

        let btnSign = <HTMLButtonElement>document.getElementById(buttonId);

        btnSign.onclick = function () {
            inputsArray.forEach(input => {
                let hasError = checkInputs(<HTMLInputElement>input)
                if(!hasError) {
                    onValidated()
                }
            });
        };

        inputsArray.forEach(input => {
            (<HTMLInputElement>input).onfocus = function (event) {
                (<Element>event.currentTarget).setAttribute('style', 'border: 2px solid #dfe3ee;');
            };

            (<HTMLInputElement>input).onblur = function (event) {
                let input = (<HTMLInputElement>event.target);
                checkInputs(input)
            };
        });
    }

}