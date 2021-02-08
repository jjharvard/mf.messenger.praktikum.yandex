import {Templator} from "../utils/Templator.js";
import {EventBus} from "../utils/EventBus.js";
import {Utils} from "../utils/Utils.js";

export abstract class Component {

    id: string = Templator.uuidv4();

    constructor() {
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
        return Templator.getInstance()
            .withTemplate(view.getTemplate())
            .compile(this.merge({}, this.convertKeys(view.getKeys())));
    }

    onMessage(payload: Payload = {}): boolean {
        if (!payload) {
            console.log(payload);
        }
        return Utils.isRendered(this);
    }

    onViewCreated(payload: Payload = {}): boolean {
        if (!payload) {
            console.log(payload);
        }
        return Utils.isRendered(this);
    }

}