import {Templator} from "../utils/Templator.js";
import {EventBus} from "../utils/EventBus.js";
import {EventsListener} from "./EventsListener.js";

export abstract class Component extends EventsListener {

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
                result[key] = "" + keys[key];
            } else {
                result[key] = keys[key];
            }
        }
        result = Object.assign(result, {'uuid': this.id});
        return result;
    }

    merge(a: ArrayKeys, argObj: FlatKeys): ArrayKeys {
        for (let key in argObj) {
            a[key] = a[key] ? [...a[key], argObj[key]] : [argObj[key]];
        }
        return a;
    }

    render(view: Component = this): string {
        return Templator.getInstance().withTemplate(view.getTemplate()).compile(this.merge({}, this.convertKeys(view.getKeys())));
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

        let inputsArray: Element[] = Array.from(document.getElementsByClassName('should_be_validated'));

        let btnSign = <HTMLButtonElement>document.getElementById(buttonId);

        btnSign.onclick = function () {
            let next = true;
            inputsArray.forEach(input => {
                let hasError = checkInputs(<HTMLInputElement>input);
                if (hasError && next) {
                    next = false;
                }
            });
            if (next) {
                onValidated();
            }
        };

        inputsArray.forEach(input => {
            (<HTMLInputElement>input).onfocus = function (event) {
                (<Element>event.currentTarget).setAttribute('style', 'border: 2px solid #dfe3ee;');
            };

            (<HTMLInputElement>input).onblur = function (event) {
                let input = (<HTMLInputElement>event.target);
                checkInputs(input);
            };
        });
    }

}