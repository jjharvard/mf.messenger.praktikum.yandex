import {Templator} from "../common/Templator";
import {EventBus} from "../common/EventBus";
import {EventsListener} from "./EventsListener";

export abstract class View extends EventsListener {

    id: string = Templator.uuidv4()

    constructor() {
        super();
        EventBus.getInstance().register('onViewCreated', this)
    }

    abstract getTemplate(): string

    abstract getProps(): Props2

    getDOMView() : HTMLElement | null {
        return document.getElementById(this.id)
    }

    protected convertProps(props2: Props2): Props {
        let result: Props = {}
        for(let key in props2) {
            if(typeof props2 !== 'string') {
                if(typeof  props2[key] === 'function') {
                    console.log('OK')
                    result[key] = "(" + props2[key] + ")();"
                    result[key] = result[key].replace(key, 'function')
                } else {
                    result[key] = "" + props2[key]
                }

            } else {
                result[key] = props2[key]
            }
        }
        result = Object.assign(result, {'uuid': this.id})
        return result
    }

    render(view: View = this): string {
        return Templator.getInstance().withTemplate(view.getTemplate()).compile(this.convertProps(view.getProps()));
    }

}