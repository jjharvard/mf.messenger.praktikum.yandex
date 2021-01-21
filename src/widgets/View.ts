import {Templator} from "../common/Templator";
import {EventBus} from "../common/EventBus";
import {EventsListener} from "../common/EventsListener";

export abstract class View implements EventsListener {

    id: string = Templator.uuidv4()

    constructor() {
        EventBus.getInstance().register('onViewCreated', this)
    }

    abstract getTemplate(): string

    abstract getProps(): Props2

    protected convertProps(props2: Props2): Props {
        let result: Props = {}
        for(let key in props2) {
            if(typeof props2 !== 'string') {
                result[key] = "" + props2[key]
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

    onMessage(payload: {}): void {
    }

    onViewCreated(payload: {}): void {
        if(this) {
            console.log(this.id + ' created')
        }
    }
}