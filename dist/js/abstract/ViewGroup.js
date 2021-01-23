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
        let renderedChildKeys = {};
        for (let c of this.children) {
            let childTemplate = c.render(c);
            renderedChildKeys = Object.assign(renderedChildKeys, { [c.constructor.name]: childTemplate });
            result += childTemplate;
        }
        let mergedKeys = Object.assign(this.convertKeys(view.getKeys()), renderedChildKeys);
        result = Templator.getInstance().withTemplate(view.getTemplate()).compile(Object.assign(mergedKeys, { 'uuid': this.id }));
        return result;
    }
}
