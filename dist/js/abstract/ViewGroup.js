import { View } from "./View";
import { Templator } from "../common/Templator";
export class ViewGroup extends View {
    constructor(views = []) {
        super();
        this.children = [];
        this.children = views;
    }
    addView(child) {
        this.children.push(child);
    }
    getChildren() {
        return this.children;
    }
    render(view = this) {
        let result = '';
        let childProps = {};
        for (let c of this.children) {
            let childTemplate = c.render(c);
            childProps = Object.assign(childProps, { [c.constructor.name]: childTemplate });
            result += childTemplate;
        }
        result = Templator.getInstance().withTemplate(view.getTemplate()).compile(Object.assign(this.convertProps(view.getProps()), { 'uuid': this.id }));
        return result;
    }
}
