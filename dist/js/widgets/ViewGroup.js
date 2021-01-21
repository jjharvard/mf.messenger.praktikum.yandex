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
            result += c.render(c);
            childProps = Object.assign(childProps, { [c.constructor.name]: c.render(c) });
        }
        result = Templator.getInstance().withTemplate(view.getTemplate()).compile(Object.assign(childProps, { 'uuid': this.id }));
        return result;
    }
}
