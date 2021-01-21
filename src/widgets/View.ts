import {Templator} from "../common/Templator";

export abstract class View {

    id: string = Templator.uuidv4()

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
}