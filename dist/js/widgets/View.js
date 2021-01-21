import { Templator } from "../common/Templator";
export class View {
    constructor() {
        this.id = Templator.uuidv4();
    }
    convertProps(props2) {
        let result = {};
        for (let key in props2) {
            if (typeof props2 !== 'string') {
                result[key] = "" + props2[key];
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
}
