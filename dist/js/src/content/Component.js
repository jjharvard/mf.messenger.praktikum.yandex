import { Templator } from "../utils/Templator.js";
import { EventBus } from "../utils/EventBus.js";
import { Utils } from "../utils/Utils.js";
export class Component {
    constructor() {
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
        return Templator.getInstance()
            .withTemplate(view.getTemplate())
            .compile(this.merge({}, this.convertKeys(view.getKeys())));
    }
    isRendered() {
        return Utils.isRendered(this);
    }
    onChatSelected(_ = {}) {
    }
    onChatAction(_ = {}) {
    }
    onMessage(_ = {}) {
    }
    onViewCreated(_ = {}) {
    }
}
//# sourceMappingURL=Component.js.map